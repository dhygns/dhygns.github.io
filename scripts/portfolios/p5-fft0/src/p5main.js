
// var nowt, oldt;

var fft;

class particle {
    constructor() {
        this._color = { 
            r: 255 * (0.3 + 0.7 * Math.random()), 
            g: 255 * (0.3 + 0.7 * Math.random()),
            b: 255 * (0.3 + 0.7 * Math.random()) };

        this.position = { x: 0, y: 0 };
        this._position = { x: 0, y: 0 };

        this.scale = { x: 0, y: 0 };
        this._scale = { x: 0, y: 0 };

        this.rotate = 0.0;
        this._rotate = 0.0;
    }

    update(fft, dt) {

        this.rotate = fft / 255 * Math.PI * 2.0 + millis() * 0.001;

        this.scale.x = 255 / max(fft, 25.5) * 1.0 + 1.0;
        this.scale.y = 255 / max(fft, 25.5) * 1.0 + 1.0;

        this.position.x = 0.0;
        this.position.y = fft * 2.0;



        this._position.x += (this.position.x - this._position.x) * dt * 10.0;
        this._position.y += (this.position.y - this._position.y) * dt * 10.0;

        this._scale.x += (this.scale.x - this._scale.x) * dt;
        this._scale.y += (this.scale.y - this._scale.y) * dt;

        this._rotate += (this.rotate - this._rotate) * dt;

        push();
        noStroke();
        fill(this._color.r, this._color.g, this._color.b);
        translate(window.innerWidth * 0.5, window.innerHeight * 0.5);
        rotate(this._rotate);
        translate(this._position.x, this._position.y);
        scale(this._scale.x, this._scale.y);
        rotate(Math.random() * Math.PI * 2.0);        
        rect(0, 0, 3, 3);
        pop();
    }
}

var oldt, nowt;

function preload() {
    soundFormats("mp3", "ogg");
    soundFile = loadSound("./res/Hey Day - idiotape.mp3");
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    soundFile.loop();
    fft = new p5.FFT();

    this.particles = [];
    
    for(var i = 0; i < 100; i ++){
        this.particles.push(new particle());
    }

    oldt = millis();
    nowt = millis();
}



function draw() {
    oldt = nowt;
    nowt = millis() * 0.001;

    background(255, 255, 255, 10);
    var spectrum = fft.analyze();

    var dt = nowt - oldt;
    for (var i = 0; i < 100; i++) {
        this.particles[i].update(spectrum[i], dt);
    }
}