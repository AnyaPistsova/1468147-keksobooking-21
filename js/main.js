"use strict";

// consts common
const MIN_VALUE = 1;

// consts author
const AVATARS = ["img/avatars/user01.png", "img/avatars/user02.png", "img/avatars/user03.png", "img/avatars/user04.png", "img/avatars/user05.png", "img/avatars/user06.png", "img/avatars/user07.png", "img/avatars/user08.png"];

// consts offer
const PRICE_MAX = 5000;
const ROOMS_MAX = 5;
const GUESTS_MAX = 8;
const TYPES = ["palace", "flat", "house", "bungalow"];
const TIMES = ["12:00", "13:00", "14:00"];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

// consts location
const mapMaxWidth = document.querySelector(".map").offsetWidth;
const COORDINATE_X_MIN = 0;
const COORDINATE_X_MAX = mapMaxWidth;

const COORDINATE_Y_MIN = 130;
const COORDINATE_Y_MAX = 630;

// computation
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)];
};

const getRandomElements = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const doAdvert = (number) => {
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
        "features": getRandomElements(FEATURES),
        "description": "Описание",
        "photos": getRandomElements(PHOTOS)
      },
      "location": {
        "x": getRandomNumber(COORDINATE_X_MIN, COORDINATE_X_MAX),
        "y": getRandomNumber(COORDINATE_Y_MIN, COORDINATE_Y_MAX)
      }
    });
  }

  return adverts;
};

const adverts = doAdvert(8);

// удаляю класс (второй пункт в задании)
const map = document.querySelector(".map");
map.classList.remove("map--faded");

// нахожу нужные элементы
const pinTemplate = document.querySelector("#pin").content;
const pinButton = pinTemplate.querySelector(".map__pin");
const pins = document.querySelector(".map__pins");

// клонирую кнопку в шаблоне #pin и задаю ей параметры
const getPin = (index) => {
  const pinClone = pinButton.cloneNode(true);

  let top = pinButton.style.top - adverts[index].location.y;
  let left = pinButton.style.left - adverts[index].location.x;
  pinClone.style.top = top;
  pinClone.style.left = left;

  const pinImg = pinClone.querySelector("img");
  pinImg.src = adverts[index].author.avatar;
  pinImg.alt = adverts[index].offer.title;

  return pinClone;
};

// делаю массив из кнопок, которые получила в  getPin
const newPins = (number) => {
  const adPins = [];
  for (let i = 0; i < number; i++) {
    adPins.push(getPin(i));
  }

  return adPins;
};

// делаю функцию для добавления массива на страницу
const appendNewPins = (mindedPins) => {
  let fragment = document.createDocumentFragment();

  newPins(8).forEach = () => {
    fragment.appendChild(newPins(8));
    mindedPins.appendChild(fragment);
  };

  return fragment;
};

appendNewPins(pins);
