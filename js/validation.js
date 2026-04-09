

var regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+7\s?\(?[0-9]{3}\)?\s?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$/,
  pass: /^[a-zA-Z0-9!@#$%^&*()_+]{8,}$/,
  name: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/
};

// Красная рамка + текст ошибки
function showErr(id, errId, msg) {
  var el = document.getElementById(id);
  var err = document.getElementById(errId);
  if (el) { el.classList.remove("valid"); el.classList.add("error"); }
  if (err) err.textContent = msg;
}

// Зелёная рамка, убираю ошибку
function markValid(id, errId) {
  var el = document.getElementById(id);
  var err = document.getElementById(errId);
  if (el) { el.classList.remove("error"); el.classList.add("valid"); }
  if (err) err.textContent = "";
}

function checkEmail(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.value.trim()) { showErr(id, errId, "Введите email"); return false; }
  if (!regex.email.test(el.value.trim())) { showErr(id, errId, "Некорректный email"); return false; }
  markValid(id, errId);
  return true;
}

function checkPhone(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.value.trim()) { showErr(id, errId, "Введите телефон"); return false; }
  if (!regex.phone.test(el.value.trim())) { showErr(id, errId, "Формат: +7 (999) 123-45-67"); return false; }
  markValid(id, errId);
  return true;
}

function checkPass(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.value) { showErr(id, errId, "Введите пароль"); return false; }
  if (!regex.pass.test(el.value)) { showErr(id, errId, "Минимум 8 символов"); return false; }
  markValid(id, errId);
  return true;
}

function checkName(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.value.trim()) { showErr(id, errId, "Введите имя"); return false; }
  if (!regex.name.test(el.value.trim())) { showErr(id, errId, "Только буквы, 2-50 символов"); return false; }
  markValid(id, errId);
  return true;
}

function checkCheck(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.checked) { showErr(id, errId, "Необходимо согласие"); return false; }
  markValid(id, errId);
  return true;
}

// Валидация формы входа
function validLogin() {
  var ok = true;
  if (!checkEmail("login-email", "login-email-error")) ok = false;
  if (!checkPass("login-password", "login-password-error")) ok = false;
  return ok;
}

// Валидация формы регистрации
function validReg() {
  var ok = true;
  if (!checkName("reg-name", "reg-name-error")) ok = false;
  if (!checkPhone("reg-phone", "reg-phone-error")) ok = false;
  if (!checkEmail("reg-email", "reg-email-error")) ok = false;
  if (!checkPass("reg-password", "reg-password-error")) ok = false;
  if (!checkCheck("reg-agree", "reg-agree-error")) ok = false;
  var p1 = document.getElementById("reg-password");
  var p2 = document.getElementById("reg-password2");
  if (p1 && p2 && p1.value !== p2.value) { showErr("reg-password2", "reg-password-confirm-error", "Пароли не совпадают"); ok = false; }
  else if (p2) { markValid("reg-password2", "reg-password-confirm-error"); }
  return ok;
}

// Валидация формы записи
function validBooking() {
  var ok = true;
  if (!checkName("name", "name-error")) ok = false;
  if (!checkPhone("phone", "phone-error")) ok = false;
  if (!checkCheck("agree", "agree-error")) ok = false;
  var svc = document.getElementById("service");
  if (svc && svc.required && !svc.value) { showErr("service", "service-error", "Выберите услугу"); ok = false; }
  var dt = document.getElementById("date");
  if (dt && dt.required && !dt.value) { showErr("date", "date-error", "Выберите дату"); ok = false; }
  var tm = document.getElementById("time");
  if (tm && tm.required && !tm.value) { showErr("time", "time-error", "Выберите время"); ok = false; }
  return ok;
}

document.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach(function (inp) {
    inp.addEventListener("blur", function () {
      var id = inp.id;

      // Форма входа
      if (id === "login-email") checkEmail("login-email", "login-email-error");
      if (id === "login-password") checkPass("login-password", "login-password-error");

      // Форма регистрации
      if (id === "reg-name") checkName("reg-name", "reg-name-error");
      if (id === "reg-phone") checkPhone("reg-phone", "reg-phone-error");
      if (id === "reg-email") checkEmail("reg-email", "reg-email-error");
      if (id === "reg-password") checkPass("reg-password", "reg-password-error");
      if (id === "reg-password2") {
        var p = document.getElementById("reg-password");
        if (p && inp.value !== p.value) showErr("reg-password2", "reg-password-confirm-error", "Пароли не совпадают");
        else markValid("reg-password2", "reg-password-confirm-error");
      }

      // Форма записи
      if (id === "name") checkName("name", "name-error");
      if (id === "phone") checkPhone("phone", "phone-error");
      if (id === "email" && document.getElementById("booking-form")) checkEmail("email", "email-error");
      if (id === "date") {
        var el = document.getElementById("date");
        if (el && el.value) markValid("date", "date-error");
        else if (el && el.required) showErr("date", "date-error", "Выберите дату");
      }
      if (id === "time") {
        var el = document.getElementById("time");
        if (el && el.value) markValid("time", "time-error");
        else if (el && el.required) showErr("time", "time-error", "Выберите время");
      }
    });
  });
});
