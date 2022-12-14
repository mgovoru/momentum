// определяем переменные
let time = document.querySelector(".time");
let calendar = document.querySelector(".date");
let greeting = document.querySelector(".greeting");
let body = document.querySelector(".tv");
let slideNext = document.querySelector(".slide-next");
let slidePrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector(".weather__icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather__description");
let city = document.querySelector(".city");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let quote = document.querySelector(".quote");
let author = document.querySelector(".author");
let change = document.querySelector(".change-quote");
let playListContainer = document.querySelector(".play-list");
let setting = document.querySelector(".setting");
let pop = document.querySelector(".pop");
let switcherWeather = document.querySelector(".switcher__weather");
let weather = document.querySelector(".weather");
let switcherInput = document.querySelectorAll(".switcher__input");
let switcherText = document.querySelectorAll(".switcher__text");
let footerQuote = document.querySelector(".footer__quotes");
let player = document.querySelector(".player");
let namePlay = document.querySelector(".name-play");
let volumeButton = document.querySelector(".volume-button");
let cake = document.querySelector(".cake");
let ruLang = false;
let enLang = true;

//CANVAS
let imgCanvas = new Image();
let scale = 1;
function scaleToFill(img, ctx) {
  // get the scale
  scale = Math.max(canvas.width / img.width, canvas.height / img.height);
  // get the top left position of the image
  let x = canvas.width / 2 - (img.width / 2) * scale;
  let y = canvas.height / 2 - (img.height / 2) * scale;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

let canvas = document.querySelector(".wrapper__cover");
let context = canvas.getContext("2d");
//canvas.width = document.body.clientWidth; //document.width is obsolete
//canvas.height = document.body.clientHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//const scaleWindow = window.devicePixelRatio;
// Change to 1 on retina screens to see blurry canvas.
//console.log(scaleWindow);
//canvas.width = Math.floor(canvas.width * scaleWindow);
//canvas.height = Math.floor(canvas.height * scaleWindow);

// Normalize coordinate system to use CSS pixels.
//context.scale(scaleWindow, scaleWindow);

imgCanvas.onload = function () {
  // context.drawImage(imgCanvas, 0, 0, canvas.width, canvas.height);
  scaleToFill(this, context);

  // drawImage(img, x, y);
};
imgCanvas.src = "./assets/img/1.png";
// canvas.style.cssText = `object-fit:cover`;

//localStorage.clear();
// импорт плейлиста
import playList from "./playList.js";

// функция, определяющая время дня
function getTimeofDay(hour) {
  if (enLang == true) {
    if (hour >= 6 && hour < 12) {
      return "morning";
    }
    if (hour >= 12 && hour < 18) {
      return "afternoon";
    }
    if (hour >= 18 && hour < 24) {
      return "evening";
    }
    if (hour >= 0 && hour < 6) {
      return "night";
    }
  }
  if (ruLang == true) {
    if (hour >= 6 && hour < 12) {
      return "ое утро";
    }
    if (hour >= 12 && hour < 18) {
      return "ый день";
    }
    if (hour >= 18 && hour < 24) {
      return "ый вечер";
    }
    if (hour >= 0 && hour < 6) {
      return "ой ночи";
    }
  }
}

// определяем дата, время и время дня
let date = new Date();
let hours = date.getHours();
let timeofDay = getTimeofDay(hours);
city.value = `Yekaterinburg`;

// показываем время
function showTime() {
  let date = new Date();
  let currentTime = date.toLocaleTimeString();
  let currentDate;
  const options = { weekday: "long", day: "numeric", month: "long" };

  if (enLang == true) {
    currentDate = date.toLocaleDateString("en-EN", options);
  }
  if (ruLang == true) {
    currentDate = date.toLocaleDateString("ru-RU", options);
  }
  time.textContent = currentTime;
  calendar.textContent = currentDate;
  function showGreeting(hours) {
    if (enLang == true) {
      greeting.textContent = `Good ${timeofDay}`;
    }
    if (ruLang == true) {
      greeting.textContent = `Добр${timeofDay}`;
    }
  }
  setTimeout(showTime, 1000);
  showGreeting();
}

showTime();

let massiveChecked = [];
let newObj = [];
let bgNum = 0;
let opacityCake = 0;

setBg();
// запоминаем город
function setLocalStorage() {
  localStorage.setItem("city", city.value);
  for (let ll = 0; ll < switcherInput.length; ll++) {
    massiveChecked[ll] = switcherInput[ll].checked;
  }
  localStorage["mykey"] = JSON.stringify(massiveChecked);
}

window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  if (localStorage["mykey"]) {
    newObj = JSON.parse(localStorage["mykey"]);
    for (let li = 0; li < switcherInput.length; li++) {
      switcherInput[li].checked = newObj[li];
      let event = new Event("change");
      switcherInput[li].dispatchEvent(event);
    }
  }
}
window.addEventListener("load", getLocalStorage);

