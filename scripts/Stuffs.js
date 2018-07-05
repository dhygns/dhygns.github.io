

window.onload = () =>{

    //Get Drawing target
    var iframe = document.getElementById("ContentFrame");
    //Get All ListButton class
    var doms = document.getElementsByClassName("ListButton");

    for(var i = 0; i < doms.length; i++)
    {
        const dom = doms[i];

        dom.addEventListener("mousedown", (function(){
            iframe.src = this.id;
            iframe.location.href.reload();
        }).bind(dom));
    }
}