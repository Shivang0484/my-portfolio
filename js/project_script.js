

/* Header text typing code starts */

function changeAboutMeText() {
    const aboutMeTexts = ["Tech Enthusiast", "Frontend Web Developer", "App Developer"]; // Add more texts as needed
    const typingSpeed = 100; // milliseconds per character
    const eraseSpeed = 50; // milliseconds per character during erasing
    const pauseTime = 1500; // milliseconds to pause between each text change
    const aboutMeElement = document.querySelector('.about-me');

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
        }
        /* Erasing */
        else if (isDeleting && charIndex > 0) {
            aboutMeElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, eraseSpeed);
        }
        /* Switching the deleting or Typing process */
        else {
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

/* Header text typing code ends */




/* Progress bar animation code starts */

document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = progressBar.dataset.progress;

                progressBar.style.setProperty('--progress', `${progress}%`); // Set custom property for progress
                progressBar.classList.add('animated'); // Add a class to trigger animation
                observer.unobserve(entry.target); // Stop observing once animation is triggered
            }
        });
    });

    const programmingLanguages = document.querySelectorAll('#programming-languages .skill');
    programmingLanguages.forEach(skill => {
        observer.observe(skill);
    });
});

/* Progress bar animation code ends */




/* Navbar code starts */

const navLinks = document.querySelectorAll('.nav-link');

// Add click event listener to each link
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the default anchor behavior

        // Get the target section's id from the href attribute
        const targetSection = document.querySelector(this.getAttribute('href'));

        // Smoothly scroll to the target section
        window.scrollTo({
            top: targetSection.offsetTop - 68, // Offset to consider the navbar height
            behavior: 'smooth' // Enable smooth scrolling
        });

        // Close the menu on mobile after clicking a link
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('nav-active');
        }
    });
});

// Hamburger menu toggle functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('nav-active');
});

/* Navbar code ends */





// connecting form to gmail code starts 



document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // These IDs from the previous steps
    const serviceID = 'service_p63b8js';
    const templateID = 'template_cqhyeca';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Email sent successfully!');
        }, (err) => {
            alert(JSON.stringify(err));
        });
});



// connecting form to gmail code starts 