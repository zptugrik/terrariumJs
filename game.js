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
function preload() {
   // this.load.audio('bgSound', ['assets/audio/background.mp3']);
    this.load.audio('levelUpSound', ['assets/audio/levelUp.mp3']);
    this.load.audio('clickSound', ['assets/audio/click.wav']);
    this.load.audio('clickPlantSound', ['assets/audio/notification.wav']);
    this.load.audio('placePlantSound', ['assets/audio/placePlant.wav']);


    this.load.image('background', 'assets/textures/backgrounds/bg_gradient.png');
    this.load.image('floor', 'assets/textures/backgrounds/floor.png');
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
    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0);
    this.background.name = "background";
    onResize(this.background, this.scale.width, this.scale.height);

    this.cloud1 = this.add.sprite(0, 0, 'cloud1').setOrigin(0);
    this.cloud1.name = "cloud1";
    onResize(this.cloud1, this.scale.width, this.scale.height, this.scale.orientation);
    this.cloud2 = this.add.sprite(0, 0, 'cloud1').setOrigin(0);
    this.cloud2.name = "cloud2";
    onResize(this.cloud2, this.scale.width, this.scale.height, this.scale.orientation);
    this.cloud3 = this.add.sprite(0, 0, 'cloud2').setOrigin(0);
    this.cloud3.name = "cloud3";
    onResize(this.cloud3, this.scale.width, this.scale.height, this.scale.orientation);
    this.cloud4 = this.add.sprite(0, 0, 'cloud2').setOrigin(0);
    this.cloud4.name = "cloud4";
    onResize(this.cloud4, this.scale.width, this.scale.height, this.scale.orientation);

    this.floorTop = this.add.sprite(0, 800, 'floor').setOrigin(0);
    this.floorTop.name = "floorTop";
    onResize(this.floorTop, this.scale.width, this.scale.height, this.scale.orientation);
    this.floorMiddle = this.add.sprite(0, 800, 'floor').setOrigin(0);
    this.floorMiddle.name = "floorMiddle";
    onResize(this.floorMiddle, this.scale.width, this.scale.height, this.scale.orientation);
    this.floorBottom = this.add.sprite(0, 800, 'floor').setOrigin(0);
    this.floorBottom.name = "floorBottom";
    onResize(this.floorBottom, this.scale.width, this.scale.height, this.scale.orientation);
    this.floorLeft = this.add.sprite(0, 0, 'floor').setOrigin(0);
    this.floorLeft.name = "floorLeft";
    this.floorLeft.rotation = 1.571;
    onResize(this.floorLeft, this.scale.width, this.scale.height, this.scale.orientation);
    this.floorRight = this.add.sprite(this.scale.width, 0, 'floor').setOrigin(0);
    this.floorRight.name = "floorRight";
    this.floorRight.rotation = 1.57;
    onResize(this.floorRight, this.scale.width, this.scale.height, this.scale.orientation);


    // top Bar menu
    this.topBarBackground = this.add.graphics();
    this.topBarBackground.fillStyle(0xffffff, 1);
    this.topBarBackground.fillRoundedRect(0, 0, 400, 50, { tl: 0, tr: 0, bl: 16, br: 16 });

    this.settingsIcon = this.add.sprite(10, 10, 'settingsIcon').setOrigin(0);
    this.settingsIcon.setScale(0.7);

    this.currencyBg = this.add.sprite(119*1.08, 35, 'currencyBg').setOrigin(0);
    this.currencyBg.setScale(0.9);

    this.plantProgressBg = this.add.sprite(125, 20, 'plant_level_progress_bg').setOrigin(0);
    this.plantProgressBg.scaleX = 1.4;

    this.plantProgressLine =  this.add.sprite(127, 20, 'blueLine').setOrigin(0);
    this.plantProgressLine.scaleX = 0;
    this.plantProgressLine.scaleY = 0.13;

    this.textLevel = this.add.text(60, 15, 'Level 1', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });

    this.buttonLevelUp = this.add.image(300, 7, 'buttonLevelUp').setOrigin(0).setInteractive();
    this.buttonLevelUp.setScale(0.4);
    this.textLevelUp = this.add.text(320, 15, 'LevelUp', { fontFamily: 'Arial', fontSize: 16, color: '#FFFFFF' });
    this.buttonLevelUp.on('pointerdown', function() {
        if(level == 2) {
            this.levelUpSound.play();
            this.popupLevel2.visible = true;
            level = 3;
            this.plantProgressLine.scaleX = 0;
            this.textLevel.setText('Level 2');
            onResize(this.hand, this.scale.width, this.scale.height, this.scale.orientation);
        }
        if(level == 5 && this.popupLevel3.visible == false) {
            this.levelUpSound.play();
            this.popupLevel3.visible = true;
            this.hand.visible = false;
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

    this.topBar = this.add.container(0, 0);
    this.topBar.name = "topBar";
    this.topBar.add([ this.topBarBackground, this.settingsIcon, this.currencyBg, this.plantProgressBg, this.textLevel,
        this.buttonLevelUp, this.textLevelUp, this.oxygenIcon, this.textOxygenCounter, this.plantProgressLine
    ]);
    onResize(this.topBar, this.scale.width, this.scale.height, this.scale.orientation);
    this.snakePlant = this.add.image(0, 0, 'snakePlant1').setOrigin(0);
    this.snakePlant.visible = false;
    this.aloePlant = this.add.image(0, 0, 'aloePlant1').setOrigin(0);
    this.aloePlant.visible = false;
    // places for plant input
    this.plantPlace1 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace2 = this.add.image(0, 0, 'plantPlace').setOrigin(0).setInteractive();
    this.plantPlace2.on('pointerdown', function() {
        if(level != 4) return;
        if(!this.aloePlant.visible){
            this.placePlantSound.play();
            this.plantPlace2.setTexture('pot');
            this.plantPlace2.setPosition(this.plantPlace2.x, this.plantPlace2.y - 20);
            this.aloePlant.setPosition(this.plantPlace2.x, this.plantPlace2.y - 10);
            this.aloePlant.visible = true;
        }
        else{
            this.clickPlantSound.play();
            this.counter++;

            this.textOxygenCounter.setText(this.counter);
            this.plantProgressLine.scaleX += 0.65/10;
            if(this.counter == 15) {
                this.aloePlant.setTexture('aloePlant2');
                this.aloePlant.setPosition(this.plantPlace2.x, this.plantPlace2.y + 10);
            }
            this.aloePlant.setScale(0.95);
            this.plantPlace2.setScale(0.95);
            if(this.counter == 20) {
                this.aloePlant.setScale(1);
                this.plantPlace2.setScale(1);
                this.aloePlant.setTexture('aloePlant3');
                level = 5;
                onResize(this.popupLevel3, this.scale.width, this.scale.height, this.scale.orientation);
                onResize(this.hand, this.scale.width, this.scale.height, this.scale.orientation);
            }
        }
    }.bind(this));
    this.plantPlace2.on('pointerup', function() {
        if(this.counter >= 20 || this.counter < 11) return;
        this.aloePlant.setScale(1);
        this.plantPlace2.setScale(1);
    }.bind(this));
    this.plantPlace3 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace4 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace5 = this.add.image(0, 0, 'plantPlace').setOrigin(0).setInteractive();
    this.plantPlace5.on('pointerdown', function() {
        if(this.counter >= 10) return;
        if(!this.snakePlant.visible){
            this.placePlantSound.play();
            this.plantPlace5.setTexture('pot');
            this.snakePlant.setPosition(this.plantPlace5.x, this.plantPlace5.y - 40);
            this.snakePlant.visible = true;
        }
        else{
            this.clickPlantSound.play();
            this.counter++;
            this.snakePlant.setScale(0.95);
            this.plantPlace5.setScale(0.95);
            this.textOxygenCounter.setText(this.counter);
            this.plantProgressLine.scaleX += 0.65/10;
            if(this.counter == 5) this.snakePlant.setTexture('snakePlant2');
            if(this.counter == 10) {
                this.snakePlant.setTexture('snakePlant3');
                level = 2;
                this.snakePlant.setScale(1);
                this.plantPlace5.setScale(1);
                onResize(this.hand, this.scale.width, this.scale.height, this.scale.orientation);
            }
        }
    }.bind(this));
    this.plantPlace5.on('pointerup', function() {
        if(this.counter >= 10 || this.counter < 1) return;
        this.snakePlant.setScale(1);
        this.plantPlace5.setScale(1);
    }.bind(this));
    this.plantPlace6 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace7 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace8 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    plantsPlaces = this.add.container(0, 0);
    plantsPlaces.name = "plantsPlaces";
    plantsPlaces.add([this.snakePlant, this.aloePlant,
        this.plantPlace1, this.plantPlace2, this.plantPlace3, this.plantPlace4,
        this.plantPlace5, this.plantPlace6, this.plantPlace7, this.plantPlace8

    ]);
    onResize(plantsPlaces, this.scale.width, this.scale.height, this.scale.orientation);


    this.popupBg = this.add.image(0, 0, 'popupBg').setOrigin(0);
    this.popupBg.scaleX = 3;
    this.popupBg.scaleY = 3.2;
    this.textCongratulation = this.add.text(210, 54, 'CONGRATZ!', { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
    this.textReachLevel = this.add.text(100, 140, 'You reached level 2', { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
    this.textAloe = this.add.text(450, 340, 'Aloe vera', { fontFamily: 'Arial', fontSize: 58, color: '#000000' });
    this.textSeed = this.add.text(450, 400, 'Seed', { fontFamily: 'Arial', fontSize: 48, color: '#000000' });
    this.buttonLevel2 = this.add.image(220, 635, 'buttonLevelUp').setOrigin(0).setInteractive();
    this.buttonLevel2.on('pointerdown', function() {
        if(level != 3) return;
        this.clickSound.play();
        this.popupLevel2.visible = false;
        level = 4;
        onResize(this.hand, this.scale.width, this.scale.height, this.scale.orientation);
    }.bind(this));
    this.buttonLevel2.setScale(1.4);
    this.textLevel2 = this.add.text(283, 660, 'PLANT', { fontFamily: 'Arial', fontSize: 64, color: '#FFFFFF' });
    this.popupLevel2PlantBg = this.add.sprite(127, 320, 'blueLine').setOrigin(0);
    this.popupLevel2PlantBg.scaleY = 2.2;
    this.popupLevel2Plant = this.add.sprite(140, 185, 'aloePlant1').setOrigin(0);
    this.popupLevel2 = this.add.container(0, 0);
    this.popupLevel2.name = "popupLevel2";
    this.popupLevel2.visible = false;
    this.popupLevel2.add([this.popupBg, this.textCongratulation, this.textReachLevel, this.textAloe, this.textSeed,
        this.buttonLevel2, this.textLevel2, this.popupLevel2PlantBg, this.popupLevel2Plant]);
    onResize(this.popupLevel2, this.scale.width, this.scale.height, this.scale.orientation);


    this.popupBgLevel3 = this.add.image(0, 0, 'popupBg').setOrigin(0);
    this.popupBgLevel3.scaleX = 3;
    this.popupBgLevel3.scaleY = 3.2;
    this.textCongratulationLevel3 = this.add.text(210, 54, 'GREAT JOB!', { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
    this.textReachLevelLevel3 = this.add.text(200, 385, 'LOTUS\nUNLOCKED', {align:'center', fontFamily: 'Arial', fontSize: 64, color: '#000000' });
    this.textAloeLevel3 = this.add.text(170, 620, 'Collect more plants\nin the full game!', {align:'center',  fontFamily: 'Arial', fontSize: 48, color: '#000000' });
    this.buttonLevel3 = this.add.image(185, 875, 'buttonLevelUp').setOrigin(0).setInteractive();
    this.buttonLevel3.on('pointerdown', function() {
        window.location.href = "http://www.greenpandagames.com";
    });
    this.buttonLevel3.setScale(1.7);
    this.textLevel3 = this.add.text(210, 915, 'CONTINUE', { fontFamily: 'Arial', fontSize: 64, color: '#FFFFFF' });
    this.popupLevel3PlantBg = this.add.sprite(270, 135, 'blueLine').setOrigin(0);
    this.popupLevel3PlantBg.scaleY = 2.2;
    this.popupLevel3Plant = this.add.sprite(280, 40, 'lotusPlant').setOrigin(0);
    this.popupLevel3 = this.add.container(0, 0);
    this.popupLevel3.name = "popupLevel3";
    this.popupLevel3.visible = false;
    this.popupLevel3.add([this.popupBgLevel3, this.textCongratulationLevel3, this.textReachLevelLevel3, this.textAloeLevel3,
        this.buttonLevel3, this.textLevel3, this.popupLevel3PlantBg, this.popupLevel3Plant]);
    onResize(this.popupLevel3, this.scale.width, this.scale.height, this.scale.orientation);




    this.hand = this.add.sprite(0, 0, 'hand').setOrigin(0);
    this.hand.name = "hand";
    onResize(this.hand, this.scale.width, this.scale.height, this.scale.orientation);

    this.scale.on('resize', resize, this);
}

function resize (gameSize)
{
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);
    onResize(this.background, width, height);
    onResize(this.cloud1, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.cloud2, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.cloud3, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.cloud4, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.floorTop, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.floorMiddle, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.floorBottom, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.floorLeft, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.floorRight, this.scale.width, this.scale.height, this.scale.orientation);

    onResize(this.topBar, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(plantsPlaces, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.popupLevel2, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.popupLevel3, this.scale.width, this.scale.height, this.scale.orientation);
    onResize(this.hand, this.scale.width, this.scale.height, this.scale.orientation);
}