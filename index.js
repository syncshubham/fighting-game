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
    constructor({position, velocity, color = 'red'})
    {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastkey;
        this.attackBox = {
            position: this.position,
            width:100,
            height:50
        };
        this.color = color;
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // Attack box
        c.fillStyle = '#6821acd4'
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    update(){
        // console.log("update calling");
        this.draw()

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= canvas.height )
        {
            this.velocity.y = 0;
        }else{
            this.velocity.y += gravity;
        }
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
    color : "#aca221f0"
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

    // collison detection
    if(player.attackBox.position.x + player.attackBox.width >= enemy.position.x && player.attackBox.position.x <= enemy.position.x + enemy.width)
    {
        console.log("go")
        console.log(player.attackBox.position.x + player.attackBox.width)
        console.log(enemy.position.x)
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
    }
console.log(event.key);
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

console.log(event.key);
})
