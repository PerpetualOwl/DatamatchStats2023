var display = "artist";
const height = 900;
const width = 900;
var brush;
var svg;
var dot;

function updatebrushed({ selection }) {
    let value = [];
    console.log("toggle_updated");
    dot.style("stroke", function (d) { return _dotcolor(d) });
    svg.property("value", value).dispatch("input");
}

function changeColor() {
    console.log("toggle");
    if (display == "artist") {
        display = "genre";
    } else if (display == "genre") {
        display = "artist";
    }
    svg.selectAll().call(updatebrushed);
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