

function loadData() {
    d3.csv("data/house-signups.csv", function(error, csv) {

        // Step 3: Get the data ready: change numeric fields to being numbers!
        
        csv.forEach(function(d) { // forEach is a good option
            d["percent_signup"] = parseFloat(d["percent_signup"]);
            d["population"] = parseInt(d["population"]);
            d["total_signups"] = Math.round(d["percent_signup"] * d["population"] / 100);
        });
        console.log(csv);
        // Store csv data in global variable
        data = csv;

        // updateSchoolsVisualization gets automatically called within the data = csv call;
        // basically(whenever the data is set to a value using = operator);
        // see the definition above: Object.defineProperty(window, 'data', { ...

    });
}


var SVG = d3.select("#svg");


