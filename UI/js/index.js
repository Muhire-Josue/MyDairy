let ALERT_TITLE = "Notification!!!";
let ALERT_BUTTON_TEXT = "CONFIRM";
let ALERT_BUTTON_TEXT_2 = "CANCEL";

if (document.getElementById) {
    window.alert = function (txt) {
        createCustomAlert(txt);
    }
}

function createCustomAlert(txt) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if (d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function () { removeCustomAlert(); return false; }
    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "cancelBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT_2));
    btn.href = "#";
    btn.focus();
    btn.onclick = function () { removeCustomAlert(); return false; }

    alertObj.style.display = "block";

}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}
function ful() {
    alert('Alert this pages');
}

function setSectionHeight() {
    document.querySelector('#main').style.minHeight = `${window.innerHeight - 200}px`;
    document.querySelector('#showcase p').style.top = `${document.querySelector('#showcase').clientHeight}px`;

};

window.addEventListener('DOMContentLoaded', function() {
    setSectionHeight();
});

window.addEventListener('resize', function() {
    setSectionHeight();
})
window.addEventListener('scroll', function() {
    setSectionHeight();
})