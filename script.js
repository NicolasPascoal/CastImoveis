document.querySelectorAll("[data-carousel]").forEach(carousel => {
  const images = carousel.querySelector(".carousel-images");
  const total = images.children.length;
  let index = 0;

  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  function updateCarousel() {
    images.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    updateCarousel();
  });
});
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
