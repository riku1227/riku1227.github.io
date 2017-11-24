(function () {
    generateHeader("riku1227","https://riku1227.github.io/",genNavList("ホーム","https://riku1227.github.io/") + genNavList("配布物","https://riku1227.github.io/html/distributions/"));
    setupRipple()
}());

function generateHeader(title, titleLink, navigationList) {
    var html =
    '<div class="header__navigation">\n'+
    '<input id="header__navigation--input" type="checkbox" class="header__navigation--unshow">\n'+
    '<label id="header__navigation--open" for="header__navigation--input">\n'+
    '<span></span><span></span><span></span>\n'+
    '</label>\n'+
    '<label class="header__navigation--unshow" id="header__navigation--close" for="header__navigation--input"></label>\n'+
    '<div class="header__navigation__content"><ul class="header__navigation__content__list">' + navigationList + '</ul> </div>\n'+
    '</div>\n'+

    '<h1>\n'+
    '<a class="header__text" href="' + titleLink + '">' + title + '</a>\n'+
    '</h1>';
    document.getElementsByClassName('header')[0].innerHTML = html;
}

function genNavList(title, link) {
    return '<li><a href="' + link + '">' + title + '</a></li>';
}

function setupRipple() {
    [].forEach.call(document.getElementsByClassName("button"),function(element){
        element.addEventListener("click",rippleAnimation);
    });
    [].forEach.call(document.getElementsByClassName("card__button"),function(element){
        element.addEventListener("click",rippleAnimationCard);
    });
    [].forEach.call(document.getElementsByClassName("cardList__button"),function(element){
        element.addEventListener("click",rippleAnimationCard);
    });

    function rippleAnimation(e) {
        let button = this;
        let spanCover = document.createElement("span");
        let spanSize = button.offsetWidth;
        let location = button.getBoundingClientRect();
        let x = e.pageX - location.left - window.pageXOffset - (spanSize / 2);
        let y = e.pageY - location.top - window.pageYOffset - (spanSize / 2);
        let position = "top:" + y + "px; left:" + x + "px; height:" + spanSize + "px; width:" + spanSize + "px;";

        button.appendChild(spanCover);
        spanCover.setAttribute("style", position);
        spanCover.className = "button__ripple";

        setTimeout(function() {
            var list = document.getElementsByClassName( "button__ripple" ) ;
            for(var i =list.length-1;i>=0; i--){
            list[i].parentNode.removeChild(list[i]);
        }}, 350)
    }

    function rippleAnimationCard(e) {
        let button = this;
        let spanCover = document.createElement("span");
        let spanSize = button.offsetWidth;
        let location = button.getBoundingClientRect();
        let x = e.pageX - location.left - window.pageXOffset - (spanSize / 2);
        let y = e.pageY - location.top - window.pageYOffset - (spanSize / 2);
        let position = "top:" + y + "px; left:" + x + "px; height:" + spanSize + "px; width:" + spanSize + "px;";

        button.appendChild(spanCover);
        spanCover.setAttribute("style", position);
        spanCover.className = "card__button__ripple";

        setTimeout(function() {
          var list = document.getElementsByClassName( "card__button__ripple" ) ;
          for(var i =list.length-1;i>=0; i--){
            list[i].parentNode.removeChild(list[i]);
        }}, 350)
      }
}