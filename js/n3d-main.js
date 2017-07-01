


class Main {
  constructor(mainid) {
    this.rdrr = new THREE.WebGLRenderer({alpha : false});
    this.dom = document.getElementById("main_top");

    if(this.dom == null) {
      console.warn(mainid + " doesn't exist.");
      return;
    }

    this.rdrr.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
    this.dom.appendChild(this.rdrr.domElement);


    //regist event listeners
    window.addEventListener("resize", (e) => {
      this.rdrr.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
    });
    this.dom.addEventListener("mousemove", ({pageX, pageY})=>{
      const x = 0.0 + pageX / this.dom.offsetWidth;
      const y = 1.0 - pageY / this.dom.offsetHeight;

      this.onMousemove(x, y);
    });

    this.oldt = new Date(); this.newt = new Date();
    requestAnimationFrame(this.update.bind(this, this.rdrr, 0.0));
  }

  onMousemove(x, y) {

  }

  update() {
    this.oldt = this.newt;
    this.newt = new Date();

    requestAnimationFrame(this.update.bind(this, this.rdrr, (this.newt - this.oldt) * 0.001));
  }
}


class Top_Main extends Main {
  constructor(mainid) {
    super("main_top");


    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();

    this.uniforms = { unif_mouse : { type : "2f", value : [0.0, 0.0] } };

    this.object = new THREE.Object3D();
    this.object.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        uniforms : this.uniforms,
        fragmentShader : `
        #define PI ` + Math.PI + `
        varying vec2 vmouse;
        varying vec2 vtex;

        void main(void) {
          vec3 color = vec3(0.0);
          color.r = 0.5 + 0.5 * abs(sin((vtex.x + vmouse.x) * PI));
          color.g = 0.5 + 0.5 * abs(cos((vtex.x + vmouse.y) * PI));
          color.b = 0.5 + 0.5 * abs(sin((vtex.x + 1.2 * vmouse.y) * PI));

          gl_FragColor = vec4(color, 1.0);
        }
        `,
        vertexShader : `
        uniform vec2 unif_mouse;
        varying vec2 vmouse;
        varying vec2 vtex;
        void main(void) {
          vmouse = unif_mouse;
          vtex = uv;
          gl_Position = vec4(position, 1.0);
        }
        `
      })
    ));
    this.scene.add(this.object);
  }

  onMousemove(x, y) {
    this.uniforms.unif_mouse.value[0] = x;
    this.uniforms.unif_mouse.value[1] = y;
  }

  update(rdrr, dt) {
    super.update();
    rdrr.render(this.scene, this.camera);
  }
}

class Left_Main extends Main {
  constructor(mainid) {
    super("main_left");
  }
}
