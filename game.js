class Scene1 extends AdventureScene {
    constructor() {
        super("Scene1", "Bridge");
    }
    
    preload() {
        this.load.path = "./assets/";
        this.load.image("bridgeL", "bridge_L.001.png");
        this.load.image("bridgeR", "bridge_R.001.png");
        this.load.image("knight", "knight.001.png");
        this.load.image("troll", "troll.001.png");
        this.load.image("tile", "tile.png");
        this.load.image("cloak", "cloak.png");
        this.load.image("cloakedKnight", "cloakedKnight.png");
        this.load.image("cloak2", "cloakOutline.png");
        this.load.image("trollKey", "trollWithKey.png");
        this.load.image("trollOutline", "trollWithKeyOutline.png");
        this.load.image("door", "door.png");
        this.load.image("doorOutline", "doorOutline.png");
        this.load.image("potKnight", "potKnight.png");
    }

    onEnter() {
        
        this.wall = [
            this.add.image(this.tile * 13, this.tile * 8, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, this.tile * 7, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, this.tile * 6, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, this.tile * 5, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, this.tile * 4, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, this.tile * 3, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, this.tile * 2, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, this.tile * 1, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, this.tile, "tile").setOrigin(0,0),
            this.add.image(this.tile * 13, 0, "tile").setOrigin(0,0),
        ]

        this.wall = [
            this.add.image(this.tile * 14, this.tile * 8, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, this.tile * 7, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, this.tile * 6, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, this.tile * 5, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, this.tile * 4, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, this.tile * 3, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, this.tile * 2, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, this.tile * 1, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, this.tile, "tile").setOrigin(0,0),
            this.add.image(this.tile * 14, 0, "tile").setOrigin(0,0),
        ]

        let bridge01 = this.add.image(this.tile * 0, this.tile * 8, "bridgeR")
            .setOrigin(0, 0);
        let bridge02 = this.add.image(this.tile * 4, this.tile * 8, "bridgeL")
            .setOrigin(0, 0);
        let bridge03 = this.add.image(this.tile * 8, this.tile * 8, "bridgeR")
            .setOrigin(0, 0);
        let bridge04 = this.add.image(this.tile * 12, this.tile * 8, "bridgeL")
            .setOrigin(0, 0);
        let bridge05 = this.add.image(this.tile * 16, this.tile * 8, "bridgeR")
            .setOrigin(0, 0);
        
            this.knight = this.physics.add.sprite(this.tile * 2, this.tile * 8, "knight")
            .setOrigin(0, 1)
            .setDepth(1)
            .setCollideWorldBounds(true);

        this.trollOutline = this.add.sprite(this.tile*11.5, this.tile *8, "trollOutline")
            .setOrigin(0,1)
            .setAlpha(0);
        

        this.inZone = false;
        let keyGot = false
        this.troll01 = this.add.sprite(this.tile * 11.5, this.tile * 8, "trollKey")
            .setOrigin(0, 1)
            .setInteractive()
            .on('pointerover', () => {
                this.trollOutline.setAlpha(1);
                if (keyGot == false) {
                    this.showMessage("Looks like this goober has a key... Maybe there's a way to sneak it off him?")
                    this.boundsTroll = this.physics.add.image(this.tile * 11.5, this.tile * 8, "cloak").setScale(3).setAlpha(0);
                } else {
                    this.showMessage("A Stinkier guy. A cretin.")
                }
            })
            .on('pointerout', () => {
                this.trollOutline.setAlpha(0)
                this.boundsTroll.destroy()
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsTroll);
                if (this.inZone == true && this.inventory.includes('Cloak')) {
                    this.showMessage("You steal the key.");
                    this.gainItem('Door Key');
                    this.troll01.setTexture('troll');
                    this.trollOutline.setTexture('troll');
                    this.trollOutline.destroy();
                    this.boundsTroll.destroy();
                    this.inZone = false;
                    this.troll01 = this.troll02;
                    keyGot = true
                } else if (!this.inventory.includes('Cloak')) {
                    this.showMessage("You should probably get a disguise...")
                } else {
                    this.showMessage("Get closer.");
                }
            });
    
        this.troll02 = this.add.sprite(this.tile * 12.5, this.tile * 8, "troll")
            .setOrigin(0, 1)
            .setDepth(2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Gross Guy; Stinky"));

        this.cloak = this.add.image(this.w * 0.30, this.w * 0.47, "cloak")
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("A raggedy cloak, perfect for sneaking.")
                console.log("once");
                this.cloak2 = this.add.image(this.w*0.30, this.w*0.47, "cloak2");
                this.boundsCloak = this.physics.add.image(this.w * 0.30, this.w*0.47, "cloak").setScale(3).setAlpha(0);
            })
            .on('pointerout', () => {
                this.cloak2.destroy()
                this.boundsCloak.destroy();
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsCloak);
                console.log(this.inZone);
                if (this.inZone == true) {
                    this.showMessage("You pick up the cloak.");
                    this.gainItem('Cloak');
                    this.cloak2.destroy()
                    this.tweens.add({
                        targets: this.cloak,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => this.cloak.destroy(),
                        onComplete: () => this.boundsCloak.destroy(),
                        onComplete: () => this.inZone = false,
                    });
                } else {
                    this.showMessage("You're not close enough!")
                }
            });


        this.door = this.add.sprite(this.tile * 13.5, this.tile * 8, "door")
            .setOrigin(0, 1)
            .setInteractive()
            .on('pointerover', () => {
                this.doorOutline.setAlpha(1);
                if (keyGot == false) {
                    this.showMessage("A locked door...")
                }
                this.boundsDoor = this.physics.add.image(this.tile * 13.5, this.tile * 8, "cloak").setScale(3).setAlpha(0);
            })
            .on('pointerout', () => {
                this.doorOutline.setAlpha(0)
                this.boundsDoor.destroy()
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsDoor);
                if (this.inZone == true && this.inventory.includes('Door Key')) {
                    this.loseItem("Cloak");
                    this.loseItem("Door Key");
                    this.gotoScene("Scene2");

                } else if (!this.inventory.includes('Door Key')) {
                    this.showMessage("You should probably get the key...")
                } else {
                    this.showMessage("Get closer.");
                }
            });

        this.doorOutline = this.add.sprite(this.tile*13.5, this.tile *8, "doorOutline")
            .setOrigin(0,1)
            .setAlpha(0);
        

        this.inZone = false;

    }

    update() {

        this.knight.setVelocity(0);
        let d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        let a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        if (d.isDown) {
            this.knight.setVelocityX(500);
            this.knight.flipX = false;
        }

        if (a.isDown) {
            this.knight.setVelocityX(-500);
            this.knight.flipX = true;
        }

        // console.log(this.inventory);
        // console.log(this.inZone);

        if (this.inventory.includes('Cloak')) {
            this.knight.setTexture('cloakedKnight');
        }

        if (this.inventory.includes('Pot')) {
            this.knight.setTexture('potKnight');
        }


    }
}

