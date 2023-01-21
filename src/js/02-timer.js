// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector("[data-start]")
const days = document.querySelector("[data-days]")
const hours = document.querySelector("[data-hours]")
const minutes = document.querySelector("[data-minutes]")
const seconds = document.querySelector("[data-seconds]")
const dateTable = document.querySelector("#datetime-picker")
let chosenDate = null
let timerId = null;
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] <= new Date) {
        startBtn.disabled = true;
        Notiflix.Notify.failure('Please choose a date in the future');
      } else {
        chosenDate = selectedDates[0];
        startBtn.disabled = false;
      }
  },
};

flatpickr(dateTable, options);

startBtn.addEventListener('click', onStart);

function onStart() {
    timerId = setInterval(() => {
        const timeCounter = chosenDate - new Date()
        // console.log(timeCounter)
        if (timeCounter >= 0) {
            startBtn.disabled = true
            dateTable.disabled = true
            days.textContent = addLeadingZero(convertMs(timeCounter).days)
            hours.textContent = addLeadingZero(convertMs(timeCounter).hours)
            minutes.textContent = addLeadingZero(convertMs(timeCounter).minutes)
            seconds.textContent = addLeadingZero(convertMs(timeCounter).seconds)
        } else {
            startBtn.disabled = false
            clearInterval(timerId)
        }

    }, 1000);
}


function addLeadingZero(value) {
    return value.toString().padStart(2,'0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
