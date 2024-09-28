# Canvas Shooting Game

This is a 2D canvas-based shooting game where a player shoots projectiles at randomly spawning enemies, earning points for each hit. The game features visual effects, sound effects, and a score system, all rendered using HTML5 Canvas and JavaScript.

## Features
- **Responsive Design**: Adapts to various screen sizes and maintains playability on both desktop and mobile devices.
- **Player Controls**: Shoot projectiles by clicking/tapping on the screen.
- **Enemy Spawning**: Random enemies appear and move towards the player.
- **Score System**: Points increase with successful hits on enemies.
- **Particle Effects**: Explosions when enemies are destroyed.
- **Sound Effects**: Background music and sound effects for shooting and enemy destruction.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How to Run the Game](#how-to-run-the-game)
- [Game Instructions](#game-instructions)
- [Known Issues](#known-issues)

## Technologies Used
- **HTML5**: Structuring the game layout.
- **CSS3**: For responsive design and game UI.
- **JavaScript**: Core game mechanics, animations, and interactivity.

## How to Run the Game
To play the game locally, follow these steps:

1. **Clone or download** the repository:
   ```bash
   git clone https://github.com/your-username/canvas-shooting-game.git

2. **Open the home.html file in a web browser:** 
- Navigate to the downloaded/cloned directory.
- Double-click on home.html, or use your browser's "Open file" option.

3. **Start Playing:** 
- Click the "Go To Game" button and click on "Start Game" to begin the game.
- Use mouse clicks to shoot projectiles at the approaching enemies.

## Game Instructions
1. **Player**: A circle positioned in the center of the canvas represents the player.
2. **Control**: Click anywhere on the canvas to shoot projectiles towards that location.
3. **Enemies**: Randomly spawn from the edges and move towards the player.
4. **Goal**: Destroy enemies by hitting them with projectiles to earn points.
5. **End Game**: The game ends if an enemy collides with the player, and the final score is displayed.

## Known Issues
1. **Browser Audio Limitations**: Some browsers may block audio from playing until the user interacts with the page (clicks a button, etc.).
2. **Performance**: High particle counts may cause performance issues on lower-end devices, especially during multiple explosions.
