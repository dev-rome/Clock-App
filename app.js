"use strict";

const bgImage = document.querySelector(".bg-image");
const btnRefresh = document.querySelector(".btn-refresh");
const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote-text");
const quoteFooter = document.querySelector(".quote-author");
const greetingMessage = document.querySelector(".greeting-text");
const greetingImage = document.querySelector(".greeting-container img");
const time = document.querySelector(".current-time");
const timeZone = document.querySelector(".current-timezone");
const test = document.querySelector(".time-container")
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const btnInfo = document.querySelector(".btn-info");
const timeZoneData = document.querySelector(".timezone-data");
const dayOfYearData = document.querySelector(".day-of-year-data");
const dayOfWeekData = document.querySelector(".day-of-week-data");
const weekNumberData = document.querySelector(".week-number-data");
const timeInfoContainer = document.querySelector(".time-info-container");

const quoteURL = "https://api.quotable.io/random";
const timeURL = "https://worldtimeapi.org/api/ip";
const locationURL = "https://ipinfo.io/json";

const fetchQuote = async () => {
  try {
    const res = await fetch(quoteURL);
    if (!res.ok) {
      throw new Error("Data not found.");
    }
    const data = await res.json();
    quoteText.textContent = data.content;
    quoteFooter.textContent = data.author;
  } catch (error) {
    console.log(error);
  }
};

const fetchTime = async () => {
  try {
    const res = await fetch(timeURL);
    if (!res.ok) {
      throw new Error("Data not found.");
    }
    const data = await res.json();
    const currentTime = new Date(data.datetime);
    const currentTimeZone = data.abbreviation;
    const currentTimeString = currentTime.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    time.textContent = currentTimeString;
    timeZone.textContent = currentTimeZone;
    timeZoneData.textContent = data.timezone;
    dayOfYearData.textContent = data.day_of_year;
    dayOfWeekData.textContent = data.day_of_week;
    weekNumberData.textContent = data.week_number;

    const currentHour = currentTime.getHours();

    if (currentHour >= 6 && currentHour <= 18) {
      bgImage.classList.add("day")
      greetingImage.src = "./assets/desktop/icon-sun.svg";
      greetingMessage.textContent = "GOOD MORNING";
    } else {
      bgImage.classList.add("night")
      greetingImage.src = "./assets/desktop/icon-moon.svg";
      greetingMessage.textContent = "GOOD EVENING";
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchLocation = async () => {
  try {
    const res = await fetch(locationURL);
    if (!res.ok) {
      throw new Error("Data not found.");
    }
    const data = await res.json();
    city.textContent = data.city.toUpperCase();
    country.textContent = data.country;
  } catch (error) {
    console.log(error);
  }
};

const showTimeData = () => {
  if (timeInfoContainer.classList.contains("hide")) {
    timeInfoContainer.classList.remove("hide");
    quoteContainer.style.visibility = "hidden";
  } else {
    timeInfoContainer.classList.add("hide");
    quoteContainer.style.visibility = "visible";
  }
};

fetchQuote();
fetchTime();
fetchLocation();
setInterval(fetchTime, 1000);
btnRefresh.addEventListener("click", fetchQuote);
btnInfo.addEventListener("click", showTimeData);
