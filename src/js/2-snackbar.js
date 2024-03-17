import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const userChoiceOfDelay = document.querySelector('[name="delay"]');
const userCheckBoxSelection = document.querySelectorAll('[name="state"]');
const btnSubmit = document.querySelector('[type="submit"]');

let delay = null;
let value = null;

userChoiceOfDelay.addEventListener('input', () => {
  delay = userChoiceOfDelay.value * 1000;
  console.log(delay);
});

userCheckBoxSelection.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    value = checkbox.value;
    console.log(value);
  });
});

function createPromise(delay, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  });
}

btnSubmit.addEventListener('submit', () => {
  createPromise()
    .then(() => {
      onFulFilled();
    })
    .catch(() => {
      onRejected();
    });
});

function onFulFilled() {
  iziToast.error({
    messageColor: 'green',
    message: `✅ Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  });
}

function onRejected() {
  iziToast.error({
    messageColor: 'red',
    message: `❌ Rejected promise in ${delay}ms`,
    position: 'topRight',
  });
}
