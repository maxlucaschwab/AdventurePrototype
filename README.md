A simple adventure game by Max Schwab based on a simple adventure game engine by [Adam Smith](https://github.com/rndmcnlly).

Code requirements:
- **4+ scenes based on `AdventureScene`**: Scene1 (bridge), Scene2, (hallway), Scene3 (guard room), and Scene4 (jail cells).
- **2+ scenes *not* based on `AdventureScene`**: unsatisfied (name the classes).
- **2+ methods or other enhancement added to the adventure game engine to simplify my scenes**:
    - Enhancement 1: I added a function called `checkBounds()` which checks for collisions of two objects with physics specified in its arguments. It changes a variable from `false` to `true`.
    - Enhancement 2: I created global variables to easily place the resized pixel art tiles.

Experience requirements:
- **4+ locations in the game world**: Scene1 (bridge), Scene2, (hallway), Scene3 (guard room), and Scene4 (jail cells).
- **2+ interactive objects in most scenes**: Cloak (scene 1), Guard with Key (Scene 1), Door (Scene 1 & 2), Big Doors (Scene 2, 3, and 4), Key (Scene 3), Pot (Scene 3), Jail Door (Scene 4)
- **Many objects have `pointerover` messages**: All above objects have `pointerover` effects, all objects have an outline effect that spawns a sprite with a textured outline around it to indicate that it's selected.
- **Many objects have `pointerdown` effects**: All items that can be picked up have code that bring them to the player's inventory (like the Cloak in scene 1), some change properties of other objects like the Key in scene 3, which changes the troll's properties.
- **Some objects are themselves animated**: items like the Cloak (Scene 1), Jail Door (Scene 4), and Pot (Scene 3) fade out of the scene when clicked, tweening from full opacity to 0.

Asset sources:
- Every art asset was made by me (Max Schwab) using Clip Studio Paint. All art assets were created from scratch.
- `Stone Sliding` asset was sampled from YouTube and cut / normalized by me in Audacity. [StoneSlidingEffect] (https://www.youtube.com/watch?v=zOnMIjl19g8)
- (For each image/audio/video asset used, describe how it was created. What tool did you use to create it? Was it based on another work? If so, how did you change it, and where can we learn more about the original work for comparison? Use [Markdown link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links).)

Code sources:
- `adventure.js` and `index.html` were created for this project [Adam Smith](https://github.com/rndmcnlly) and edited by me.
- `game.js` was sketched by [Adam Smith](https://github.com/rndmcnlly) and rewritten by me.