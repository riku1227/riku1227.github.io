(function () {
  [].forEach.call(document.getElementsByClassName("button"),function(element){
    element.addEventListener("click",rippleAnimation);
  });
  [].forEach.call(document.getElementsByClassName("card__button"),function(element){
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
}());