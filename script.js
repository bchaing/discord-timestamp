// date & time object
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, 0);
const day = String(date.getDate()).padStart(2, 0);
const hours = String(date.getHours()).padStart(2, 0);
const mins = String(date.getMinutes()).padStart(2, 0);

// set current unix time
const currUnix = document.getElementById("curr-unix");
currUnix.innerText = Date.now();

// form defaults
const inDate = document.getElementById("date");
const inTime = document.getElementById("time");
inDate.value = `${year}-${month}-${day}`;
inTime.value = `${hours}:${mins}`;
