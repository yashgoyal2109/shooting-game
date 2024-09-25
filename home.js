var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
    x: undefined,
    y: undefined
}

var linkHovered = false;
var linkCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    linkCenter.x = window.innerWidth / 2;
    linkCenter.y = window.innerHeight / 2;
    init();
})

// Add event listeners for link hover
document.querySelector('.cool').addEventListener('mouseenter', function() {
    linkHovered = true;
});

document.querySelector('.cool').addEventListener('mouseleave', function() {
    linkHovered = false;
});

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = 'blue';

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.y += this.dy;
        // Run away from link when hovered
        if (linkHovered) {
            var distX = this.x - linkCenter.x;
            var distY = this.y - linkCenter.y;
            var dist = Math.sqrt(distX * distX + distY * distY);
            if (dist < 300) {
                this.dx += distX / dist ;
                this.dy += distY / dist ;
            }
        }


        // Limit speed
        var speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (speed > 5) {
            this.dx = (this.dx / speed) * 5;
            this.dy = (this.dy / speed) * 5;
        }

        // interactive with mouse
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            this.radius += 10;
        }
        else if(this.radius > 20){
            this.radius -= 10   ;
        }

        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 200; i++) {
        var radius = 30;
        var x = Math.random() * (innerWidth);
        var y = Math.random() * (innerHeight);
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();