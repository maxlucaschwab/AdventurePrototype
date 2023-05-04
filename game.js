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
                if (this.inZone == true && this.inventory.includes('cloak')) {
                    this.showMessage("You steal the key.");
                    this.gainItem('key');
                    this.troll01.setTexture('troll');
                    this.trollOutline.setTexture('troll');
                    this.trollOutline.destroy();
                    this.boundsTroll.destroy();
                    this.inZone = false;
                    this.troll01 = this.troll02;
                    keyGot = true
                } else if (!this.inventory.includes('cloak')) {
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
                    this.gainItem('cloak');
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
                    this.showMessage("Get closer bozo. L + Ratio + no reach o_O")
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
                if (this.inZone == true && this.inventory.includes('key')) {
                    this.loseItem("cloak");
                    this.loseItem("key");
                    this.gotoScene("Scene2");

                } else if (!this.inventory.includes('key')) {
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

        if (this.inventory.includes('cloak')) {
            this.knight.setTexture('cloakedKnight');
        }


    }
}

class Scene2 extends AdventureScene {
    constructor() {
        super("Scene2", "Hallway");
    }
    onEnter() {

        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('Scene1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
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
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
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
            debug: true
        }
    },
    backgroundColor: 0x87CEEB,
    scene: [Scene1, Scene2, Outro],
    title: "Adventure Game",
});

