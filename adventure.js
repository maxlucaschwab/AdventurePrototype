class AdventureScene extends Phaser.Scene {

    init(data) {
        this.inventory = data.inventory || [];
        this.isWalking = false
    }

    constructor(key, name) {
        super(key);
        this.name = name;
    }

    // preload() {
    //     this.load.image("tile", "tileLight.png");
    //     this.load.image("tileDark", "tile.png");
    // }

    create() {
        this.transitionDuration = 1000;

        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.pixel = 6;
        this.tile = this.pixel * 16;
        console.log(this.tile);

        this.depth = 2;

        // this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);

        this.add.rectangle(this.w * 0.75, 0, this.w * 0.25, this.h).setOrigin(0, 0).setFillStyle(0).setDepth(this.depth);
        this.add.text(this.w * 0.75 + this.s, this.s)
            .setText(this.name)
            .setStyle({ fontSize: `${3 * this.s}px` })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s)
            .setDepth(this.depth);
        
        this.messageBox = this.add.text(this.w * 0.75 + this.s, this.h * 0.33)
            .setStyle({ fontSize: `${2 * this.s}px`, color: '#eea' })
            .setWordWrapWidth(this.w * 0.25 - 2 * this.s)
            .setDepth(this.depth);

        this.inventoryBanner = this.add.text(this.w * 0.75 + this.s, this.h * 0.66)
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setText("Inventory")
            .setAlpha(0)
            .setDepth(this.depth);

        this.inventoryTexts = []

        this.updateInventory(); 

        this.add.text(this.w-3*this.s, this.h-3*this.s, "📺")
            .setStyle({ fontSize: `${2 * this.s}px` })
            .setInteractive({useHandCursor: true})
            .setDepth(this.depth)
            .on('pointerover', () => this.showMessage('Fullscreen?'))
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });

        this.onEnter();
            
        this.leftPress = false
        this.left = this.add.sprite(600, 200, "tileLight")
            .setInteractive()
            .on('pointerdown', () => {
                this.left.setTint(0xFF0000);
                this.leftPress = true
            })
            .on('pointerup', () => {
                this.left.clearTint()
                this.leftPress = false
            })

        this.rightPress = false
        this.right = this.add.sprite(800, 200, "tileLight")
            .setInteractive()
            .on('pointerdown', () => {
                this.right.setTint(0xFF0000);
                this.rightPress = true
            })
            .on('pointerup', () => {
                this.right.clearTint()
                this.rightPress = false
            })

    }

    showMessage(message) {
        this.messageBox.setText(message);
        this.tweens.add({
            targets: this.messageBox,
            alpha: { from: 1, to: 0 },
            easing: 'Quintic.in',
            duration: 4 * this.transitionDuration
        });
    }

    updateInventory() {
        if (this.inventory.length > 0) {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 1,
                duration: this.transitionDuration
            });
        } else {
            this.tweens.add({
                targets: this.inventoryBanner,
                alpha: 0,
                duration: this.transitionDuration
            });
        }
        if (this.inventoryTexts) {
            this.inventoryTexts.forEach((t) => t.destroy());
        }
        this.inventoryTexts = [];
        let h = this.h * 0.66 + 3 * this.s;
        this.inventory.forEach((e, i) => {
            let text = this.add.text(this.w * 0.75 + 2 * this.s, h, e)
                .setStyle({ fontSize: `${1.5 * this.s}px` })
                .setWordWrapWidth(this.w * 0.75 + 4 * this.s)
                .setDepth(this.depth);
            h += text.height + this.s;
            this.inventoryTexts.push(text);
        });
    }

    hasItem(item) {
        return this.inventory.includes(item);
    }

    gainItem(item) {
        if (this.inventory.includes(item)) {
            console.warn('gaining item already held:', item);
            return;
        }
        this.inventory.push(item);
        this.updateInventory();
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x - 20, to: text.x },
                    alpha: { from: 0, to: 1 },
                    ease: 'Cubic.out',
                    duration: this.transitionDuration
                });
            }
        }
    }

    loseItem(item) {
        if (!this.inventory.includes(item)) {
            console.warn('losing item not held:', item);
            return;
        }
        for (let text of this.inventoryTexts) {
            if (text.text == item) {
                this.tweens.add({
                    targets: text,
                    x: { from: text.x, to: text.x + 20 },
                    alpha: { from: 1, to: 0 },
                    ease: 'Cubic.in',
                    duration: this.transitionDuration
                });
            }
        }
        this.time.delayedCall(500, () => {
            this.inventory = this.inventory.filter((e) => e != item);
            this.updateInventory();
        });
    }


    // new function added 1/2 modifications to adventure.js
    checkBounds(target, bounds) {
        if (this.physics.overlap(target, bounds)) {
            this.inZone = true;
            console.log(this.inZone);
            // console.log("collide");
        } else {
        this.inZone = false;
        }
    };

    gotoScene(key) {
        this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
        this.time.delayedCall(this.transitionDuration, () => {
            this.scene.start(key, { inventory: this.inventory });
        });
    }

    onEnter() {
        console.warn('This AdventureScene did not implement onEnter():', this.constructor.name);
    }
}