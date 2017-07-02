
class Div_Left extends Main {
  constructor(mainid) {
    super("div_left_menu");


    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();

    this.uniforms = {
      unif_mouse : { type : "2f", value : [0.0, 0.0] },
      unif_time : { type : "1f", value : 0.0 }
    };

    this.object = new THREE.Object3D();
    this.object.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        uniforms : this.uniforms,
        fragmentShader : `
        #define PI ` + Math.PI + `

        uniform vec2 unif_mouse;
        uniform float unif_time;

        varying vec2 vtex;

        void main(void) {
          vec3 color = vec3(1.0, 1.0, 0.0);
          gl_FragColor = vec4(color, 1.0);
        }
        `,
        vertexShader : `
        varying vec2 vtex;
        void main(void) {
          vtex = uv;
          gl_Position = vec4(position, 1.0);
        }
        `
      })
    ));
    this.scene.add(this.object);
  }


  onResize(w, h) {
    console.log(w,h);
  }

  onMousemove(x, y) {
    this.uniforms.unif_mouse.value[0] = x;
    this.uniforms.unif_mouse.value[1] = y;
  }

  update(rdrr, dt) {
    super.update();

    this.uniforms.unif_time.value += dt;

    rdrr.render(this.scene, this.camera);
  }
}
