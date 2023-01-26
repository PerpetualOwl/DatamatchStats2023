var display = "artist";
var selection = "all";
const height = 900;
const width = 900;
var brush;
var svg;
var dot;
const topartists = ["Adele", "Drake", "Lady Gaga", "Taylor Swift", "Beyoncé"];
const topgenres = ["Pop", "R&B", "Hip-Hop", "Country", "Rap"];

function updateMenu() {
    $(".btn-hover").remove();
    if (display == "artist") {
        for (let i = 0; i < topartists.length; i++) {
            $("#hover-menu").append(`<div type="button" class="btn btn-secondary btn-hover">${topartists[i]}</div>`);
        }
    } else if (display == "genre") {
        for (let i = 0; i < topgenres.length; i++) {
            $("#hover-menu").append(`<div type="button" class="btn btn-secondary btn-hover">${topgenres[i]}</div>`);
        }
    }
}


function updateBrushed({ selection }) {
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
    svg.selectAll().call(updateBrushed);
    updateMenu();
}

function _dotcolor(d) {
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