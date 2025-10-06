// Qatar Cancer Society Conference 2025 - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // Registration Form Handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your registration! You will receive a confirmation email shortly with payment instructions.');
            closeRegistrationForm();
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Navigation Highlight on Scroll (for single page)
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// Registration Modal Functions
function showRegistrationForm(category) {
    const modal = document.getElementById('registrationModal');
    const formTitle = document.getElementById('formTitle');
    const feeAmount = document.getElementById('feeAmount');
    const studentIdField = document.getElementById('studentIdField');

    if (!modal) return;

    // Set form title and fee based on category
    let title = 'Registration Form';
    let fee = 'QAR 200';

    switch(category) {
        case 'professional':
            title = 'Healthcare Professional Registration';
            fee = 'QAR 200';
            studentIdField.style.display = 'none';
            break;
        case 'student':
            title = 'Student Registration';
            fee = 'QAR 50';
            studentIdField.style.display = 'block';
            break;
        case 'public':
            title = 'Public / Volunteer Registration';
            fee = 'FREE';
            studentIdField.style.display = 'none';
            break;
    }

    formTitle.textContent = title;
    feeAmount.textContent = fee;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeRegistrationForm() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling

        // Reset form
        const form = document.getElementById('registrationForm');
        if (form) {
            form.reset();
        }
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('registrationModal');
    if (modal && event.target === modal) {
        closeRegistrationForm();
    }
});

// Close modal on Escape key
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeRegistrationForm();
    }
});

// Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.highlight-card, .reg-card, .committee-list li, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Form Validation Helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{8,}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add form validation if registration form exists
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        const emailInput = registrationForm.querySelector('input[type="email"]');
        const phoneInput = registrationForm.querySelector('input[type="tel"]');

        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.style.borderColor = 'red';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        }

        if (phoneInput) {
            phoneInput.addEventListener('blur', function() {
                if (this.value && !validatePhone(this.value)) {
                    this.style.borderColor = 'red';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        }
    }
});

// Print functionality (for certificate or registration confirmation)
function printPage() {
    window.print();
}

// Share functionality
function shareOnSocialMedia(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${title}%20${url}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Console welcome message
console.log('%cWelcome to Qatar Cancer Society Conference 2025!', 'color: #8B1538; font-size: 20px; font-weight: bold;');
console.log('%cJoin us in the fight against cancer.', 'color: #666; font-size: 14px;');
console.log('%cFor more information, visit: www.qcs.qa', 'color: #666; font-size: 14px;');
