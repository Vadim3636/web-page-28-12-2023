var colorPicker = new iro.ColorPicker('#picker', {
    width: 0.8*Math.min(document.querySelector('#picker').parentElement.offsetWidth, document.querySelector('#picker').parentElement.offsetHeight),
    wheelLightness: false,
    layout: [
        { 
            component: iro.ui.Wheel,
        },
    ]
});

var picker = document.querySelector(".picker_window");
var pickerch = document.querySelector("picker_window");
picker.style.display = "none";

document.querySelector(".color-selector img").onclick = function() {
    picker.style.display = "";
    setTimeout(function() {
        pickerch.style.transform = "scale(1)";
        picker.style.opacity = "100%";
    }, 0);
}

// I'm using "click" but it works with any event
document.addEventListener('mousedown', event => {
    if (picker.style.display == "none") return;
    if (!pickerch.contains(event.target)) {
        // The click was OUTSIDE the specifiedElement, do something
        pickerch.style.transform = "scale(0)";
        picker.style.opacity = "0";
        setTimeout(function() {
            picker.style.display = "none";
        }, 300);
    }
})