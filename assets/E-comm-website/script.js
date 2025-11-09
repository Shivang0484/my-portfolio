// Navbar Code Starts
let hamburger = document.querySelector(".hamburger");
let mobileLinks = document.querySelector(".mobile-links");
let closeIcon = document.querySelector(".close-icon");

hamburger.addEventListener("click", () => {
  mobileLinks.classList.add("hamburger-active");
  mobileLinks.classList.add('bg-blur');
});

closeIcon.addEventListener("click", () => {
  mobileLinks.classList.remove("hamburger-active");
  mobileLinks.classList.remove('bg-blur');
});

menuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileLinks.classList.remove('hamburger-active');
    mobileLinks.classList.remove('bg-blur');
  });
});
// Navbar Code Ends

// Image Carousel Code Starts
const carousel = document.getElementById("carousel");
const carouselInner = document.getElementById("carouselInner");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.getElementById("dots").children;
const totalSlides = dots.length;
let currentIndex = 0;
let autoSlideInterval;
const slideDelay = 4000;
const initialDelay = 3000;

function showSlide(index) {
  carouselInner.style.transform = `translateX(-${index * 100}%)`;

  for (let i = 0; i < totalSlides; i++) {
    dots[i].classList.toggle("active", i === index);
  }

  currentIndex = index;
}

function nextSlide() {
  let nextIndex = (currentIndex + 1) % totalSlides;
  showSlide(nextIndex);
}

function prevSlide() {
  let prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(prevIndex);
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoSlide();
});

for (let i = 0; i < totalSlides; i++) {
  dots[i].addEventListener("click", () => {
    showSlide(i);
    resetAutoSlide();
  });
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, slideDelay);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

setTimeout(() => {
  showSlide(0);
  startAutoSlide();
}, initialDelay);

carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);
// Image Carousel Code Ends
