"use strict";

// consts common
const MIN_FOR_ALL = 1;

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

// consts pin
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;

// computation
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomArr = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
};

const doAdvert = (number) => {
  const advertsArr = [];
  for (let i = 0; i < number; i++) {
    advertsArr.push({
      "author": {
        "avatar": getRandomElement(AVATARS),
      },
      "offer": {
        "title": "Заголовок",
        "address": "600, 350",
        "price": getRandomNumber(MIN_FOR_ALL, PRICE_MAX),
        "type": getRandomElement(TYPES),
        "rooms": getRandomNumber(MIN_FOR_ALL, ROOMS_MAX),
        "guests": getRandomNumber(MIN_FOR_ALL, GUESTS_MAX),
        "checkin": getRandomElement(TIMES),
        "checkout": getRandomElement(TIMES),
        "features": getRandomArr(FEATURES),
        "description": "Описание",
        "photos": getRandomArr(PHOTOS)
      },
      "location": {
        "x": getRandomNumber(COORDINATE_X_MIN, COORDINATE_X_MAX),
        "y": getRandomNumber(COORDINATE_Y_MIN, COORDINATE_Y_MAX)
      }
    });
  }
  return advertsArr;
};

const map = document.querySelector(".map");
map.classList.remove("map--faded");

const pinTemplate = document.querySelector("#pin");
const pinButton = pinTemplate.querySelector(".map__pin");
// const adLocation = document.querySelector(".map__pins");

const addPin = (newPin) => {
  const pinClone = pinButton.cloneNode(true);

  let top = pinButton.style.top - PIN_HEIGHT;
  let left = pinButton.style.left - PIN_WIDTH / 2;

  pinClone.style.top = top;
  pinClone.style.left = left;

  const adImg = pinButton.querySelector("img");
  const imgClone = adImg.cloneNode(false);
  imgClone.src = newPin.author.avatar;
  imgClone.alt = newPin.offer.title;

  pinClone.append(imgClone);

  return pinClone;
};

const appendAddPins = (newPins) => {
  let fragment = document.createDocumentFragment();
  newPins.forEach(function (newPin) {
    fragment.appendChild(addPin(newPin));
  }
  );
};

doAdvert(8);
appendAddPins();