// функции пролистывая слайдов вперед и назад
function getSlideNext() {
  bgNum++;
  if (bgNum > 21) {
    bgNum = 0;
    setBg();
    opacityCake = opacityCake + 0.1;
    cake.style.cssText = `opacity: ${opacityCake}`;
    cake.style.backgroundImage = "url(./assets/img/3.png)";
  } else {
    setBg();
    opacityCake = opacityCake + 0.1;
    cake.style.cssText = `opacity: ${opacityCake}`;
    cake.style.backgroundImage = "url(./assets/img/3.png)";
  }
}
function getSlidePrev() {
  bgNum--;
  if (bgNum < 0) {
    bgNum = 21;
  }
  setBg();
}

// проверяем из какого источника фотографии
slideNext.addEventListener("click", () => {
  if (!switcherInput[7].checked && !switcherInput[8].checked) {
    getSlideNext();
  }
  if (switcherInput[7].checked) {
    getLinkToImage();
  }
  if (switcherInput[8].checked) {
    getLinkToImageFlickr();
  }
});

slidePrev.addEventListener("click", () => {
  if (!switcherInput[7].checked && !switcherInput[8].checked) {
    getSlidePrev();
  }
  if (switcherInput[7].checked) {
    getLinkToImage();
  }
  if (switcherInput[8].checked) {
    getLinkToImageFlickr();
  }
});

function setBg() {
  let img = new Image();
  let bodyurll = `./assets/img/babies/${bgNum}.jpg`;
  let x = canvas.width / 2 - 620 / 2;
  let y = canvas.height / 2 - 520 / 2;
  img.onload = function () {
    context.drawImage(img, x, y, 620, 340); // drawImage(img, x, y);
  };
  img.src = bodyurll;
}

