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

// Валидация формы входа (login_email, login_pass)
function validLogin() {
  var ok = true;
  if (!checkEmail("login_email", "login-email-error")) ok = false;
  if (!checkPass("login_pass", "login-password-error")) ok = false;
  return ok;
}

// Валидация формы регистрации (reg_name, reg_phone, reg_email, reg_pass, reg_pass2, reg_agree)
function validReg() {
  var ok = true;
  if (!checkName("reg_name", "reg-name-error")) ok = false;
  if (!checkPhone("reg_phone", "reg-phone-error")) ok = false;
  if (!checkEmail("reg_email", "reg-email-error")) ok = false;
  if (!checkPass("reg_pass", "reg-password-error")) ok = false;
  if (!checkCheck("reg_agree", "reg-agree-error")) ok = false;
  // Сравнение паролей
  var p1 = document.getElementById("reg_pass");
  var p2 = document.getElementById("reg_pass2");
  if (p1 && p2 && p1.value !== p2.value) { showErr("reg_pass2", "reg-password-confirm-error", "Пароли не совпадают"); ok = false; }
  else if (p2) { clearErr("reg_pass2", "reg-password-confirm-error"); }
  return ok;
}

// Валидация формы записи (client_name, client_phone, service, book_date, book_time, book_agree)
function validBooking() {
  var ok = true;
  if (!checkName("client_name", "name-error")) ok = false;
  if (!checkPhone("client_phone", "phone-error")) ok = false;
  if (!checkCheck("book_agree", "agree-error")) ok = false;
  var svc = document.getElementById("service");
  if (svc && svc.required && !svc.value) { showErr("service", "service-error", "Выберите услугу"); ok = false; }
  var dt = document.getElementById("book_date");
  if (dt && dt.required && !dt.value) { showErr("date", "date-error", "Выберите дату"); ok = false; }
  var tm = document.getElementById("book_time");
  if (tm && tm.required && !tm.value) { showErr("time", "time-error", "Выберите время"); ok = false; }
  return ok;
}

// Проверка полей при потере фокуса (blur)
document.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach(function (inp) {
    inp.addEventListener("blur", function () {
      var id = inp.id;
      if (id === "login_email") checkEmail("login_email", "login-email-error");
      if (id === "login_pass") checkPass("login_pass", "login-password-error");
      if (id === "reg_name") checkName("reg_name", "reg-name-error");
      if (id === "reg_phone") checkPhone("reg_phone", "reg-phone-error");
      if (id === "reg_email") checkEmail("reg_email", "reg-email-error");
      if (id === "reg_pass") checkPass("reg_pass", "reg-password-error");
      if (id === "reg_pass2") {
        var p = document.getElementById("reg_pass");
        if (p && inp.value !== p.value) showErr("reg_pass2", "reg-password-confirm-error", "Пароли не совпадают");
        else clearErr("reg_pass2", "reg-password-confirm-error");
      }
      if (id === "reg_agree") checkCheck("reg_agree", "reg-agree-error");
      if (id === "client_name") checkName("client_name", "name-error");
      if (id === "client_phone") checkPhone("client_phone", "phone-error");
      if (id === "book_agree") checkCheck("book_agree", "agree-error");
      if (id === "review_name") checkName("review_name", "review-name-error");
    });
  });
});
