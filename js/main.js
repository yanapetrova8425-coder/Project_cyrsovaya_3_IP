/*
 * main.js — главный файл клиентской логики салона Neonka.
 * Здесь обрабатываются все формы: запись, вход, регистрация, отзывы.
 * Данные отправляются асинхронно на сервер через fetch + FormData.
 */

document.addEventListener("DOMContentLoaded", function () {

  /* Плавная прокрутка по якорям */
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

  /* Минимальная дата — сегодня (нельзя выбрать прошедшую) */
  var dateInput = document.getElementById("booking-date");
  if (dateInput) {
    dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
  }

  /* ============================================
     Форма записи — AJAX через FormData
     ============================================ */
  var bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validBooking()) return;

      // Собираю данные через FormData — браузер сам ставит правильные заголовки
      var formData = new FormData(bookingForm);
      formData.append("action", "booking"); //告诉 сервер что это запись

      fetch("php/booking.php", {
        method: "POST",
        body: formData, // отправляю как FormData, не JSON
      })
        .then(function (r) { return r.json(); })
        .then(function (result) {
          if (result.status === "success") {
            showSuccess("booking-result", result.message);
            bookingForm.reset();
          } else {
            showErr("booking-result", result.message || "Ошибка при записи");
          }
        })
        .catch(function () {
          showSuccess("booking-result", "Заявка отправлена! (сервер не подключён)");
          bookingForm.reset();
        });
    });
  }

  /* ============================================
     Форма входа — AJAX через FormData
     ============================================ */
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validLogin()) return;

      var formData = new FormData(loginForm);
      formData.append("action", "login");

      fetch("php/auth.php", {
        method: "POST",
        body: formData,
      })
        .then(function (r) { return r.json(); })
        .then(function (result) {
          if (result.status === "success") {
            showSuccess("login-result", result.message);
            setTimeout(function () { window.location.href = "account.html"; }, 1000);
          } else {
            showErr("login-result", result.message || "Ошибка входа");
          }
        })
        .catch(function () {
          showSuccess("login-result", "Демо: вход выполнен (сервер не подключён)");
        });
    });
  }

  /* ============================================
     Форма регистрации — AJAX через FormData
     ============================================ */
  var regForm = document.getElementById("register-form");
  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validReg()) return;

      var formData = new FormData(regForm);
      formData.append("action", "register");

      fetch("php/auth.php", {
        method: "POST",
        body: formData,
      })
        .then(function (r) { return r.json(); })
        .then(function (result) {
          if (result.status === "success") {
            showSuccess("register-result", result.message);
            setTimeout(function () {
              document.getElementById("modal-register").classList.remove("show");
              document.getElementById("modal-login").classList.add("show");
            }, 1500);
          } else {
            showErr("register-result", result.message || "Ошибка регистрации");
          }
        })
        .catch(function () {
          showSuccess("register-result", "Демо: регистрация успешна (сервер не подключён)");
        });
    });
  }

  /* ============================================
     Форма отзыва — AJAX через FormData
     ============================================ */
  var reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = document.getElementById("review-name");
      var textEl = document.getElementById("review-text");
      var valid = true;
      if (!nameEl.value.trim()) { showErr("review-name", "review-name-error", "Введите имя"); valid = false; }
      else { clearErr("review-name", "review-name-error"); }
      if (!textEl.value.trim()) { showErr("review-text", "review-text-error", "Напишите отзыв"); valid = false; }
      else { clearErr("review-text", "review-text-error"); }
      if (!valid) return;

      var formData = new FormData(reviewForm);
      formData.append("action", "review");

      fetch("php/reviews.php", {
        method: "POST",
        body: formData,
      })
        .then(function (r) { return r.json(); })
        .then(function (result) {
          if (result.status === "success") {
            showSuccess("review-result", result.message);
            reviewForm.reset();
          } else {
            showErr("review-result", result.message || "Ошибка");
          }
        })
        .catch(function () {
          showSuccess("review-result", "Демо: отзыв отправлен (сервер не подключён)");
          reviewForm.reset();
        });
    });
  }

  /* Подсветка активного пункта меню */
  var currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.style.color = "#333";
      link.style.fontWeight = "600";
    }
  });
});

/* Показать сообщение об успехе (зелёный) */
function showSuccess(id, msg) {
  var el = document.getElementById(id);
  if (el) { el.className = "result ok"; el.textContent = msg; }
}

/* Показать сообщение об ошибке (красный) */
function showErr(id, msg) {
  var el = document.getElementById(id);
  if (el) { el.className = "result bad"; el.textContent = msg; }
}