class Scene2 extends AdventureScene {
    constructor() {
        super("Scene2", "Hallway");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("knight", "knight.001.png");
        this.load.image("tileLight", "tileLight.png");
        this.load.image("tileMid", "tileMid.png");
        this.load.image("arch", "arch.001.png");
        this.load.image("path", "doorway.png");
        this.load.image("door", "door.png");
        this.load.image("doorOutline", "doorOutline.png");
        this.load.image("potKnight", "potKnight.png");
        this.gameWidth = this.cameras.main.width;
        this.gameHeight = this.cameras.main.height;
    }

    onEnter() {

        console.log(this.gameWidth / this.tile);

        this.ceiling = [];
        for (let width = 0; width < this.gameWidth/this.tile; width++) {
            for (let height = 0; height < 9; height++) {
                console.log(height);
                this.ceiling += this.add.image(this.tile * width, this.tile * height, "tileMid").setOrigin(0,0);
            }
        }
        
        this.floor = [];
        for (let width = 0; width < this.gameWidth/this.tile; width++) {
            for (let height = 9; height < this.gameHeight/this.tile; height++) {
                console.log(height);
                this.floor += this.add.image(this.tile * width, this.tile * height, "tileLight").setOrigin(0,0);
            }
        }

        this.knight = this.physics.add.sprite(this.tile * 2, this.tile * 9, "knight")
            .setOrigin(0, 1)
            .setDepth(1)
            .setCollideWorldBounds(true);

        let door1 = this.add.image(this.tile *2, this.tile *3, "path")
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerover', () => {
                door1.setTint(0xffd58b);
                this.showMessage("Pathway to the guard room...");
                this.boundsDoor1 = this.physics.add.image(this.tile * 2, this.tile * 3, "path").setAlpha(0).setOrigin(0,0);
            })
            .on('pointerout', () => {
                door1.clearTint();
                this.boundsDoor1.destroy();
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsDoor1);
                if (this.inZone == true) {
                    this.gotoScene("Scene3");

                } else {
                    this.showMessage("Get closer.");
                }
            });
            
        let door2 = this.add.image(this.tile *10, this.tile *3, "path")
            .setOrigin(0,0)
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerover', () => {
                door2.setTint(0xffd58b);
                this.showMessage("Pathway to the jail cells...");
                this.boundsDoor2 = this.physics.add.image(this.tile * 10, this.tile * 3, "path").setAlpha(0).setOrigin(0,0);
            })
            .on('pointerout', () => {
                door2.clearTint();
                this.boundsDoor2.destroy();
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsDoor2);
                if (this.inZone == true) {
                    this.gotoScene("Scene4");

                } else {
                    this.showMessage("Get closer.");
                }
            });;

        let arch0 = this.add.image(this.tile *-2, this.tile *3, "arch").setOrigin(0,0);
        let arch1 = this.add.image(this.tile *2, this.tile *3, "arch").setOrigin(0,0);
        let arch2 = this.add.image(this.tile *6, this.tile *3, "arch").setOrigin(0,0);
        let arch3 = this.add.image(this.tile *10, this.tile *3, "arch").setOrigin(0,0);
        let arch4 = this.add.image(this.tile *14, this.tile *3, "arch").setOrigin(0,0);



        this.door = this.add.sprite(this.tile * 0.75, this.tile * 9, "door")
            .setOrigin(0, 1)
            .setInteractive()
            .on('pointerover', () => {
                this.doorOutline.setAlpha(1);
                this.showMessage("Door back to the bridge.");
                this.boundsDoor = this.physics.add.image(this.tile * 0.75, this.tile * 9, "door").setAlpha(0).setOrigin(0,1);
            })
            .on('pointerout', () => {
                this.doorOutline.setAlpha(0)
                this.boundsDoor.destroy()
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsDoor);
                if (this.inZone == true) {
                    this.gainItem("Cloak");
                    this.gainItem("Door Key");
                    this.gotoScene("Scene1");

                } else {
                    this.showMessage("Get closer.");
                }
            });

        this.doorOutline = this.add.sprite(this.tile*0.75, this.tile *9, "doorOutline")
            .setOrigin(0,1)
            .setAlpha(0);

    }
    update() {
        this.knight.setVelocity(0);
        let d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        let a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        if (d.isDown) {
            this.knight.setVelocityX(500);
            this.knight.flipX = false;
        }

        if (a.isDown) {
            this.knight.setVelocityX(-500);
            this.knight.flipX = true;
        }

        if (this.inventory.includes('Pot')) {
            this.knight.setTexture('potKnight');
        }

        // console.log(this.inZone);
    }
}

