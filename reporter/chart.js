function drawChart (data, labels, selector) {
    "use strict";

    var BAR_HEIGHT = 30;

    var chart = d3.select(selector).append("svg")
        .attr("class", "chart")
        .attr("width", 900)
        .attr("height", BAR_HEIGHT * data.length + 20)
        .append("g")
        .attr("transform", "translate(350,15)");

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

    var y = d3.scale.ordinal()
        .domain(data)
        .rangeBands([0, BAR_HEIGHT * data.length]);

    chart.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("y", y)
        .attr("width", x)
        .attr("height", y.rangeBand());

    chart.selectAll("line")
        .data(x.ticks(10))
        .enter().append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", 0)
        .attr("y2", BAR_HEIGHT * data.length)
        .style("stroke", "#ccc");

    //Version labels
    var enterThing = chart.selectAll("text")
        .data(data)
        .enter();
    enterThing
        .append("a")
            .attr("xlink:href", function (data, index) {
                var version;

                version = labels[index];

                if (version[0] === "v") {
                    return "https://github.com/kriskowal/q/tree/" + version;
                }

                return "https://github.com/kriskowal/q/commit/" + version;
            })
            .attr("xlink:show", "new")
            .append("text")
                .attr("x", 0)
                .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
                .attr("dx", -3) // padding-right
                .attr("dy", ".35em") // vertical-align: middle
                .attr("text-anchor", "end") // text-align: right
                .text(function (data, index) {
                    return labels[index];
                });
    enterThing
        .append("text")
        .attr("x", x)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .attr("class", "value-label")
        .text(d3.format(".2f"));

    chart.selectAll(".rule")
        .data(x.ticks(10))
        .enter().append("text")
        .attr("class", "rule")
        .attr("x", x)
        .attr("y", 0)
        .attr("dy", -3)
        .attr("text-anchor", "middle")
        .text(String);

    chart.append("line")
        .attr("y1", 0)
        .attr("y2", BAR_HEIGHT * data.length)
        .style("stroke", "#000");
}
