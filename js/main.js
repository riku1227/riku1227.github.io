"use strict";
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

    function loadFile(url,callback) {
        const request = new XMLHttpRequest();
        request.open("get", url, true);
        request.callback = callback
        request.onloadend = function() {
            this.callback.call(this,request.responseText);
        }
        request.send(null);
    }

    let rippleDelete = false;

    function rippleAnimation(e) {
        const button = this;
        const spanCover = document.createElement("span");
        const spanSize = button.offsetWidth;
        const location = button.getBoundingClientRect();
        const x = e.pageX - location.left - window.pageXOffset - (spanSize / 2);
        const y = e.pageY - location.top - window.pageYOffset - (spanSize / 2);
        const position = `top:${y}px; left:${x}px; height:${spanSize}px; width:${spanSize}px;`;
        button.appendChild(spanCover);
        spanCover.setAttribute("style", position);
        spanCover.className = `${this.className}__ripple`;
        if(!rippleDelete) {
            rippleDelete = true;
            setTimeout(function() {
                const list = document.getElementsByClassName(`${button.className}__ripple`);
                for(let i =list.length-1;i>=0; i--){
                    list[i].parentNode.removeChild(list[i]);
                }
                rippleDelete = false;
            }, 2500);
        }
    }
}());