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
    constructor({position, velocity})
    {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastkey;
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
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
