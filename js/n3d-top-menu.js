//particle motion

class Flow {
  constructor(rdrr, width, height, grid) {
    this.width = width == undefined ? 128 : width;
    this.height = height == undefined ? 128 : height;

    this.rdrr = rdrr;


    this.texture = new THREE.WebGLRenderTarget(this.width, this.height, {
      minFilter : THREE.LinearFilter,
      magFilter : THREE.LinearFiletr,
    });

    this.camera = new THREE.Camera();
    this.scene = new THREE.Scene();

    this.scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        uniforms : {
          unif_texture : { type : "t", value : grid.getTexture()},
          unif_resolution : { type : "2f", value : [ grid.getWidth(), grid.getHeight()] }
        },
        fragmentShader : `
        #define PI ` + Math.PI + `
        uniform sampler2D unif_texture;
        uniform vec2 unif_resolution;

        varying vec2 vtex;

        void main() {

          vec2 st00 = vec2(floor(vtex.x * unif_resolution.x), floor(vtex.y * unif_resolution.y)) / unif_resolution;
          vec2 st11 = vec2(ceil(vtex.x * unif_resolution.x), ceil(vtex.y * unif_resolution.y)) / unif_resolution;

          vec4 data00 = texture2D(unif_texture, vec2(st00.x, st00.y));
          vec4 data10 = texture2D(unif_texture, vec2(st11.x, st00.y));
          vec4 data01 = texture2D(unif_texture, vec2(st00.x, st11.y));
          vec4 data11 = texture2D(unif_texture, vec2(st11.x, st11.y));

          vec2 grid00 = vec2(
            data00.x * sin(data00.y * 2.0 * PI),
            data00.x * cos(data00.y * 2.0 * PI)
          );
          vec2 grid10 = vec2(
            data10.x * sin(data10.y * 2.0 * PI),
            data10.x * cos(data10.y * 2.0 * PI)
          );
          vec2 grid01 = vec2(
            data01.x * sin(data01.y * 2.0 * PI),
            data01.x * cos(data01.y * 2.0 * PI)
          );
          vec2 grid11 = vec2(
            data11.x * sin(data11.y * 2.0 * PI),
            data11.x * cos(data11.y * 2.0 * PI)
          );
          vec2 grid = (vtex * unif_resolution - floor(vtex * unif_resolution));
          vec2 pick00 = vec2( 0.0 + grid.x , 0.0 + grid.y);
          vec2 pick10 = vec2(-1.0 + grid.x , 0.0 + grid.y);
          vec2 pick01 = vec2( 0.0 + grid.x ,-1.0 + grid.y);
          vec2 pick11 = vec2(-1.0 + grid.x ,-1.0 + grid.y);

          float a0 = dot(grid00, pick00);
          float a1 = dot(grid10, pick10);
          float a2 = dot(grid01, pick01);
          float a3 = dot(grid11, pick11);

          float A0 = a0 + smoothstep(0.0, 1.0, grid.x) * ( a1 - a0);
          float A1 = a2 + smoothstep(0.0, 1.0, grid.x) * ( a3 - a2);

          float A2 = A0 + smoothstep(0.0, 1.0, grid.y) * ( A1 - A0);


          gl_FragColor = vec4(vec3(A2 * 0.5 + 0.5), 1.0);
        }
        `,
        vertexShader : `
        varying vec2 vtex;
        void main() {
          vtex = uv;
          gl_Position = vec4(position, 1.0);
        }
        `
      })
    ));
  }

  update(dt) {
    this.rdrr.render(this.scene, this.camera, this.texture);
  }

  getTexture() { return this.texture; }
}
class Grid {
  constructor(rdrr, width, height) {
    this.rdrr = rdrr;
    this.width = width == undefined ? 4 : width;
    this.height = height == undefined ? 4 : height;

    this.infoTexture = new THREE.WebGLRenderTarget(
      this.width, this.height , {
        minFilter : THREE.NearestFilter,
        magFilter : THREE.NearestFilter,
        wrapS : THREE.RepeatWrapping,
        wrapT : THREE.RepeatWrapping,
      }
    );
    this.tempTexture = new THREE.WebGLRenderTarget(
      this.width, this.height , {
        minFilter : THREE.NearestFilter,
        magFilter : THREE.NearestFilter,
        wrapS : THREE.RepeatWrapping,
        wrapT : THREE.RepeatWrapping,
      }
    );

    this.commonCamera = new THREE.Camera();

    this.tempScene = new THREE.Scene();
    this.infoScene = new THREE.Scene();

    this.uniforms = {
      unif_texture : { type : "t", value : this.infoTexture },
      unif_dt : { type : "1f", value : 0.0},
      unif_isinit : { type : "1f", value : 0.0},
      unif_seed : { type : "1f", value : Math.random() }
    };
    this.tempMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.ShaderMaterial({
        uniforms : this.uniforms,
        fragmentShader : `
        uniform sampler2D unif_texture;
        uniform float unif_dt;
        uniform float unif_isinit;
        uniform float unif_seed;

        varying vec2 vtex;

        float rand(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        void main(void) {
          vec4 retcolor = vec4(0.0);
          if(unif_isinit < 0.5) {
            retcolor = vec4(
              rand(vtex + unif_seed + 0.01),
              rand(vtex + unif_seed + 0.02),
              rand(vtex + unif_seed + 0.03),
              1.0);
          }
          else {
            vec3 data = texture2D(unif_texture, vtex).rgb;
            float rad = (data.g * 2.0);
            float rpd = (data.b * 2.0 - 1.0);
            rad += rpd * unif_dt;

            retcolor = vec4(data.r, fract(rad * 0.5 + 1.0), data.b, 1.0);
          }
          gl_FragColor = retcolor;
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
    );
    this.infoMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2.0, 2.0),
      new THREE.MeshBasicMaterial({map : this.tempTexture})
    );

    this.tempScene.add(this.tempMesh);
    this.infoScene.add(this.infoMesh);

    this.rebuild();
  }

  rebuild() {
    this.uniforms.unif_isinit.value = 0.0;
    this.uniforms.unif_seed.value = Math.random();
    this.rdrr.render(this.tempScene, this.commonCamera, this.tempTexture);
    this.rdrr.render(this.infoScene, this.commonCamera, this.infoTexture);
  }

  update(dt) {
    this.uniforms.unif_dt.value = dt;
    this.uniforms.unif_isinit.value = 1.0;
    this.rdrr.render(this.tempScene, this.commonCamera, this.tempTexture);
    this.rdrr.render(this.infoScene, this.commonCamera, this.infoTexture);

  }

  getWidth() { return this.width; }
  getHeight() { return this.height; }
  getTexture() { return this.infoTexture; }
}
class Perlin {
  constructor(rdrr, width, height) {
    if(rdrr == undefined) {
      this.rdrr = new THREE.WebGLRenderer({alpha : false});
      this.rdrr.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(this.rdrr.domElement);
    } else { this.rdrr = rdrr; }
    // console.log(THREE);


    this.grid = new Grid(this.rdrr, width, height);
    this.flow = new Flow(this.rdrr, 1024, 1024, this.grid);

    //
    // this.camera = new THREE.Camera();
    // this.scene = new THREE.Scene();
    // this.scene.add(new THREE.Mesh(
    //   new THREE.PlaneGeometry(2.0, 2.0),
    //   new THREE.MeshBasicMaterial({ map : this.flow.getTexture() })
    // ));
  }

  update(dt) {
    this.grid.update(dt);
    this.flow.update(dt);
  }

  get texture() { return this.flow.getTexture(); }
}

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


    this.idxs = 16384 * 8;
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
        vec2 pos = (Vec4ToVec2(v) - 0.5) * 255.0;

        vec2 dit = ((unif_mouse - 0.5) * vec2(1.0, 0.1) + 0.5) - Vec4ToVec2(v);
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

    this.canvas = document.getElementById("div_top_menu_text");
    this.canctx = this.canvas.getContext("2d");

    this.rtttex = new THREE.WebGLRenderTarget(this.canvas.width, this.canvas.height, {
      minFilter : THREE.LinearFilter,
      magFilter : THREE.LinearFilter
    });


    this.canctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canctx.fillStyle = "black";
    this.canctx.font = "bold 32px Serif";
    this.canctx.fillText("Portfolio", 8, this.canvas.height - 10);

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
          float alpha = smoothstep(0.6, 0.7, texcol.a);
          vec3 wps = vec3((vtex - 0.5) * 1.0 + 0.5, 0.0);

          vec3 tex = mix(wps + ptx, texcol.rgb, smoothstep(1.0, 0.7, texcol.a));

          tex.rg = mix(vtex, tex.rg, alpha);
          vec4 ret = texture2D(unif_wordtex, tex.rg);

          ret = mix(ret, vec4(0.0, 0.0, 1.0, 1.0), alpha * 0.2);

          gl_FragColor = ret;//vec4(.rgb, 1.0);
        }
        `
      })
    ))
  }

  onResize(w, h) {
    this.canctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canctx.fillStyle = "black";
    this.canctx.font = "bold 32px Serif";
    this.canctx.fillText("Portfolio", 8, this.canvas.height - 10);
    this.wortex.needsUpdate = true;
  }

  update(rdrr, dt) {
    this.perlin.update(dt);
    rdrr.render(this.targetscn, this.targetcam, this.rtttex);
    rdrr.render(this.scene, this.camera);
  }
};

