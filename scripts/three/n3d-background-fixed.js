//particle motion
class DT_Particle_Position_Object {
  constructor(w, h) {
    this.temptexture = new THREE.WebGLRenderTarget(w, h, {minFilter : THREE.NearestFilter, magFilter : THREE.NearestFilter});
    this.maintexture = new THREE.WebGLRenderTarget(w, h, {minFilter : THREE.NearestFilter, magFilter : THREE.NearestFilter});

    this.uniforms = {
      // unif_velocity : { type : "t", value : undefined},
      unif_position : { type : "t", value : this.temptexture.texture},
      unif_deltatime : { type : "1f", value : 0.0 },
      unif_isinit : { type : "1f", value : 1.0}
    };

    this.camera = new THREE.Camera();

    this.rttsc = new THREE.Scene();
    this.rttsc.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({map : this.maintexture.texture})
    ));

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        uniforms : this.uniforms,
        fragmentShader : `
        // uniform sampler2D unif_velocity;
        uniform sampler2D unif_position;

        uniform float unif_deltatime;
        uniform float unif_isinit;

        varying vec2 vtex;

        vec2 Vec4ToVec2(vec4 v) {
          return vec2(
            v.x + v.y / 255.0,
            v.z + v.w / 255.0);
        }

        vec4 Vec2ToVec4(vec2 v) {
          return vec4(
            floor(v.x * 255.0) / 255.0,
            fract(v.x * 255.0),
            floor(v.y * 255.0) / 255.0,
            fract(v.y * 255.0));
        }

        float rand(vec2 co){
          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main(void) {
          vec2 pos = Vec4ToVec2(texture2D(unif_position, vtex));
          pos = (pos - 0.5) * 255.0;

          if(unif_isinit > 0.5) {
            pos = vec2(rand(vtex.yx) - 0.5, rand(vtex.xy) - 0.5) * 255.0;
          } else {
            // pos.x += unif_deltatime;
          }

          pos = pos / 255.0 + 0.5;
          vec4 ret = Vec2ToVec4(pos);
          gl_FragColor = ret;
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

  }
  setm(x, y) { this.uniforms.unif_mouse.value = [x, y]; }

  update(rdrr, dt) {
    this.uniforms.unif_deltatime.value = dt;
    rdrr.render(this.scene, this.camera, this.maintexture);
    rdrr.render(this.rttsc, this.camera, this.temptexture);
    this.uniforms.unif_isinit.value = 0.0;
  }
}


class DT_Particle extends THREE.Scene {
  constructor() {
    super();


    this.idxs = 16384 * 1;
    this.texw = Math.min(this.idxs, 16384);
    this.texh = Math.min(Math.ceil(this.idxs / 16384), 16384);

    this.vert = [
      //Front
      -1.0, -1.0,  0.0,
       1.0, -1.0,  0.0,
       1.0,  1.0,  0.0,
       1.0,  1.0,  0.0,
      -1.0,  1.0,  0.0,
      -1.0, -1.0,  0.0,
    ];

    this.post = new DT_Particle_Position_Object(this.texw, this.texh);

    this.indx = [];
    for(var idx = 0.5; idx < this.idxs; idx += 1.0) {
      this.indx.push((idx % this.texw) / this.texw);
      this.indx.push(Math.floor(idx / this.texw) / this.texh);
    }

    this.vert_attribute = new THREE.BufferAttribute(new Float32Array(this.vert), 3);
    this.indx_attribute = new THREE.InstancedBufferAttribute(new Float32Array(this.indx), 2 , 1);

    this.geom = new THREE.InstancedBufferGeometry();
    this.geom.addAttribute("position", this.vert_attribute);
    this.geom.addAttribute("indices", this.indx_attribute);

    this.uniforms = {
      unif_position : { type : "t", value : this.post.maintexture.texture},
      unif_mouse : { type : "2f", value : [0.0, 0.0]},
    };

    this.matr = new THREE.ShaderMaterial({
      transparent : true,
      uniforms : this.uniforms,
      vertexShader : `
      attribute vec2 indices;

      uniform sampler2D unif_position;
      uniform vec2 unif_mouse;

      varying vec2 vtex;

      vec2 Vec4ToVec2(vec4 v) {
        return vec2(v.x + v.y / 255.0, v.z + v.w / 255.0);
      }

      mat4 modelMat() {
        vec4 v = texture2D(unif_position, indices);
        vec2 pos = (Vec4ToVec2(v) - 0.5) * vec2(91.0, 63.0);

        vec2 dit = ((unif_mouse - 0.5) * vec2(1.0, 1.0) + 0.5) - Vec4ToVec2(v);
        pos += - normalize(dit) * smoothstep(0.0, 0.01, length(dit) * 3.0) * 10.0 ;

        mat4 m;
        m[0] = vec4(2.0, 0.0, 0.0, 0.0);
        m[1] = vec4(0.0, 2.0, 0.0, 0.0);
        m[2] = vec4(0.0, 0.0, 1.0, 0.0);
        m[3] = vec4(pos, 0.0, 1.0);
        return m;
      }

      void main(void) {
        vtex = position.xy * 0.5 + 0.5;
        gl_Position = projectionMatrix * viewMatrix * modelMat() * vec4(position, 1.0);
      }
      `,
      fragmentShader : `
      varying vec2 vtex;
      void main(void) {
        float alpha = smoothstep( 0.5, 0.0, length(vtex - 0.5));
        gl_FragColor = vec4(vtex, 0.0, alpha);
      }
      `
    });

    this.ptc = new THREE.Object3D();
    this.ptc.add(new THREE.Mesh(this.geom, this.matr));

    this.add(this.ptc)
  }

  setm(x, y) { this.uniforms.unif_mouse.value = [x, y]; }

  update(rdrr, dt) {
    this.post.update(rdrr, dt);
  }
}

class Div_Top_Filter {
  constructor(scene, camera, rdrr) {
    this.targetscn = scene;
    this.targetcam = camera;

    this.perlin = new Perlin(rdrr, 8, 8);

    this.canvas = document.createElement("canvas");
    // this.canvas.style.width = "1920px";
    // this.canvas.style.height = "1080px";

    this.canctx = this.canvas.getContext("2d");
    this.canctx.canvas.width = 800;
    this.canctx.canvas.height = 600;
    this.rtttex = new THREE.WebGLRenderTarget(this.canvas.width, this.canvas.height, {
      minFilter : THREE.LinearFilter,
      magFilter : THREE.LinearFilter
    });

    this.drawfont();

    this.wortex = new THREE.Texture(this.canvas);
    this.wortex.minFilter = THREE.LinearFilter;
    this.wortex.magFilter = THREE.LinearFilter;
    this.wortex.needsUpdate = true;

    this.uniforms = {
      unif_perlint : { type : "t", value : this.perlin.texture},
      unif_wordtex : { type : "t", value : this.wortex },
      unif_texture : { type : "t", value : this.rtttex.texture}
    };

    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();
    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        uniforms : this.uniforms,
        transparent : true,
        vertexShader : `
        varying vec2 vtex;
        void main(void) {
          vtex = uv;
          gl_Position = vec4(position, 1.0);
        }
        `,
        fragmentShader : `
        #define PI ` + Math.PI + `
        uniform sampler2D unif_perlint;
        uniform sampler2D unif_wordtex;
        uniform sampler2D unif_texture;
        varying vec2 vtex;
        void main(void) {
          vec4 perlin = texture2D(unif_perlint, vtex);
          vec3 ptx = 0.002 * vec3(sin(perlin.x * PI * 4.0), cos(perlin.x * PI * 4.0), 0.0);

          vec4 texcol = texture2D(unif_texture, vtex);
          float alpha = smoothstep(0.7, 0.8, texcol.a);
          vec3 wps = vec3((vtex - 0.5) * 1.0 + 0.5, 0.0);

          vec3 tex = mix(wps + ptx, texcol.rgb, smoothstep(1.0, 0.8, texcol.a));

          tex.rg = mix(vtex, tex.rg, alpha);
          vec4 ret = texture2D(unif_wordtex, tex.rg);

          ret = mix(ret, vec4(0.5, 0.6, 0.7, 0.8), alpha * 0.5);

          gl_FragColor = ret;//vec4(.rgb, 1.0);
        }
        `
      })
    ))
  }

  drawfont() {
    this.canctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canctx.fillStyle = "#888888";
    this.canctx.font = "bold 8px Oswald";
    this.canctx.fillText("Hi, I'm donghyeon kim!", 8, 16);

    this.canctx.font = "4px Oswald";
    this.canctx.fillText("Now, I'm working at Samsung Electronics.", 8, 32 + 16 * 0);
    this.canctx.fillText("WebGL, three-js, Canvas, experiments, tools... ", 8, 32 + 16 * 1);
  }

  onResize(w, h) {
    this.drawfont();
    this.wortex.needsUpdate = true;
  }

  update(rdrr, dt) {
    this.perlin.update(dt);
    rdrr.render(this.targetscn, this.targetcam, this.rtttex);
    rdrr.render(this.scene, this.camera);
  }
};

class N3d_background_fixed extends N3d_abstract{
  constructor() {
    super("background-fixed");
    this.time = 0.0;
    this.mpos = new THREE.Vector2(0.5, 0.5);
    this.rpos = new THREE.Vector2(0.5, 0.5);


    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1.0, 1000.0);
    this.camera.position.z = 70.0;
    // this.camera = new THREE.Camera();
    this.scene = new DT_Particle();

    this.filter = new Div_Top_Filter(this.scene, this.camera, this.rdrr);
  }

  onResize(w, h) {
    if(this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.filter.onResize(w, h);
    }
    //  Camera must updated by ratio
    // this.camera
    // this.camera
  }

  onMousemove(x, y) {
    //마우스 부분에 가까울수록 바깥쪽으로 add Force
    this.mpos.x = (x - 0.5) * 2.0 + 0.5;
    this.mpos.y = (y - 0.5) * 2.0 + 0.5;
  }

  update(rdrr, dt) {
    super.update();
    this.time += dt;

    this.mpos.x += 0.0001 * Math.sin(this.time * Math.PI);
    this.mpos.y += 0.0001 * Math.cos(this.time * Math.PI);

    this.rpos.x += (this.mpos.x - this.rpos.x) * dt;
    this.rpos.y += (this.mpos.y - this.rpos.y) * dt;
    if(this.scene.setm) this.scene.setm(this.rpos.x, this.rpos.y);

    this.scene.update(rdrr, dt);
    this.filter.update(rdrr, dt);
    // rdrr.render(this.scene, this.camera);
  }
}
