


class Main {
  constructor(mainid) {
    this.renderer = new THREE.WebGLRenderer({alpha : false});
    this.dom = document.getElementById("main_top");

    if(this.dom == null) {
      console.warn(mainid + " doesn't exist.");
      return;
    }

    this.renderer.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
    this.dom.appendChild(this.renderer.domElement);
  }
}


class Top_Main extends Main {
  constructor(mainid) {
    super("main_top");
  }
}

class Left_Main extends Main {
  constructor(mainid) {
    super("main_left");
  }
}
