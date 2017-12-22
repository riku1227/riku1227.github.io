(function () {
    loadFile("https://riku1227.github.io/html/core/header.html",setupHeader);

    function setupHeader(html) {
        document.getElementsByClassName('header')[0].innerHTML = html;
    }

    [].forEach.call(document.getElementsByClassName("button"),function(element){
        element.addEventListener("click",rippleAnimation);
    });
    [].forEach.call(document.getElementsByClassName("card__button"),function(element){
        element.addEventListener("click",rippleAnimation);
    });
    [].forEach.call(document.getElementsByClassName("cardList__button"),function(element){
        element.addEventListener("click",rippleAnimation);
    });
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

function rippleAnimation(e) {
    var button = this;
    var spanCover = document.createElement("span");
    var spanSize = button.offsetWidth;
    var location = button.getBoundingClientRect();
    var x = e.pageX - location.left - window.pageXOffset - (spanSize / 2);
    var y = e.pageY - location.top - window.pageYOffset - (spanSize / 2);
    var position = "top:" + y + "px; left:" + x + "px; height:" + spanSize + "px; width:" + spanSize + "px;";
    button.appendChild(spanCover);
    spanCover.setAttribute("style", position);
    spanCover.className = this.className + "__ripple";
    setTimeout(function() {
            var list = document.getElementsByClassName(this.className + "__ripple");
            for(var i =list.length-1;i>=0; i--){
            list[i].parentNode.removeChild(list[i]);
    }}, 350)
}