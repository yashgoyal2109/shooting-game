const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


class Player {
    constructor(x,y,radius,color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }
}

class Projectile {
    constructor(x,y,radius,color,dx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx; 
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.x += this.dx.x;
        this.y += this.dx.y;
        this.draw();
    }

}

const newplayer = new Player(innerWidth/2,innerHeight/2,30,'white');


const projectiles = [];

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    newplayer.draw();
    projectiles.forEach((projectile) => 
        {
        projectile.update();
    })
}

window.addEventListener('click', (event)=>{
    const angle = Math.atan2(event.clientY - canvas.height/2 , event.clientX - canvas.width/2);
    const velocity = {
        x : 8*Math.cos(angle),
        y : 8*Math.sin(angle)
    }
    projectiles.push(new Projectile(innerWidth/2,innerHeight/2,6,'red',velocity)
);});

animate();