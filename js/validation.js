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

// Валидация формы входа (email, password)
function validLogin() {
  var ok = true;
  if (!checkEmail("email", "login-email-error")) ok = false;
  if (!checkPass("password", "login-password-error")) ok = false;
  return ok;
}

// Валидация формы регистрации (name, phone, remail, rpassword, rpassword2, agree)
function validReg() {
  var ok = true;
  if (!checkName("name", "reg-name-error")) ok = false;
  if (!checkPhone("phone", "reg-phone-error")) ok = false;
  if (!checkEmail("remail", "reg-email-error")) ok = false;
  if (!checkPass("rpassword", "reg-password-error")) ok = false;
  if (!checkCheck("agree", "reg-agree-error")) ok = false;
  // Сравнение паролей
  var p1 = document.getElementById("rpassword");
  var p2 = document.getElementById("rpassword2");
  if (p1 && p2 && p1.value !== p2.value) { showErr("rpassword2", "reg-password-confirm-error", "Пароли не совпадают"); ok = false; }
  else if (p2) { clearErr("rpassword2", "reg-password-confirm-error"); }
  return ok;
}

// Валидация формы записи (name, phone, service, date, time, agree)
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

// Проверка полей при потере фокуса (blur)
document.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach(function (inp) {
    inp.addEventListener("blur", function () {
      var id = inp.id;
      if (id === "email") checkEmail("email", "login-email-error");
      if (id === "password") checkPass("password", "login-password-error");
      if (id === "name") checkName("name", "reg-name-error");
      if (id === "phone") checkPhone("phone", "reg-phone-error");
      if (id === "remail") checkEmail("remail", "reg-email-error");
      if (id === "rpassword") checkPass("rpassword", "reg-password-error");
      if (id === "rpassword2") {
        var p = document.getElementById("rpassword");
        if (p && inp.value !== p.value) showErr("rpassword2", "reg-password-confirm-error", "Пароли не совпадают");
        else clearErr("rpassword2", "reg-password-confirm-error");
      }
      if (id === "agree") checkCheck("agree", "reg-agree-error");
    });
  });
});
