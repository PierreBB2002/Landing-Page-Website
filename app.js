// Function to scroll to a specific part of the page (section1, section2, section3, etc.)
function scrollToSection(id) {
    const section = document.getElementById(id);
    // Calculate the position where the program should scroll to
    let scrollTo = section.offsetTop - document.querySelector('header').offsetHeight;
    window.scrollTo({
        top: scrollTo,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Dynamically generate and add the items for the navigation bar
    const navigatorbarList = document.getElementById('navbar__list');
    // This array contains all sections created in the HTML file
    const sections = document.querySelectorAll('section');

    // Create and append navigation buttons
    sections.forEach(section => {
        const button = document.createElement('button');
        button.textContent = section.querySelector('h3').textContent;
        // Event handler when clicking the button
        button.setAttribute('onclick', `scrollToSection('${section.id}')`);
        const listItem = document.createElement('li');
        listItem.appendChild(button);
        navigatorbarList.appendChild(listItem);
    });

    // This button should appear when the user starts scrolling, allowing the user to return to the top of the page
    const scrollToTopButton = document.getElementById('scrollToTheTop');

    // Event listener for scroll
    window.addEventListener('scroll', () => {
        // When the scrolled page is over 300, the button "Go Top" should appear immediately
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            // Otherwise, the Go Top button shouldn't appear
            scrollToTopButton.classList.remove('show');
        }

        // Handle scroll and highlight active section
        handleScroll();
    });

    // The button should work when the user clicks on it, and scroll to the top after that
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            // This behavior is to scroll smoothly
            behavior: 'smooth'
        });
    });

    // Initial call to handleScroll to highlight the correct section on page load
    handleScroll();
});

// Function to handle scroll and highlight the current position section
function handleScroll() {
    // Get all sections and save them in array
    const sections = document.querySelectorAll('section');

    // Get all the navigation bar buttons
    const navButtons = document.querySelectorAll('nav button');

    let currentSectionId = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const headerHeight = document.querySelector('h2').offsetHeight;

        // Check if the section is in the viewport
        if (rect.top > 0 && rect.top < window.outerHeight - headerHeight) {
            // Take the section ID
            currentSectionId = section.id;
        }
    });

    navButtons.forEach(buttonInNav => {
        // Remove active class from all buttons
        buttonInNav.classList.remove('active');
        if (buttonInNav.getAttribute('onclick').includes(currentSectionId)) {
            // Activate the highlight part in CSS when reaching the section
            buttonInNav.classList.add('active');
        }
    });

    sections.forEach(section => {
        // Remove active class from all sections
        section.classList.remove('active');
        if (section.id === currentSectionId) {
            // Add active class to the current section
            section.classList.add('active');
        }
    });
}

// Event listener for scroll
window.addEventListener('scroll', handleScroll);
