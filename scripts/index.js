

class ButtonMesh extends THREE.Mesh {

    constructor()
    {
        super(
            new THREE.PlaneGeometry(2, 2),
            new THREE.ShaderMaterial({
                transparent : true,
                uniforms : {
                    uTexture : { type : "t", value : null },
                    uPoint : { type : "2f", value : [0.5, 0.5]}
                },
                fragmentShader : `
                uniform sampler2D uTexture;
                uniform vec2 uPoint;

                varying vec2 vTex;

                void main()
                {

                    vec2 point = vec2(uPoint.x, 1.0 - uPoint.y);
                    vec2 posti = (uPoint - 0.5) * 3.141592 * 0.7;
                    vec4 trans = vec4(vTex - 0.5, 0.9, 1.0);

                    mat4 rotX;
                    rotX[0] = vec4(1.0, 0.0, 0.0, 0.0);
                    rotX[1] = vec4(0.0, cos(posti.y), sin(posti.y), 0.0);
                    rotX[2] = vec4(0.0,-sin(posti.y), cos(posti.y), 0.0);
                    rotX[3] = vec4(0.0, 0.0, 0.0, 1.0);

                    mat4 rotY;
                    rotY[0] = vec4(cos(posti.x), 0.0,-sin(posti.x), 0.0);
                    rotY[1] = vec4(0.0, 1.0, 0.0, 0.0);
                    rotY[2] = vec4(sin(posti.x), 0.0, cos(posti.x), 0.0);
                    rotY[3] = vec4(0.0, 0.0, 0.0, 1.0);

                    trans = rotX * rotY * trans;
                    trans.x /= trans.z;
                    trans.y /= trans.z;

                    float alpha = 
                    smoothstep( 0.51, 0.50, abs(trans.x)) *
                    smoothstep( 0.51, 0.50, abs(trans.y));

                    float shine = smoothstep(1.7, -0.5, length(vTex - point));
                    shine = shine * shine * shine * shine;
                    vec4 col = texture2D(uTexture, trans.xy + 0.5);

                    gl_FragColor = vec4(col.rgb * shine, col.a * alpha + 0.1);
                }
                `,
                vertexShader : `

                varying vec2 vTex;
                
                void main()
                {
                    vTex = uv;
                    gl_Position = vec4(position, 1.0);
                }
                `
            })
        );
    }
}


class ButtonRenderer extends THREE.WebGLRenderer
{
    constructor(domName, texturePath)
    {
        super();
        
        this.texturePath = texturePath;

        this.dom = document.getElementById(domName);

        //dom event
        this.dom.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.dom.addEventListener("mouseleave", this.onMouseLeave.bind(this));

        //window event
        window.addEventListener("resize", this.onResize.bind(this)); 

        this.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
        this.dom.appendChild(this.domElement);
    }

    setup()
    {
        THREE.ImageUtils.loadTexture(this.texturePath, {}, (tex)=>{
            this.mesh.material.uniforms.uTexture.value = tex;
        });
        this.targPoint = [0.5, 0.5];
        this.currPoint = [0.5, 0.5];

        this.camera = new THREE.Camera();
        this.mesh = new ButtonMesh();
        this.scene = new THREE.Scene();
        
        this.scene.add(this.mesh);
        this.update(0, 0);
    }

    onMouseMove({offsetX, offsetY})
    {
        this.targPoint[0] = offsetX / this.dom.offsetWidth;
        this.targPoint[1] = offsetY / this.dom.offsetHeight;
    }

    onMouseLeave()
    {
        this.targPoint[0] = 0.5;
        this.targPoint[1] = 0.5;
    }

    onResize()
    {
        this.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
    }

    update(ot, nt)
    {
        var dt = (nt - ot) * 0.001;

        this.currPoint[0] += (this.targPoint[0] - this.currPoint[0]) * dt * 8.0;
        this.currPoint[1] += (this.targPoint[1] - this.currPoint[1]) * dt * 8.0;

        this.mesh.material.uniforms.uPoint.value[0] = this.currPoint[0];
        this.mesh.material.uniforms.uPoint.value[1] = this.currPoint[1];

        this.render(this.scene, this.camera);
        requestAnimationFrame(this.update.bind(this, nt));
    }
}

window.onload = ()=>{

    var histRdrr = new ButtonRenderer("History", "res/imgs/History.png");
    var projRdrr = new ButtonRenderer("Projects", "res/imgs/Projects.png");
    var expeRdrr = new ButtonRenderer("Experiments", "res/imgs/Experiments.png");

    histRdrr.setup();
    projRdrr.setup();
    expeRdrr.setup();
}