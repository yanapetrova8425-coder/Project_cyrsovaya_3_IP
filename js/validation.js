var regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+7\s?\(?[0-9]{3}\)?\s?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$/,
  password: /^[a-zA-Z0-9!@#$%^&*()_+]{6,}$/,
  name: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/
};

function showError(inputId, errorId, message) {
  var input = document.getElementById(inputId);
  var error = document.getElementById(errorId);
  if (input) input.classList.add("error");
  if (error) error.textContent = message;
}

function clearError(inputId, errorId) {
  var input = document.getElementById(inputId);
  var error = document.getElementById(errorId);
  if (input) input.classList.remove("error");
  if (error) error.textContent = "";
}

function validateEmail(inputId, errorId) {
  var input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  if (!input.value.trim()) { showError(inputId, errorId, "Введите email"); return false; }
  if (!regex.email.test(input.value.trim())) { showError(inputId, errorId, "Некорректный email"); return false; }
  clearError(inputId, errorId);
  return true;
}

function validatePhone(inputId, errorId) {
  var input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  if (!input.value.trim()) { showError(inputId, errorId, "Введите телефон"); return false; }
  if (!regex.phone.test(input.value.trim())) { showError(inputId, errorId, "Формат: +7 (999) 123-45-67"); return false; }
  clearError(inputId, errorId);
  return true;
}

function validatePassword(inputId, errorId) {
  var input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  if (!input.value) { showError(inputId, errorId, "Введите пароль"); return false; }
  if (!regex.password.test(input.value)) { showError(inputId, errorId, "Минимум 6 символов"); return false; }
  clearError(inputId, errorId);
  return true;
}

function validateName(inputId, errorId) {
  var input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  if (!input.value.trim()) { showError(inputId, errorId, "Введите имя"); return false; }
  if (!regex.name.test(input.value.trim())) { showError(inputId, errorId, "Только буквы, 2-50 символов"); return false; }
  clearError(inputId, errorId);
  return true;
}

function validateCheckbox(inputId, errorId) {
  var input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  if (!input.checked) { showError(inputId, errorId, "Необходимо согласие"); return false; }
  clearError(inputId, errorId);
  return true;
}

function validateLoginForm() {
  var ok = true;
  if (!validateEmail("login-email", "login-email-error")) ok = false;
  if (!validatePassword("login-password", "login-password-error")) ok = false;
  return ok;
}

function validateRegisterForm() {
  var ok = true;
  if (!validateName("reg-name", "reg-name-error")) ok = false;
  if (!validatePhone("reg-phone", "reg-phone-error")) ok = false;
  if (!validateEmail("reg-email", "reg-email-error")) ok = false;
  if (!validatePassword("reg-password", "reg-password-error")) ok = false;
  if (!validateCheckbox("reg-agree", "reg-agree-error")) ok = false;
  var pass = document.getElementById("reg-password");
  var passConfirm = document.getElementById("reg-password-confirm");
  if (pass && passConfirm && pass.value !== passConfirm.value) {
    showError("reg-password-confirm", "reg-password-confirm-error", "Пароли не совпадают");
    ok = false;
  } else if (passConfirm) { clearError("reg-password-confirm", "reg-password-confirm-error"); }
  return ok;
}

function validateBookingForm() {
  var ok = true;
  if (!validateName("client-name", "name-error")) ok = false;
  if (!validatePhone("client-phone", "phone-error")) ok = false;
  if (!validateCheckbox("agree-terms", "agree-error")) ok = false;
  var service = document.getElementById("service-select");
  if (service && service.required && !service.value) { showError("service-select", "service-error", "Выберите услугу"); ok = false; }
  var date = document.getElementById("booking-date");
  if (date && date.required && !date.value) { showError("booking-date", "date-error", "Выберите дату"); ok = false; }
  var time = document.getElementById("booking-time");
  if (time && time.required && !time.value) { showError("booking-time", "time-error", "Выберите время"); ok = false; }
  return ok;
}

document.addEventListener("DOMContentLoaded", function () {
  var inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach(function (input) {
    input.addEventListener("blur", function () {
      var id = input.id;
      if (id === "login-email") validateEmail("login-email", "login-email-error");
      if (id === "login-password") validatePassword("login-password", "login-password-error");
      if (id === "reg-name") validateName("reg-name", "reg-name-error");
      if (id === "reg-phone") validatePhone("reg-phone", "reg-phone-error");
      if (id === "reg-email") validateEmail("reg-email", "reg-email-error");
      if (id === "reg-password") validatePassword("reg-password", "reg-password-error");
      if (id === "reg-password-confirm") {
        var pass = document.getElementById("reg-password");
        if (pass && input.value !== pass.value) showError("reg-password-confirm", "reg-password-confirm-error", "Пароли не совпадают");
        else clearError("reg-password-confirm", "reg-password-confirm-error");
      }
      if (id === "client-name") validateName("client-name", "name-error");
      if (id === "client-phone") validatePhone("client-phone", "phone-error");
    });
  });
});
