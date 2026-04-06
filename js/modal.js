document.addEventListener("DOMContentLoaded", function () {
  var openLogin = document.getElementById("btn-open-login");
  var openReg = document.getElementById("btn-open-register");
  var loginModal = document.getElementById("modal-login");
  var regModal = document.getElementById("modal-register");
  var closeLogin = document.getElementById("modal-login-close");
  var closeReg = document.getElementById("modal-register-close");
  var toReg = document.getElementById("switch-to-register");
  var toLogin = document.getElementById("switch-to-login");

  if (openLogin) {
    openLogin.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

  if (openReg) {
    openReg.addEventListener("click", function (e) {
      e.preventDefault();
      regModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  }

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

  if (toReg) {
    toReg.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.classList.remove("show");
      setTimeout(function () { regModal.classList.add("show"); }, 200);
    });
  }

  if (toLogin) {
    toLogin.addEventListener("click", function (e) {
      e.preventDefault();
      regModal.classList.remove("show");
      setTimeout(function () { loginModal.classList.add("show"); }, 200);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (loginModal && loginModal.classList.contains("show")) { loginModal.classList.remove("show"); document.body.style.overflow = ""; }
      if (regModal && regModal.classList.contains("show")) { regModal.classList.remove("show"); document.body.style.overflow = ""; }
    }
  });
});
