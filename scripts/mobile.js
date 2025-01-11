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

    const classicDartsButton = document.getElementById('classicDartsButton');
    const contentArea = document.getElementById('contentArea');

    classicDartsButton.addEventListener('click', function() {
        contentArea.innerHTML = `
            <h2>Classic Darts</h2>
            <p>Set up your game below:</p>
            <div id="setupForm" class="setup-form">
                <div class="form-group">
                    <label for="numSets">Number of Sets (1-8):</label>
                    <input type="number" id="numSets" min="1" max="8" value="1">
                </div>
                
                <div class="form-group">
                    <p>Game Format:</p>
                    <label>
                        <input type="radio" name="gameFormat" value="firstTo" checked> First to
                    </label>
                    <label>
                        <input type="radio" name="gameFormat" value="bestOf"> Best of
                    </label>
                </div>

                <div class="form-group">
                    <label for="playerName">Add Player:</label>
                    <div class="add-player-container">
                        <input type="text" id="playerName" placeholder="Enter player name">
                        <button id="addPlayerButton">Add Player</button>
                    </div>
                </div>

                <div id="playerList" class="player-list"></div>

                <button id="startGameButton" class="centered-button">Start Game</button>
            </div>
        `;

        const playerList = document.getElementById('playerList');
        const addPlayerButton = document.getElementById('addPlayerButton');
        const startGameButton = document.getElementById('startGameButton');

        const players = []; // Array to store player names

        // Add Player Functionality
        addPlayerButton.addEventListener('click', function() {
            const playerNameInput = document.getElementById('playerName');
            const playerName = playerNameInput.value.trim();

            if (playerName) {
                players.push(playerName);
                playerNameInput.value = ''; // Clear input field

                // Display updated player list
                playerList.innerHTML = players
                    .map(
                        (player) => `
                            <div class="player-item">
                                <img src="images/user-icon.png" alt="User Icon" class="player-icon">
                                <span>${player}</span>
                            </div>
                        `
                    )
                    .join('');
            } else {
                alert('Please enter a valid player name.');
            }
        });

        // Start Game Button Functionality
        startGameButton.addEventListener('click', function() {
            const numSets = document.getElementById('numSets').value;
            const gameFormat = document.querySelector('input[name="gameFormat"]:checked').value;

            if (numSets < 1 || numSets > 8) {
                alert("Please select a valid number of sets between 1 and 8.");
                return;
            }

            if (players.length === 0) {
                alert("Please add at least one player.");
                return;
            }

            contentArea.innerHTML = `
                <h2>Game Settings</h2>
                <p>Number of Sets: ${numSets}</p>
                <p>Game Format: ${gameFormat === 'firstTo' ? 'First to' : 'Best of'} ${numSets}</p>
                <h3>Players:</h3>
                <ul>${players.map((player) => `<li>${player}</li>`).join('')}</ul>
                <p>The game is now ready to start! Enjoy!</p>
            `;
        });
    });
});
