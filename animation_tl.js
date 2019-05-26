var tl_oxygen = new TimelineMax();

function createOxygenAnimation(item, width, height){
    tl_oxygen.kill({x:true, y:true, alpha: true});
    tl_oxygen.paused(true);
    tl_oxygen.to(gameObjects.oxygen, 0.5, {
        bezier:[
            {x: item.x + 0.25 * item.width * item.scaleX, y: item.y + 120 * height},
            {x: item.x + 0.6 * item.width * item.scaleX, y: item.y + 90 * height},
            {x: item.x + 0.15 * item.width * item.scaleX, y: item.y + 60 * height},
            {x: item.x + 0.6 * item.width * item.scaleX, y: item.y + 30 * height},
            {x: item.x + 0.3 * item.width * item.scaleX, y: item.y}
            ],
        ease:Linear.easeNone
    },0);
    tl_oxygen.to(gameObjects.oxygen, 0.1, {
        alpha: 1},0
    );
    tl_oxygen.to(gameObjects.oxygen, 0.1, {alpha: 0}, 0.4);
}

function plusOneAnimation(item){
    TweenMax.to(item, 0.4, {
        y: item.y - (gameObjects.plantPlace5.height - 60) * gameObjects.plantPlace5.scaleY,
        onStart: function(){
            this.visible = true;
        }.bind(item),
        onComplete: function () {
            this.visible = false;
        }.bind(item)
    });
}

function handAnimation(item, height){
    var handDestination = item.y - 100 * height;
    if(!_.isNil(handA)) handA.kill();
    handA = new TweenMax.to(item, 0.4, {
        y: handDestination,
        onComplete: function () {
            handA.reverse();
        }, onReverseComplete: function () {
            handA.play();

        }
    });
}