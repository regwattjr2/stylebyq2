/**
 * Styled By Q - Magnolia-Inspired Services JS Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header & Shrink Scroll Effect
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Responsive Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        // Toggle mobile icon styling
        const isOpen = mainNav.classList.contains('open');
        mobileMenuBtn.innerHTML = isOpen 
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
    });

    // Close mobile nav when clicking a link
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mainNav.classList.remove('open');
            mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
        });
    });

    // 3. Scroll Intersection Observer for Active Nav State
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. Testimonials Slider Carousel
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-slide-btn');
    const nextBtn = document.getElementById('next-slide-btn');
    let currentSlideIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        currentSlideIndex = (index + slides.length) % slides.length;
        slides[currentSlideIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    // Set up controls
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto cycle testimonials
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 8000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    // 5. Escape Key listener to close Drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBookingDrawer();
        }
    });

    // Click outside to close drawer
    const overlay = document.getElementById('booking-drawer-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeBookingDrawer();
        }
    });
});

// 6. Interactive Booking Drawer Modal Functions
function openBookingDrawer(serviceName = 'General Inquiry') {
    const overlay = document.getElementById('booking-drawer-overlay');
    const serviceSelect = document.getElementById('selected-service');
    const form = document.getElementById('booking-inquiry-form');
    const successMsg = document.getElementById('drawer-success-msg');
    
    // Reset form states
    form.style.display = 'block';
    successMsg.style.display = 'none';
    form.reset();
    
    // Match option in select dropdown
    if (serviceName && serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value === serviceName) {
                serviceSelect.selectedIndex = i;
                break;
            }
        }
    }
    
    // Open drawer
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
}

function closeBookingDrawer() {
    const overlay = document.getElementById('booking-drawer-overlay');
    overlay.classList.remove('open');
    document.body.style.overflow = ''; // Unlock background scrolling
}

// 7. Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('booking-inquiry-form');
    const successMsg = document.getElementById('drawer-success-msg');
    
    // Collect form fields
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const service = document.getElementById('selected-service').value;
    const details = document.getElementById('client-details').value;
    
    // Log details for debugging (In a production env, this sends to a backend/API)
    console.log('Sending Inquiry:', { name, email, service, details });
    
    // Simulate sending animation
    const submitBtn = document.getElementById('btn-submit-inquiry');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success state
        form.style.display = 'none';
        successMsg.style.display = 'block';
    }, 1200);
}
