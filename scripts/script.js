range_periods = document.querySelectorAll(".range");

range_periods.forEach((range_period, enumerator) => {

    updateValues(range_period, enumerator);
    left = range_period.querySelector("input[type='button'].left");
    left.onclick = function() {
        r = range_period.querySelector("input[type='range']");
        r.value = parseInt(r.value) - 1;
        updateValues(range_period, enumerator);
    };

    right = range_period.querySelector("input[type='button'].right");
    right.onclick = function() {
        r = range_period.querySelector("input[type='range']");
        r.value = parseInt(r.value) + 1;
        updateValues(range_period, enumerator);
    };

    range_period.oninput = function() {updateValues(range_period, enumerator)};

});

function updateValues(range_period, enumerator) {
    // console.log("asds");
    let text_element = document.querySelectorAll("table tr th h4")[enumerator];
    r = range_period.querySelector("input[type='range']");
    switch (enumerator) {
        case 0:
            text_element.innerHTML = r.value + "%";
            // Update second brightness range value:
            range_periods[2].querySelector("input[type='range']").value = r.value;
            postData({brightness: r.value});
            break;
    
        case 1:
            text_element.innerHTML = (r.value/10).toFixed(1) + "s";
            postData({period: r.value/10});

            break;
        default:
            // Update first brightness range value:
            range_periods[0].querySelector("input[type='range']").value = r.value;
            updateValues(range_periods[0], 0);
            break;
    }
}

setTimeout(function() {
    let loading = document.querySelector(".loading");
    loading.style.opacity = 0;
    setTimeout(function() {
        loading.style.display = "none";
    }, 300);
}, 1000);