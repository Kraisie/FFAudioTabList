browser.browserAction.onClicked.addListener(clickMe);
var running = true;
var interval = setInterval(runFunction, 1000);

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
                console.log(value);
                if (!value[i].active) {
                    tabsArray.push(value[i].url);
                }
            }

            //get titles of tabs with audio playing
            var titles = "";
            for (i = 0; i < value.length; i++) {
                titles = titles.concat(value[i].title);
                titles += "\n";
            }
            console.log("titles: " + titles);

            //post titles to localhost
            if (value.length > 0) {
                //currently playing
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'http://localhost:6789', true);            //POST request to localhost:6789, NO third party
                xhr.setRequestHeader('Content-Type', 'text/plain');
                xhr.send(titles);
            } else {
                //nothing playing anymore
                var xhr = new XMLHttpRequest();
                xhr.open("POST", 'http://localhost:6789', true);            //POST request to localhost:6789, NO third party
                xhr.setRequestHeader('Content-Type', 'text/plain');
                xhr.send(".!.!.NoSound.!.!.");                              //well...
            }
        });
}
