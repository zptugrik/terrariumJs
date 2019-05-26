var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'phaser-example',
        width: '100%',
        height: '100%'
    },
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);
var plantsPlaces;
var level = 1;
var handA = null;
var gameObjects = {};
function preload() {
   // this.load.audio('bgSound', ['assets/audio/background.mp3']);
    this.load.audio('levelUpSound', ['assets/audio/levelUp.mp3']);
    this.load.audio('clickSound', ['assets/audio/click.wav']);
    this.load.audio('clickPlantSound', ['assets/audio/notification.wav']);
    this.load.audio('placePlantSound', ['assets/audio/placePlant.wav']);


    this.load.image('background', 'assets/textures/backgrounds/bg_gradient.png');
    this.load.image('floor', 'assets/textures/backgrounds/floor.png');
    this.load.image('Hfloor', 'assets/textures/backgrounds/shelf_side.png');
    this.load.image('cloud1', 'assets/textures/backgrounds/cloud1.png');
    this.load.image('cloud2', 'assets/textures/backgrounds/cloud2.png');
    this.load.image('settingsIcon', 'assets/textures/ui/icn_settings.png');
    this.load.image('currencyBg', 'assets/textures/ui/currency_bg.png');
    this.load.image('plant_level_progress_bg', 'assets/textures/ui/plant_level_progress_bg.png');
    this.load.image('buttonLevelUp', 'assets/textures/ui/btn_orange_hover.png');
    this.load.image('oxygenIcon', 'assets/textures/ui/oxygen_icon.png');
    this.load.image('blueLine', 'assets/textures/ui/btn_blue.png');
    this.load.image('plantPlace', 'assets/textures/plant_here.png');
    this.load.image('hand', 'assets/textures/hand.png');
    this.load.image('pot', 'assets/textures/pot_empty.png');
    this.load.image('snakePlant1', 'assets/textures/plants/snakeplant1_background.png');
    this.load.image('snakePlant2', 'assets/textures/plants/snakeplant2_background.png');
    this.load.image('snakePlant3', 'assets/textures/plants/snakeplant5_background.png');
    this.load.image('aloePlant1', 'assets/textures/plants/aloevera3_background.png');
    this.load.image('aloePlant2', 'assets/textures/plants/aloevera4_background.png');
    this.load.image('aloePlant3', 'assets/textures/plants/aloevera5_background.png');
    this.load.image('lotusPlant', 'assets/textures/plants/flamingoflower4_background.png');
    this.load.image('popupBg', 'assets/textures/roundedRect.png');
}

