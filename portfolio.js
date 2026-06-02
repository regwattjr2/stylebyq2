/**
 * Styled By Q - Portfolio Page Interactions
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

    // 2. Mobile Responsive Navigation Toggle matching index.html
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('open');
        const isOpen = mainNav.classList.contains('open');
        mobileMenuBtn.innerHTML = isOpen 
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
    });

    // 3. Before/After Sliders Logic
    const sliders = document.querySelectorAll('.slider-wrapper');
    
    sliders.forEach(slider => {
        const range = slider.querySelector('.slider-range');
        const revealContainer = slider.querySelector('.reveal-container');
        const bar = slider.querySelector('.slider-bar');
        const button = slider.querySelector('.slider-button');
        
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
        
        let isShowingAfter = true;
        
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
});
