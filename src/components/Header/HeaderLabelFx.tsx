import * as THREE from "three";

export default class HeaderLabelFx {
  private renderer: THREE.WebGLRenderer | null = null;

  private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  private scene: THREE.Scene = new THREE.Scene();

  private size: THREE.Vector2 = new THREE.Vector2();

  private dummyObject: THREE.Object3D = new THREE.Object3D();

  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;

    this.setup();
    this.update();
  }

  private setup() {
    
    this.camera.position.z = 15.0

    this.dummyObject.add(
      new THREE.Mesh(
        new THREE.CircleGeometry(1.0, 20),
        new THREE.MeshBasicMaterial()
      )
    );
    this.scene.add(this.dummyObject);
  }

  private update() {
    this.renderer?.render(this.scene, this.camera);
    requestAnimationFrame(this.update.bind(this));
  }

  public setSize(width: number) {
    this.renderer?.setSize(width, (width * 9) / 16);
    this.renderer?.getSize(this.size);
    
    this.camera.aspect  = this.size.x / this.size.y;
    this.camera.updateProjectionMatrix();
  }
}
