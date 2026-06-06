/**
 * Styled By Q - Portfolio Page Interactions
 * Security: No innerHTML usage, no inline event handlers
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header scroll styling matching index.html
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Navigation Toggle
    // Uses CSS class toggling instead of innerHTML to prevent XSS vectors.
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        mobileMenuBtn.classList.toggle('active');
    });

    // 3. Before/After Sliders Logic
    const sliders = document.querySelectorAll('.slider-wrapper');
    
    sliders.forEach(slider => {
        const range = slider.querySelector('.slider-range');
        
        function updateSlider(value) {
            // Set the custom CSS variable for modern squeeze-free clip-path
            slider.style.setProperty('--exposure', `${value}%`);
        }
        
        // Handle input events
        range.addEventListener('input', (e) => {
            updateSlider(e.target.value);
        });
        
        // Handle window resizing (ensures correct scaling)
        window.addEventListener('resize', () => {
            updateSlider(range.value);
        });
        
        // Initial setup
        updateSlider(range.value);
    });

    // 4. Click-to-Toggle Before/After Gallery Cards
    const toggleCards = document.querySelectorAll('.portfolio-toggle-card');
    
    toggleCards.forEach(card => {
        const toggleBtn = card.querySelector('.toggle-badge');
        const viewBefore = card.querySelector('.view-before');
        const viewAfter = card.querySelector('.view-after');
        let isShowingAfter = viewAfter.classList.contains('active');
        
        toggleBtn.addEventListener('click', () => {
            if (isShowingAfter) {
                // Show Before
                viewAfter.classList.remove('active');
                viewBefore.classList.add('active');
                toggleBtn.textContent = 'Show After';
                toggleBtn.classList.add('before-active');
                isShowingAfter = false;
            } else {
                // Show After
                viewBefore.classList.remove('active');
                viewAfter.classList.add('active');
                toggleBtn.textContent = 'Show Before';
                toggleBtn.classList.remove('before-active');
                isShowingAfter = true;
            }
        });
    });

    // 5. Newsletter Form Handler (moved from inline onsubmit)
    const newsletterForm = document.getElementById('newsletter-form-portfolio');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        });
    }
});
