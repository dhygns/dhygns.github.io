
class Div_Label extends Main {
  constructor(mainid) {
    super("div_label");

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
        transparent : true,
        uniforms : this.uniforms,
        fragmentShader : `
        #define PI ` + Math.PI + `

        uniform vec2 unif_mouse;
        uniform float unif_time;

        varying vec2 vtex;

        void main(void) {
          vec3 color = vec3(0.0);
          float pivr = (unif_time * 1.0 + vtex.x * 3.0 + unif_mouse.x * 10.0) * PI;
          float pivg = (unif_time * 0.2 + vtex.x * 2.0 + unif_mouse.x * 3.0) * PI;
          color.r = 0.5 + 0.5 * smoothstep(0.5 + 0.3 * sin(pivr), 0.5 + 0.3 * sin(pivr) - 0.2, vtex.y);
          color.g = 0.5 + 0.5 * smoothstep(0.5 + 0.3 * sin(pivg), 0.5 + 0.3 * sin(pivg) - 0.2, vtex.y);
          color.b = 0.2 + 0.8 * smoothstep(1.0, 0.5, vtex.y);

          float alpha = 1.0 - smoothstep(
            length(vec3(0.9)), length(vec3(1.0)), length(color.rgb));

          gl_FragColor = vec4(color, alpha);
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
