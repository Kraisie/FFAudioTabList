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

            //JSON.stringify did not work for some reason so generate json 'by hand'
            var playing = false;
            var dataJson = "{arrTabs:[";
            //if audio tabs exist we add them to an array in a json conform string
            if (value.length > 0) {
                playing = true;
                for (i = 0; i < value.length; i++) {
                    dataJson = dataJson.concat(value[i].title);
                    if (i + 1 < value.length) {
                        dataJson = dataJson.concat(",");
                    }
                }
            }
            dataJson = dataJson.concat("],bPlaying:" + playing + "}");

            //currently playing
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://localhost:6789', true);            //POST request to localhost:6789, NO third party
            xhr.setRequestHeader('Content-Type', 'text/plain');         //text/plain as json does not reach my localhost
            xhr.send(dataJson);
        });
}
