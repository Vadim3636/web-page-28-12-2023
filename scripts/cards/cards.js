main();

async function main() {
    let htmlcontent = await makeRequest("GET", "scripts/cards/cards.html");
    let csscontent = await makeRequest("GET", "scripts/cards/cards.css");
    cards = document.querySelector("cards");
    cards.innerHTML = htmlcontent;
    cards.innerHTML += "<style>" + csscontent + "</style>";
}