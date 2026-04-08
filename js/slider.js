

document.addEventListener("DOMContentLoaded", function () {
  initSlider("work-slider");
  initSlider("gallery-slider");
});

function initSlider(sliderId) {
  var slider = document.getElementById(sliderId);
  if (!slider) return;

  var track = slider.querySelector(".track");
  var slides = slider.querySelectorAll(".slide");
  var prevBtn = document.getElementById("slider-prev");
  var nextBtn = document.getElementById("slider-next");
  var dotsContainer = document.getElementById("slider-dots");

  if (!track || slides.length === 0) return;

  var currentIndex = 0;
  var totalSlides = slides.length;

  // Создаю точки-индикаторы (по одной на каждый слайд)
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (var i = 0; i < totalSlides; i++) {
      var dot = document.createElement("button");
      dot.className = "dot" + (i === 0 ? " active" : "");
      dot.setAttribute("data-index", i);
      dot.addEventListener("click", goToSlide);
      dotsContainer.appendChild(dot);
    }
  }

  // Переход к слайду по клику на точку
  function goToSlide(e) {
    var index = parseInt(e.target.getAttribute("data-index"));
    currentIndex = index;
    updateSlider();
  }

  // Следующий слайд (% обеспечивает цикличность)
  function goNext() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }

  // Предыдущий слайд
  function goPrev() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  // Двигаю трек через transform: translateX, обновляю активную точку
  function updateSlider() {
    track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
    if (dotsContainer) {
      dotsContainer.querySelectorAll(".dot").forEach(function (dot, i) {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }

  // Кнопки «Назад» / «Вперёд»
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

  // Автопрокрутка каждые 5 секунд
  var autoPlay = setInterval(goNext, 5000);

  // Пауза при наведении мыши
  slider.addEventListener("mouseenter", function () {
    clearInterval(autoPlay);
  });

  slider.addEventListener("mouseleave", function () {
    autoPlay = setInterval(goNext, 5000);
  });

  // Свайпы на мобильных
  var startX = 0;
  var endX = 0;

  slider.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].clientX;
    var diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) { goNext(); } else { goPrev(); }
    }
  });
}
