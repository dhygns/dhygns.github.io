
var domIntroduction = document.getElementById('introduction');
var domIntroduction_ori_text =
`Working at Samsung Electronics.<br>
WebGL, OpenGL, Threejs, Openframeworks...
`;
var domIntroduction_dst_text = `<br><br>
  2013. Samsung SoftWare Membership.<br>
  2015. Joined Samsung Electronics.<br>
  2015. Software "Expert programmer" certification acquistion.<br>
  2015. Moved department at Interaction Group in VD Business.<br>
  2017. Joined ModuLab.<br>
`
var domIntroduction_idx_text = 0;

function showIntroduction() {
  var t = domIntroduction.innerHTML.toString();
  domIntroduction.innerHTML = t.slice(0, 99);
  addIntroductionText();
}
function addIntroductionText() {
  domIntroduction_idx_text++;
  domIntroduction.innerHTML = domIntroduction_ori_text + domIntroduction_dst_text.slice(0, domIntroduction_idx_text);

  if(domIntroduction_idx_text < domIntroduction_dst_text.length) setTimeout(addIntroductionText, 30);
}




  console.log(new N3d_background_fixed());
