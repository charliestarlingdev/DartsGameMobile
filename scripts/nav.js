document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    // Toggle Navbar
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Close Navbar when clicking outside
    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target) && !menuIcon.contains(event.target)) {
            navbar.classList.remove('active');
        }
    });
});