class Scene3 extends AdventureScene {
    constructor() {
        super("Scene3", "Guard Room");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("knight", "knight.001.png");
        this.load.image("tileLight", "tileLight.png");
        this.load.image("tileMid", "tileMid.png");
        this.load.image("tile", "tile.png");
        this.load.image("arch", "arch.001.png");
        this.load.image("path", "doorway.png");
        this.load.image("bridgeL", "bridge_L.001.png");
        this.load.image("bridgeR", "bridge_R.001.png");
        this.load.image("troll", "troll.001.png");
        this.load.image("trollSleep", "trollSleep.png");
        this.load.image("key", "key.png");
        this.load.image("pot", "pot.png");
        this.load.image("keyOutline", "keyOutline.png");
        this.load.image("potKnight", "potKnight.png");
        this.load.image("potOutline", "potOutline.png");
        this.gameWidth = this.cameras.main.width;
        this.gameHeight = this.cameras.main.height;
        this.alert = false
        
    }

    onEnter() {

        this.ceiling = [];
        for (let width = 4; width < 15; width++) {
            for (let height = 1; height < 9; height++) {
                // console.log(height);
                this.ceiling += this.add.image(this.tile * width, this.tile * height, "tile").setOrigin(0,0);
            }
        }

        this.floor = [];
        for (let width = 0; width < this.gameWidth/this.tile; width++) {
            for (let height = 9; height < this.gameHeight/this.tile; height++) {
                // console.log(height);
                this.floor += this.add.image(this.tile * width, this.tile * height, "tileLight").setOrigin(0,0);
            }
        }

        let bridge01 = this.add.image(this.tile * 3.5, this.tile * 0, "bridgeL")
            .setOrigin(0, 0);

        this.fill = [];
        for (let width = 0; width < this.gameWidth/this.tile; width++){
            this.fill += this.add.image(this.tile * width, 0, "tileLight").setOrigin(0,0);
        }

        this.fill2 = [];
        for (let width = 0; width < 4; width++){
            for (let height = 1; height < 3; height++){
                this.fill2 += this.add.image(this.tile * width, this.tile * height, "tileLight").setOrigin(0,0);
            }
        }

        this.knight = this.physics.add.sprite(this.tile * 2, this.tile * 9, "knight")
            .setOrigin(0, 1)
            .setDepth(1)
            .setCollideWorldBounds(true);

        let door1 = this.add.image(0, this.tile *3, "path")
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerover', () => {
                door1.setTint(0xffd58b);
                this.showMessage("Pathway to the hallway.");
                this.boundsDoor1 = this.physics.add.image(0, this.tile * 3, "path").setAlpha(0).setOrigin(0,0);
            })
            .on('pointerout', () => {
                door1.clearTint();
                this.boundsDoor1.destroy();
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsDoor1);
                if (this.inZone == true) {
                    this.gotoScene("Scene2");

                } else {
                    this.showMessage("Get closer.");
                }
            });
        
        let arch1 = this.add.image(0, this.tile *3, "arch").setOrigin(0,0);
        
        this.trollSleep = this.physics.add.sprite(this.tile * 12.5, this.tile * 8, "trollSleep")
            .setOrigin(0, 1)
            .setDepth(2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Sleepy Guy; Yucko"))
            .setAngle(90);

        
        // if (this.alert == true) () => {
        //     this.trollSleep.setAngle(0).setTexture("troll").flipX = true;
        // }

        this.keyOutline = this.add.sprite(this.tile*11.5, this.tile *8, "keyOutline")
            .setOrigin(0,1)
            .setAlpha(0);
        
        
        let potGot = false
        this.key = this.add.sprite(this.tile * 11.5, this.tile * 8, "key")
            .setOrigin(0, 1)
            .setInteractive()
            .on('pointerover', () => {
                this.keyOutline.setAlpha(1);
                this.showMessage("A key for the jail cell!")
                if (potGot == false) {
                    this.showMessage("A key for the jail cell! The noise might wake the stonky guard up.")
                    this.boundsKey = this.physics.add.image(this.tile * 11.5, this.tile * 8, "key").setAlpha(0).setOrigin(0,1);
                } else {
                    this.showMessage("A key for the jail cell!")
                }
            })
            .on('pointerout', () => {
                this.keyOutline.setAlpha(0)
                this.boundsKey.destroy()
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsKey);
                if (this.inZone == true && this.inventory.includes('Pot')) {
                    this.showMessage("You take the key.");
                    this.gainItem('Jail Key');
                    this.trollSleep.setTexture('troll');
                    this.trollSleep.setAngle(0);
                    this.trollSleep.setOrigin(0,0.5); //makes the troll stand up straight and not ethereally float even though it's funny. Really janky plz forgive me.
                    this.keyOutline.setAlpha(0);
                    this.tweens.add({
                        targets: this.key,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => this.key.destroy(),
                        onComplete: () => this.boundsKey.destroy(),
                        onComplete: () => this.keyOutline.destroy()
                    });
                console.log(this.inZone);
                } else if (this.inZone == true) {
                    this.showMessage("You should probably get a disguise...")
                    this.trollSleep.setTexture('troll');
                    this.trollSleep.setAngle(0);
                    this.trollSleep.setOrigin(0,0.5); //makes the troll stand up straight and not ethereally float even though it's funny. Really janky plz forgive me.
                    this.cameras.main.fade(1000, 0,0,0);
                    this.time.delayedCall(1000, () => this.scene.start('Scene3'));
                } else {
                    this.showMessage("Get closer.");
                }
            });

        this.potOutline = this.add.sprite(this.tile*8, this.tile *9, "potOutline")
            .setOrigin(0,1)
            .setAlpha(0);
        
        this.pot = this.add.image(this.tile*8, this.tile*9, "pot")
            .setOrigin(0,1)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("A pot? In this economy?!")
                this.potOutline.setAlpha(1);
                console.log("once");
                this.boundsPot = this.physics.add.image(this.tile*8, this.tile*9, "pot").setAlpha(0).setOrigin(0,1);
            })
            .on('pointerout', () => {
                this.potOutline.setAlpha(0);
                this.boundsPot.destroy();
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsPot);
                console.log(this.inZone);
                if (this.inZone == true) {
                    this.showMessage("You... get in the pot? Feeling creative are we...");
                    this.gainItem('Pot');
                    this.potOutline.destroy()
                    this.tweens.add({
                        targets: this.pot,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => this.pot.destroy(),
                        onComplete: () => this.boundsPot.destroy(),
                        onComplete: () => this.inZone = false,
                    });
                } else {
                    this.showMessage("You're not close enough!")
                }
            });
        
    }

    update() {
        this.knight.setVelocity(0);
        let d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        let a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        if (d.isDown) {
            this.knight.setVelocityX(500);
            this.knight.flipX = false;
        }

        if (a.isDown) {
            this.knight.setVelocityX(-500);
            this.knight.flipX = true;
        }

        if (this.inventory.includes('Pot')) {
            this.knight.setTexture('potKnight');
        }

        // console.log(this.alert);

        // this.checkBounds(this.knight, this.trollSleep, this.alert);
    }
}

