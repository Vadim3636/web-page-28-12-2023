main();

async function main() {
    let htmlcontent = await makeRequest("GET", "scripts/cards/cards.html");
    let csscontent = await makeRequest("GET", "scripts/cards/cards.css");
    cards = document.querySelector("cards");
    cards.innerHTML = htmlcontent;
    cards.innerHTML += "<style>" + csscontent + "</style>";

    let elems = document.querySelectorAll("cards ul li");
    let excess = elems[0].offsetLeft;
    let cards_ul = document.querySelector("cards ul");
    cards_ul.onscrollend = (event) => {
        // console.log(event);
        let i = 0;
        elems.forEach((element, index) => {
            
            // console.log(index, element.offsetLeft);
            // console.log(index, element.clientWidth);
            
            if ( Math.abs((elems[index].offsetLeft+elems[index].clientWidth/2) - excess - cards_ul.scrollLeft) < 
            Math.abs((elems[i].offsetLeft+elems[i].clientWidth/2) - excess - cards_ul.scrollLeft)) {
                i = index;
                // console.log("i: ", i);
                
            }
        });
        // console.log(":::::", document.querySelector("cards ul").scrollLeft);
        console.log("selected index:", i);

    };

    elems.forEach((element, index) => {
        element.onclick = function() {select_card(index);};
    });
}

function select_card(index, fast) {
    let cards_ul = document.querySelector("cards ul");
    let elems = document.querySelectorAll("cards ul li");
    if (index + 1 > elems.length || index < 0) {
        console.log("length error");
        return;
    }
    let excess = elems[0].offsetLeft;

    let behavior = "smooth";

    if (fast) behavior = "instant";

    // cards_ul.scrollLeft = elems[index].offsetLeft - excess;
    cards_ul.scrollTo({left: elems[index].offsetLeft - excess, behavior: behavior});
}