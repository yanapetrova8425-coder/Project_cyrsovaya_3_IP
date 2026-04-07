/*
 * main.js — обработка отправки всех форм через AJAX (fetch + FormData).
 * Данные уходят методом POST. Сервер принимает через $_POST.
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

  /* Минимальная дата — сегодня */
  var dateInput = document.getElementById("book_date");
  if (dateInput) {
    dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
  }

  /* ============================================
     Форма записи — POST через FormData
     ============================================ */
  var bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validBooking()) return;

      var formData = new FormData(bookingForm);
      formData.set("action", "create_booking");
      formData.set("client_name", formData.get("name"));
      formData.set("client_phone", formData.get("phone"));
      formData.set("client_email", formData.get("email") || "");
      formData.set("service", formData.get("service"));
      formData.set("master", formData.get("master") || "");
      formData.set("booking_date", formData.get("date"));
      formData.set("booking_time", formData.get("time"));
      formData.set("comment", formData.get("comment") || "");

      fetch("php/post.php", {
        method: "POST",
        body: formData,
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
     Форма входа — POST через FormData
     ============================================ */
  var loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validLogin()) return;

      var formData = new FormData(loginForm);
      formData.set("action", "login");

      fetch("php/post.php", {
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
          showErr("login-result", "Ошибка подключения к серверу");
        });
    });
  }

  /* ============================================
     Форма регистрации — POST через FormData
     ============================================ */
  var regForm = document.getElementById("register-form");
  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validReg()) return;

      var formData = new FormData(regForm);

      fetch("php/post.php", {
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
          showErr("register-result", "Ошибка подключения к серверу");
        });
    });
  }

  /* ============================================
     Форма отзыва — POST через FormData
     ============================================ */
  var reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameEl = document.getElementById("review_name");
      var textEl = document.getElementById("review_text");
      var valid = true;
      if (!nameEl.value.trim()) { showErr("review_name", "review-name-error", "Введите имя"); valid = false; }
      else { clearErr("review_name", "review-name-error"); }
      if (!textEl.value.trim()) { showErr("review_text", "review-text-error", "Напишите отзыв"); valid = false; }
      else { clearErr("review_text", "review-text-error"); }
      if (!valid) return;

      var formData = new FormData(reviewForm);
      formData.set("action", "create_review");
      formData.set("client_name", formData.get("name"));
      formData.set("review_text", formData.get("text"));

      fetch("php/post.php", {
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
          showErr("review-result", "Ошибка подключения к серверу");
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
