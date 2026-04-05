// Валидация форм с использованием регулярных выражений

// Регулярные выражения
const regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+7\s?\(?[0-9]{3}\)?\s?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$/,
  password: /^[a-zA-Z0-9!@#$%^&*()_+]{6,}$/,
  name: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/
};

// Показать ошибку
function showError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add("error");
  if (error) error.textContent = message;
}

// Очистить ошибку
function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.remove("error");
  if (error) error.textContent = "";
}

// Валидация email
function validateEmail(inputId, errorId) {
  const input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  const value = input.value.trim();
  if (!value) {
    showError(inputId, errorId, "Введите email");
    return false;
  }
  if (!regex.email.test(value)) {
    showError(inputId, errorId, "Некорректный email");
    return false;
  }
  clearError(inputId, errorId);
  return true;
}

// Валидация телефона
function validatePhone(inputId, errorId) {
  const input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  const value = input.value.trim();
  if (!value) {
    showError(inputId, errorId, "Введите телефон");
    return false;
  }
  if (!regex.phone.test(value)) {
    showError(inputId, errorId, "Формат: +7 (952) 029-51-18");
    return false;
  }
  clearError(inputId, errorId);
  return true;
}

// Валидация пароля
function validatePassword(inputId, errorId) {
  const input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  const value = input.value;
  if (!value) {
    showError(inputId, errorId, "Введите пароль");
    return false;
  }
  if (!regex.password.test(value)) {
    showError(inputId, errorId, "Минимум 8 символов");
    return false;
  }
  clearError(inputId, errorId);
  return true;
}

// Валидация имени
function validateName(inputId, errorId) {
  const input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  const value = input.value.trim();
  if (!value) {
    showError(inputId, errorId, "Введите имя");
    return false;
  }
  if (!regex.name.test(value)) {
    showError(inputId, errorId, "Только буквы, 2-50 символов");
    return false;
  }
  clearError(inputId, errorId);
  return true;
}

// Валидация чекбокса
function validateCheckbox(inputId, errorId) {
  const input = document.getElementById(inputId);
  if (!input || !input.required) return true;
  if (!input.checked) {
    showError(inputId, errorId, "Необходимо ваше согласие");
    return false;
  }
  clearError(inputId, errorId);
  return true;
}

// Валидация формы входа
function validateLoginForm() {
  let isValid = true;
  if (!validateEmail("login-email", "login-email-error")) isValid = false;
  if (!validatePassword("login-password", "login-password-error")) isValid = false;
  return isValid;
}

// Валидация формы регистрации
function validateRegisterForm() {
  let isValid = true;
  if (!validateName("reg-name", "reg-name-error")) isValid = false;
  if (!validatePhone("reg-phone", "reg-phone-error")) isValid = false;
  if (!validateEmail("reg-email", "reg-email-error")) isValid = false;
  if (!validatePassword("reg-password", "reg-password-error")) isValid = false;
  if (!validateCheckbox("reg-agree", "reg-agree-error")) isValid = false;

  // Проверка совпадения паролей
  const pass = document.getElementById("reg-password");
  const passConfirm = document.getElementById("reg-password-confirm");
  if (pass && passConfirm && pass.value !== passConfirm.value) {
    showError("reg-password-confirm", "reg-password-confirm-error", "Пароли не совпадают");
    isValid = false;
  } else if (passConfirm) {
    clearError("reg-password-confirm", "reg-password-confirm-error");
  }

  return isValid;
}

// Валидация формы записи
function validateBookingForm() {
  let isValid = true;
  if (!validateName("client-name", "name-error")) isValid = false;
  if (!validatePhone("client-phone", "phone-error")) isValid = false;
  if (!validateEmail("client-email", "email-error")) isValid = false;
  if (!validateCheckbox("agree-terms", "agree-error")) isValid = false;

  const service = document.getElementById("service-select");
  if (service && service.required && !service.value) {
    showError("service-select", "service-error", "Выберите услугу");
    isValid = false;
  }

  const date = document.getElementById("booking-date");
  if (date && date.required && !date.value) {
    showError("booking-date", "date-error", "Выберите дату");
    isValid = false;
  }

  const time = document.getElementById("booking-time");
  if (time && time.required && !time.value) {
    showError("booking-time", "time-error", "Выберите время");
    isValid = false;
  }

  return isValid;
}

// Инициализация валидации при отправке форм
document.addEventListener("DOMContentLoaded", function () {
  // Форма входа
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateLoginForm()) {
        const result = document.getElementById("login-result");
        if (result) {
          result.className = "form_result success";
          result.textContent = "Вход выполнен успешно!";
        }
      }
    });
  }

  // Форма регистрации
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateRegisterForm()) {
        const result = document.getElementById("register-result");
        if (result) {
          result.className = "form_result success";
          result.textContent = "Регистрация прошла успешно!";
        }
      }
    });
  }

  // Форма записи
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateBookingForm()) {
        const result = document.getElementById("booking-result");
        if (result) {
          result.className = "form_result success";
          result.textContent = "Вы успешно записаны!";
        }
      }
    });
  }

  // Валидация в реальном времени
  const inputs = document.querySelectorAll("input, select, textarea");
  inputs.forEach(function (input) {
    input.addEventListener("blur", function () {
      const id = input.id;
      if (id === "login-email") validateEmail("login-email", "login-email-error");
      if (id === "login-password") validatePassword("login-password", "login-password-error");
      if (id === "reg-name") validateName("reg-name", "reg-name-error");
      if (id === "reg-phone") validatePhone("reg-phone", "reg-phone-error");
      if (id === "reg-email") validateEmail("reg-email", "reg-email-error");
      if (id === "reg-password") validatePassword("reg-password", "reg-password-error");
      if (id === "reg-password-confirm") {
        const pass = document.getElementById("reg-password");
        if (pass && input.value !== pass.value) {
          showError("reg-password-confirm", "reg-password-confirm-error", "Пароли не совпадают");
        } else {
          clearError("reg-password-confirm", "reg-password-confirm-error");
        }
      }
      if (id === "client-name") validateName("client-name", "name-error");
      if (id === "client-phone") validatePhone("client-phone", "phone-error");
      if (id === "client-email") validateEmail("client-email", "email-error");
    });
  });
});
