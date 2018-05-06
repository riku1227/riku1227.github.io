"use strict";
const loadFile = function(url,callback) {
  const request = new XMLHttpRequest();
  request.open("get", url, true);
  request.callback = callback
  request.onloadend = function() {
    this.callback.call(this,request.responseText);
  }
  request.send(null);
};

const generateCard = function(json) {
  let result = "";
  const jsonObject = JSON.parse(json);

  const quickSort = function(startID, endID) {
    let pivot = jsonObject.card_list[Math.floor((startID + endID)/2)].data;
    let left = startID;
    let right = endID;

    while(true) {
      while(jsonObject.card_list[left].data>pivot) {
        left++;
      }
      while(pivot>jsonObject.card_list[right].data) {
        right--;
      }
      if(right <= left) {
        break;
      }

      let tmp =jsonObject.card_list[left];
      jsonObject.card_list[left] =jsonObject.card_list[right];
      jsonObject.card_list[right] =tmp;
      left++;
      right--;
    }

    if(startID < left-1){
      quickSort(startID,left-1);
    }
    if(right+1 < endID){
      quickSort(right+1,endID);
    }
  }

  quickSort(0,jsonObject.card_list.length-1);

  for (let i = 0;i < jsonObject.card_list.length;i++) {
    const name = jsonObject.card_list[i].name;
    const thumbnail = jsonObject.card_list[i].image_thumbnail;
    const data = jsonObject.card_list[i].data;
    const dataStr = jsonObject.card_list[i].dataStr;
    const description = jsonObject.card_list[i].description;
    const linkDL = jsonObject.card_list[i].link_dl;
    const linkDetails = jsonObject.card_list[i].link_details;
    const html = '<div class="materialy-card cardList">'+
           `<img class="cardList__image" src="../../image/distributions/${thumbnail}/cover_image.jpg">`+
           `<p class="materialy-card__title cardList__title">${name}</p>`+
           `<p class="cardList__text">最終更新日: ${dataStr}</p>`+
           `<p class="cardList__text">${description}</p>`+
           '<div class="centerButton">'+
           `<a class="materialy-button--flat--accent cardList__button" href="${linkDL}">ダウンロード</a>`+
           `<a class="materialy-button--flat--accent cardList__button" href="${linkDetails}">詳細</a>`+
           '</div>'+
           '</div>';
    result += html;
  }
  document.getElementsByClassName('center')[0].innerHTML=result;
};

let urlName = "";

const generateContent = function(json) {
  try {
    let jsonObject = JSON.parse(json);
    document.title = jsonObject.information.name + " - riku1227 Website";
    let headArray = document.head.children;
    headArray[10].content = jsonObject.information.name + " - riku1227 Website";
    headArray[11].content = location.href;
    headArray[12].content = "https://riku1227.github.io/image/distributions/" + urlName + "/cover_image.jpg";
    headArray[13].content = jsonObject.information.description;

    document.getElementsByClassName("center")[0].className = "materialy-mainContent";
    let htmlResult = "";
    const titleTagName = "materialy-card__title";
    const subTitleName = "materialy-card__subtitle";
    const textTag = "materialy-card__text";
    const linkTagName = "materialy-button--flat--accent";
    const imageTagName = "materialy-card__image";

    let infoCard = `<div class="materialy-card">`+
    `<div class="materialy-card__image--title"> <img src="../../image/distributions/${urlName}/cover_image.jpg"> </div>`+
    `<p class="${titleTagName}">${jsonObject.information.name}</p>`+
    `<p class="${textTag}">${jsonObject.information.description}</p>`+
    `</div>`;
    htmlResult += infoCard;

    let mode = 0;
    let tempStr = 0;

    for(let i = 0; i != jsonObject.cards.length; i++) {
      let cardObject = jsonObject.cards[i];

      let cardHtml = `<div class="materialy-card">`+
      `<p class="${titleTagName}">${cardObject.title}</p>`;

      for(let j = 0; j != cardObject.content.length; j++) {
        let contentStr = cardObject.content[j];
        if(contentStr.indexOf("$") != -1) {
          let str = contentStr.substring(1);
          let variableName = str.substring(0, str.indexOf("("));
          let variableContet = str.substring(str.indexOf("(") + 1, str.indexOf(")"));
          switch(variableName) {
            case "title":
              cardHtml += `<p class="${titleTagName}">${variableContet}</p>`;
            break;
            case "subTitle":
              cardHtml += `<p class="${subTitleName}">${variableContet}</p>`;
            break;
            case "img":
              cardHtml += `<div class="${imageTagName}"><img src="../../image/distributions/${urlName}/${variableContet}"></div>`;
            break;
            case "link":
              let linkArray = variableContet.split(",");
              cardHtml += `<a class="${linkTagName}" href="${linkArray[1]}">${linkArray[0]}</a>`;
            break;
          }
        } else {
          cardHtml += `<p class="${textTag}">${contentStr}</p>`;
        }
      }

      cardHtml += `</div>`;
      htmlResult += cardHtml;
    }
    document.getElementsByClassName("materialy-mainContent")[0].innerHTML = htmlResult;
  } catch (e) {
    document.getElementsByClassName("materialy-mainContent")[0].innerHTML = "お探しのページは存在しません";
    console.log(e);
  }
};

(function () {

  let target = document.getElementsByClassName("materialy-toolbar")[0];

  let observerHeader = function() {
    let onChange = function() {
      if(window.innerWidth >= 1024) {
        let bool = this.checked;
        if(bool) {
          document.getElementsByClassName("center")[0].style.marginLeft = "0px";
        } else {
          document.getElementsByClassName("center")[0].style.marginLeft = "250px";
        }
      }
    }
    document.getElementById("materialy-toolbar__checkbox").addEventListener("change", onChange);
  }

  let mo = new MutationObserver(observerHeader);
  mo.observe(target, {childList: true});

  let urlParameter = location.search.substring(1);
  if(urlParameter === "") {
    loadFile("https://riku1227.github.io/json/distributions/index.json",generateCard);
  } else {
    let parameter = urlParameter.split("&")[0].split("=");
    if(parameter[0] === "item") {
      urlName = parameter[1];
      loadFile(`https://riku1227.github.io/json/distributions/items/${parameter[1]}.json`,generateContent);
    } else {
      loadFile("https://riku1227.github.io/json/distributions/index.json",generateCard);
    }
  }
}());