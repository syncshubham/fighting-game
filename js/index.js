const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


c.canvas.width = sizeWidth;
c.canvas.height = sizeHeight;

c.canvas.style.width = sizeWidth;
c.canvas.style.height = sizeHeight;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;
const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: '../img/background.png'
})

const shop = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: '../img/shop.png'
})

const player = new Fighter({
    position: {
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:0
    },
    offset:{
        x:0,
        y:0
    }
})

const enemy = new Fighter({
    position: {
        x:400,
        y:100
    },
    velocity:{
        x:0,
        y:0
    },
    color : "#aca221f0",
    offset:{
        x:-50,
        y:0
    }
})

const keys = {
    a:{
        pressed : false
    },
    d:{
        pressed : false
    },
    ArrowRight:{
        pressed : false
    },
    ArrowLeft:{
        pressed : false
    }
}

decreaseTimer();

function animate()
{
    window.requestAnimationFrame(animate);
    c.fillStyle = "black"; 
    c.fillRect(0,0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;   
    enemy.velocity.x = 0;   

    // Player movement
    if(keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x = -7;
    }else if(keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 7;
    }

    // Enemy movement
    if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 7;
    }else if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x = -7;
    }

    // attack area detection
    if(rectangularCollison({rectangle1: player, rectangle2: enemy}) && player.isAttacking)
    {
        player.isAttacking = false;
        enemy.health -= 10;
        document.querySelector('#enemyHealth').style.width = enemy.health + "%";
    }

    if(rectangularCollison({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking)
    {
        enemy.isAttacking = false;
        player.health -= 10;
        document.querySelector('#playerHealth').style.width = player.health + "%";
    }

    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId});
    }

}

animate();


window.addEventListener("keydown", (event)=>{
    // player keys
    switch(event.key){
        case 'd':
            keys.d.pressed = true
            player.lastkey = 'd';
            break
        case 'a':
            keys.a.pressed = true
            player.lastkey = 'a';
            break
        case 'w':
            player.velocity.y = -20;
            break

        case ' ':
            player.attack();
            break
            // Enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastkey = 'ArrowRight';
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastkey = 'ArrowLeft';
            break
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break
        case 'ArrowDown':
            enemy.attack();
            break
    }
})


window.addEventListener("keyup", (event)=>{
    // player keys
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }

    // Enemy keys
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})