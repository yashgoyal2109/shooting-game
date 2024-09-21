const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const scoreEle = document.querySelector('#scoreEle');
const startGame = document.querySelector(".startbutton");
const startpanel = document.querySelector(".start");
const bigScore = document.querySelector("#value");

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

const friction = 0.99

class Particle {
    constructor(x,y,radius,color,dx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.dx = dx; 
        this.alpha = 1;
    }
    draw() {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill();
        c.restore();
    }

    update() {
        this.dx.x *= friction;
        this.dx.y *= friction;
        this.x += this.dx.x;
        this.y += this.dx.y;
        this.draw();
        this.alpha -= 0.02;
        console.log(this.alpha);
    }
}

let newplayer = new Player(innerWidth/2,innerHeight/2,10,'white');
let projectiles = [];
let enemies = [];
let particles = [];

function init() {
    newplayer = new Player(innerWidth/2,innerHeight/2,10,'white');
    projectiles = [];
    enemies = [];
    particles = [];
    score = 0;
    scoreEle.innerHTML = score;
    bigScore.innerHTML = score;


}
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
        
        const color =  `hsl(${Math.random() * 360}, 50%, 50%)`
        const angle = Math.atan2(canvas.height/2 - y ,canvas.width/2 - x);
        const velocity = {
            x : Math.cos(angle),
            y : Math.sin(angle)
        }
        enemies.push(new Enemy(x,y,radius,color,velocity))
    },1000) 
}


let animateId;
let score = 0;
function animate() {
    animateId = requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0,0,canvas.width,canvas.height);
    newplayer.draw();

    particles.forEach((particle,index)=> {
        if(particle.alpha <=0) {
            particles.splice(index, 1);
        }
        else{
            particle.update();
        }
    });

    projectiles.forEach((projectile,index) => 
        {
        projectile.update();
        if(projectile.x + projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 ||  projectile.y - projectile.radius > canvas.height ) {
            setTimeout(() => {
                //objects remove from edges of screen
                projectiles.splice(index, 1);
            }, 0)         
        }
    })
    enemies.forEach((enemy, index)=>{
        enemy.update();

        const dist = Math.hypot(newplayer.x - enemy.x, newplayer.y - enemy.y);

        //end game
        if(dist - enemy.radius - newplayer.radius < 1) {
            startpanel.style.display = 'flex';
            bigScore.innerHTML = score;
            cancelAnimationFrame(animateId);
        }

        projectiles.forEach((projectile, projectileIndex) =>{
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if(dist - enemy.radius - projectile.radius < 1) {

                playSoundEffect(hitSound);
                //create explosions
                for (let i = 0; i < enemy.radius*2; i++) {
                    particles.push(new Particle(projectile.x, projectile.y, Math.random() * 2, enemy.color, 
                        {x : (Math.random() - 0.5) * (Math.random() * 6), 
                         y: (Math.random() - 0.5) * (Math.random() * 6)})
                    );                    
                }
                //making smaller size enemies
                if(enemy.radius - 10 > 5) {
                    //increase the score
                    score +=100;
                    scoreEle.innerHTML = score;
                    enemy.radius -= 10;
                    setTimeout(() => {
                        projectiles.splice(projectileIndex,1)
                    },0)
                }
                else{
                    score +=200;
                    scoreEle.innerHTML = score;
                setTimeout(() => {
                    //projectiles touch enemy
                    enemies.splice(index, 1);
                    projectiles.splice(projectileIndex, 1);
                }, 0)
            }
   
            }
        })

    })
}


// Audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Audio buffers
let backgroundMusic;
let shootSound;
let hitSound;

// Load audio files
function loadSound(url) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));
}

// Load all sounds
Promise.all([
    loadSound('8-bit-retro-game-music-233964.mp3'),
    loadSound('attack-laser-128280.mp3'),
    loadSound('retro-video-game-death-95730.mp3'),
]).then(([bgMusic, shoot, hit]) => {
    backgroundMusic = bgMusic;
    shootSound = shoot;
    hitSound = hit;
    // Start background music
    playBackgroundMusic();
});

// Play background music
function playBackgroundMusic() {
    const source = audioContext.createBufferSource();
    source.buffer = backgroundMusic;
    source.connect(audioContext.destination);
    source.loop = true;
    source.start();
}

// Play sound effect
function playSoundEffect(buffer) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start();
}


window.addEventListener('click', (event)=>{
    const angle = Math.atan2(event.clientY - canvas.height/2 , event.clientX - canvas.width/2);
    const velocity = {
        x : 8*Math.cos(angle),
        y : 8*Math.sin(angle)
    }
    projectiles.push(new Projectile(innerWidth/2,innerHeight/2,6,'white',velocity)
);
    playSoundEffect(shootSound);
});

startGame.addEventListener("click", ()=>{
    init();
    animate();
    spawn();
    startpanel.style.display = 'none';
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
})

