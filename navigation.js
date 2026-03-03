/**
 * Dynamic Contextual Navigation Logic
 * prioritizes "Home" link and removes "Current Page" link to avoid redundancy.
 */
document.addEventListener('DOMContentLoaded', function () {
    const navLinksContainer = document.querySelector('.nav-links');
    const navContainer = document.querySelector('.nav-container');

    if (!navLinksContainer || !navContainer) return;

    // Create Hamburger Menu Icon
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<div></div><div></div><div></div>';
    navContainer.appendChild(hamburger);

    const navItems = [
        { name: 'Shipping', url: 'shipping.html' },
        { name: 'Mailboxes', url: 'mailboxes.html' },
        { name: 'Copy & Print', url: 'print.html' },
        { name: 'Legal', url: 'legal.html' },
        { name: 'AI Tools', url: 'ai-tools.html' },
        { name: 'Branding', url: 'branding.html' },
        { name: 'Creative & Publishing', url: 'creative.html' },
        { name: 'Retail', url: 'retail.html' }
    ];

    const path = window.location.pathname;
    // Robust detection: handle both slash types, remove fragments/queries, and decode URI components
    let currentPage = decodeURIComponent(path.split(/[/\\]/).pop()).split(/[?#]/)[0] || 'CR_index.html';

    // Fallback: If path ends in a trailing slash or is empty
    if (currentPage === '' || currentPage === '/') currentPage = 'CR_index.html';

    const isHomePage = currentPage === 'CR_index.html' || currentPage === 'index.html';

    let html = '';

    // Rule 1: "Home First" Rule - On every internal page, start with "Home"
    if (!isHomePage) {
        // Use relative path with dot-slash to ensure local file navigation works across all browsers
        html += `<a href="./CR_index.html">Home</a>`;
    }

    // Rule 2: "No Redundancy" Filter - If current_page == nav_link, do not render that link
    navItems.forEach(item => {
        // Handle potential case mismatches or different path structures
        if (item.url !== currentPage && item.url !== 'CR_index.html') {
            html += `<a href="./${item.url}">${item.name}</a>`;
        }
    });

    navLinksContainer.innerHTML = html;


    // Toggle Mobile Menu
    hamburger.addEventListener('click', function () {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!navLinksContainer.contains(event.target) && !hamburger.contains(event.target)) {
            navLinksContainer.classList.remove('active');
            hamburger.classList.remove('open');
        }
    });
});

