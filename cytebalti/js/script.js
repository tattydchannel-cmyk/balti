/**
 * script.js — Главный файл скриптов сайта "Бельцы — мой город"
 * Содержит: мобильное меню, анимации, форма, галерея-лайтбокс, счётчик
 */

/* ================================================
   1. МОБИЛЬНОЕ МЕНЮ (hamburger)
   ================================================ */
function mobileMenu() {
    var nav = document.querySelector("nav");
    if (!nav) return;
    nav.classList.toggle("mobile");
}

// Закрывать мобильное меню при клике на ссылку
document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector("nav");
    if (!nav) return;

    var links = nav.querySelectorAll("a");
    links.forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 800) {
                nav.classList.remove("mobile");
            }
        });
    });

    // При изменении размера окна убирать мобильное меню
    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            nav.classList.remove("mobile");
        }
    });

    /* ================================================
       2. АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК (scroll-reveal)
       ================================================ */
    var cards = document.querySelectorAll(".fact-card, .gallery-item, .loc");
    if (cards.length > 0) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        cards.forEach(function (card) {
            observer.observe(card);
        });
    }

    /* ================================================
       3. СЧЁТЧИК ДНЕЙ С ОСНОВАНИЯ ГОРОДА
       ================================================ */
    var counterEl = document.getElementById("days-counter");
    if (counterEl) {
        // Вычисляем количество дней с 1421 года
        var founded = new Date(1421, 0, 1);
        var today = new Date();
        var diff = Math.floor((today - founded) / (1000 * 60 * 60 * 24));
        counterEl.textContent = diff.toLocaleString("ru-RU");
    }
});

/* ================================================
   4. АНИМИРОВАННЫЙ СЧЁТЧИК (кнопка)
   ================================================ */
function animateCounter() {
    var counterEl = document.getElementById("days-counter");
    if (!counterEl) return;

    var founded = new Date(1421, 0, 1);
    var today = new Date();
    var target = Math.floor((today - founded) / (1000 * 60 * 60 * 24));
    var current = 0;
    var step = Math.ceil(target / 120);
    var interval = setInterval(function () {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        counterEl.textContent = current.toLocaleString("ru-RU");
    }, 16);
}

/* ================================================
   5. ЛАЙТБОКС ДЛЯ ГАЛЕРЕИ
   ================================================ */
function openLightbox(figureEl) {
    var lightbox = document.getElementById("lightbox");
    var lbImg = document.getElementById("lightbox-img");
    var lbCaption = document.getElementById("lightbox-caption");
    if (!lightbox || !lbImg) return;

    var img = figureEl.querySelector("img");
    var caption = figureEl.querySelector("figcaption");

    lbImg.src = img.src;
    lbImg.alt = img.alt;
    if (lbCaption && caption) lbCaption.textContent = caption.textContent;

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden"; // блокируем прокрутку
}

function closeLightbox() {
    var lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
}

// Закрытие лайтбокса по клавише Escape
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
});

/* ================================================
   6. ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ
   ================================================ */
function submitForm(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку

    var form = event.target;
    var result = document.getElementById("form-result");

    // Получаем значения полей
    var name = form.querySelector("#fname") ? form.querySelector("#fname").value.trim() : "";
    var email = form.querySelector("#femail") ? form.querySelector("#femail").value.trim() : "";
    var message = form.querySelector("#fmessage") ? form.querySelector("#fmessage").value.trim() : "";

    // Простая валидация на клиентской стороне
    if (!name || !email || !message) {
        showFormResult(result, "error", "Пожалуйста, заполните все обязательные поля (*).");
        return;
    }

    // Проверка формата email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormResult(result, "error", "Пожалуйста, введите корректный email адрес.");
        return;
    }

    showFormResult(result, "success", "Сообщение отправляется. Если первый раз используешь этот адрес с FormSubmit, нужно подтвердить письмо в своей почте и проверить спам.");

    window.setTimeout(function () {
        form.submit();
    }, 300);
}

// Вспомогательная функция: показывает результат формы с анимацией
function showFormResult(el, type, text) {
    if (!el) return;
    el.textContent = text;
    el.className = "form-result " + type + " visible";
    // Автоматически скрыть через 6 секунд
    setTimeout(function () {
        el.classList.remove("visible");
    }, 6000);
}
