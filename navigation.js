/**
 * Dynamic Contextual Navigation Logic
 * prioritizes "Home" link and removes "Current Page" link to avoid redundancy.
 */
document.addEventListener('DOMContentLoaded', function () {
    const navLinksContainer = document.querySelector('.nav-links');
    if (!navLinksContainer) return;

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
    const currentPage = path.split('/').pop() || 'CR_index.html';
    const isHomePage = currentPage === 'CR_index.html' || currentPage === 'index.html';

    let html = '';

    // Rule 1: "Home First" Rule - On every internal page, start with "Home"
    // Rule 3: Home Page Exception - On the Home Page, "Home" link should not appear
    if (!isHomePage) {
        html += `<a href="CR_index.html">Home</a>`;
    }

    // Rule 2: "No Redundancy" Filter - If current_page == nav_link, do not render that link
    navItems.forEach(item => {
        if (item.url !== currentPage) {
            html += `<a href="${item.url}">${item.name}</a>`;
        }
    });

    navLinksContainer.innerHTML = html;
});
