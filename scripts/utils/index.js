

const historyPath = "./res/info/history.md";

function MarkdownIntoDiv(elementID, markdownPath) {
  console.log("MARKED [" + markdownPath + "] TO [" + elementID + "]");

  var element = document.getElementById(elementID);
  $.get(markdownPath, (data) => {
    element.innerHTML = marked(data);
  });
}


window.onload = function () {
  MarkdownIntoDiv("main", historyPath);
};