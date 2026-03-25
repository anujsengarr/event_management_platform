function searchEvent() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName("h3")[0];
        if (title.innerText.toLowerCase().includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}