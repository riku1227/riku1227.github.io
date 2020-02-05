"use strict";
(function () {
  const baseUrl = "https://riku1227.com";
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

  let isLoadedHeader = false;
  let isLoadedNavigationDrawer = false;

  const rippleEffect = (event) => {
    const target = event.target;
    const rippleSpan = document.createElement("span");
    const rippleSpanSize = target.offsetWidth;
    const targetLocation = target.getBoundingClientRect();

    const x = event.pageX - targetLocation.left - window.pageXOffset - (rippleSpanSize / 2);
    const y = event.pageY - targetLocation.top - window.pageYOffset - (rippleSpanSize / 2);

    const ripplePosition = `top: ${y}px; left: ${x}px; height: ${rippleSpanSize}px; width: ${rippleSpanSize}px;`;

    target.appendChild(rippleSpan);
    rippleSpan.setAttribute("style", ripplePosition);
    target.classList.forEach((className) => {
      if (className.indexOf("materialy-ripple") != -1) {
        switch (className) {
          case "materialy-ripple":
            rippleSpan.setAttribute("class", "materialy-ripple--effect");
            break;
          case "materialy-ripple__base-accent":
            rippleSpan.setAttribute("class", "materialy-ripple--effect__base-accent");
            break;
          case "materialy-ripple__accent":
            rippleSpan.setAttribute("class", "materialy-ripple--effect__accent");
            break;
          case "materialy-ripple__base-primary":
            rippleSpan.setAttribute("class", "materialy-ripple--effect__base-primary");
            break;
          case "materialy-ripple__primary":
            rippleSpan.setAttribute("class", "materialy-ripple--effect__primary");
            break;
          default:
            rippleSpan.setAttribute("class", "materialy-ripple--effect");
            break;
        }
      }
    });
    const rippleId = `materialy-ripple-${Math.random()}`
    rippleSpan.setAttribute("id", rippleId)

    setTimeout(() => {
      document.getElementById(rippleId).remove();
    }, 1250);
  }

  const setUpRippleEffect = () => {
    Array.from(document.querySelectorAll('.materialy-ripple')).forEach((elem) => {
      elem.addEventListener('click', rippleEffect);
    });
    Array.from(document.querySelectorAll('.materialy-ripple__base-accent')).forEach((elem) => {
      elem.addEventListener('click', rippleEffect);
    });
    Array.from(document.querySelectorAll('.materialy-ripple__accent')).forEach((elem) => {
      elem.addEventListener('click', rippleEffect);
    });
    Array.from(document.querySelectorAll('.materialy-ripple__base-primary')).forEach((elem) => {
      elem.addEventListener('click', rippleEffect);
    });
    Array.from(document.querySelectorAll('.materialy-ripple__primary')).forEach((elem) => {
      elem.addEventListener('click', rippleEffect);
    });
  }

  const setUpNavigationDrawer = () => {
    if (isLoadedHeader && isLoadedNavigationDrawer) {
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
      setUpRippleEffect();
    }
  }

  const getFirstElementByClass = (cssClass) => {
    return document.getElementsByClassName(cssClass)[0];
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    setUpRippleEffect();

    loadFile(`${baseUrl}/html/core/header.html`).then((html) => {
      document.getElementsByClassName("materialy-app-bar-top")[0].innerHTML = html;
      isLoadedHeader = true;
      setUpNavigationDrawer();
    }, (errorText) => {
      console.log(`Error: ${errorText}`);
    });

    loadFile(`${baseUrl}/html/core/navigation-drawer.html`).then((html) => {
      getFirstElementByClass("materialy-navigation-drawer").innerHTML = html.replace(/\$baseUrl/g, baseUrl);
      isLoadedNavigationDrawer = true;
      setUpNavigationDrawer();
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