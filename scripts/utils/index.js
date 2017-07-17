
const intro = {
  dom : document.getElementById('introduction'),
  ori :
`Working at Samsung Electronics.<br>
WebGL, OpenGL, Threejs, Openframeworks...<br>
`,
  dst :
`<br>
2013. Samsung SoftWare Membership.<br>
2015. Joined Samsung Electronics.<br>
2015. Software "Expert programmer" certification acquistion.<br>
2015. Moved department at Interaction Group in VD Business.<br>
2017. Joined ModuLab.<br>
`,
  idx : 0,
  show : function() {
    if(this.dst[this.idx] == "<") this.idx += 4;
    if(this.dst[this.idx] == " ") this.idx += 2;
    this.dom.innerHTML = this.ori + this.dst.slice(0, this.idx);
    if(this.idx < this.dst.length) setTimeout(this.show.bind(this), 10);

    this.idx ++;
  }
};



// for rendering
console.log(new N3d_background_fixed());
