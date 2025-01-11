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

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const classicDartsButton = document.getElementById('classicDartsButton');
    const killerButton = document.getElementById('killerButton');
    const battleFieldButton = document.getElementById('battleFieldButton');
    const leaderBoardButton = document.getElementById('leaderBoardButton');
    const myStatsButton = document.getElementById('myStatsButton');
    const myProfileButton = document.getElementById('myProfileButton');
    const contentArea = document.getElementById('contentArea');

    classicDartsButton.addEventListener('click', function() {
        contentArea.innerHTML = `
            <h2>Classic Darts</h2>
            <p>Welcome to the Classic Darts game. Here you can enjoy the traditional darts game and improve your skills!</p>
        `;
    });

    killerButton.addEventListener('click', function() {
        contentArea.innerHTML = `
            <h2>Killer</h2>
            <p>Welcome to Killer Darts! Test your accuracy and precision in this exciting variant of darts.</p>
        `;
    });

    battleFieldButton.addEventListener('click', function() {
        contentArea.innerHTML = `
            <h2>Battle Field</h2>
            <p>Welcome to Battle Field! Compete in multiplayer battles and show off your dart skills.</p>
        `;
    });

    leaderBoardButton.addEventListener('click', function() {
        contentArea.innerHTML = `
            <h2>Leader Board</h2>
            <p>Check out the Leader Board and see who the top players are!</p>
        `;
    });

    myStatsButton.addEventListener('click', function() {
        contentArea.innerHTML = `
            <h2>My Stats</h2>
            <p>View your personal statistics and progress in the game.</p>
        `;
    });

    myProfileButton.addEventListener('click', function() {
        contentArea.innerHTML = `
            <h2>My Profile</h2>
            <p>Manage your profile, update your settings, and view your achievements.</p>
        `;
    });
});
