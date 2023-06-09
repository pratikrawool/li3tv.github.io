


var styleSwitchStylesheets = '<link rel="alternate stylesheet" title="blue-orange" media="screen" href="css/themes/blue-orange.css"><link rel="alternate stylesheet" title="cyan-red" media="screen" href="css/themes/cyan-red.css"><link rel="alternate stylesheet" title="green-violet" media="screen" href="css/themes/green-violet.css"><link rel="alternate stylesheet" title="orange-blue" media="screen" href="css/themes/orange-blue.css"><link rel="alternate stylesheet" title="red-green" media="screen" href="css/themes/red-green.css"><link rel="alternate stylesheet" title="teal-magenta" media="screen" href="css/themes/teal-magenta.css"><link rel="alternate stylesheet" title="violet-green" media="screen" href="css/themes/violet-green.css">';



var styleSwitchHTML = '<div class="color-picker" dir="ltr"> <a href="javascript:void(0);" onclick="setActiveStyleSheet(\'blue-orange\'); return false;" class="color_blue"></a> <a href="javascript:void(0);" onclick="setActiveStyleSheet(\'cyan-red\'); return false;" class="color_cyan"></a> <a href="javascript:void(0);" onclick="setActiveStyleSheet(\'green-violet\'); return false;" class="color_green"></a> <a href="javascript:void(0);" onclick="setActiveStyleSheet(\'orange-blue\'); return false;" class="color_orange"></a> <a href="javascript:void(0);" onclick="setActiveStyleSheet(\'red-green\'); return false;" class="color_red"></a> <a href="javascript:void(0);" onclick="setActiveStyleSheet(\'teal-magenta\'); return false;" class="color_teal"></a> <a href="javascript:void(0);" onclick="setActiveStyleSheet(\'violet-green\'); return false;" class="color_violet"></a> </div>';

$(styleSwitchHTML).appendTo("body");

$(styleSwitchStylesheets).appendTo("head");

$('<style type="text/css"> ' + styleSwitchCSS + ' </style>').appendTo("body");




function setActiveStyleSheet(title) {
    var i, a, main;
    for (i = 0;
        (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
            a.disabled = true;
            if (a.getAttribute("title") == title) a.disabled = false;
        }
    }
}

function getActiveStyleSheet() {
    var i, a;
    for (i = 0;
        (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
    }
    return null;
}

function getPreferredStyleSheet() {
    var i, a;
    for (i = 0;
        (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title")) return a.getAttribute("title");
    }
    return null;
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

window.onload = function(e) {
    var cookie = readCookie("style");
    var title = cookie ? cookie : getPreferredStyleSheet();
    setActiveStyleSheet(title);

    if (title != 'null') {
        $('.color-settings a').removeClass("selected");
        $('.color-settings .color_' + title).addClass("selected");
    }
}

window.onunload = function(e) {
    var title = getActiveStyleSheet();
    createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
