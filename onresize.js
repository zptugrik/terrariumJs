var bgConfigVO = {
    background : {height: 1704},
    floor: {
        width: 600,
        scaleY: {landscape: 0.6, portrait: 1.7},
        position: {
            "floorTop": {landscape: {y: 0.35}, portrait: {y: 0.35}},
            "floorMiddle": {landscape: {y: 0.6}, portrait: {y: 0.6}},
            "floorBottom": {landscape: {y: 0.85}, portrait: {y: 0.85}}
        }
    },
    cloud: {
        scale: {
            "cloud1": {landscape: 0.5, portrait: 1},
            "cloud2": {landscape: 0.6, portrait: 0.7},
            "cloud3": {landscape: 0.6, portrait: 0.7},
            "cloud4": {landscape: 0.5, portrait: 0.9}
        },
        position: {
            "cloud1": {landscape: {x: 0.65, y: 0.15}, portrait: {x: 0.2, y: 0.1}},
            "cloud2": {landscape: {x: 0.25, y: 0.65}, portrait: {x: 0.7, y: 0.2}},
            "cloud3": {landscape: {x: 0.1, y: 0.05}, portrait: {x: 0.3, y: 0.5}},
            "cloud4": {landscape: {x: 0.4, y: 0.25}, portrait: {x: 0.7, y: 0.7}}
        }
    },
    topBars: {
        scale: {
            topBar: { landscape: 1, portrait: 2.45}
        },
        position: {
            topBar: {landscape: -150, portrait: -100}
        }
    },
    plantsPlaces: {
        scale: {
             landscape: 0.26, portrait: 1
        },
        position: {
            shift: {landscape: {x: 680, y: 4, secondRowY: 0.93}, portrait: {x: 20, y: 20, secondRowY: 0.245}}
        }
    },
    popupLevel2: {
        scale: {
            landscape: 0.26, portrait: 1
        },
        position: {
            shift: {landscape: {x: 680, y: 4, secondRowY: 0.93}, portrait: {x: 20, y: 20, secondRowY: 0.245}}
        }
    },
    popupLevel3: {
        scale: {
            landscape: 0.26, portrait: 1
        },
        position: {
            shift: {landscape: {x: 680, y: 4, secondRowY: 0.93}, portrait: {x: 20, y: 20, secondRowY: 0.245}}
        }
    },
    hand: {
        scale:
            {landscape: 0.26, portrait: 0.8},
        position: {
            level1: {landscape: {x:325, y:0.7}, portrait: {x:0.03, y: 0.7}},
            level2: {landscape: {x:-100, y:0.15}, portrait: {x:0.7, y: 0.1}},
            level3: {landscape: {x:45, y:0.8}, portrait: {x:0.35, y: 0.6}},
            level4: {landscape: {x:137, y:0.65}, portrait: {x:0.25, y: 0.5}},
            level5: {landscape: {x:-100, y:0.15}, portrait: {x:0.7, y: 0.1}}
        }
    }
};
function onResize(item, width, height, orientation){
    if(_.isNil(orientation))
        orientation = width > height ? Phaser.Scale.LANDSCAPE : Phaser.Scale.PORTRAIT;
    switch (item.name){
        case "background":
            var ratioH = height / bgConfigVO.background.height;
            item.setSize(width, height);
            if( ratioH > 1) item.scaleY = ratioH;
            break;
        case "floorLeft":
            item.scaleX = height / bgConfigVO.floor.width;
            if (orientation === Phaser.Scale.PORTRAIT) {item.scaleY = -bgConfigVO.floor.scaleY.portrait;}
            else if (orientation === Phaser.Scale.LANDSCAPE) {item.scaleY = -bgConfigVO.floor.scaleY.landscape;}
            break;
        case "floorRight":
            item.scaleX = height / bgConfigVO.floor.width;
            if (orientation === Phaser.Scale.PORTRAIT) {item.scaleY = bgConfigVO.floor.scaleY.portrait;}
            else if (orientation === Phaser.Scale.LANDSCAPE) {item.scaleY = bgConfigVO.floor.scaleY.landscape;}
            break;
        case "floorTop":
        case "floorMiddle":
        case "floorBottom":
            item.scaleX = width / bgConfigVO.floor.width;
            if (orientation === Phaser.Scale.PORTRAIT) {
                item.scaleY = bgConfigVO.floor.scaleY.portrait;
                item.y = height * bgConfigVO.floor.position[item.name].portrait.y;
            }
            else if (orientation === Phaser.Scale.LANDSCAPE) {
                item.scaleY = bgConfigVO.floor.scaleY.landscape;
                item.y = height * bgConfigVO.floor.position[item.name].landscape.y;
            }
            break;
        case "cloud1":
        case "cloud2":
        case "cloud3":
        case "cloud4":
            if (orientation === Phaser.Scale.PORTRAIT) {
                item.setScale(bgConfigVO.cloud.scale[item.name].portrait);
                item.setPosition(width * bgConfigVO.cloud.position[item.name].portrait.x,
                    height * bgConfigVO.cloud.position[item.name].portrait.y);
            }
            else if (orientation === Phaser.Scale.LANDSCAPE) {
                item.setScale(bgConfigVO.cloud.scale[item.name].landscape);
                item.setPosition(width * bgConfigVO.cloud.position[item.name].landscape.x,
                    height * bgConfigVO.cloud.position[item.name].landscape.y);
            }
            break;
        case "topBar":
            if (orientation === Phaser.Scale.PORTRAIT) {
                item.setScale(bgConfigVO.topBars.scale.topBar.portrait);
                item.x = 0;
            }
            else if (orientation === Phaser.Scale.LANDSCAPE) {
                item.x = width/2 - 200;
                item.setScale(bgConfigVO.topBars.scale.topBar.landscape);
            }
            break;
        case "plantsPlaces":
            if (orientation === Phaser.Scale.PORTRAIT) {
                item.setScale(bgConfigVO.plantsPlaces.scale.portrait);
                _.forEach(item.list, function(value, key) {
                    if(key > 1){
                        if(key > 5){
                            value.x = bgConfigVO.plantsPlaces.position.shift.portrait.x * (1.7 + key - 5)
                                + value.width * (key - 6);
                            value.y = height * bgConfigVO.plantsPlaces.position.shift.portrait.secondRowY;
                        }
                        else{
                            value.x = bgConfigVO.plantsPlaces.position.shift.portrait.x * (0.7 + key)
                                + value.width * (key - 2);
                        }
                    }
                });
                item.y = height * bgConfigVO.floor.position["floorMiddle"].portrait.y - item.list[2].height
                    - bgConfigVO.plantsPlaces.position.shift.portrait.y;

            }
            else if (orientation === Phaser.Scale.LANDSCAPE) {
                item.x = width/2 - 500;
                item.setScale(bgConfigVO.plantsPlaces.scale.landscape);
                _.forEach(item.list, function(value, key) {
                    if(key > 1){
                        if(key > 5){
                            value.x = bgConfigVO.plantsPlaces.position.shift.landscape.x * (key - 5)
                                + value.width * bgConfigVO.plantsPlaces.scale.landscape * (key - 5);
                            value.y = height * bgConfigVO.plantsPlaces.position.shift.landscape.secondRowY;
                        }
                        else{
                            value.x = bgConfigVO.plantsPlaces.position.shift.landscape.x * (key - 1)
                                + value.width * bgConfigVO.plantsPlaces.scale.landscape * (key - 1) ;
                        }
                    }
                });
                item.y = height * bgConfigVO.floor.position["floorMiddle"].landscape.y
                    - item.list[2].height * bgConfigVO.plantsPlaces.scale.landscape
                    - bgConfigVO.plantsPlaces.position.shift.landscape.y;
            }
            item.list[0].setPosition(item.list[6].x, item.list[6].y - 40);
            item.list[1].setPosition(item.list[3].x, item.list[3].y - 40);
            break;
        case "popupLevel2":
        case "popupLevel3":
            if (orientation === Phaser.Scale.PORTRAIT) {
                item.setScale(bgConfigVO.popupLevel2.scale.portrait);
                item.setPosition(width / 2 - 256 * 1.5, height / 2 - 2.5 * 256);
            }
            else if (orientation === Phaser.Scale.LANDSCAPE) {
                item.setScale(bgConfigVO.popupLevel2.scale.landscape);
                item.setPosition(width / 2 - 0.4 * 256, height / 2 - 0.4 * 256);
            }
            break;

        case "hand":
            if (orientation === Phaser.Scale.PORTRAIT) {
                item.setScale(bgConfigVO.hand.scale.portrait);
                if(level == 1 || level == 4) item.scaleY = -item.scaleY;
                item.setPosition(width * bgConfigVO.hand.position[["level" + level]].portrait.x,
                    height * bgConfigVO.hand.position["level" + level].portrait.y);
                var handDestination = item.y - 200 * bgConfigVO.hand.scale.portrait;

            }
            else if (orientation === Phaser.Scale.LANDSCAPE) {
                item.setPosition(width /2 - bgConfigVO.hand.position["level" + level].landscape.x,
                    height * bgConfigVO.hand.position["level" + level].landscape.y);
                item.setScale(bgConfigVO.hand.scale.landscape);
                if(level == 1) item.scaleY = -item.scaleY;

                var handDestination = item.y - 200 * bgConfigVO.hand.scale.landscape;
            }
            if(!_.isNil(handA)) handA.kill();
            handA = new TweenMax.to(item, 0.4, {
                y: handDestination,
                onComplete: function () {
                    handA.reverse();
                }, onReverseComplete: function () {
                    handA.play();

                }
            });
            break;
    }

}
