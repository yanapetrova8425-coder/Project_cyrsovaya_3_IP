/*
 * validation.js — валидация форм регулярными выражениями.
 * Функции checkEmail, checkPhone, checkPass, checkName, checkCheck проверяют поля.
 * validLogin, validReg, validBooking — комплексная проверка форм.
 * При blur (потере фокуса) поле сразу проверяется.
 */

// Регулярные выражения
var regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+7\s?\(?[0-9]{3}\)?\s?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$/,
  pass: /^[a-zA-Z0-9!@#$%^&*()_+]{6,}$/,
  name: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/
};

// Показать ошибку: добавляю класс "error" полю и текст в span
function showErr(id, errId, msg) {
  var el = document.getElementById(id);
  var err = document.getElementById(errId);
  if (el) el.classList.add("error");
  if (err) err.textContent = msg;
}

// Убрать ошибку
function clearErr(id, errId) {
  var el = document.getElementById(id);
  var err = document.getElementById(errId);
  if (el) el.classList.remove("error");
  if (err) err.textContent = "";
}

// Проверка email по regex
function checkEmail(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.value.trim()) { showErr(id, errId, "Введите email"); return false; }
  if (!regex.email.test(el.value.trim())) { showErr(id, errId, "Некорректный email"); return false; }
  clearErr(id, errId);
  return true;
}

// Проверка телефона по regex (+7 ...)
function checkPhone(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.value.trim()) { showErr(id, errId, "Введите телефон"); return false; }
  if (!regex.phone.test(el.value.trim())) { showErr(id, errId, "Формат: +7 (999) 123-45-67"); return false; }
  clearErr(id, errId);
  return true;
}

// Проверка пароля (мин. 6 символов)
function checkPass(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.value) { showErr(id, errId, "Введите пароль"); return false; }
  if (!regex.pass.test(el.value)) { showErr(id, errId, "Минимум 6 символов"); return false; }
  clearErr(id, errId);
  return true;
}

// Проверка имени (только буквы, 2-50 символов)
function checkName(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.value.trim()) { showErr(id, errId, "Введите имя"); return false; }
  if (!regex.name.test(el.value.trim())) { showErr(id, errId, "Только буквы, 2-50 символов"); return false; }
  clearErr(id, errId);
  return true;
}

// Проверка чекбокса (галочка согласия)
function checkCheck(id, errId) {
  var el = document.getElementById(id);
  if (!el || !el.required) return true;
  if (!el.checked) { showErr(id, errId, "Необходимо согласие"); return false; }
  clearErr(id, errId);
  return true;
}

// Валидация формы входа
function validLogin() {
  var ok = true;
  if (!checkEmail("login-email", "login-email-error")) ok = false;
  if (!checkPass("login-password", "login-password-error")) ok = false;
  return ok;
}

// Валидация формы регистрации (имя, телефон, email, пароль, согласие)
function validReg() {
  var ok = true;
  if (!checkName("reg-name", "reg-name-error")) ok = false;
  if (!checkPhone("reg-phone", "reg-phone-error")) ok = false;
  if (!checkEmail("reg-email", "reg-email-error")) ok = false;
  if (!checkPass("reg-password", "reg-password-error")) ok = false;
  if (!checkCheck("reg-agree", "reg-agree-error")) ok = false;
  // Сравнение паролей
  var p1 = document.getElementById("reg-password");
  var p2 = document.getElementById("reg-password-confirm");
  if (p1 && p2 && p1.value !== p2.value) { showErr("reg-password-confirm", "reg-password-confirm-error", "Пароли не совпадают"); ok = false; }
  else if (p2) { clearErr("reg-password-confirm", "reg-password-confirm-error"); }
  return ok;
}

// Валидация формы записи
function validBooking() {
  var ok = true;
  if (!checkName("client-name", "name-error")) ok = false;
  if (!checkPhone("client-phone", "phone-error")) ok = false;
  if (!checkCheck("agree-terms", "agree-error")) ok = false;
  var svc = document.getElementById("service-select");
  if (svc && svc.required && !svc.value) { showErr("service-select", "service-error", "Выберите услугу"); ok = false; }
  var dt = document.getElementById("booking-date");
  if (dt && dt.required && !dt.value) { showErr("booking-date", "date-error", "Выберите дату"); ok = false; }
  var tm = document.getElementById("booking-time");
  if (tm && tm.required && !tm.value) { showErr("booking-time", "time-error", "Выберите время"); ok = false; }
  return ok;
}

// Проверка полей при потере фокуса (blur)
document.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach(function (inp) {
    inp.addEventListener("blur", function () {
      var id = inp.id;
      if (id === "login-email") checkEmail("login-email", "login-email-error");
      if (id === "login-password") checkPass("login-password", "login-password-error");
      if (id === "reg-name") checkName("reg-name", "reg-name-error");
      if (id === "reg-phone") checkPhone("reg-phone", "reg-phone-error");
      if (id === "reg-email") checkEmail("reg-email", "reg-email-error");
      if (id === "reg-password") checkPass("reg-password", "reg-password-error");
      if (id === "reg-password-confirm") {
        var p = document.getElementById("reg-password");
        if (p && inp.value !== p.value) showErr("reg-password-confirm", "reg-password-confirm-error", "Пароли не совпадают");
        else clearErr("reg-password-confirm", "reg-password-confirm-error");
      }
      if (id === "client-name") checkName("client-name", "name-error");
      if (id === "client-phone") checkPhone("client-phone", "phone-error");
    });
  });
});
