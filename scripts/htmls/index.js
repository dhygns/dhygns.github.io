


(function() {
  this.rdrr = new THREE.WebGLRenderer({alpha : false});
  this.rdrr.setSize(window.innerWidth, window.innerHeight);
  document.appendChild(this.rdrr.domElement);

  this.update(0);
}).call({
  update : function(timeStamp) {

    console.log("L");
    requestAnimationFrame(this.update)
  }
})
