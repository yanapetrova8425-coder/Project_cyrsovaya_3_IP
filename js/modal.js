document.addEventListener("DOMContentLoaded", function () {
  var openLoginBtn = document.getElementById("btn-open-login");
  var openRegisterBtn = document.getElementById("btn-open-register");
  var loginModal = document.getElementById("modal-login");
  var registerModal = document.getElementById("modal-register");
  var closeLoginBtn = document.getElementById("modal-login-close");
  var closeRegisterBtn = document.getElementById("modal-register-close");
  var switchToRegister = document.getElementById("switch-to-register");
  var switchToLogin = document.getElementById("switch-to-login");

  if (openLoginBtn) {
    openLoginBtn.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (openRegisterBtn) {
    openRegisterBtn.addEventListener("click", function (e) {
      e.preventDefault();
      registerModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeLoginBtn) {
    closeLoginBtn.addEventListener("click", function () {
      loginModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (closeRegisterBtn) {
    closeRegisterBtn.addEventListener("click", function () {
      registerModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (loginModal) {
    loginModal.addEventListener("click", function (e) {
      if (e.target === loginModal) { loginModal.classList.remove("active"); document.body.style.overflow = ""; }
    });
  }

  if (registerModal) {
    registerModal.addEventListener("click", function (e) {
      if (e.target === registerModal) { registerModal.classList.remove("active"); document.body.style.overflow = ""; }
    });
  }

  if (switchToRegister) {
    switchToRegister.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.remove("active");
      setTimeout(function () { registerModal.classList.add("active"); }, 200);
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      registerModal.classList.remove("active");
      setTimeout(function () { loginModal.classList.add("active"); }, 200);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (loginModal && loginModal.classList.contains("active")) { loginModal.classList.remove("active"); document.body.style.overflow = ""; }
      if (registerModal && registerModal.classList.contains("active")) { registerModal.classList.remove("active"); document.body.style.overflow = ""; }
    }
  });
});
