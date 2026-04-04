// ===== Слайдер (чистый JS, без jQuery) =====

document.addEventListener("DOMContentLoaded", function () {
  initSlider("work-slider");
  initSlider("gallery-slider");
});

function initSlider(sliderId) {
  var slider = document.getElementById(sliderId);
  if (!slider) return;

  var track = slider.querySelector(".slider-track");
  var slides = slider.querySelectorAll(".slider-slide");
  var prevBtn = document.getElementById("slider-prev");
  var nextBtn = document.getElementById("slider-next");
  var dotsContainer = document.getElementById("slider-dots");

  if (!track || slides.length === 0) return;

  var currentIndex = 0;
  var totalSlides = slides.length;

  // Создаём точки
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement("button");
      dot.className = "slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("data-index", i);
      dot.addEventListener("click", goToSlide);
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(e) {
    var index = parseInt(e.target.getAttribute("data-index"));
    currentIndex = index;
    updateSlider();
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function updateSlider() {
    track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";

    // Обновляем точки
    if (dotsContainer) {
      dotsContainer.querySelectorAll(".slider-dot").forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }

  // Кнопки
  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);

  // Автопрокрутка
  var autoPlay = setInterval(goNext, 5000);

  slider.addEventListener("mouseenter", function () {
    clearInterval(autoPlay);
  });

  slider.addEventListener("mouseleave", function () {
    autoPlay = setInterval(goNext, 5000);
  });

  // Свайп на мобильных
  var startX = 0;
  var endX = 0;

  slider.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].clientX;
    var diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  });
}
