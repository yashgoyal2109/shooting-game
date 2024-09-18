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
class Enemy {
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
const enemies = [];


function spawn() {
    setInterval(()=>{
        const radius = Math.random() * (30-10)+10;
        let x;
        let y;
        
        if(Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius :canvas.width + radius;
            y = Math.random() * canvas.height;
        }
        else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 -radius : canvas.height + radius;
        }
        
        const color = 'green'
        const angle = Math.atan2(canvas.height/2 - y ,canvas.width/2 - x);
        const velocity = {
            x : 3*Math.cos(angle),
            y : 3*Math.sin(angle)
        }
        enemies.push(new Enemy(x,y,radius,color,velocity))
    },1000) 
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    newplayer.draw();
    projectiles.forEach((projectile) => 
        {
        projectile.update();
    })
    enemies.forEach((enemy, index)=>{
        enemy.update();

        projectiles.forEach((projectile, projectileIndex) =>{
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if(dist - enemy.radius - projectile.radius < 1) {
                setTimeout(() => {
                    //objects touch
                    enemies.splice(index, 1);
                    projectiles.splice(projectileIndex, 1);
                }, 0)
   
            }
        })

    })
}

window.addEventListener('click', (event)=>{
    const angle = Math.atan2(event.clientY - canvas.height/2 , event.clientX - canvas.width/2);
    const velocity = {
        x : 8*Math.cos(angle),
        y : 8*Math.sin(angle)
    }
    projectiles.push(new Projectile(innerWidth/2,innerHeight/2,6,'red',velocity)
);
});

animate();
spawn()