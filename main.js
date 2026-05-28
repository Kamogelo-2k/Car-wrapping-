// ============================================
// WRAPPRO - MAIN JAVASCRIPT
// ============================================

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const viewButtons = document.querySelectorAll('.view-btn');

if (lightbox && lightboxClose) {
    // Open lightbox
    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const portfolioItem = button.closest('.portfolio-item');
            const title = portfolioItem.querySelector('h3')?.textContent || 'Project';
            const description = portfolioItem.querySelector('p')?.textContent || 'Description';
            
            document.getElementById('lightboxTitle').textContent = title;
            document.getElementById('lightboxDescription').textContent = description;

            const sourceImg = portfolioItem.querySelector('.portfolio-image img');
            const lightboxImg = document.getElementById('lightboxImg');
            if (lightboxImg && sourceImg) {
                lightboxImg.src = sourceImg.src;
                lightboxImg.alt = sourceImg.alt || title;
            }
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Before & After Slider
const baSlider = document.getElementById('baSlider1');
if (baSlider) {
    baSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        const beforeImage = document.querySelector('.ba-before');
        if (beforeImage) {
            beforeImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        }
    });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form Submission Handlers
const contactForm = document.getElementById('contactForm');


if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to your backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Thank you for your message!');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     alert('There was an error sending your message. Please try again.');
        // });
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate on Scroll (Simple Implementation)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item, .process-step, .mission-card, .team-member');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Number Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number, .badge-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const isYear = target.includes('-Year');
    
    let numericValue = parseInt(target.replace(/\D/g, ''));
    if (!numericValue) return;
    
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < numericValue) {
            let displayValue = Math.floor(current);
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (isPlus) {
                element.textContent = displayValue + '+';
            } else if (isYear) {
                element.textContent = displayValue + '-Year';
            } else {
                element.textContent = displayValue.toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ============================================
// PAYPAL — set your Client ID (Sandbox for testing)
// https://developer.paypal.com/dashboard/applications/sandbox
// ============================================
const WRAPPRO_PAYPAL = {
    clientId: 'YOUR_PAYPAL_CLIENT_ID',
    currency: 'ZAR',
    bookingFee: '250.00',
    itemName: 'WrapPro Appointment Booking Fee'
};

// Booking + PayPal (pricing page only)
(function initPayPalBooking() {
    const form = document.getElementById('appointmentForm');
    const container = document.getElementById('paypal-button-container');
    const notice = document.getElementById('paypal-notice');
    const wrapper = document.getElementById('booking-payment-wrapper');
    const confirmed = document.getElementById('bookingConfirmation');
    const terms = document.getElementById('termsAgreement');
    const dateInput = document.getElementById('preferredDate');

    if (!form || !container) return;

    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }

    function validateBooking() {
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }
        if (terms && !terms.checked) {
            alert('Please accept the booking fee terms.');
            return false;
        }
        return true;
    }

    function showConfirmed(details) {
        if (wrapper) wrapper.hidden = true;
        if (confirmed) {
            confirmed.hidden = false;
            const ref = document.getElementById('booking-paypal-ref');
            if (ref && details?.id) {
                ref.textContent = 'PayPal reference: ' + details.id;
                ref.hidden = false;
            }
            confirmed.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function showNotice(msg, type) {
        if (!notice) return;
        notice.textContent = msg;
        notice.className = 'paypal-notice visible ' + (type || '');
    }

    if (!WRAPPRO_PAYPAL.clientId || WRAPPRO_PAYPAL.clientId.includes('YOUR_PAYPAL')) {
        showNotice('Add your PayPal Client ID in main.js (WRAPPRO_PAYPAL.clientId) to enable payments.', 'warning');
        return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(WRAPPRO_PAYPAL.clientId)}&currency=ZAR&intent=capture`;
    script.async = true;
    script.onload = () => {
        window.paypal.Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
            onClick(data, actions) {
                if (!validateBooking()) return actions.reject();
            },
            createOrder(data, actions) {
                const fd = new FormData(form);
                return actions.order.create({
                    purchase_units: [{
                        description: 'Non-refundable booking fee — credited to final invoice',
                        amount: {
                            currency_code: 'ZAR',
                            value: WRAPPRO_PAYPAL.bookingFee
                        },
                        custom_id: String(fd.get('email') || '').slice(0, 127)
                    }]
                });
            },
            onApprove(data, actions) {
                return actions.order.capture().then(showConfirmed);
            },
            onError() {
                showNotice('Payment failed. Please try again or contact us.', 'error');
            },
            onCancel() {
                showNotice('Payment cancelled. Your slot is not reserved until the fee is paid.', 'warning');
            }
        }).render('#paypal-button-container');
    };
    script.onerror = () => showNotice('Could not load PayPal. Check your connection.', 'error');
    document.body.appendChild(script);
})();

// Console Message
console.log('%cWrapPro Car Wrapping', 'color: #e63946; font-size: 20px; font-weight: bold;');
console.log('%cPremium Vehicle Wrapping Services', 'color: #b0b0b0; font-size: 14px;');

