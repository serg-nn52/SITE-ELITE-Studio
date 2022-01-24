$(document).ready(function () {
  $("#slider").owlCarousel({
    responsive: {
      0: {
        items: 1,
      },
    },
    autoplay: true,
    loop: true,
  });
});

document.addEventListener("DOMContentLoaded", () => {
  new Mmenu("#menu", {
    navbar: {
      title: "Основное меню сайта",
    },
  });
});

const callingForm = document.querySelector(".footer-contacts__callback");
const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");
const popupFormOk = document.querySelector(".popup__form_ok");
const close = document.querySelector(".form__close");
const closeOk = document.querySelector(".form__close_ok");
const form = document.getElementById("form");
const email = document.querySelector("#email");
const tel = document.querySelector("#tel");
const btns = [...document.querySelectorAll(".slide__btn")];

callingForm.addEventListener("click", function () {
  popup.classList.add("popup_active");
});

btns.forEach(function (el) {
  el.addEventListener("click", function () {
    popup.classList.add("popup_active");
  });
});

close.addEventListener("click", function () {
  popup.classList.remove("popup_active");
});

closeOk.addEventListener("click", function () {
  popupForm.classList.remove("disable");
  popupFormOk.classList.add("disable");
  popup.classList.remove("popup_active");
});

popup.addEventListener("click", function (e) {
  if (e.target === e.currentTarget) {
    popupForm.classList.remove("disable");
    popupFormOk.classList.add("disable");
    popup.classList.remove("popup_active");
  }
});

const addError = function (input) {
  input.classList.add("error");
  input.parentElement.classList.add("error");
};

const removeError = function (input) {
  input.classList.remove("error");
  input.parentElement.classList.remove("error");
};

const formValidate = function (form) {
  let error = 0;
  removeError(tel);
  removeError(email);

  if (
    !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
      email.value
    ) ||
    email.value.trim() === ""
  ) {
    addError(email);
    error += 1;
  }

  if (
    !/(?:\+|\d)[\d\-\(\) ]{9,}\d/.test(tel.value) ||
    tel.value.trim() === ""
  ) {
    addError(tel);
    error += 1;
  }
  return error;
};

const formSend = function (e) {
  e.preventDefault();
  let err = formValidate();
  let formData = new FormData(form);

  if (err === 0) {
    form.classList.add("sending");
    fetch("../mailer/mail.php", {
      method: "POST",
      body: formData,
    }).then(function (response) {
      if (response.ok) {
        form.reset();
        form.classList.remove("sending");
        popupForm.classList.add("disable");
        popupFormOk.classList.remove("disable");
      } else {
        alert("Ошибка!");
        form.classList.remove("sending");
      }
    });
  } else {
    alert("Корректно заполните обязательные поля!");
  }
};

form.addEventListener("submit", formSend);
