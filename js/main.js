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
        "type": getRandomElement(TYPES),
        "rooms": getRandomNumber(MIN_VALUE, ROOMS_MAX),
        "guests": getRandomNumber(MIN_VALUE, GUESTS_MAX),
        "checkin": getRandomElement(TIMES),
        "checkout": getRandomElement(TIMES),
        "features": getRandomElement(FEATURES),
        "description": "Описание",
        "photos": getRandomElement(PHOTOS)
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

// 1. Берём данные из первой рекламы (первого элемента массива реклам). Добавляем в map__pins через DF.
// 2. На основе рекламной карточки 1. и шаблона #card заполняем объект новыми данными.
// 3. Полученный элемент добавляем в блок .map перед блоком.map__filters-container.

// ну, сбогам. начинаю вторую часть задания))))))))
// добавлю сначала нужный тег

const cardTemplate = document.querySelector("#card").content;

// клонируем cardTemplate
const cardTemplateClone = cardTemplate.cloneNode(true);

// вытаскиваю из него остальные теги
const cardTitle = cardTemplateClone.querySelector(".popup__title");
const cardAdress = cardTemplateClone.querySelector(".popup__text--address");
const cardPrice = cardTemplateClone.querySelector(".popup__text--price");
const cardType = cardTemplateClone.querySelector(".popup__type");
const cardCapacity = cardTemplateClone.querySelector(".popup__text--capacity");
const cardTime = cardTemplateClone.querySelector(".popup__text--time");
const cardFeatures = cardTemplateClone.querySelector(".popup__features");
const cardDescription = cardTemplateClone.querySelector(".popup__description");
const cardPhoto = cardTemplateClone.querySelector(".popup__photos");
const cardAvatar = cardTemplateClone.querySelector(".popup__avatar");

// отлично. теперь по пунктам добавляем значения
const advertTitle = `${advert.offer.title}`;
cardTitle.append(advertTitle);

const advertAdress = `${advert.offer.address}`;
cardAdress.append(advertAdress);

const advertPrice = `${advert.offer.price}₽/ночь`;
cardPrice.append(advertPrice);

const advertType =`${advert.offer.type}`;
if (`${advert.offer.type}` === "flat") {
  cardType.append("Квартира");
};

if (`${advert.offer.type}` === "palace") {
  cardType.append("Дворец");
};

if (`${advert.offer.type}` === "house") {
  cardType.append("Дом");
};

if (`${advert.offer.type}` === "bungalow") {
  cardType.append("Бунгало");
};

const advertCapacity = `${advert.offer.rooms} комнаты для ${advert.offer.guests}} гостей`;
cardCapacity.append(advertCapacity);

const advertTyme = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
cardTime.append(advertTyme);

const advertFeatures = `${advert.offer.features}`;
cardFeatures.append(advertFeatures);

const advertDescription = `${advert.offer.description}`;
cardDescription.append(advertDescription);

// осталось вставить два последних пункта
// осталось изменить append на что-то, что не просто добавляет, а заменяет
// осталось скрыть пункты, где информации недостаточно
// осталось превратить всё это в функции
// осталось то, что получилось, внести в блок .map перед блоком.map__filters-container.
