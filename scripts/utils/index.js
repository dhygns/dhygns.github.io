
const intro = {
  dom: document.getElementById('introduction'),
  ori:
  `Working at Samsung Electronics.<br>
WebGL, OpenGL, Threejs, Openframeworks...<br>
`,
  dst:
  `<br>
2013. Samsung Software Membership.<br>
2015. Joined Samsung Electronics.<br>
2015. "Expert programmer" acquistion of Software certification.<br>
2015. Moved department to Interaction Group in VD Business.<br>
2017. Joined ModuLab.<br>
`,
  idx: 0,
  show: function () {
    if (this.dst[this.idx] == "<") this.idx += 4;
    if (this.dst[this.idx] == " ") this.idx += 2;
    this.dom.innerHTML = this.ori + this.dst.slice(0, this.idx);
    if (this.idx < this.dst.length) setTimeout(this.show.bind(this), 10);

    this.idx++;
  }
};

const portfolio = {
  dom_portfolio: document.getElementsByClassName("pannel-portfolio"),
}

const examples = {
  dom: document.getElementById("demos"),
  active: function (path) {
    this.dom.innerHTML = `<object style="width:100%;height:600px;" type="text/html" data="./scripts/portfolios/` + path + `/index.html"></object>`;
  }
}

// for rendering
// console.log(new N3d_background_fixed());


function resize() {
  var total_width = 0;
  const dom_width = portfolio.dom_portfolio[0].parentElement.offsetWidth;

  var begin = 0;
  var width = 0;

  for (var idx = 0; idx < portfolio.dom_portfolio.length; idx++) {
    const curr_dom = portfolio.dom_portfolio[idx].getElementsByClassName("pannel-img")[0];

    if (width + curr_dom.offsetWidth < dom_width) {
      width += curr_dom.offsetWidth;
    }
    else {
      var left_width = dom_width - width;
      var curr_width = width;

      var pre = begin;

      for (pre = begin; pre < idx; pre++) {
        const prev_dom = portfolio.dom_portfolio[pre].getElementsByClassName("pannel-img")[0];
        const prev_lef = portfolio.dom_portfolio[pre].getElementsByClassName("pannel-img-right")[0];
        const prev_rig = portfolio.dom_portfolio[pre].getElementsByClassName("pannel-img-right")[1];

        const prev_width = (left_width * prev_dom.offsetWidth / curr_width * 0.5);

        const obst_width = prev_width - 10;
        const obst_margin = 10.0 + Math.min(0.0, obst_width);

        prev_lef.style["width"] = Math.max(0, obst_width - 1) + "px";
        prev_lef.style["margin-left"] = "0px";
        prev_lef.style["margin-right"] = obst_margin + "px";

        prev_rig.style["width"] = Math.max(0, obst_width - 1) + "px";
        prev_rig.style["margin-left"] = obst_margin + "px";
        prev_rig.style["margin-right"] = "0px";
      }
      begin = idx;
      width = curr_dom.offsetWidth;
    }
  }
}
resize();

window.addEventListener("resize", () => {
  resize();
});
