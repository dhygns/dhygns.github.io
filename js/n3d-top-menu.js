


class Div_Top extends Main{
  constructor() {
    super("div_top_menu");

    this.camera = new THREE.Camera();


    this.rtttex = new THREE.WebGLRenderTarget(this.dom.offsetWidth, this.dom.offsetHeight, {
      minFilter : THREE.LinearFilter,
      magFilter : THREE.LinearFilter
    });
    this.rttscn = new THREE.Scene();

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

        varying vec2 vtex;

        void main(void) {
          vec3 color = vec3(0.0);
          color.r = 1.0;//smoothstep(0.5 + 0.3 * sin(pivr), 0.5 + 0.3 * sin(pivr) + 0.2, vtex.y);
          color.g = 1.0;//smoothstep(0.5 + 0.3 * sin(pivg), 0.5 + 0.3 * sin(pivg) + 0.2, vtex.y);
          color.b = 1.0;

          gl_FragColor = vec4(color, 0.01);
        }
        `,
        vertexShader : `
        #define PI ` + Math.PI + `

        uniform vec2 unif_mouse;
        uniform float unif_time;

        varying vec2 vtex;

        void main(void) {
          vtex = uv;
          gl_Position = vec4(position, 1.0);
        }
        `
      })
    ));
    this.rttscn.add(this.object);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({map : this.rtttex.texture})
    ))
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

    rdrr.autoClear = false;
    rdrr.render(this.rttscn, this.camera, this.rtttex);

    rdrr.autoClear = true;
    rdrr.render(this.scene, this.camera);
  }
}
