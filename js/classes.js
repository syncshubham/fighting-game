const sizeWidth = 100 * window.innerWidth / 100,
sizeHeight = 99 * window.innerHeight / 100;
class Sprite
{
    constructor({position, imageSrc})
    {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
    }
 
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, sizeWidth, sizeHeight )
    }

    update(){
        this.draw()
    }
}

class Fighter
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
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96)
        {
            this.velocity.y = 0
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