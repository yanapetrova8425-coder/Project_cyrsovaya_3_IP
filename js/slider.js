document.addEventListener("DOMContentLoaded", function () {
  initSlider("work-slider");
  initSlider("gallery-slider");
});

// запускаю слайдер по ID — создаю точки, кнопки и автопрокрутку
function initSlider(sliderId) {
  var slider = document.getElementById(sliderId);
  if (!slider) return;

  var track = slider.querySelector(".slider_track");
  var slides = slider.querySelectorAll(".slider_slide");
  var prevBtn = document.getElementById("slider-prev");
  var nextBtn = document.getElementById("slider-next");
  var dotsContainer = document.getElementById("slider-dots");

  if (!track || slides.length === 0) return;

  var currentIndex = 0;
  var totalSlides = slides.length;

  // создаю точки навигации — по одной на каждый слайд
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

  // перехожу к нужному слайду по клику на точку
  function goToSlide(e) {
    var index = parseInt(e.target.getAttribute("data-index"));
    currentIndex = index;
    updateSlider();
  }

  // следующий слайд — по кругу
  function goNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  // предыдущий слайд — тоже по кругу
  function goPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // двигаю дорожку слайдов и обновляю активную точку
  function updateSlider() {
    track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";

    if (dotsContainer) {
      dotsContainer.querySelectorAll(".slider-dot").forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }

  // кнопки «вперёд/назад»
  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      goPrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      goNext();
    });
  }

  // автопрокрутка каждые 5 секунд
  var autoPlay = setInterval(goNext, 5000);

  // ставлю на паузу при наведении курсора
  slider.addEventListener("mouseenter", function () {
    clearInterval(autoPlay);
  });

  // продолжаю когда курсор уходит
  slider.addEventListener("mouseleave", function () {
    autoPlay = setInterval(goNext, 5000);
  });

  // свайп пальцем на мобильных — влево/вправо
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
