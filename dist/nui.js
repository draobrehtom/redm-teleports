let windowOpened = false

document.onkeyup = function (data) {
    if (windowOpened && (data.keyCode == 27 || data.keyCode == 8)) {
        fetch(`https://${GetParentResourceName()}/close`,{
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({})
        });
    }
};

let messageHandlers = [] // [string, function]

window.addEventListener('message', function(event) {
    let item = event.data

    if (item.toggle === true) {
        show()
    } else if (item.toggle === false) {
        hide()
    }

    messageHandlers.forEach(v => {
        let eventName = v[0]
        let eventHandler = v[1]
        if (item[eventName]) {
            eventHandler(item[eventName])
        }
    })
})

function addGameEventHandler(name, cb) {
    messageHandlers.push([name, cb])
}

function notifyClientSide(eventName, params = {}) {
    if (isInGame()) {
        fetch(`https://${GetParentResourceName()}/${eventName}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(params)
        });
    } else {
        setTimeout(() => {
            alert(eventName)
        }, 200)
    }
}

function hide() {
    windowOpened = false;
    document.querySelector("body").style = "display: none";
}
function show() {
    windowOpened = true;
    document.querySelector("body").style = "display: block";
}

function isInGame() {
    return typeof GetParentResourceName !== "undefined"
}

if (isInGame()) {
    hide();
}