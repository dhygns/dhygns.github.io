


class N3d_abstract {
  constructor(mainid) {

    this.dom = document.getElementById(mainid);
    if(this.dom == null) {
      console.warn(mainid + " doesn't exist.");
      return;
    }

    this.rdrr = new THREE.WebGLRenderer({alpha : true});
    this.rdrr.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
    this.onResize(this.dom.offsetWidth, this.dom.offsetHeight);
    this.dom.appendChild(this.rdrr.domElement);


    //regist event listeners
    window.addEventListener("resize", (e) => {
      this.rdrr.setSize(this.dom.offsetWidth, this.dom.offsetHeight);
      this.onResize(this.dom.offsetWidth, this.dom.offsetHeight);
    });

    window.addEventListener("mousemove", ({pageX, pageY})=>{
      const x = 0.0 + pageX / this.dom.offsetWidth;
      const y = 1.0 - (pageY- window.pageYOffset) / this.dom.offsetHeight ;

      this.onMousemove(x, y);
    });

    this.oldt = new Date(); this.newt = new Date();
    requestAnimationFrame(this.update.bind(this, this.rdrr, 0.0));
  }

  onResize(width, height) {

  }

  onMousemove(x, y) {

  }

  update() {
    this.oldt = this.newt;
    this.newt = new Date();

    requestAnimationFrame(this.update.bind(this, this.rdrr, (this.newt - this.oldt) * 0.001));
  }
}
