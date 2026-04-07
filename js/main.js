/*
 * main.js — обработка отправки всех форм через async/await + URLSearchParams.
 * Данные уходят методом POST. Сервер принимает через $_POST.
 */

// URL сервера (измените если ваш сайт доступен по другому пути)
// Если c:\Курсовая — корень сайта: http://localhost/php/post.php
// Если в папке myserver: http://localhost/myserver/php/post.php
const API_URL = "http://localhost/myserver/";

/* ============================================
// РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ (таблица users)
// ============================================ */
async function registerUser(name, phone, email, password) {
    let data = { name, phone, email, password };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(data).toString(),
        });

        let result = await response.json();
        console.log("Ответ сервера (регистрация):", result);

        if (result.status === "success") {
            alert(result.message);
            // Закрываем модалку регистрации, открываем вход
            var regModal = document.getElementById("modal-register");
            var loginModal = document.getElementById("modal-login");
            if (regModal) regModal.classList.remove("show");
            if (loginModal) loginModal.classList.add("show");
            // Показываем результат в форме
            var el = document.getElementById("register-result");
            if (el) { el.className = "result ok"; el.textContent = result.message; }
        } else {
            alert(result.message);
            var el = document.getElementById("register-result");
            if (el) { el.className = "result bad"; el.textContent = result.message; }
        }
    } catch (error) {
        console.error("Ошибка:", error);
        var el = document.getElementById("register-result");
        if (el) { el.className = "result bad"; el.textContent = "Ошибка соединения с сервером"; }
    }
}

/* ============================================
// ВХОД ПОЛЬЗОВАТЕЛЯ (таблица users)
// ============================================ */
async function loginUser(email, password) {
    let data = { email, password };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(data).toString(),
        });

        let result = await response.json();
        console.log("Ответ сервера (вход):", result);

        if (result.status === "success") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user_email", email);

            var el = document.getElementById("login-result");
            if (el) { el.className = "result ok"; el.textContent = result.message; }

            setTimeout(function () {
                window.location.href = "account.html";
            }, 1000);
        } else {
            alert(result.message);
            var el = document.getElementById("login-result");
            if (el) { el.className = "result bad"; el.textContent = result.message; }
        }
    } catch (error) {
        console.error("Ошибка:", error);
        var el = document.getElementById("login-result");
        if (el) { el.className = "result bad"; el.textContent = "Ошибка соединения с сервером"; }
    }
}

/* ============================================
// СОЗДАНИЕ ЗАПИСИ (таблица bookings)
// ============================================ */
async function createBooking(clientName, clientPhone, clientEmail, service, master, bookingDate, bookingTime, confirm, comment) {
    let data = {
        client_name: clientName,
        client_phone: clientPhone,
        client_email: clientEmail,
        service: service,
        master: master,
        booking_date: bookingDate,
        booking_time: bookingTime,
        confirm: confirm,
        comment: comment,
    };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(data).toString(),
        });

        let result = await response.json();
        console.log("Ответ сервера (запись):", result);

        var el = document.getElementById("booking-result");
        if (el) {
            el.className = result.status === "success" ? "result ok" : "result bad";
            el.textContent = result.message;
        }

        if (result.status === "success") {
            var bookingForm = document.getElementById("booking-form");
            if (bookingForm) bookingForm.reset();
        }
    } catch (error) {
        console.error("Ошибка:", error);
        var el = document.getElementById("booking-result");
        if (el) { el.className = "result bad"; el.textContent = "Ошибка соединения с сервером"; }
    }
}

/* ============================================
// СОЗДАНИЕ ОТЗЫВА (таблица reviews)
// ============================================ */
async function createReview(clientName, rating, reviewText) {
    let data = {
        client_name: clientName,
        rating: rating,
        review_text: reviewText,
    };

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(data).toString(),
        });

        let result = await response.json();
        console.log("Ответ сервера (отзыв):", result);

        var el = document.getElementById("review-result");
        if (el) {
            el.className = result.status === "success" ? "result ok" : "result bad";
            el.textContent = result.message;
        }

        if (result.status === "success") {
            var reviewForm = document.getElementById("review-form");
            if (reviewForm) reviewForm.reset();
        }
    } catch (error) {
        console.error("Ошибка:", error);
        var el = document.getElementById("review-result");
        if (el) { el.className = "result bad"; el.textContent = "Ошибка соединения с сервером"; }
    }
}

