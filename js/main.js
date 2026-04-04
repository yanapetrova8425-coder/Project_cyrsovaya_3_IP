// ===== Основной JS =====

document.addEventListener("DOMContentLoaded", function () {

  // --- Плавная прокрутка для якорных ссылок ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --- Установка минимальной даты в форме записи ---
  var dateInput = document.getElementById("booking-date");
  if (dateInput) {
    var today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  // --- Отправка формы записи ---
  var bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateBookingForm()) return;

      var formData = new FormData(bookingForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      // AJAX-запрос (будет работать после подключения PHP)
      fetch("php/booking.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result.success) {
            showResult("booking-result", "Вы успешно записаны! Мы свяжемся с вами.", true);
            bookingForm.reset();
          } else {
            showResult("booking-result", result.message || "Ошибка при записи", false);
          }
        })
        .catch(function () {
          // Демонстрация без сервера
          showResult("booking-result", "Заявка отправлена! (сервер не подключён)", true);
          bookingForm.reset();
        });
    });
  }

  // --- Отправка формы входа ---
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateLoginForm()) return;

      var formData = new FormData(loginForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      fetch("php/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result.success) {
            showResult("login-result", "Вход выполнен!", true);
            setTimeout(function () {
              window.location.href = "account.html";
            }, 1000);
          } else {
            showResult("login-result", result.message || "Ошибка входа", false);
          }
        })
        .catch(function () {
          showResult("login-result", "Демо: вход выполнен (сервер не подключён)", true);
        });
    });
  }

  // --- Отправка формы регистрации ---
  var registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateRegisterForm()) return;

      var formData = new FormData(registerForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      fetch("php/auth.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result.success) {
            showResult("register-result", "Регистрация успешна!", true);
            setTimeout(function () {
              closeModal("register-modal");
              openModal("login-modal");
            }, 1500);
          } else {
            showResult("register-result", result.message || "Ошибка регистрации", false);
          }
        })
        .catch(function () {
          showResult("register-result", "Демо: регистрация успешна (сервер не подключён)", true);
        });
    });
  }

  // --- Отправка формы отзыва ---
  var reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateReviewForm()) return;

      var formData = new FormData(reviewForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      fetch("php/reviews.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) { return response.json(); })
        .then(function (result) {
          if (result.success) {
            showResult("review-result", "Спасибо за ваш отзыв!", true);
            reviewForm.reset();
          } else {
            showResult("review-result", result.message || "Ошибка отправки", false);
          }
        })
        .catch(function () {
          showResult("review-result", "Демо: отзыв отправлен (сервер не подключён)", true);
          reviewForm.reset();
        });
    });
  }

  // --- Подсветка активного пункта меню ---
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.style.color = "#333";
      link.style.fontWeight = "600";
    }
  });
});
