// @ts-nocheck
dayjs.extend(window.dayjs_plugin_duration);

// 1. Create a full HTML structure and add all necessary CSS
// 2. Get all pointers to the DOM nodes (elements)
// 3. Add event listener on button
// 4. Add validation on button click
// 5. If data is valid run calculate date function to get date values
// 6. Show values as output (update output elements)

// input
const dayInput = document.getElementById("dayDOB");
const monthInput = document.getElementById("monthDOB");
const yearInput = document.getElementById("yearDOB");
// button
const calcButton = document.getElementById("calcAgebtn");
// output
const yearOutput = document.getElementById("year-output");
const monthOutput = document.getElementById("month-output");
const dayOutput = document.getElementById("day-output");
const errorOutputContainer = document.getElementById("alert-container");
const divErrorNode = document.createElement("div");

// function calcAgeDayJs(day, month, year) {
//   const dob = dayjs(`${year}-${month}-${day}`);
//   const currentDate = dayjs();
//   const dateDiff = currentDate.diff(dob);

//   const timeRange = dayjs.duration(dateDiff);

//   console.log(
//     `DayJS diff: ${timeRange.years()} years, ${timeRange.months()} month(s), ${timeRange.days()} day(s)`
//   );
//   console.log(
//     currentDate.get("date"),
//     currentDate.get("month"),
//     currentDate.get("year")
//   );
// }

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

// calcAge(19, 8, 1987);
// calcAgeDayJs(19, 9, 1987);
// console.log(`There are ${daysInMonth(1982, 9)} days in September`);

function errorMsg(inputField) {
  inputField.classList.add("alert-msg");
}

function addAlert() {
  divErrorNode.classList.add("alert", "alert-danger");
  errorOutputContainer.appendChild(divErrorNode);
}

function clearInputs() {
  dayInput.classList.remove("alert-msg");
  monthInput.classList.remove("alert-msg");
  yearInput.classList.remove("alert-msg");
  const errorMsgExists = document.querySelector("div.alert-danger");
  const outputLength = String(yearInput);
  if (outputLength.length > 0) {
    console.log(outputLength.length);
    clearOuputs();
  }

  if (errorMsgExists) {
    errorOutputContainer.removeChild(divErrorNode);
  }
}

function clearFields() {
  yearInput.value = "";
  monthInput.value = "";
  dayInput.value = "";
}

function validateInputs() {
  const dob = dayjs(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
  const currentDate = dayjs();
  const dateDiff = currentDate.diff(dob);
  const timeRange = dayjs.duration(dateDiff);
  yearOutput.innerText = "";
  monthOutput.innerText = "";
  dayOutput.innerText = "";
  let validationCounter = 0;

  const dayCount = daysInMonth(yearInput.value, monthInput.value);

  // Check if the entered day is not blank, or not less than 1, or not greater than the number of days of the entered month in the entered year
  if (dayInput.value > dayCount || dayInput.value < 1 || dayInput.value == "") {
    errorMsg(dayInput);
    clearFields();
    addAlert();
    divErrorNode.innerText = `Please enter a valid date between 1 and ${dayCount}`;
    validationCounter = 0;
    return;
  } else {
    validationCounter += 1;
  }

  // Check if the entered month is not blank, or not less than 1, or not greater than 12
  if (monthInput.value < 1 || monthInput.value > 12 || monthInput.value == "") {
    errorMsg(monthInput);
    clearFields();
    addAlert();
    divErrorNode.innerText = `Please enter a valid month!`;
    validationCounter = 0;
    return;
  } else {
    validationCounter += 1;
  }

  // Check if the year entered is not blank
  if (yearInput.value == "") {
    errorMsg(yearInput);
    clearFields();
    addAlert();
    divErrorNode.innerText = `Please enter a valid year!`;
    validationCounter = 0;
    return;
  }

  // Check if the year entered is not in the future
  if (yearInput.value > currentDate.get("year")) {
    errorMsg(yearInput);
    clearFields();
    addAlert();
    divErrorNode.innerText = `Your date of birth cannot be set in the future!`;
    validationCounter = 0;
    return;
  }

  // Check if entered month is not greater than the current month if the entered year is the same as the current year
  if (
    yearInput.value == currentDate.get("year") &&
    monthInput.value > currentDate.get("month") + 1
  ) {
    errorMsg(monthInput);
    clearFields();
    addAlert();
    divErrorNode.innerText = `Your date of birth cannot be set in the future!`;
    validationCounter = 0;
    return;
  }

  // Check if entered day is not greater than the current day if the entered month and year is the same as, or less
  if (
    yearInput.value == currentDate.get("year") &&
    monthInput.value <= currentDate.get("month") + 1
  ) {
    if (dayInput.value > currentDate.get("date")) {
      errorMsg(dayInput);
      clearFields();
      addAlert();
      divErrorNode.innerText = `Your date of birth cannot be set in the future!`;
      validationCounter = 0;
      return;
    } else {
      validationCounter += 1;
    }
  }

  if (validationCounter > 0) {
    const ageYears = timeRange.years() == 1 ? "year" : "years";
    const ageMonths = timeRange.months() == 1 ? "month" : "months";
    const ageDays = timeRange.days() == 1 ? "day" : "days";
    yearOutput.innerText = `You are ${timeRange.years()} ${ageYears}`;
    monthOutput.innerText = `${timeRange.months()} ${ageMonths}`;
    dayOutput.innerText = `and ${timeRange.days()} ${ageDays} old.`;
    clearFields();
  }
}

function clearOuputs() {
  yearOutput.innerText = "";
  monthOutput.innerText = "";
  dayOutput.innerText = "";
}

calcButton.addEventListener("click", validateInputs);
dayInput.addEventListener("focus", (event) => clearInputs());
monthInput.addEventListener("focus", (event) => clearInputs());
yearInput.addEventListener("focus", (event) => clearInputs());
