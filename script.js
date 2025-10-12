// Header text typing code starts

function changeAboutMeText() {
  const aboutMeTexts = [
    "Tech Enthusiast",
    "Frontend Developer",
    "Web Developer",
  ]; // Add more texts as needed
  const typingSpeed = 100; // milliseconds per character
  const eraseSpeed = 50; // milliseconds per character during erasing
  const pauseTime = 1500; // milliseconds to pause between each text change
  const aboutMeElement = document.querySelector(".about-me");

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = aboutMeTexts[textIndex];
    /* Typing */
    if (!isDeleting && charIndex < currentText.length) {
      aboutMeElement.textContent += currentText[charIndex];
      charIndex++;
      setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      /* Erasing */
      aboutMeElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(type, eraseSpeed);
    } else {
      /* Switching the deleting or Typing process */
      isDeleting = !isDeleting;
      if (!isDeleting) {
        textIndex = (textIndex + 1) % aboutMeTexts.length;
      }
      setTimeout(type, pauseTime);
    }
  }

  type();
}

changeAboutMeText();

// Header text typing code ends

/* Progress bar animation code starts */

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector(".progress-bar");
        const progress = progressBar.dataset.progress;

        progressBar.style.setProperty("--progress", `${progress}%`); // Set custom property for progress
        progressBar.classList.add("animated"); // Add a class to trigger animation
        observer.unobserve(entry.target); // Stop observing once animation is triggered
      }
    });
  });

  const programmingLanguages = document.querySelectorAll(
    "#programming-languages .skill"
  );
  programmingLanguages.forEach((skill) => {
    observer.observe(skill);
  });
});

/* Progress bar animation code ends */

/* Navbar code starts */

const navLinks = document.querySelectorAll(".nav-link");
const hamburger = document.querySelector(".navbar .hamburger");
const navMenu = document.querySelector(".navbar ul");
const closeMenu = document.querySelector(".close-menu");
const navbar = document.querySelector(".navbar");

// Smooth scroll and menu close on link click
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetSection = document.querySelector(this.getAttribute("href"));
    window.scrollTo({
      top: targetSection.offsetTop - 68,
      behavior: "smooth",
    });

    // Close the mobile menu & remove blur when link is clicked
    if (window.innerWidth <= 768) {
      navMenu.classList.remove("nav-active");
      navbar.classList.remove("nav-blur");
    }
  });
});

// Hamburger and close icon JS

hamburger.addEventListener("click", () => {
  navMenu.classList.add("nav-active");
  document.querySelector(".navbar").classList.add("nav-blur");
});

closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("nav-active");
  document.querySelector(".navbar").classList.remove("nav-blur");
});

/* Navbar Code Ends */

// Contact Form to EmailJS Connection Code Starts

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceID = "service_p63b8js";
    const templateID = "template_cqhyeca";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        alert("Email sent successfully!");
        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#message").value = "";
      },
      (err) => {
        alert(JSON.stringify(err));
      }
    );
  });

// Contact Form to EmailJS Connection Code Ends

// Scroll to Top Button Code Starts

/* Scroll To Top Button with Progress Bar (Fixed for 6 Sections) */

const scrollBtn = document.getElementById("scrollToTop");
const progressCircle = document.querySelector(".progress-ring__circle");
const radius = progressCircle.r.baseVal.value;
let circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = `${circumference}`;

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;

  // Calculate scrollable height correctly (include all sections)
  const scrollableHeight = docHeight - winHeight;

  // Prevent division by zero (on very short pages)
  const scrollPercent = scrollableHeight > 0 ? scrollTop / scrollableHeight : 0;

  // Update progress ring
  const offset = circumference - scrollPercent * circumference;
  progressCircle.style.strokeDashoffset = offset;

  // Show/hide button after header
  const headerHeight = document.querySelector(
    "#call_from_nav_header"
  ).offsetHeight;
  if (scrollTop > headerHeight) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", updateProgress);

// Recalculate circumference on window resize (for mobile fix)
window.addEventListener("resize", () => {
  const newRadius = window.innerWidth <= 480 ? 20 : 28;
  circumference = 2 * Math.PI * newRadius;
  progressCircle.style.strokeDasharray = `${circumference}`;
  updateProgress();
});

// Smooth scroll to top
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Scroll to Top Button Code Ends

// Dark Mode enabling and disabling code starts

const toggleButton = document.getElementById("darkModeToggle");
const darkModeIcon = document.getElementById("darkModeIcon");

// Load previous preference from localStorage
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeIcon.src = "./assets/images/light-mode-icon.png";
} else {
  darkModeIcon.src = "./assets/images/dark-mode-icon.png";
}

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    darkModeIcon.src = "./assets/images/light-mode-icon.png";
    localStorage.setItem("darkMode", "enabled");
  } else {
    darkModeIcon.src = "./assets/images/dark-mode-icon.png";
    localStorage.setItem("darkMode", "disabled");
  }
});

// Dark Mode enabling and disabling code ends
