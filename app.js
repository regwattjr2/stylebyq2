/**
 * Styled By Q - Magnolia-Inspired Services JS Controller
 * Security: No innerHTML usage, no inline event handlers, email obfuscation
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Post-Redirect Success Detection
    // After FormSubmit processes the inquiry + sends autoresponse email,
    // it redirects back here with ?inquiry=success. We detect that and
    // auto-open the drawer with the success message.
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('inquiry') === 'success') {
        const overlay = document.getElementById('booking-drawer-overlay');
        const form = document.getElementById('booking-inquiry-form');
        const successMsg = document.getElementById('drawer-success-msg');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        form.style.display = 'none';
        successMsg.style.display = 'block';
        // Clean up URL so refreshing doesn't re-trigger
        window.history.replaceState({}, '', window.location.pathname);
    }

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
    // Uses CSS class toggling instead of innerHTML to prevent XSS vectors.
    // The .active class on the button toggles icon visibility via CSS.
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile nav when clicking a link
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mainNav.classList.remove('open');
            mobileMenuBtn.classList.remove('active');
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

    // 6. Booking Drawer Button Bindings
    // Moved from inline onclick handlers to addEventListener for CSP compliance.
    const bookingBindings = [
        { id: 'btn-header-inquire', service: 'General Inquiry' },
        { id: 'btn-hero-consult', service: 'General Consultation' },
        { id: 'btn-book-consult', service: 'Decorating Consultation' },
        { id: 'btn-book-virtual', service: 'Virtual Design Package' },
        { id: 'btn-book-staging', service: 'Home Staging' },
        { id: 'btn-book-refresh', service: 'Room Styling & Refresh' },
        { id: 'btn-book-full', service: 'Full-Service Decorating' },
        { id: 'btn-book-additional', service: 'Specialty Styling' },
        { id: 'btn-cta-inquire', service: 'General Inquiry' },
    ];

    bookingBindings.forEach(({ id, service }) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => openBookingDrawer(service));
        }
    });

    // Drawer close buttons
    const drawerCloseBtn = document.getElementById('btn-drawer-close');
    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeBookingDrawer);
    }

    const successCloseBtn = document.getElementById('btn-success-close');
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', closeBookingDrawer);
    }

    // 7. Form Submission Handler (moved from inline onsubmit)
    const bookingForm = document.getElementById('booking-inquiry-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }

    // 8. Newsletter Form Handler (moved from inline onsubmit)
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing to our mailing list!');
            newsletterForm.reset();
        });
    }

    // 9. Email Obfuscation
    // Assembles the email address at runtime so bots scanning static HTML
    // cannot harvest it. The mailto link shows "[click to reveal]" until JS loads.
    const emailLink = document.getElementById('email-link');
    if (emailLink) {
        const user = 'info';
        const domain = 'styledbyqinteriors.com';
        const fullEmail = user + '@' + domain;
        emailLink.href = 'mailto:' + fullEmail;
        emailLink.textContent = fullEmail;
    }
});

// 10. Interactive Booking Drawer Modal Functions
function openBookingDrawer(serviceName) {
    serviceName = serviceName || 'General Inquiry';
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

// 11. Form Submission Handler
function handleFormSubmit(event) {
    // Dynamically set the _next URL so FormSubmit redirects back here
    // after the user confirms submission and both emails are sent.
    const nextUrl = document.getElementById('form-next-url');
    if (nextUrl) {
        nextUrl.value = window.location.href.split('?')[0] + '?inquiry=success';
    }
    // Allow the form to submit naturally (no preventDefault).
    // The browser will navigate to FormSubmit's confirmation page,
    // then redirect back here with ?inquiry=success.
}
