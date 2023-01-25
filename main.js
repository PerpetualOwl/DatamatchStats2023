

//todo
// different colors for different artists/genres
// filter by artist/genre

import {Runtime, Library, Inspector} from "./runtime.js";



var display = "artist";
const runtime = new Runtime();
const main = runtime.module(define, Inspector.into("#scatterplot"));


function _dotcolor(d) {
    const topartists = ["Adele", "Drake", "Lady Gaga", "Taylor Swift", "Beyoncé"];
    const topgenres = ["Pop", "R&B", "Hip-Hop", "Country", "Rap"];

    const ind = topartists.findIndex(x => x == d.artist);

    if (ind == -1) {
        return "steelblue";
    }
    return d3.schemeSet3[ind];

}


function _selection(d3, width, height, xAxis, yAxis, data, x, y) {
    const svg = d3.create("svg")
        .attr("viewBox", [0, 0, width, height])
        .property("value", []);

    const brush = d3.brush()
        .on("start brush end", brushed);

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    const dot = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
        .attr("stroke", function(d){return _dotcolor(d) })
        .attr("r", 3);

    svg.call(brush);

    function brushed({ selection }) {
        let value = [];
        if (selection) {
            const [[x0, y0], [x1, y1]] = selection;
            value = dot
                .style("stroke", "gray")
                .filter(d => x0 <= x(d.x) && x(d.x) < x1 && y0 <= y(d.y) && y(d.y) < y1)
                .style("stroke", function(d){return _dotcolor(d) })
                .data();
        } else {
            dot.style("stroke", function(d){return _dotcolor(d) });
        }
        svg.property("value", value).dispatch("input");
    }

    return svg.node();
}


function _3(selection) {
    return (
        selection
    )
}

function _height() {
    return (
        600
    )
}

function _margin() {
    return (
        { top: 20, right: 30, bottom: 30, left: 40 }
    )
}

function _x(d3, data, margin, width) {
    return (
        d3.scaleLinear()
            .domain(d3.extent(data, d => d.x)).nice()
            .range([margin.left, width - margin.right])
    )
}

function _y(d3, data, height, margin) {
    return (
        d3.scaleLinear()
            .domain(d3.extent(data, d => d.y)).nice()
            .range([height - margin.bottom, margin.top])
    )
}

function _xAxis(height, margin, d3, x, width, data) {
    return (
        g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
                .attr("font-size", "20px")
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", -4)
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("font-size", "30px")
                .attr("text-anchor", "end")
                .text(data.x))
    )
}

function _yAxis(margin, d3, y, data) {
    return (
        g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
                .attr("font-size", "20px")
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 4)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .attr("font-size", "30px")
                .text(data.y))
    )
}

async function _data(d3, FileAttachment) {
    return (
        Object.assign(d3.csvParse(await FileAttachment("artists.csv").text(), ({ Artist: artist, matches: x, hours: y }) => ({ artist, x: +x, y: +y })), { x: "Matches / Dates", y: "Hours listened" })
    )
}



function define(runtime, observer) {
    const main = runtime.module();
    function toString() { return this.url; }
    const fileAttachments = new Map([
        ["artists.csv", { url: new URL("./artists.csv", import.meta.url), mimeType: "text/csv", toString }]
    ]);
    main.builtin("FileAttachment", runtime.fileAttachments(artist => fileAttachments.get(artist)));
    main.variable(observer("viewof selection")).define("viewof selection", ["d3", "width", "height", "xAxis", "yAxis", "data", "x", "y"], _selection);
    main.variable(observer("selection")).define("selection", ["Generators", "viewof selection"], (G, _) => G.input(_));
    main.variable(observer()).define(["selection"], _3);
    main.variable(observer("height")).define("height", _height);
    main.variable(observer("margin")).define("margin", _margin);
    main.variable(observer("x")).define("x", ["d3", "data", "margin", "width"], _x);
    main.variable(observer("y")).define("y", ["d3", "data", "height", "margin"], _y);
    main.variable(observer("xAxis")).define("xAxis", ["height", "margin", "d3", "x", "width", "data"], _xAxis);
    main.variable(observer("yAxis")).define("yAxis", ["margin", "d3", "y", "data"], _yAxis);
    main.variable(observer("data")).define("data", ["d3", "FileAttachment"], _data);
    return main;
}


