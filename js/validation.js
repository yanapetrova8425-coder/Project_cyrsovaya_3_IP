// ===== Валидация форм с регулярными выражениями =====

var patterns = {
  name: /^[a-zA-Zа-яА-ЯёЁ\s'-]{2,50}$/,
  phone: /^(\+7|8)\s?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^.{6,}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  text: /^[\s\S]{10,}$/,
};

function validateField(input, pattern, errorMessage) {
  var value = input.value.trim();
  var errorEl = document.getElementById(input.id + "-error");

  if (!value) {
    showError(input, errorEl, "Поле обязательно для заполнения");
    return false;
  }

  if (!pattern.test(value)) {
    showError(input, errorEl, errorMessage);
    return false;
  }

  clearError(input, errorEl);
  return true;
}

function showError(input, errorEl, message) {
  input.classList.add("error");
  if (errorEl) errorEl.textContent = message;
}

function clearError(input, errorEl) {
  input.classList.remove("error");
  if (errorEl) errorEl.textContent = "";
}

function showResult(elementId, message, isSuccess) {
  var el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = "form-result " + (isSuccess ? "success" : "error");
}

// ===== Валидация формы записи =====

function validateBookingForm() {
  var isValid = true;

  var nameInput = document.getElementById("client-name");
  var phoneInput = document.getElementById("client-phone");
  var emailInput = document.getElementById("client-email");
  var serviceInput = document.getElementById("service-select");
  var dateInput = document.getElementById("booking-date");
  var timeInput = document.getElementById("booking-time");
  var agreeInput = document.getElementById("agree-terms");

  if (nameInput && !validateField(nameInput, patterns.name, "Введите корректное имя (2-50 символов)")) {
    isValid = false;
  }

  if (phoneInput && !validateField(phoneInput, patterns.phone, "Формат: +7 (999) 123-45-67")) {
    isValid = false;
  }

  if (emailInput && emailInput.value.trim() && !validateField(emailInput, patterns.email, "Введите корректный email")) {
    isValid = false;
  }

  if (serviceInput && !serviceInput.value) {
    showError(serviceInput, document.getElementById("service-error"), "Выберите услугу");
    isValid = false;
  } else if (serviceInput) {
    clearError(serviceInput, document.getElementById("service-error"));
  }

  if (dateInput) {
    var selectedDate = new Date(dateInput.value);
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!dateInput.value) {
      showError(dateInput, document.getElementById("date-error"), "Выберите дату");
      isValid = false;
    } else if (selectedDate < today) {
      showError(dateInput, document.getElementById("date-error"), "Дата не может быть в прошлом");
      isValid = false;
    } else {
      clearError(dateInput, document.getElementById("date-error"));
    }
  }

  if (timeInput && !timeInput.value) {
    showError(timeInput, document.getElementById("time-error"), "Выберите время");
    isValid = false;
  } else if (timeInput) {
    clearError(timeInput, document.getElementById("time-error"));
  }

  if (agreeInput && !agreeInput.checked) {
    var agreeError = document.getElementById("agree-error");
    if (agreeError) agreeError.textContent = "Необходимо согласие";
    isValid = false;
  }

  return isValid;
}

// ===== Валидация формы входа =====

function validateLoginForm() {
  var isValid = true;

  var emailInput = document.getElementById("login-email");
  var passwordInput = document.getElementById("login-password");

  if (emailInput && !validateField(emailInput, patterns.email, "Введите корректный email")) {
    isValid = false;
  }

  if (passwordInput && !passwordInput.value.trim()) {
    showError(passwordInput, document.getElementById("login-password-error"), "Введите пароль");
    isValid = false;
  } else if (passwordInput) {
    clearError(passwordInput, document.getElementById("login-password-error"));
  }

  return isValid;
}

// ===== Валидация формы регистрации =====

function validateRegisterForm() {
  var isValid = true;

  var nameInput = document.getElementById("reg-name");
  var phoneInput = document.getElementById("reg-phone");
  var emailInput = document.getElementById("reg-email");
  var passwordInput = document.getElementById("reg-password");
  var confirmInput = document.getElementById("reg-password-confirm");
  var agreeInput = document.getElementById("reg-agree");

  if (nameInput && !validateField(nameInput, patterns.name, "Введите корректное имя (2-50 символов)")) {
    isValid = false;
  }

  if (phoneInput && !validateField(phoneInput, patterns.phone, "Формат: +7 (999) 123-45-67")) {
    isValid = false;
  }

  if (emailInput && !validateField(emailInput, patterns.email, "Введите корректный email")) {
    isValid = false;
  }

  if (passwordInput && !validateField(passwordInput, patterns.password, "Минимум 6 символов")) {
    isValid = false;
  }

  if (confirmInput && confirmInput.value !== passwordInput.value) {
    showError(confirmInput, document.getElementById("reg-password-confirm-error"), "Пароли не совпадают");
    isValid = false;
  } else if (confirmInput) {
    clearError(confirmInput, document.getElementById("reg-password-confirm-error"));
  }

  if (agreeInput && !agreeInput.checked) {
    var agreeError = document.getElementById("reg-agree-error");
    if (agreeError) agreeError.textContent = "Необходимо согласие";
    isValid = false;
  }

  return isValid;
}

// ===== Валидация формы отзыва =====

function validateReviewForm() {
  var isValid = true;

  var nameInput = document.getElementById("review-name");
  var ratingInput = document.getElementById("review-rating");
  var textInput = document.getElementById("review-text");

  if (nameInput && !validateField(nameInput, patterns.name, "Введите корректное имя")) {
    isValid = false;
  }

  if (ratingInput && !ratingInput.value) {
    showError(ratingInput, document.getElementById("review-rating-error"), "Выберите оценку");
    isValid = false;
  } else if (ratingInput) {
    clearError(ratingInput, document.getElementById("review-rating-error"));
  }

  if (textInput && !validateField(textInput, patterns.text, "Отзыв должен содержать минимум 10 символов")) {
    isValid = false;
  }

  return isValid;
}
