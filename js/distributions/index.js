"use strict";
(function () {
    loadFile("https://riku1227.github.io/json/distributions/index.json",generateCard);
}());

function loadFile(url,callback) {
    const request = new XMLHttpRequest();
    request.open("get", url, true);
    request.callback = callback
    request.onloadend = function() {
        this.callback.call(this,request.responseText);
    }
    request.send(null);
}

function generateCard(json) {
    let result = "";
    const jsonObject = JSON.parse(json);

    for(let i = 0;i < jsonObject.card_list.length;i++) {
        for(let j = jsonObject.card_list.length-1;j > i;j--) {
            if(jsonObject.card_list[j].data > jsonObject.card_list[j-1].data) {
                const temp = jsonObject.card_list[j];
                jsonObject.card_list[j] = jsonObject.card_list[j-1];
                jsonObject.card_list[j-1] = temp;
            }
        }
    }

    for (let i = 0;i < jsonObject.card_list.length;i++) {
        const name = jsonObject.card_list[i].name;
        const thumbnail = jsonObject.card_list[i].image_thumbnail;
        const data = jsonObject.card_list[i].data;
        const dataStr = jsonObject.card_list[i].dataStr;
        const description = jsonObject.card_list[i].description;
        const linkDL = jsonObject.card_list[i].link_dl;
        const linkDetails = jsonObject.card_list[i].link_details;
        const html = '<div class="cardList">'+
                     `<img class="cardList__image" src="../../image/distributions/${thumbnail}/cover_image.jpg">`+
                     `<p class="cardList__title">${name}</p>`+
                     `<p class="cardList__text">最終更新日: ${dataStr}</p>`+
                     `<p class="cardList__text">${description}</p>`+
                     '<div class="center">'+
                     `<a class="cardList__button" href="${linkDL}">ダウンロード</a>`+
                     `<a class="cardList__button" href="${linkDetails}">詳細</a>`+
                     '</div>'+
                     '</div>';
        result += html;
    }
    document.getElementsByClassName('center')[0].innerHTML=result;
}