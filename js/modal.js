
document.addEventListener("DOMContentLoaded", function () {
  // Нахожу все элементы модалок
  var openLogin = document.getElementById("btn-open-login");
  var openReg = document.getElementById("btn-open-register");
  var loginModal = document.getElementById("modal-login");
  var regModal = document.getElementById("modal-register");
  var closeLogin = document.getElementById("modal-login-close");
  var closeReg = document.getElementById("modal-register-close");
  var toReg = document.getElementById("switch-to-register");
  var toLogin = document.getElementById("switch-to-login");

  // Открытие модалки входа — добавляю класс "show", блокирую скролл
  if (openLogin) {
    openLogin.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

  // Открытие модалки регистрации
  if (openReg) {
    openReg.addEventListener("click", function (e) {
      e.preventDefault();
      regModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

  // Закрытие по крестику
  if (closeLogin) {
    closeLogin.addEventListener("click", function () {
      loginModal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  if (closeReg) {
    closeReg.addEventListener("click", function () {
      regModal.classList.remove("show");
      document.body.style.overflow = "";
    });
  }

  // Закрытие при клике на затемнённый фон (e.target === обёртка)
  if (loginModal) {
    loginModal.addEventListener("click", function (e) {
      if (e.target === loginModal) { loginModal.classList.remove("show"); document.body.style.overflow = ""; }
    });
  }

  if (regModal) {
    regModal.addEventListener("click", function (e) {
      if (e.target === regModal) { regModal.classList.remove("show"); document.body.style.overflow = ""; }
    });
  }

  // Переключение: вход → регистрация (с задержкой для анимации)
  if (toReg) {
    toReg.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.remove("show");
      setTimeout(function () { regModal.classList.add("show"); }, 200);
    });
  }

  // Переключение: регистрация → вход
  if (toLogin) {
    toLogin.addEventListener("click", function (e) {
      e.preventDefault();
      regModal.classList.remove("show");
      setTimeout(function () { loginModal.classList.add("show"); }, 200);
    });
  }

  // Закрытие по Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (loginModal && loginModal.classList.contains("show")) { loginModal.classList.remove("show"); document.body.style.overflow = ""; }
      if (regModal && regModal.classList.contains("show")) { regModal.classList.remove("show"); document.body.style.overflow = ""; }
    }
  });
});
