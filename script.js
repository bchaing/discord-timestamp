// date & time object
const initUnix = Date.now();
const date = new Date(initUnix);
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, 0);
const day = String(date.getDate()).padStart(2, 0);
const hours = date.getHours() % 12;
const mins = date.getMinutes();
const secs = date.getSeconds();
const ampm = date.getHours() - 12 < 0 ? 1 : 0;

// set current unix time
const currUnix = document.getElementById("curr-unix");
currUnix.value = Math.floor(initUnix / 1000);
setInterval(() => {
  currUnix.value = Math.floor(Date.now() / 1000);
}, 1000);

// form defaults
const selectDate = document.getElementById("date-select");
const selectHour = document.getElementById("hour-select");
const selectMin = document.getElementById("mins-select");
const selectSec = document.getElementById("secs-select");
const selectAMPM = document.getElementById("ampm-select");
const selectFormat = document.getElementById("format-select");

selectDate.value = `${year}-${month}-${day}`;
selectHour.value = hours;
selectMin.value = mins;
selectSec.value = secs;
selectAMPM.value = ampm;

let selectedDate = selectDate.value;
let selectedTime = `${(ampm ? selectHour.value.padStart(2,0) : String((Number(selectHour.value) + 12) % 24).padStart(2,0))}:${selectMin.value.padStart(2, 0)}:${selectSec.value.padStart(2, 0)}`; // prettier-ignore

// initialize formats
updateFormats();
updateOutput();

/*
 * event listeners
 */
selectDate.addEventListener("change", () => {
  updateSelectedDate();
  updateFormats();
  updateOutput();
});

selectHour.addEventListener("change", () => {
  updatedSelectedTime();
  updateFormats();
  updateOutput();
});

selectMin.addEventListener("change", () => {
  updatedSelectedTime();
  updateFormats();
  updateOutput();
});

selectSec.addEventListener("change", () => {
  updatedSelectedTime();
  updateFormats();
  updateOutput();
});

selectAMPM.addEventListener("change", () => {
  updatedSelectedTime();
  updateFormats();
  updateOutput();
});

selectFormat.addEventListener("change", () => {
  updateOutput();
});

const copyUNIX = document.getElementById("copy-unix");
copyUNIX.addEventListener("click", () => {
  currUnix.select();
  currUnix.setSelectionRange(0, 99999);
  document.execCommand("copy");
});

/*
 * Helper Functions
 */
// updates formats to display selected time
function updateFormats() {
  let prevValue;
  if (selectFormat.value) {
    prevValue = selectFormat.value;
  }

  // remove all previous elements
  for (let i = selectFormat.options.length - 1; i >= 0; i--) {
    selectFormat.remove(i);
  }

  const d = new Date(`${selectedDate}T${selectedTime}`);
  // date format JSON
  const formatStrings = {
    0: {
      value: "d",
      format: d.toLocaleDateString(),
    },
    1: {
      value: "f",
      format: `${d.toLocaleDateString(undefined, { dateStyle: "long" })} ${d.toLocaleTimeString(undefined, { timeStyle: "short" })}`, // prettier-ignore
    },
    2: {
      value: "t",
      format: d.toLocaleTimeString(undefined, { timeStyle: "short" }),
    },
    3: {
      value: "D",
      format: d.toLocaleDateString(undefined, { dateStyle: "long" }),
    },
    4: {
      value: "F",
      format: `${d.toLocaleDateString(undefined, { dateStyle: "full" })} ${d.toLocaleTimeString(undefined, { timeStyle: "short" })}`, // prettier-ignore
    },
    5: {
      value: "R",
      format: "FUZZY TIME",
    },
    6: {
      value: "T",
      format: d.toLocaleTimeString(),
    },
  };

  let opt;
  for (let i = 0; i < 7; i++) {
    opt = document.createElement("option");
    opt.value = formatStrings[i].value;
    opt.innerText = formatStrings[i].format;
    selectFormat.append(opt);
  }

  if (prevValue) {
    selectFormat.value = prevValue;
  }
}

// update output
function updateOutput() {
  const d = new Date(`${selectedDate}T${selectedTime}`);
  const output = document.getElementById("output");
  output.innerText = `
    <t:${Math.floor(d.getTime() / 1000)}:${selectFormat.value}>
  `;
}

// update selectedDate
function updateSelectedDate() {
  selectedDate = selectDate.value;
}

// update selectedTime
function updatedSelectedTime() {
  selectedTime = `${String(selectAMPM.value > 0 ? selectHour.value % 12: ((Number(selectHour.value) + 12) % 24) || 12).padStart(2,0)}:${selectMin.value.padStart(2, 0)}:${selectSec.value.padStart(2, 0)}`; // prettier-ignore
}
