// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active nav link highlighting
window.addEventListener('scroll', function() {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
        border-bottom: 3px solid var(--primary-color);
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Fade-in effect on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-item, .skill-card, .education-item, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Mobile menu toggle functionality
const mobileMenuToggle = () => {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
};

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Responsive hamburger menu (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    // Create hamburger button for mobile view
    const navContainer = document.querySelector('.nav-container');
    if (navContainer && window.innerWidth <= 768) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.addEventListener('click', mobileMenuToggle);
        navContainer.appendChild(hamburger);
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.remove();
    } else if (!hamburger) {
        const navContainer = document.querySelector('.nav-container');
        const newHamburger = document.createElement('button');
        newHamburger.className = 'hamburger';
        newHamburger.innerHTML = '☰';
        newHamburger.addEventListener('click', mobileMenuToggle);
        navContainer.appendChild(newHamburger);
    }
});

// Add hamburger styling
const hamburgerStyle = document.createElement('style');
hamburgerStyle.textContent = `
    .hamburger {
        display: none;
        background: none;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
        color: var(--primary-color);
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: block;
        }
        
        .nav-menu {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(hamburgerStyle);

// Prevent default and enhance user experience
console.log('Portfolio loaded successfully');