function create() {

   // this.bgSound = this.sound.add('bgSound', { loop: true }).play();
    this.levelUpSound = this.sound.add('levelUpSound', { loop: false });
    this.clickSound = this.sound.add('clickSound', { loop: false });
    this.clickPlantSound = this.sound.add('clickPlantSound', { loop: false });
    this.placePlantSound = this.sound.add('placePlantSound', { loop: false });

    this.counter = 0;

    gameObjects.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0);


    gameObjects.cloud1 = this.add.sprite(0, 0, 'cloud1').setOrigin(0);
    gameObjects.cloud2 = this.add.sprite(0, 0, 'cloud1').setOrigin(0);
    gameObjects.cloud3 = this.add.sprite(0, 0, 'cloud2').setOrigin(0);
    gameObjects.cloud4 = this.add.sprite(0, 0, 'cloud2').setOrigin(0);

    gameObjects.floorTop = this.add.sprite(0, 0, 'floor').setOrigin(0);
    gameObjects.floorMiddle =this.add.sprite(0, 0, 'floor').setOrigin(0);
    gameObjects.floorBottom = this.add.sprite(0, 350, 'floor').setOrigin(0);
    gameObjects.floorLeft = this.add.sprite(0, 0, 'Hfloor').setOrigin(0);
    gameObjects.floorRight = this.add.sprite(200, 0, 'Hfloor').setOrigin(0);



    // top Bar menu
    this.plantProgressLine =  this.add.sprite(127, 20, 'blueLine').setOrigin(0);
    this.plantProgressLine.setScale(0, 0.13);

    this.textLevel = this.add.text(60, 15, 'Level 1', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });

    this.buttonLevelUp = this.add.image(300, 7, 'buttonLevelUp').setOrigin(0).setInteractive();
    this.buttonLevelUp.setScale(0.4);
    this.textLevelUp = this.add.text(320, 15, 'LevelUp', { fontFamily: 'Arial', fontSize: 16, color: '#FFFFFF' });
    this.buttonLevelUp.on('pointerdown', function() {
        if(level == 2) {
            this.levelUpSound.play();
            gameObjects.popupLevel2.visible = true;
            level = 3;
            this.plantProgressLine.scaleX = 0;
            this.textLevel.setText('Level 2');
            onResizeItem(gameObjects.hand, "hand");
        }
        if(level == 5 && gameObjects.popupLevel3.visible == false) {
            this.levelUpSound.play();
            gameObjects.popupLevel3.visible = true;
            gameObjects.hand.visible = false;
            if(!_.isNil(handA)) handA.kill();
            this.plantProgressLine.scaleX = 0;
            this.textLevel.setText('Level 3');
        }
        this.buttonLevelUp.setScale(0.4*0.95);
        this.textLevelUp.setScale(0.95);
    }.bind(this));
    this.buttonLevelUp.on('pointerup', function() {
        this.buttonLevelUp.setScale(0.4);
        this.textLevelUp.setScale(1);
    }.bind(this));

    this.oxygenIcon = this.add.image(180, 55, 'oxygenIcon').setOrigin(0);
    this.oxygenIcon.setScale(0.5);
    this.textOxygenCounter = this.add.text(210, 54, '0', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });

    gameObjects.topBar = this.add.container(0, 0);
    gameObjects.topBar.name = "topBar";
    gameObjects.topBar.add([
        this.add.graphics().fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 400, 50, { tl: 0, tr: 0, bl: 16, br: 16 }),
        this.add.sprite(10, 10, 'settingsIcon').setOrigin(0).setScale(0.7),
        this.add.sprite(119*1.08, 35, 'currencyBg').setOrigin(0).setScale(0.9),
        this.add.sprite(125, 20, 'plant_level_progress_bg').setOrigin(0).setScale(1.4, 1),
        this.textLevel,
        this.buttonLevelUp, this.textLevelUp, this.oxygenIcon, this.textOxygenCounter, this.plantProgressLine
    ]);

    gameObjects.snakePlant = this.add.image(0, 0, 'snakePlant1').setOrigin(0);
    gameObjects.snakePlant.visible = false;
    gameObjects.aloePlant = this.add.image(0, 0, 'aloePlant1').setOrigin(0);
    gameObjects.aloePlant.visible = false;

    gameObjects.plus1 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus1.visible = false;
    gameObjects.plus2 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus2.visible = false;
    gameObjects.plus3 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus3.visible = false;
    gameObjects.plus4 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus4.visible = false;
    gameObjects.plus5 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus5.visible = false;
    gameObjects.plus6 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus6.visible = false;
    gameObjects.plus7 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus7.visible = false;
    gameObjects.plus8 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus8.visible = false;
    gameObjects.plus9 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus9.visible = false;
    gameObjects.plus10 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus10.visible = false;

    gameObjects.plus11 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus11.visible = false;
    gameObjects.plus12 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus12.visible = false;
    gameObjects.plus13 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus13.visible = false;
    gameObjects.plus14 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus14.visible = false;
    gameObjects.plus15 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus15.visible = false;
    gameObjects.plus16 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus16.visible = false;
    gameObjects.plus17 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus17.visible = false;
    gameObjects.plus18 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus18.visible = false;
    gameObjects.plus19 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus19.visible = false;
    gameObjects.plus20 = this.add.text(0, 0, '+1', { fontFamily: 'Arial', fontSize: 64, color: '#ffffff' });
    gameObjects.plus20.visible = false;


    gameObjects.oxygen = this.add.image(0, 0, 'oxygenIcon').setOrigin(0);
    gameObjects.oxygen.alpha = 0;
    // places for plant input
    gameObjects.plantPlace1 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    gameObjects.plantPlace2 = this.add.image(0, 0, 'plantPlace').setOrigin(0).setInteractive();
    gameObjects.plantPlace2.on('pointerdown', function() {
        if(level != 4) return;
        if(!gameObjects.aloePlant.visible){
            this.placePlantSound.play();
            gameObjects.plantPlace2.setTexture('pot');
            bgConfigVO["portrait-primary"]["plantPlace2"].position.y -=4;
            onResizeItem(gameObjects.plantPlace2, "plantPlace2");
            gameObjects.aloePlant.visible = true;
        }
        else{
            this.clickPlantSound.play();
            this.counter++;

            this.textOxygenCounter.setText(this.counter);
            this.plantProgressLine.scaleX += 0.65/10;
            gameObjects.plantPlace2.__scaleX = gameObjects.plantPlace2.scaleX;
            gameObjects.plantPlace2.__scaleY = gameObjects.plantPlace2.scaleY;
            gameObjects.plantPlace2.__x = gameObjects.plantPlace2.x;
            gameObjects.plantPlace2.__y = gameObjects.plantPlace2.y;

            gameObjects.plantPlace2.scaleY *= 0.95;
            gameObjects.plantPlace2.scaleX *= 0.95;
            gameObjects.plantPlace2.x += gameObjects.plantPlace2.width * gameObjects.plantPlace2.scaleX * 0.05/2;
            gameObjects.plantPlace2.y += gameObjects.plantPlace2.height * gameObjects.plantPlace2.scaleY * 0.05/2;

            gameObjects.aloePlant.__scaleX = gameObjects.aloePlant.scaleX;
            gameObjects.aloePlant.__scaleY = gameObjects.aloePlant.scaleY;
            gameObjects.aloePlant.__x = gameObjects.aloePlant.x;
            gameObjects.aloePlant.__y = gameObjects.aloePlant.y;

            gameObjects.aloePlant.scaleY *= 0.95;
            gameObjects.aloePlant.scaleX *= 0.95;
            gameObjects.aloePlant.x += gameObjects.aloePlant.width * gameObjects.aloePlant.scaleX * 0.05/2;
            gameObjects.aloePlant.y += gameObjects.aloePlant.height * gameObjects.aloePlant.scaleY * 0.05/2;

            TweenMax.delayedCall(0.1, function(){
                gameObjects.plantPlace2.scaleX = gameObjects.plantPlace2.__scaleX;
                gameObjects.plantPlace2.scaleY = gameObjects.plantPlace2.__scaleY;
                gameObjects.plantPlace2.x = gameObjects.plantPlace2.__x;
                gameObjects.plantPlace2.y = gameObjects.plantPlace2.__y;

                gameObjects.aloePlant.scaleX = gameObjects.aloePlant.__scaleX;
                gameObjects.aloePlant.scaleY = gameObjects.aloePlant.__scaleY;
                gameObjects.aloePlant.x = gameObjects.aloePlant.__x;
                gameObjects.aloePlant.y = gameObjects.aloePlant.__y;
            });

            if(!tl_oxygen.isActive()){
                tl_oxygen.play(0);
            }
            plusOneAnimation(gameObjects["plus" + this.counter]);
            if(this.counter == 15) {
                gameObjects.aloePlant.setTexture('aloePlant2');
            }
            if(this.counter == 20) {
                level = 5;
                gameObjects.aloePlant.setTexture('aloePlant3');
                onResizeItem(gameObjects.hand, "hand");

            }
        }
    }.bind(this));
    gameObjects.plantPlace3 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    gameObjects.plantPlace4 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    gameObjects.plantPlace5 = this.add.image(0, 0, 'plantPlace').setOrigin(0, 0).setInteractive();

    gameObjects.plantPlace5.on('pointerdown', function() {
        if(this.counter >= 10) return;

        var snakePlant = gameObjects.snakePlant;
        if(!snakePlant.visible){
            this.placePlantSound.play();
            gameObjects.plantPlace5.setTexture('pot');
            bgConfigVO["portrait-primary"]["plantPlace5"].position.y -=4;
            onResizeItem(gameObjects.plantPlace5, "plantPlace5");
            snakePlant.visible = true;
        }
        else{
            this.clickPlantSound.play();
            this.counter++;

            this.textOxygenCounter.setText(this.counter);
            this.plantProgressLine.scaleX += 0.65/10;
            if(this.counter > 0){
                gameObjects.plantPlace5.__scaleX = gameObjects.plantPlace5.scaleX;
                gameObjects.plantPlace5.__scaleY = gameObjects.plantPlace5.scaleY;
                gameObjects.plantPlace5.__x = gameObjects.plantPlace5.x;
                gameObjects.plantPlace5.__y = gameObjects.plantPlace5.y;

                gameObjects.plantPlace5.scaleY *= 0.95;
                gameObjects.plantPlace5.scaleX *= 0.95;
                gameObjects.plantPlace5.x += gameObjects.plantPlace5.width * gameObjects.plantPlace5.scaleX * 0.05/2;
                gameObjects.plantPlace5.y += gameObjects.plantPlace5.height * gameObjects.plantPlace5.scaleY  * 0.05/2;

                snakePlant.__scaleX = snakePlant.scaleX;
                snakePlant.__scaleY = snakePlant.scaleY;
                snakePlant.scaleY *= 0.95;
                snakePlant.scaleX *= 0.95;
                snakePlant.x += snakePlant.width * snakePlant.scaleX * 0.05/2;
                snakePlant.y += snakePlant.height * snakePlant.scaleY * 0.05/2;

                TweenMax.delayedCall(0.1, function(){
                    gameObjects.plantPlace5.scaleX = gameObjects.plantPlace5.__scaleX;
                    gameObjects.plantPlace5.scaleY = gameObjects.plantPlace5.__scaleY;
                    gameObjects.plantPlace5.x = gameObjects.plantPlace5.__x;
                    gameObjects.plantPlace5.y = gameObjects.plantPlace5.__y;

                    snakePlant.scaleX = snakePlant.__scaleX;
                    snakePlant.scaleY = snakePlant.__scaleY;
                    snakePlant.x -= snakePlant.width * snakePlant.scaleX * 0.05/2;
                    snakePlant.y -= snakePlant.height * snakePlant.scaleY * 0.05/2;
                });

                if(!tl_oxygen.isActive()){
                    tl_oxygen.play(0);
                }
            }
            plusOneAnimation(gameObjects["plus" + this.counter]);
            if(this.counter == 5) snakePlant.setTexture('snakePlant2');
            if(this.counter == 10) {
                level = 2;
                snakePlant.setTexture('snakePlant3');
                onResizeItem(gameObjects.hand, "hand");
            }
        }
    }.bind(this));

    gameObjects.plantPlace6 = this.add.image(100, 50, 'plantPlace').setOrigin(0);
    gameObjects.plantPlace7 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    gameObjects.plantPlace8 = this.add.image(700, 520, 'plantPlace').setOrigin(0);



    gameObjects.popupLevel2 = this.add.container(0, 0);
    gameObjects.popupLevel2.visible = false;
    gameObjects.popupLevel2.add([
        this.add.image(0, 0, 'popupBg').setOrigin(0, 0).setScale(3, 3.2),
        this.add.text(210, 54, 'CONGRATZ!', { fontFamily: 'Arial', fontSize: 64, color: '#000000' }),
        this.add.text(100, 140, 'You reached level 2', { fontFamily: 'Arial', fontSize: 64, color: '#000000' }),
        this.add.text(450, 340, 'Aloe vera', { fontFamily: 'Arial', fontSize: 58, color: '#000000' }),
        this.add.text(450, 400, 'Seed', { fontFamily: 'Arial', fontSize: 48, color: '#000000' }),
        this.add.image(220, 635, 'buttonLevelUp').setOrigin(0).setInteractive().on('pointerdown', function() {
            if(level != 3) return;
            this.clickSound.play();
            gameObjects.popupLevel2.visible = false;
            level = 4;
            onResizeItem(gameObjects.hand, "hand");
        }.bind(this)).setScale(1.45),
        this.add.text(283, 660, 'PLANT', { fontFamily: 'Arial', fontSize: 64, color: '#FFFFFF' }),
        this.add.sprite(127, 290, 'blueLine').setScale(1, 2.2).setOrigin(0),
        this.add.sprite(140, 155, 'aloePlant1').setOrigin(0)]);


    gameObjects.popupLevel3 = this.add.container(0, 0);
    gameObjects.popupLevel3.visible = false;
    gameObjects.popupLevel3.add([
        this.add.image(0, 0, 'popupBg').setOrigin(0).setScale(3, 3.2),
        this.add.text(210, 54, 'GREAT JOB!', { fontFamily: 'Arial', fontSize: 64, color: '#000000' }),
        this.add.text(200, 385, 'LOTUS\nUNLOCKED', {align:'center', fontFamily: 'Arial', fontSize: 64, color: '#000000' }),
        this.add.text(170, 620, 'Collect more plants\nin the full game!', {align:'center',  fontFamily: 'Arial', fontSize: 48, color: '#000000' }),
        this.add.image(185, 875, 'buttonLevelUp').setOrigin(0).setInteractive().on('pointerdown', function() {
            window.location.href = "http://www.greenpandagames.com";
        }).setScale(1.7),
        this.add.text(210, 915, 'CONTINUE', { fontFamily: 'Arial', fontSize: 64, color: '#FFFFFF' }),
        this.add.sprite(270, 135, 'blueLine').setOrigin(0).setScale(1, 2.2),
        this.add.sprite(280, 40, 'lotusPlant').setOrigin(0)]);

    gameObjects.hand = this.add.sprite(0, 0, 'hand').setOrigin(0);
    gameObjects.hand.name = "hand";



    onResize(gameObjects);
    this.scale.on('resize', resize, this);
}

function resize (gameSize)
{
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);
    onResize(gameObjects);

}