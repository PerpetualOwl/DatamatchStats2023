var display = "artist";

function changeColor() {
    console.log("toggle");
    if (display == "artist") {
        display = "genre";
    } else if (display == "genre") {
        display = "artist";
    }
}

function _dotcolor(d) {
    const topartists = ["Adele", "Drake", "Lady Gaga", "Taylor Swift", "Beyoncé"];
    const topgenres = ["Pop", "R&B", "Hip-Hop", "Country", "Rap"];
    var ind = -1;
    if (display == "artist") {
        ind = topartists.findIndex(x => x == d.artist);
    } else if (display == "genre") {
        ind = topgenres.findIndex(x => x == d.genre);
    } else {
        console.log("error");
    }
    if (ind == -1) {
        return "steelblue";
    }
    return d3.schemeSet3[ind];

}