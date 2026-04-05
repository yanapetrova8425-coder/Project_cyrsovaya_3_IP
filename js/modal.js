// Модальные окна на  JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Кнопки открытия
  const openLoginBtn = document.getElementById("btn-open-login");
  const openRegisterBtn = document.getElementById("btn-open-register");

  // Модальные окна
  const loginModal = document.getElementById("modal-login");
  const registerModal = document.getElementById("modal-register");

  // Кнопки закрытия
  const closeLoginBtn = document.getElementById("modal-login-close");
  const closeRegisterBtn = document.getElementById("modal-register-close");

  // Переключатели между модалками
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");

  // Открытие модалки входа
  if (openLoginBtn) {
    openLoginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  // Открытие модалки регистрации
  if (openRegisterBtn) {
    openRegisterBtn.addEventListener("click", function (e) {
      e.preventDefault();
      registerModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  // Закрытие модалки входа
  if (closeLoginBtn) {
    closeLoginBtn.addEventListener("click", function () {
      loginModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Закрытие модалки регистрации
  if (closeRegisterBtn) {
    closeRegisterBtn.addEventListener("click", function () {
      registerModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Закрытие по клику на оверлей
  if (loginModal) {
    loginModal.addEventListener("click", function (e) {
      if (e.target === loginModal) {
        loginModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  if (registerModal) {
    registerModal.addEventListener("click", function (e) {
      if (e.target === registerModal) {
        registerModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Переключение с входа на регистрацию
  if (switchToRegister) {
    switchToRegister.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.remove("active");
      setTimeout(function () {
        registerModal.classList.add("active");
      }, 200);
    });
  }

  // Переключение с регистрации на вход
  if (switchToLogin) {
    switchToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      registerModal.classList.remove("active");
      setTimeout(function () {
        loginModal.classList.add("active");
      }, 200);
    });
  }

  // Закрытие по Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (loginModal && loginModal.classList.contains("active")) {
        loginModal.classList.remove("active");
        document.body.style.overflow = "";
      }
      if (registerModal && registerModal.classList.contains("active")) {
        registerModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });
});
