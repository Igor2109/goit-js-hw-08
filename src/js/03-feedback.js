import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let formData = {};

form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(formInput, 500));

function onSubmitForm(e) {
  e.preventDefault();
  console.log(formData);
  formData = {};
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
function formInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

const onLoad = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    formData = JSON.parse(data);
    Object.entries(formData).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
};
window.addEventListener('load', onLoad);
