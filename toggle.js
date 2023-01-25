function changeColor() {
    console.log("toggle");
    if (display == "artist") {
        display = "genre";
    } else if (display == "genre") {
        display = "artist";
    }
    _selection();
}