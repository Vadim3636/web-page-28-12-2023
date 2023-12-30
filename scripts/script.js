range_periods = document.querySelectorAll(".range");

range_periods.forEach(range_period => {

    left = range_period.querySelector("input[type='button'].left");
    left.onclick = function() {
        r = range_period.querySelector("input[type='range']");
        r.value = parseInt(r.value) - 1;
    };

    right = range_period.querySelector("input[type='button'].right");
    right.onclick = function() {
        r = range_period.querySelector("input[type='range']");
        r.value = parseInt(r.value) + 1;
    };

});