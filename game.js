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
function preload() {

    this.load.image('background', 'assets/textures/backgrounds/bg_gradient.png');
    this.load.image('floor', 'assets/textures/backgrounds/floor.png');
    this.load.image('cloud1', 'assets/textures/backgrounds/cloud1.png');
    this.load.image('cloud2', 'assets/textures/backgrounds/cloud2.png');
    this.load.image('settingsIcon', 'assets/textures/ui/icn_settings.png');
    this.load.image('currencyBg', 'assets/textures/ui/currency_bg.png');
    this.load.image('plant_level_progress_bg', 'assets/textures/ui/plant_level_progress_bg.png');
    this.load.image('buttonLevelUp', 'assets/textures/ui/btn_orange_hover.png');
    this.load.image('oxygenIcon', 'assets/textures/ui/oxygen_icon.png');
    this.load.image('plantPlace', 'assets/textures/plant_here.png');
}

function create() {

    this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background').setOrigin(0);
    this.background.name = "background";
    backgroundOnResize(this.background, this.scale.width, this.scale.height);

    this.cloud1 = this.add.sprite(0, 0, 'cloud1').setOrigin(0);
    this.cloud1.name = "cloud1";
    backgroundOnResize(this.cloud1, this.scale.width, this.scale.height, this.scale.orientation);
    this.cloud2 = this.add.sprite(0, 0, 'cloud1').setOrigin(0);
    this.cloud2.name = "cloud2";
    backgroundOnResize(this.cloud2, this.scale.width, this.scale.height, this.scale.orientation);
    this.cloud3 = this.add.sprite(0, 0, 'cloud2').setOrigin(0);
    this.cloud3.name = "cloud3";
    backgroundOnResize(this.cloud3, this.scale.width, this.scale.height, this.scale.orientation);
    this.cloud4 = this.add.sprite(0, 0, 'cloud2').setOrigin(0);
    this.cloud4.name = "cloud4";
    backgroundOnResize(this.cloud4, this.scale.width, this.scale.height, this.scale.orientation);

    this.floorTop = this.add.sprite(0, 800, 'floor').setOrigin(0);
    this.floorTop.name = "floorTop";
    backgroundOnResize(this.floorTop, this.scale.width, this.scale.height, this.scale.orientation);
    this.floorMiddle = this.add.sprite(0, 800, 'floor').setOrigin(0);
    this.floorMiddle.name = "floorMiddle";
    backgroundOnResize(this.floorMiddle, this.scale.width, this.scale.height, this.scale.orientation);
    this.floorBottom = this.add.sprite(0, 800, 'floor').setOrigin(0);
    this.floorBottom.name = "floorBottom";
    backgroundOnResize(this.floorBottom, this.scale.width, this.scale.height, this.scale.orientation);
    this.floorLeft = this.add.sprite(0, 0, 'floor').setOrigin(0);
    this.floorLeft.name = "floorLeft";
    this.floorLeft.rotation = 1.57;
    backgroundOnResize(this.floorLeft, this.scale.width, this.scale.height, this.scale.orientation);
    this.floorRight = this.add.sprite(this.scale.width, 0, 'floor').setOrigin(0);
    this.floorRight.name = "floorRight";
    this.floorRight.rotation = 1.57;
    backgroundOnResize(this.floorRight, this.scale.width, this.scale.height, this.scale.orientation);


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

    this.textLevel = this.add.text(60, 15, 'Level 1', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });

    this.buttonLevelUp = this.add.image(300, 7, 'buttonLevelUp').setOrigin(0);
    this.buttonLevelUp.setScale(0.4);
    this.textLevelUp = this.add.text(320, 15, 'LevelUp', { fontFamily: 'Arial', fontSize: 16, color: '#FFFFFF' });

    this.oxygenIcon = this.add.image(180, 55, 'oxygenIcon').setOrigin(0);
    this.oxygenIcon.setScale(0.5);
    this.textOxygenCounter = this.add.text(215, 54, '0', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });

    this.topBar = this.add.container(0, 0);
    this.topBar.name = "topBar";
    this.topBar.add([ this.topBarBackground, this.settingsIcon, this.currencyBg, this.plantProgressBg, this.textLevel,
        this.buttonLevelUp, this.textLevelUp, this.oxygenIcon, this.textOxygenCounter
    ]);
    backgroundOnResize(this.topBar, this.scale.width, this.scale.height, this.scale.orientation);

    // places for plant input
    this.plantPlace1 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace2 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace3 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace4 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace5 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace6 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace7 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantPlace8 = this.add.image(0, 0, 'plantPlace').setOrigin(0);
    this.plantsPlaces = this.add.container(0, 0);
    this.plantsPlaces.name = "plantsPlaces";
    this.plantsPlaces.add([
        this.plantPlace1, this.plantPlace2, this.plantPlace3, this.plantPlace4,
        this.plantPlace5, this.plantPlace6, this.plantPlace7, this.plantPlace8
    ]);
    backgroundOnResize(this.plantsPlaces, this.scale.width, this.scale.height, this.scale.orientation);


    this.scale.on('resize', resize, this);
    /*checkOriention(this.scale.orientation);

    this.scale.on('orientationchange', checkOriention, this);
    function checkOriention (orientation)
    {
        if (orientation === Phaser.Scale.PORTRAIT)
        {
        }
        else if (orientation === Phaser.Scale.LANDSCAPE)
        {

        }
    }*/
}

function resize (gameSize)
{
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);
    backgroundOnResize(this.background, width, height);
    backgroundOnResize(this.cloud1, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.cloud2, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.cloud3, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.cloud4, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.floorTop, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.floorMiddle, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.floorBottom, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.floorLeft, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.floorRight, this.scale.width, this.scale.height, this.scale.orientation);

    backgroundOnResize(this.topBar, this.scale.width, this.scale.height, this.scale.orientation);
    backgroundOnResize(this.plantsPlaces, this.scale.width, this.scale.height, this.scale.orientation);
}