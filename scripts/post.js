// var counter = 0;

var fulldata = {};

var LOCK = false;
var LOCK_when = Date.now();
var post_path = "/update-strip" // /update-strip
post_path = window.location.href.replace('/index.html', '') + post_path;

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}  

// setInterval(function() {console.log("counter: ", counter); counter = 0;}, 1000);

function sendData()
{
    if (isEmpty(fulldata)) {
        setTimeout(sendData, 0);
        // console.log("EMPTY");
    }
    else {
        LOCK = true;
        LOCK_when = Date.now();
        // console.log("lock" + JSON.stringify(fulldata));
        let xhr = new XMLHttpRequest();
        xhr.open("POST", post_path);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                // console.log("response: ", xhr.responseText, xhr.status);
                
                // console.log("interval...");
                let delay = 0;
                if (xhr.status == 404) delay = 1000;
                setTimeout(function() {if (LOCK && Date.now()-LOCK_when > 500) {LOCK = false}}, 500);
                setTimeout(sendData, delay);
                // console.log("xhr: ", xhr);
                // console.log(fulldata);
                if (!xhr.status == 404) fulldata = {};
            }
            // console.log("enable");
        }
        // counter++;

        xhr.send(JSON.stringify(fulldata));
        
    }
}
sendData();

async function postData(data = {})
{
    for(var key in data) {
        // console.log(key + " : " + data[key]);
        fulldata[key] = data[key];
    }
    
}