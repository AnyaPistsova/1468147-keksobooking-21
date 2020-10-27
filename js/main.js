"use strict";

// consts common
const REQUIRED_ADVERTS = 8;
const MIN_VALUE = 1;

// consts author
const AVATARS = ["img/avatars/user01.png", "img/avatars/user02.png", "img/avatars/user03.png", "img/avatars/user04.png", "img/avatars/user05.png", "img/avatars/user06.png", "img/avatars/user07.png", "img/avatars/user08.png"];

// consts offer
const PRICE_MAX = 5000;
const ROOMS_MAX = 5;
const GUESTS_MAX = 10;
const TYPES = ["palace", "flat", "house", "bungalow"];
const TIMES = ["12:00", "13:00", "14:00"];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

// consts location
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const mapMaxWidth = document.querySelector(".map").offsetWidth;
const COORDINATE_X_MIN = 0;
const COORDINATE_X_MAX = mapMaxWidth - PIN_WIDTH / 2;

const COORDINATE_Y_MIN = 130;
const COORDINATE_Y_MAX = 630;


// computation
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomElement = (element) => {
  return element[getRandomNumber(0, element.length - 1)];
};

const getRandomLength = (elements) => {
  let [...components] = [...elements];
  components.length = getRandomNumber(MIN_VALUE, elements.length);
  return components;
};

const createAdverts = (number) => {
  const adverts = [];
  for (let i = 0; i < number; i++) {
    adverts.push({
      "author": {
        "avatar": getRandomElement(AVATARS),
      },
      "offer": {
        "title": "Заголовок",
        "address": "600, 350",
        "price": getRandomNumber(MIN_VALUE, PRICE_MAX),
        "type": getRandomLength(TYPES),
        "rooms": getRandomNumber(MIN_VALUE, ROOMS_MAX),
        "guests": getRandomNumber(MIN_VALUE, GUESTS_MAX),
        "checkin": getRandomElement(TIMES),
        "checkout": getRandomElement(TIMES),
        "features": getRandomLength(FEATURES),
        "description": "Описание",
        "photos": getRandomLength(PHOTOS)
      },
      "location": {
        "x": getRandomNumber(COORDINATE_X_MIN, COORDINATE_X_MAX),
        "y": getRandomNumber(COORDINATE_Y_MIN, COORDINATE_Y_MAX)
      }
    });
  }

  return adverts;
};

const adverts = createAdverts(REQUIRED_ADVERTS);

const map = document.querySelector(".map");
map.classList.remove("map--faded");

const pinTemplate = document.querySelector("#pin").content;
const pinButton = pinTemplate.querySelector(".map__pin");
const pins = document.querySelector(".map__pins");

const getPin = (advert) => {
  const pinClone = pinButton.cloneNode(true);

  // pinClone.style = `left: ${advert.location.x - PIN_WIDTH / 2}px; top: ${advert.location.y - PIN_HEIGHT}px`;
  pinClone.style.top = `${advert.location.y - PIN_HEIGHT}px`;
  pinClone.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;

  const pinImg = pinClone.querySelector("img");
  pinImg.src = advert.author.avatar;
  pinImg.alt = advert.offer.title;

  return pinClone;
};

const appendNewPins = () => {
  let fragment = document.createDocumentFragment();
  adverts.forEach((advert) => {
    fragment.appendChild(getPin(advert));
  });

  pins.appendChild(fragment);
};

appendNewPins();

const cardTemplate = document.querySelector("#card").content;

const cardTemplateClone = cardTemplate.cloneNode(true);

const cardTitle = cardTemplateClone.querySelector(".popup__title");
const cardAdress = cardTemplateClone.querySelector(".popup__text--address");
const cardPrice = cardTemplateClone.querySelector(".popup__text--price");
const cardType = cardTemplateClone.querySelector(".popup__type");
const cardCapacity = cardTemplateClone.querySelector(".popup__text--capacity");
const cardTime = cardTemplateClone.querySelector(".popup__text--time");
const cardDescription = cardTemplateClone.querySelector(".popup__description");
const cardPhoto = cardTemplateClone.querySelector(".popup__photo");
const cardPhotos = cardTemplateClone.querySelector(".popup__photos");
const cardAvatar = cardTemplateClone.querySelector(".popup__avatar");

const renderAdvertPhotos = (components) => {
  for (let i = 0; i < components.length; i++) {
    if (components.length === 1) {
      cardPhoto.src = components;
    } else {
      cardPhoto.style = "display: none";
      const newPhoto = document.createElement("img");
      newPhoto.src = components[i];
      newPhoto.width = cardPhoto.width;
      newPhoto.height = cardPhoto.height;
      cardPhotos.appendChild(newPhoto);
    }
  }
};

const renderAdvertTypes = (components) => {
  const typesMeanings = ["Квартира", "Дворец", "Дом", "Бунгало"];

  for (let i = 0; i < typesMeanings.length; i++) {
    if (components[i] === TYPES[i]) {
      cardType.textContent = typesMeanings[i];
    }
  }
};

const renderAdvertFeatures = (components) => {
  const allFeatures = cardTemplateClone.querySelectorAll(".popup__feature");

  for (let i = 0; i < components.length; i++) {
    const specialFeature = cardTemplateClone.querySelector(`.popup__feature--${components[i]}`);

    if (!components[i].includes(allFeatures[i])) {
      specialFeature.style = "background-position: 2px -5000px;";
    }
  }
};

const renderAdvert = () => {
  cardTitle.textContent = adverts[0].offer.title;
  cardAdress.textContent = adverts[0].offer.address;
  cardPrice.textContent = `${adverts[0].offer.price}₽/ночь`;
  cardCapacity.textContent = `${adverts[0].offer.rooms} комнаты для ${adverts[0].offer.guests} гостей`;
  cardTime.textContent = `Заезд после ${adverts[0].offer.checkin}, выезд до ${adverts[0].offer.checkout}`;
  cardDescription.textContent = adverts[0].offer.description;
  cardAvatar.src = adverts[0].author.avatar;

  renderAdvertTypes(adverts[0].offer.type);
  renderAdvertFeatures(adverts[0].offer.features);
  renderAdvertPhotos(adverts[0].offer.photos);
};

renderAdvert();

const mapFilters = document.querySelector(".map__filters-container");

const appendNewAdvert = () => {
  let fragment = document.createDocumentFragment();
  fragment.appendChild(cardTemplateClone);
  map.insertBefore(fragment, mapFilters);
};

appendNewAdvert();
