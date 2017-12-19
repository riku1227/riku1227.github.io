(function () {
    loadFile("https://riku1227.github.io/html/core/header.html",setupHeader);
    
    function setupHeader(html) {
        document.getElementsByClassName('header')[0].innerHTML = html;
    }
}());

function loadFile(url,callback) {
    var request = new XMLHttpRequest();
    request.open("get", url, true);
    request.callback = callback
    request.onloadend = function() {
        this.callback.call(this,request.responseText);
    }
    request.send(null);
}