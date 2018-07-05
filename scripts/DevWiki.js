window.onload = () => {

    $(".ListButton").click(function() {
        var mdname = $(this).children("span").html();
        mdname = mdname.replace(/ /g, "%20");

        var filename = "./../docs/" + mdname.trim() + ".md";
        console.log(filename);
        $("#Content").load(filename, function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
            {
                var html = marked($(this).html());
                console.log(html);
                $(this).html(html);
            }
            if(statusTxt == "error")
            {
                alert("Error: " + xhr.status + ": " + xhr.statusText);
            }
        });
    });

};