let ln;
//функция получения погоды
async function getWeather() {
  if (ruLang == true) {
    ln = "ru";
  } else {
    ln = "en";
  }
  if (city.value == "") {
    if (localStorage.getItem("city")) {
      city.value = localStorage.getItem("city");
    }
  }
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${ln}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    // не сработает
    weatherIcon.className = "weather__icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (ruLang == true) {
      wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} m/s`;
      humidity.textContent = `Влажность: ${Math.floor(data.main.humidity)} %`;
    } else {
      wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
      humidity.textContent = `Humadity: ${Math.floor(data.main.humidity)} %`;
    }
  } catch (e) {
    // ...выполнение прыгает сюда
    alert("Извините, в данных ошибка, пожалуйста, введите город корректно");
  }
}

//при смене города погода меняется
city.addEventListener("change", () => {
  getWeather();
});
getWeather();

//определение случайного числа
function getRandomNumten() {
  return Math.floor(Math.random() * 10);
}

let dNum = getRandomNumten();

function getRandomNumRus() {
  return Math.floor(Math.random() * 17);
}

//функция получения цитаты
async function getQuotes() {
  let quotes;
  if (ruLang == true) {
    quotes = "dataRus.json";
  } else {
    quotes = "data.json";
  }
  const res = await fetch(quotes);
  const data = await res.json();
  quote.textContent = data[dNum].text;
  author.textContent = data[dNum].author;
}
getQuotes();

change.addEventListener("click", () => {
  if (ruLang == true) {
    dNum = getRandomNumRus();
  } else {
    dNum = getRandomNumten();
  }
  getQuotes();
});

// фотографии из источника Unsplash

async function getLinkToImage() {
  let imgUnsplash = new Image();
  let url =
    "https://api.unsplash.com/photos/random?query=babies&client_id=_GKm-85EgvvGnsPpemOrhLZbu64Li5HoZyf1GY98QCk";
  const res = await fetch(url);
  const datat = await res.json();
  imgUnsplash.src = datat.urls.regular;
  let x = canvas.width / 2 - 620 / 2;
  let y = canvas.height / 2 - 520 / 2;
  imgUnsplash.onload = function () {
    context.drawImage(imgUnsplash, x, y, 620, 340); // drawImage(img, x, y);
  };
}

// фотографии из источника flickr

async function getLinkToImageFlickr() {
  let imgFlickr = new Image();
  let urlFlickr = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d69b5e2c05af4947127492602040536f&tags=babies&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(urlFlickr);
  const datat = await res.json();
  let arr = datat.photos.photo;
  let m = Math.floor(Math.random() * datat.photos.photo.length);
  imgFlickr.src = arr[m].url_l;
  let x = canvas.width / 2 - 620 / 2;
  let y = canvas.height / 2 - 520 / 2;
  imgFlickr.onload = function () {
    context.drawImage(imgFlickr, x, y, 620, 340); // drawImage(img, x, y);
  };
}

// функция перевода настроек на английский
function translate() {
  switcherText[0].textContent = "англ./русс.";
  switcherText[1].textContent = "время";
  switcherText[2].textContent = "дата";
  switcherText[3].textContent = "приветствие";
  switcherText[4].textContent = "цитата";
  switcherText[5].textContent = "погода";
  switcherText[6].textContent = "аудио";
}
function translateEnglish() {
  switcherText[0].textContent = "english/russian";
  switcherText[1].textContent = "time";
  switcherText[2].textContent = "date";
  switcherText[3].textContent = "greeting";
  switcherText[4].textContent = "quote";
  switcherText[5].textContent = "weather";
  switcherText[6].textContent = "audio";
}

// настройки

setting.addEventListener("click", (e) => {
  pop.classList.toggle("pop-active");
});

document.addEventListener("click", (e) => {
  if (e.target != setting) {
    if (!pop.contains(e.target)) {
      pop.classList.remove("pop-active");
    }
  }
});

// управление настройками
switcherInput[0].addEventListener("change", function () {
  if (!switcherInput[0].checked) {
    ruLang = true;
    enLang = false;
    getWeather();
    dNum = getRandomNumRus();
    getQuotes();
    timeofDay = getTimeofDay(hours);
    showTime();
    translate();
  } else {
    enLang = true;
    ruLang = false;
    getWeather();
    getQuotes();
    timeofDay = getTimeofDay(hours);
    showTime();
    translateEnglish();
  }
});
switcherInput[1].addEventListener("change", function () {
  if (!switcherInput[1].checked) {
    time.style.cssText = `opacity:0;transition: opacity 3s ease 0s`;
  } else {
    time.style.cssText = `opacity:1; 
	transition: opacity 3s ease 0s`;
  }
});
switcherInput[2].addEventListener("change", function () {
  if (!switcherInput[2].checked) {
    calendar.style.cssText = `opacity:0;transition: opacity 3s ease 0s`;
  } else {
    calendar.style.cssText = `opacity:1; 
	transition: opacity 3s ease 0s`;
  }
});
switcherInput[3].addEventListener("change", function () {
  if (!switcherInput[3].checked) {
    greeting.style.cssText = `opacity:0;transition: opacity 3s ease 0s`;
  } else {
    greeting.style.cssText = `opacity:1; 
	transition: opacity 3s ease 0s`;
  }
});
switcherInput[4].addEventListener("change", function () {
  if (!switcherInput[4].checked) {
    footerQuote.style.cssText = `opacity:0;transition: opacity 3s ease 0s`;
  } else {
    footerQuote.style.cssText = `opacity:1; 
	transition: opacity 3s ease 0s`;
  }
});
switcherInput[5].addEventListener("change", function () {
  if (!switcherInput[5].checked) {
    weather.style.cssText = `opacity:0;transition: opacity 3s ease 0s`;
  } else {
    weather.style.cssText = `opacity:1; 
	transition: opacity 3s ease 0s`;
  }
});
switcherInput[6].addEventListener("change", function () {
  if (!switcherInput[6].checked) {
    player.style.cssText = `opacity:0;transition: opacity 3s ease 0s`;
  } else {
    player.style.cssText = `opacity:1; 
	transition: opacity 3s ease 0s`;
  }
});

switcherInput[7].addEventListener("change", function () {
  if (switcherInput[7].checked) {
    getLinkToImage();
    switcherInput[9].checked = false;
    switcherInput[8].checked = false;
  } else {
    setBg();
    switcherInput[9].checked = true;
  }
});
switcherInput[8].addEventListener("change", function () {
  if (switcherInput[8].checked) {
    getLinkToImageFlickr();
    switcherInput[7].checked = false;
    switcherInput[9].checked = false;
  } else {
    setBg();
    switcherInput[9].checked = true;
  }
});
switcherInput[9].addEventListener("change", function () {
  if (!switcherInput[9].checked) {
    switcherInput[7].checked = true;
    switcherInput[8].checked = false;
    getLinkToImage();
  } else {
    switcherInput[7].checked = false;
    switcherInput[8].checked = false;
    setBg();
  }
});

//продвинутый проигрыватель
let isPlay = false;
let playNum = 0;
const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio();
audio.src = playList[playNum].src;
namePlay.innerHTML = playList[playNum].title;

//формирование плейлиста
for (let i = 0; i < playList.length; i++) {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = playList[i].title;
  playListContainer.append(li);
}
let playLi = document.querySelectorAll(".play-item");

for (let y = 0; y < playList.length; y++) {
  playLi[y].addEventListener("click", () => {
    {
      playNum = y;
      playLi[playNum].classList.add("item-active");
      audioPlay();
	  }	
  });
}

function audioPlay() {
  audio.src = playList[playNum].src;
  namePlay.innerHTML = playList[playNum].title;
  if (!isPlay) {
    audio.play();
    isPlay = true;
    playLi[playNum].classList.add("item-active");
    playBtn.classList.remove("playpro");
    playBtn.classList.add("pause");
  } else {
    audio.pause();
    isPlay = false;
    playLi[playNum].classList.remove("item-active");
    playBtn.classList.remove("pause");
    playBtn.classList.add("playpro");
  }
}

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time-play .length").textContent =
      getTimeCodeFromNum(audio.duration);
    audio.volume = 0.75;
  },
  false
);

let timeToSeek;
//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width =
      newVolume * 100 + "%";
  },
  false
);

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  audioPlayer.querySelector(".time-play .current").textContent =
    getTimeCodeFromNum(audio.currentTime);
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      playLi[playNum].classList.add("item-active");

      playBtn.classList.remove("playpro");
      playBtn.classList.add("pause");
      audio.play();
    } else {
      playLi[playNum].classList.remove("item-active");
      playBtn.classList.remove("pause");
      playBtn.classList.add("playpro");
      audio.pause();
    }
  },
  false
);

audio.addEventListener("ended", function () {
  playNum = playNum + 1;
  if (playNum == 10) {
    playNum = 0;
  }
  audio.src = playList[playNum].src;
  namePlay.innerHTML = playList[playNum].title;
  audio.play();
  playLi[playNum].classList.add("item-active");
  playBtn.classList.remove("playpro");
  playBtn.classList.add("pause");
});

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  if (!audio.muted) {
    audio.muted = true;
    volumeButton.classList.remove("source");
    volumeButton.classList.add("source-no");
  } else {
    audio.muted = false;
    volumeButton.classList.remove("source-no");
    volumeButton.classList.add("source");
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
