import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const userChoiceOfDelay = document.querySelector('[name="delay"]');
  const userCheckBoxSelection = document.querySelectorAll('[name="state"]');
  const delay = parseInt(userChoiceOfDelay.value);
  const state = [...userCheckBoxSelection].find(input => input.checked).value;
  const createPromise = (delay, state) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  };
  createPromise(delay, state)
    .then(delay => {
      onFulfilled(delay);
    })
    .catch(delay => {
      onRejected(delay);
    });
  function onFulfilled(delay) {
    iziToast.success({
      message: `✅ Fulfilled promise in ${delay}ms`,
      position: 'topRight',
    });
  }
  function onRejected(delay) {
    iziToast.error({
      message: `❌ Rejected promise in ${delay}ms`,
      position: 'topRight',
    });
  }
  form.reset();
});
