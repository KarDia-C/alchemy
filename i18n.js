var lang = 'chs';

var langs;

if (location.hash[0] == '#') lang = location.hash.substr(1);

function getString(key) {
    if (langs[key] == undefined) return undefined;
    return langs[key][lang];
}

function setLang(newlang) {
    if (['chs', 'cht'].indexOf(lang) == -1) return false;
    var oldlang = lang;
    lang = newlang;
    updateImg(oldlang, lang);
    updateStrings();
    setResult();
    genTables();
    filterChanged();
}

function updateImg(oldlang, newlang) {
    for (var img of $("img.i18n").toArray()) {
        img.src = img.src.replace(oldlang, newlang);
    }
}

function updateStrings() {
    for (var btn of $("button.i18n").toArray()) {
        var ftype = btn.getAttribute('ftype');
        var t = ftype.match(/^\d+$/) ? ingredientNames[lang][ftype] : getString(ftype);
        btn.innerText = t ? t : '';
    }
    for (var ele of $(".i18n[label]").toArray()) {
        ele.innerText = getString(ele.getAttribute('label'));
    }
}

onhashchange = function() {
    if (location.hash[0] == '#') setLang(location.hash.substr(1));
}

$(function() {
    updateImg("chs", lang);
})