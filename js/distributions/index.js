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

(function () {
  loadFile("https://riku1227.github.io/json/distributions/index.json",generateCard);
}());