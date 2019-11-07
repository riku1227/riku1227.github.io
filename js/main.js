"use strict";
(function () {
  const baseUrl = "https://riku1227.github.io";
  const loadFile = (url) => {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("get", url, true);
      request.onloadend = function () {
        if (request.status === 200) {
          resolve(request.responseText)
        } else {
          reject(request.responseText);
        }
      }
      request.send(null);
    });
  }

  const setUpNavigationDrawer = () => {
    const topAppBar = getFirstElementByClass("materialy-app-bar-top");
    const topAppBarDrawerButton = getFirstElementByClass("materialy-app-bar-top--checkbox");
    const navigationDrawer = getFirstElementByClass("materialy-navigation-drawer");
    const navigationDrawerScrim = getFirstElementByClass("materialy-navigation-drawer__modal--scrim");
    const mainContent = getFirstElementByClass("materialy-content");

    if (window.innerWidth <= 896) {
      navigationDrawer.classList.add("materialy-navigation-drawer__modal");
    } else {
      navigationDrawer.classList.remove("materialy-navigation-drawer__modal");
    }

    topAppBarDrawerButton.addEventListener("change", () => {
      const isModalNavigation = navigationDrawer.classList.contains("materialy-navigation-drawer__modal");
      const isFullHeightNavigation = navigationDrawer.classList.contains("materialy-navigation-drawer__full-height");

      if (topAppBarDrawerButton.checked) {
        navigationDrawer.classList.add("materialy-navigation-drawer__open");
        if (isModalNavigation) {
          navigationDrawerScrim.classList.add("materialy-navigation-drawer__modal--scrim__open");
        } else {
          mainContent.classList.add("materialy-content__open-drawer");
          if (isFullHeightNavigation) {
            topAppBar.classList.add("materialy-app-bar-top__full-height-open");
          }
        }
      } else {
        navigationDrawer.classList.remove("materialy-navigation-drawer__open");
        if (isModalNavigation) {
          navigationDrawerScrim.classList.remove("materialy-navigation-drawer__modal--scrim__open");
        } else {
          mainContent.classList.remove("materialy-content__open-drawer");
          if (isFullHeightNavigation) {
            topAppBar.classList.remove("materialy-app-bar-top__full-height-open");
          }
        }
      }
    });
  }

  const getFirstElementByClass = (cssClass) => {
    return document.getElementsByClassName(cssClass)[0];
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    loadFile(`${baseUrl}/html/core/header.html`).then((html) => {
      document.getElementsByClassName("materialy-app-bar-top")[0].innerHTML = html;
    }, (errorText) => {
      console.log(`Error: ${errorText}`);
    });

    loadFile(`${baseUrl}/html/core/navigation-drawer.html`).then((html) => {
      const observer = new MutationObserver(() => {
        setUpNavigationDrawer();
      });
      observer.observe(getFirstElementByClass("materialy-navigation-drawer"), {childList: true});
      getFirstElementByClass("materialy-navigation-drawer").innerHTML = html.replace(/\$baseUrl/g, baseUrl);
    }, (errorText) => {
      console.log(`Error: ${errorText}`);
    });
  });

  let timer = 0;
  window.onresize = () => {
    if (timer > 0) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      setUpNavigationDrawer();
    }, 150);
  };
}());