class Div_Top_Menu extends Main{
  constructor() {
    super("div_top_menu");

    this.mpos = new THREE.Vector2();
    this.rpos = new THREE.Vector2();


    this.camera = new THREE.PerspectiveCamera(45, this.dom.offsetWidth / this.dom.offsetHeight, 1.0, 1000.0);
    this.camera.position.z = 70.0;
    // this.camera = new THREE.Camera();
    this.scene = new DT_Particle();

    this.filter = new Div_Top_Filter(this.scene, this.camera, this.rdrr);
  }

  onResize(w, h) {
    if(this.camera) {
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.filter.onResize(w, h);
    }
    //  Camera must updated by ratio
    // this.camera
    // this.camera
  }

  onMousemove(x, y) {
    //마우스 부분에 가까울수록 바깥쪽으로 add Force
    this.mpos.x = x;
    this.mpos.y = y;
  }

  update(rdrr, dt) {
    super.update();

    this.rpos.x += (this.mpos.x - this.rpos.x) * dt;
    this.rpos.y += (this.mpos.y - this.rpos.y) * dt;
    if(this.scene.setm) this.scene.setm(this.rpos.x, this.rpos.y);

    this.scene.update(rdrr, dt);
    this.filter.update(rdrr, dt);
    // rdrr.render(this.scene, this.camera);
  }
}
