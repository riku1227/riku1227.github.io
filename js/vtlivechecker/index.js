(function () {
  let vTuberIdList = ["UCD-miitqNY3nyukJ4Fnf4_A", "UCLO9QDxVL4bnvRRsz6K4bsQ", "UCYKP16oMX9KKPbrNgo_Kgag", "UCsg-YqdqQ-KFF0LNk23BY4A", "UC6oDys1BGgBsIC3WhG1BovQ", "UCeK9HFcRZoTrvqcUCtccMoQ", "UCt9qik4Z-_J-rj3bKKQCeHg", "UCvmppcdYf4HOv-tFQhHHJMA"];
  let clientKey = "AIzaSyDgYtnnA-DxG4dPBuKYOFQK2-S2UdgTKCY";
  let vTuberLiveInfoMap = new Map();

  let liveCount = 0;
  let title = document.title;

  getLiveInfo();
  setInterval(getLiveInfo, 180000); //3分

  function getRequest(url, callBack, json = null) {
    const request = new XMLHttpRequest();
    request.open("get", url, true);
    request.callback = callBack;
    request.onloadend = function() {
      this.callback.call(this, request.responseText, json);
    }
    request.send(null);
  }

  function generateCard(profileJson, liveJson) {
    let result = "";
    const profile = JSON.parse(profileJson);
    const live = JSON.parse(liveJson);
    const profileSnippet = profile.items[0].snippet;
    let liveItems;

    const channelName = profileSnippet.title;
    const channelIcon = profileSnippet.thumbnails.high.url;
    const channelUrl = profile.items[0].id;
    let liveTitle;
    let liveUrl;

    const html = document.getElementById("template").innerHTML.replace("channelIconUrl",channelIcon).replace("channelUrl", "https://www.youtube.com/channel/" + channelUrl).replace("channelName",channelName);

    result = html;

    if(live.items.length != 0) {
      liveItems = live.items[0];
      liveTitle = liveItems.snippet.title;
      liveUrl = liveItems.id.videoId;
      liveCount++;

      result = result.replace("現在は生放送をしていません",`<a class="vtlc-nospace materialy-button--flat--primary vtc-onlineText" href="https://www.youtube.com/watch?v=${liveItems.id.videoId}">${liveItems.snippet.title}</a>`).replace("materialy-card", "materialy-card vtlc-online");
    }

    return result;
  }

  function getLiveInfo() {
    liveCount = 0;
    let reqCount = 0;
    let html = ""
    for(let i = 0; i < vTuberIdList.length; i++) {
      let channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${vTuberIdList[i]}&key=${clientKey}`
      let liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${vTuberIdList[i]}&type=video&eventType=live&key=${clientKey}`
      getRequest(channelUrl,function(json) { getRequest(liveUrl, function(live, profile){
        reqCount++;
        result(profile, live, vTuberIdList[i]);
      } , json) });
    }

    function result(profileJson, liveJson, channelId) {
      vTuberLiveInfoMap.set(channelId, generateCard(profileJson, liveJson));

      if(vTuberIdList.length <= reqCount) {
        setHtml();
      }
    }

    function setHtml() {
      document.title = `${liveCount}人が放送中 ${title}`;
      for(let i = 0; i < vTuberIdList.length; i++) {
        html += vTuberLiveInfoMap.get(vTuberIdList[i]);
      }

      document.getElementById("channels").innerHTML = html;
    }
  }
}());