"use strict";
(function () {
  loadFile("https://riku1227.github.io/html/core/header.html",setupHeader);

  function setupHeader(html) {
    document.getElementsByClassName('materialy-toolbar')[0].innerHTML = html;
  }

  document.getElementById("test").innerHTML = window.navigator.userAgent.toLowerCase();

  function loadFile(url,callback) {
    const request = new XMLHttpRequest();
    request.open("get", url, true);
    request.callback = callback
    request.onloadend = function() {
      this.callback.call(this,request.responseText);
    }
    request.send(null);
  }
}());