/* ============================================
// ИНИЦИАЛИЗАЦИЯ ВСЕХ ФОРМ
// ============================================ */
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
    var dateInput = document.getElementById("date");
    if (dateInput) {
        dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);
    }

    /* ============================================
       Форма записи — booking
       ============================================ */
    var bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!validBooking()) return;

            var name = document.querySelector("#name").value.trim();
            var phone = document.querySelector("#phone").value.trim();
            var email = document.querySelector("#email") ? document.querySelector("#email").value.trim() : "";
            var service = document.querySelector("#service").value;
            var master = document.querySelector("#master") ? document.querySelector("#master").value : "";
            var bookingDate = document.querySelector("#date").value;
            var bookingTime = document.querySelector("#time").value;
            var confirmEl = document.querySelector('input[name="confirm"]:checked');
            var confirm = confirmEl ? confirmEl.value : "phone";
            var comment = document.querySelector("#comment") ? document.querySelector("#comment").value.trim() : "";

            console.log("Отправка записи:", { name, phone, email, service, master, bookingDate, bookingTime });
            createBooking(name, phone, email, service, master, bookingDate, bookingTime, confirm, comment);
        });
    }

    /* ============================================
       Форма входа — login
       ============================================ */
    var loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!validLogin()) return;

            var email = document.querySelector("#login-email") ? document.querySelector("#login-email").value.trim()
                              : document.querySelector("#email") ? document.querySelector("#email").value.trim() : "";
            var password = document.querySelector("#login-password") ? document.querySelector("#login-password").value
                           : document.querySelector("#password") ? document.querySelector("#password").value : "";

            console.log("Отправка входа:", { email });
            loginUser(email, password);
        });
    }

    /* ============================================
       Форма регистрации — register
       ============================================ */
    var regForm = document.getElementById("register-form");
    if (regForm) {
        regForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!validReg()) return;

            var nameEl = regForm.querySelector("#reg-name") || regForm.querySelector("#name");
            var phoneEl = regForm.querySelector("#reg-phone") || regForm.querySelector("#phone");
            var emailEl = regForm.querySelector("#reg-email") || regForm.querySelector("#login-email") || regForm.querySelector("#email");
            var passEl = regForm.querySelector("#reg-password") || regForm.querySelector("#login-password") || regForm.querySelector("#password");

            var name = nameEl ? nameEl.value.trim() : "";
            var phone = phoneEl ? phoneEl.value.trim() : "";
            var email = emailEl ? emailEl.value.trim() : "";
            var password = passEl ? passEl.value : "";

            console.log("Отправка регистрации:", { name, phone, email, password });
            registerUser(name, phone, email, password);
        });
    }

    /* ============================================
       Форма отзыва — review
       ============================================ */
    var reviewForm = document.getElementById("review-form");
    if (reviewForm) {
        reviewForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var nameEl = document.querySelector("#name") || document.querySelector("#review_name");
            var textEl = document.querySelector("#text") || document.querySelector("#review_text");
            var ratingEl = document.querySelector('input[name="rating"]:checked');

            var valid = true;
            if (!nameEl || !nameEl.value.trim()) {
                if (nameEl) showErr(nameEl.id, "review-name-error", "Введите имя");
                valid = false;
            } else { clearErr(nameEl.id, "review-name-error"); }
            if (!textEl || !textEl.value.trim()) {
                if (textEl) showErr(textEl.id, "review-text-error", "Напишите отзыв");
                valid = false;
            } else { clearErr(textEl.id, "review-text-error"); }
            if (!valid) return;

            var name = nameEl.value.trim();
            var rating = ratingEl ? parseInt(ratingEl.value) : 5;
            var text = textEl.value.trim();

            console.log("Отправка отзыва:", { name, rating });
            createReview(name, rating, text);
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
