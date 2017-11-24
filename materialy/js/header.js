(function () {
    var title = "AAAAAAAAA";
    var titleLink = "https://aaaaa.com/";
    var navigationList = genNavList("TEST","https://test.com/") + genNavList("TEST2","#") + genNavList("TEST3","#");

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
}());

function genNavList(title, link) {
    return '<li><a href="' + link + '">' + title + '</a></li>';
}