// var counter = 0;

var fulldata = {};
var lastsenddata = {};

var readyrec = false;

var LOCK = false;
var LOCK_when = Date.now();

rel_path = window.location.href.replace('/index.html', '');
if (rel_path.slice(-1) == '/') rel_path = rel_path.slice(0, -1);

rel_path = "http://esp32-host.local"

var post_path = "/update-strip" // /update-strip
post_path = rel_path + post_path;

var get_path = "/get-data";
get_path = rel_path + get_path;

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
                
                console.log("post data...");
                let delay = 0;
                if (xhr.status == 404) delay = 1000;
                setTimeout(function() {if (LOCK && Date.now()-LOCK_when > 500) {LOCK = false}}, 500);
                setTimeout(sendData, delay);
                // console.log("xhr: ", xhr);
                // console.log(fulldata);
                if (xhr.status != 404 && JSON.stringify(lastsenddata) == JSON.stringify(fulldata)) {
                    fulldata = {};
                    lastsenddata = {};
                }
            }
            // console.log("enable");
        }
        // counter++;

        lastsenddata = {};
        for (key in fulldata) { // оця вся єрунда поскільки js не клонує
            lastsenddata[key] = fulldata[key]; // об'єкти, а створює на
        } // них посилання(шмара тупа)
        xhr.send(JSON.stringify(fulldata));
        
    }
}
sendData();

function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", get_path);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                // console.log(xhr.response);
                data = JSON.parse(xhr.response);
                // colorPicker.color.hsv.h
                // colorPicker.color.rgb = {r: data.r, g: data.g, b: data.b};
                // colorPicker.color.value = 100;
                
                // console.log(data);
                // switchPage("mode" + data.mode, false);

                setTimeout(function() {
                    readyrec = false;
                    document.querySelector(".range.brightness input#range").value = data.brightness;
                    document.querySelector(".range.period input#range").value = data.period/100;
                    console.log("received mode: ", data.mode);
                    select_card(data.mode);

                    document.querySelectorAll(".range").forEach(range => {range.oninput();});

                    setTimeout(function() {readyrec = true;}, 0);

                    // document.querySelectorAll("input#brightness").forEach(element => {element.value = data.brightness*100;});
                }, 0);
            }
        }
    }
    
    xhr.send(JSON.stringify(fulldata));
}

async function postData(data = {})
{
    if (!readyrec) return;
    for(var key in data) {
        // console.log(key + " : " + data[key]);
        fulldata[key] = data[key];
    }
    
}

window.onload = function() {
    if (document.querySelectorAll(".range").length == 0) {
        setTimeout(window.onload, 1);
        return;
    }
    getData();
    // readyrec = true;
    console.log("ready to work");
}