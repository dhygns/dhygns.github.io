import {
  Mesh,
  Object3D,
  Vector3,
  Scene,
  PerspectiveCamera,
  WebGLRenderTarget,
  Vector2,
  LinearFilter,
  SphereGeometry,
  DirectionalLight,
  ColorRepresentation,
  MeshStandardMaterial,
  Fog,
  RGBAFormat,
  AmbientLight,
  MeshPhongMaterial,
  Color,
  BoxGeometry
}  from "three";
import { BokehPass } from "./Fx/BokehPass";
import { GUI } from "dat.gui";


const primaryColor = 0xDDBC95;
const secondaryColor = 0xB38867;

const DEFAULT_WIDTH_SIZE: number = 800;
const DEFAULT_HEIGHT_SIZE: number = 600;

export class HeaderLabelObject extends Object3D {
  private mesh?: THREE.Mesh;
  private origX: number = 0;

  constructor(scale: number, position: Vector3) {
    super();

    this.mesh = new Mesh(
      new BoxGeometry(1, 5, 1),
      new MeshPhongMaterial({
        color: 0xddbc95,
        shininess: 0.466,
        specular: 0x383838,
        fog: true,
      })
    );

    this.add(this.mesh);
    this.position.set(position.x, position.y, position.z);
    this.origX = position.x;
    this.scale.set(scale, scale, scale);
  }

  public update(t: number, dt: number) {
    this.position.set(this.origX, this.position.y, this.position.z);
  }
}

export class HeaderLabelDirectionalLight extends DirectionalLight {
  constructor(color?: ColorRepresentation | undefined)
  {
    super(color);
    this.rotation.set(-40, 30, 0);
    this.position.set(100, 700, 350);
  }
}

export class HeaderLabelAmbientLight extends AmbientLight {
  constructor(color?: ColorRepresentation | undefined) {
    super(color);
  }
}

export class HeaderLabelScene extends Scene {
  private gui? : GUI;
  private fxController = { focus: 750, aperture: 4.9, maxblur: 1 };

  private dofPass: BokehPass | null = null;
  private camera?: PerspectiveCamera;
  private targetTexture?: WebGLRenderTarget;

  constructor() {
    super();
    this.fog = new Fog(primaryColor, 0.1, 2500);
    this.background = new Color(primaryColor);
    this.camera = new PerspectiveCamera(
      90,
      DEFAULT_WIDTH_SIZE / DEFAULT_HEIGHT_SIZE,
      0.1,
      3000
    );
    this.camera.rotation.x = 0;
    this.camera.position.y = 1;
    this.camera.position.z = 5;

    this.dofPass = new BokehPass(this, this.camera!, {});
    this.dofPass.renderToScreen = true;

    this.targetTexture = new WebGLRenderTarget(DEFAULT_WIDTH_SIZE, DEFAULT_HEIGHT_SIZE, {
      minFilter : LinearFilter,
      magFilter : LinearFilter,
      format : RGBAFormat
    })
    this.targetTexture.samples = 4;

    this.gui = new GUI();
    this.gui.add(this.fxController, 'focus', 0.1, 3000.0, 0.1).onChange(this.updateUniforms.bind(this));
    this.gui.add(this.fxController, 'aperture', 0, 10, 0.1).onChange(this.updateUniforms.bind(this));
    this.gui.add(this.fxController, 'maxblur', 0.0, 1., 0.001).onChange(this.updateUniforms.bind(this));
    this.gui.close();
    this.updateUniforms();
  }

  private updateUniforms() {
    if (this.dofPass)
    {
      this.dofPass.uniforms[ 'focus' ].value = this.fxController.focus;
      this.dofPass.uniforms[ 'aperture' ].value = this.fxController.aperture * 0.00001;
      this.dofPass.uniforms[ 'maxblur' ].value = this.fxController.maxblur;
    }
  }

  public update(t:number, dt: number) {

    this.camera?.position.set(740 * Math.sin(t * 0.0002), 200, 740 * Math.cos(t * 0.0002));
    this.camera?.lookAt(new Vector3(0, 0, 0));
    this.camera?.updateMatrixWorld();

    this.children.forEach((obj: THREE.Object3D, idx: number) => {
      let hlo = (obj as HeaderLabelObject);
      if(obj.type !== "DirectionalLight" && obj.type !== "AmbientLight")
        hlo?.update(t, dt);
    });
  }

  public render(renderer: THREE.WebGLRenderer) {
		renderer.setClearColor( primaryColor );
		renderer.setClearAlpha( 0.0 );
    renderer.setRenderTarget(this.targetTexture!);
    renderer.clear();
    renderer.render(this, this.camera!);
    this.dofPass?.render(renderer, null, this.targetTexture!);
  }

  public setSize(width: number, height: number) {
    this.dofPass?.setSize(width, height);
    this.camera!.aspect = width / height;
    this.camera!.updateProjectionMatrix();
  }
}

export default class HeaderLabelFx {
  private renderer: THREE.WebGLRenderer | null = null;

  private scene?: HeaderLabelScene;

  private size: Vector2 = new Vector2();

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;

    this.setup();
    this.update();
  }

  private setup() {
    this.scene = new HeaderLabelScene();
    this.scene.add(
      new HeaderLabelDirectionalLight(0xFFFFFF),
      new HeaderLabelAmbientLight(secondaryColor),
      new HeaderLabelObject(100, new Vector3(0, 50, 500)),
      new HeaderLabelObject(50, new Vector3(-800, 25, 400)),
      new HeaderLabelObject(80, new Vector3(600, 40, 0)),
      new HeaderLabelObject(100, new Vector3(-600, 50, 0)),
      new HeaderLabelObject(120, new Vector3(-100, 60, -200)),
      new HeaderLabelObject(80, new Vector3(200, 40, -400)),
      new HeaderLabelObject(50, new Vector3(-500, 25, -800))
    );
  }

  private update(ot?:any, nt?:any) {
    const dt = ot && nt ? nt - ot : 0;
    this.scene?.update(nt , dt);

    this.scene?.render(this.renderer!);
    requestAnimationFrame(this.update.bind(this, nt));
  }

  public setSize(width: number) {
    this.renderer?.setSize(width, (width * 9) / 16);
    this.renderer?.getSize(this.size);

    this.scene?.setSize(this.size.x, this.size.y);
  }
}
