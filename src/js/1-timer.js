import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker'); // отримання доступу до інпуту для вибору дати та часу
const startBtn = document.querySelector('[data-start]'); // отримання доступу до кнопки Start
const remainingTime = document.querySelectorAll('.value'); // отримання доступу до span з класом value

let userSelectedDate; // вибрана користувачем дата // datetimePicker.value
let timeInterval; // проміжок часу між майбутньою датою і зараз
let initTime = new Date(); //сьогоднішня дата

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeInterval = userSelectedDate - initTime;
    if (timeInterval < 1000) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
      startBtn.classList.add('disabled');
    } else {
      startBtn.classList.remove('disabled');
    }
  },
};

flatpickr(datetimePicker, options); // ініціалізація календаря, тобто створення екземпляра календаря на елементі datetimePicker (інпут) з параметрами options

startBtn.addEventListener('click', () => {
  initTime = new Date();
  startBtn.classList.add('disabled');
  datetimePicker.disabled = true;

  const timerId = setInterval(() => {
    timeInterval = userSelectedDate - new Date();
    const time = convertMs(timeInterval);
    remainingTime[0].innerHTML = String(time.days).padStart(2, '0');
    remainingTime[1].innerHTML = String(time.hours).padStart(2, '0');
    remainingTime[2].innerHTML = String(time.minutes).padStart(2, '0');
    remainingTime[3].innerHTML = String(time.seconds).padStart(2, '0');

    if (timeInterval <= 1000) {
      clearInterval(timerId);
      startBtn.classList.remove('disabled');
      datetimePicker.disabled = false;
    }
  }, 1000);
});

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