class Scene4 extends AdventureScene {
    constructor() {
        super("Scene4", "Jail Room");
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image("knight", "knight.001.png");
        this.load.image("tileLight", "tileLight.png");
        this.load.image("tileMid", "tileMid.png");
        this.load.image("tile", "tile.png");
        this.load.image("arch", "arch.001.png");
        this.load.image("path", "doorway.png");
        this.load.image("bridgeL", "bridge_L.001.png");
        this.load.image("bridgeR", "bridge_R.001.png");
        this.load.image("potKnight", "potKnight.png");
        this.load.image("bars", "bars.png");
        this.load.image("cageDoor", "cageDoor.png");
        this.load.image("cageDoorOutline", "cageDoorOutline.png");
        this.load.image("cageDoorKey", "cageDoorKey.png");
        this.load.image("edwin", "edwin.png");
        this.gameWidth = this.cameras.main.width;
        this.gameHeight = this.cameras.main.height;
    }

    onEnter() {

        this.ceiling = [];
        for (let width = 4; width < 15; width++) {
            for (let height = 1; height < 9; height++) {
                // console.log(height);
                this.ceiling += this.add.image(this.tile * width, this.tile * height, "tile").setOrigin(0,0);
            }
        }

        this.floor = [];
        for (let width = 0; width < this.gameWidth/this.tile; width++) {
            for (let height = 9; height < this.gameHeight/this.tile; height++) {
                // console.log(height);
                this.floor += this.add.image(this.tile * width, this.tile * height, "tileLight").setOrigin(0,0);
            }
        }

        let bridge01 = this.add.image(this.tile * 3.5, this.tile * 0, "bridgeL")
            .setOrigin(0, 0);

        this.fill = [];
        for (let width = 0; width < this.gameWidth/this.tile; width++){
            this.fill += this.add.image(this.tile * width, 0, "tileLight").setOrigin(0,0);
        }

        this.fill2 = [];
        for (let width = 0; width < 4; width++){
            for (let height = 1; height < 3; height++){
                this.fill2 += this.add.image(this.tile * width, this.tile * height, "tileLight").setOrigin(0,0);
            }
        }

        this.edwin = this.physics.add.sprite(this.tile * 12.5, this.tile * 9, "edwin")
            .setOrigin(0, 1)
            .setInteractive()
            .on('pointerover', () => {
                if (this.inventory.includes("Pot")) {
                    this.showMessage("'Why are you in a pot?")
                } else {
                    this.showMessage("'You gonna get me out of here?'")
                }
            });

        this.cage1 = []
        for (let width = 12; width < 15; width++){
            for (let height = 5; height < 9; height++){
                this.cage1 += this.add.image(this.tile * width, this.tile * height, "bars").setOrigin(0,0);
            }
        }

        this.cage2 = []
        for (let height = 5; height < 9; height++){
            this.cage2 += this.add.image(this.tile * 10, this.tile * height, "bars").setOrigin(0,0);
        }

        this.cage3 = []
        for (let height = 5; height < 7; height++){
            this.cage3 += this.add.image(this.tile * 11, this.tile * height, "bars").setOrigin(0,0);
        }

        // this.gainItem("Jail Key");
        // this.gainItem("Pot");

        this.cageDoor = this.add.sprite(this.tile*11, this.tile*9, "cageDoor")
            .setOrigin(0,1)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("A locked door.")
                console.log("once");
                this.cageDoorOutline.setAlpha(1);
                this.boundsDoor = this.physics.add.image(this.tile*11, this.tile*9, "cageDoor").setScale(2).setAlpha(0).setOrigin(0,1);
            })
            .on('pointerout', () => {
                this.cageDoorOutline.setAlpha(0);
                this.boundsDoor.destroy();
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsDoor);
                console.log(this.inZone);
                if (this.inZone == true && this.inventory.includes("Jail Key")) {
                    this.loseItem('Jail Key');
                    this.cageDoor.setTexture("cageDoorKey");
                    this.cageDoorOutline.destroy()
                    this.showMessage("'Huzzah!'")
                    this.tweens.add({
                        targets: this.cageDoor,
                        y: `-=${2 * this.s}`,
                        alpha: { from: 1, to: 0 },
                        duration: 500,
                        onComplete: () => this.cageDoor.destroy(),
                        onComplete: () => this.boundsDoor.destroy(),
                        onComplete: () => this.inZone = false,
                        onComplete: () => this.time.delayedCall(1000, () => this.scene.start('outro'))
                    });
                } else if (this.inZone == true && !this.inventory.includes("Jail Key")){
                    this.showMessage("'Gotta get that key first bub'")
                } else {
                    this.showMessage("'What are ya doing all the way over there?'")
                }
            });
        
        this.cageDoorOutline = this.add.sprite(this.tile*11, this.tile *9, "cageDoorOutline")
            .setOrigin(0,1)
            .setAlpha(0);

        this.knight = this.physics.add.sprite(this.tile * 2, this.tile * 9, "knight")
            .setOrigin(0, 1)
            .setDepth(1)
            .setCollideWorldBounds(true);

        let door1 = this.add.image(0, this.tile *3, "path")
            .setOrigin(0,0)
            .setInteractive()
            .on('pointerover', () => {
                door1.setTint(0xffd58b);
                this.showMessage("Pathway to the hallway.");
                this.boundsDoor1 = this.physics.add.image(0, this.tile * 3, "path").setAlpha(0).setOrigin(0,0);
            })
            .on('pointerout', () => {
                door1.clearTint();
                this.boundsDoor1.destroy();
            })
            .on('pointerdown', () => {
                this.checkBounds(this.knight, this.boundsDoor1);
                if (this.inZone == true) {
                    this.gotoScene("Scene2");

                } else {
                    this.showMessage("Get closer.");
                }
            });
        
        let arch1 = this.add.image(0, this.tile *3, "arch").setOrigin(0,0);
    }

    update() {
        this.knight.setVelocity(0);
        let d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        let a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

        if (d.isDown) {
            this.knight.setVelocityX(500);
            this.knight.flipX = false;
        }

        if (a.isDown) {
            this.knight.setVelocityX(-500);
            this.knight.flipX = true;
        }

        if (this.inventory.includes('Pot')) {
            this.knight.setTexture('potKnight');
        }

        // console.log(this.alert);

        // this.checkBounds(this.knight, this.trollSleep, this.alert);
    }

}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50).setTint(0x000000);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20).setTint(0x000000);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('Scene1'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50).setTint(0x000000);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20).setTint(0x000000);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    backgroundColor: 0x87CEEB,
    scene: [Intro, Scene1, Scene2, Scene3, Scene4, Outro],
    title: "Adventure Game",
});

