browser.browserAction.onClicked.addListener(clickMe);

//start deactivated
var running = false;    
browser.browserAction.setIcon({ path: "pics/crossIcon96.png" });

function clickMe() {
    //turn extension on/off
    running = !running;

    if (running) {
        browser.browserAction.setIcon({ path: "pics/icon96.png" });
        interval = setInterval(runFunction, 1000);
    } else {
        browser.browserAction.setIcon({ path: "pics/crossIcon96.png" });
        clearInterval(interval);
    }
}

function runFunction(tab) {
    //get all tabs that play some audio
    browser.tabs.query({ audible: true })
        .then(function (value) {
            var tabsArray = [];
            for (i = 0; i < value.length; i++) {
                if (!value[i].active) {
                    tabsArray.push(value[i].url);
                }
            }

            //get titles of all audible tabs
            var titles = [];
            var playing = false;
            if (value.length > 0) {
                playing = true;
                for (i = 0; i < value.length; i++) {
                    titles[i] = value[i].title;
                }
            }

            //creat object that will be send to localhost
            var data = {
                arrTabs: titles,
                bPlaying: playing
            }

            //send data to localhost as HttpRequest
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://localhost:6789', true);            //POST request to localhost:6789, NO third party
            xhr.setRequestHeader('Content-Type', 'text/plain');
            xhr.send(JSON.stringify(data));
        });
}
