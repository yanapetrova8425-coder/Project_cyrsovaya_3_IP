// ===== Модальные окна =====

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
    overlay.classList.remove("active");
  });
  document.body.style.overflow = "";
}

// Инициализация после загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  // Кнопки открытия модалок на account.html
  var loginBtn = document.getElementById("open-login-modal");
  var registerBtn = document.getElementById("open-register-modal");

  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      openModal("login-modal");
    });
  }

  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      openModal("register-modal");
    });
  }

  // Кнопки закрытия
  var closeLogin = document.getElementById("close-login-modal");
  var closeRegister = document.getElementById("close-register-modal");

  if (closeLogin) {
    closeLogin.addEventListener("click", function () {
      closeModal("login-modal");
    });
  }

  if (closeRegister) {
    closeRegister.addEventListener("click", function () {
      closeModal("register-modal");
    });
  }

  // Закрытие по клику на оверлей
  document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  // Закрытие по Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  // Переключение между модалками
  var switchToRegister = document.getElementById("switch-to-register");
  var switchToLogin = document.getElementById("switch-to-login");

  if (switchToRegister) {
    switchToRegister.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal("login-modal");
      setTimeout(function () {
        openModal("register-modal");
      }, 200);
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal("register-modal");
      setTimeout(function () {
        openModal("login-modal");
      }, 200);
    });
  }
});
