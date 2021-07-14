// date & time object
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, 0);
const day = String(date.getDate()).padStart(2, 0);
const hours = date.getHours() % 12;
const mins = date.getMinutes();
const secs = date.getSeconds();
const ampm = date.getHours() - 12 <= 0 ? "AM" : "PM";

// set current unix time
const currUnix = document.getElementById("curr-unix");
currUnix.innerText = Date.now();

// form defaults
const selectDate = document.getElementById("date-select");
const selectHour = document.getElementById("hour-select");
const selectMin = document.getElementById("mins-select");
const selectSec = document.getElementById("secs-select");
const selectAMPM = document.getElementById("ampm-select");

selectDate.value = `${year}-${month}-${day}`;
selectHour.value = hours;
selectMin.value = mins;
selectSec.value = secs;
selectAMPM.value = ampm;
