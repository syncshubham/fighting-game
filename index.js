const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

 // Set display size (vw/vh).
 const sizeWidth = 100 * window.innerWidth / 100,
 sizeHeight = 99 * window.innerHeight / 100;

c.canvas.width = sizeWidth;
c.canvas.height = sizeHeight;

c.canvas.style.width = sizeWidth;
c.canvas.style.height = sizeHeight;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.8;

class Sprite
{
    constructor({position, velocity, color = 'red', offset})
    {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastkey;
        this.attackBox = {
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset:offset,
            width:100,
            height:50
        };
        this.color = color;
        this.isAttacking;
        this.health = 100
    }

    draw(){
        // player and enemy creting structure
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height)


        // player and enemy attack area creation
        if(this.isAttacking){
            c.fillStyle = '#6821acd4'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }

    update(){
        this.draw()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= canvas.height )
        {
            this.velocity.y = 0;
        }else{
            this.velocity.y += gravity;
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

}

const player = new Sprite({
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

const enemy = new Sprite({
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

function rectangularCollison({rectangle1, rectangle2}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        )
}

function animate()
{
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0,0, canvas.width, canvas.height);
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
