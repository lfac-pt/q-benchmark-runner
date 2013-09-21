function drawChart (data, labels, selector) {
    "use strict";

    var chart = d3.select(selector).append("svg")
        .attr("class", "chart")
        .attr("width", 900)
        .attr("height", 140)
        .append("g")
        .attr("transform", "translate(150,15)");

    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

    var y = d3.scale.ordinal()
        .domain(data)
        .rangeBands([0, 120]);

    chart.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("y", y)
        .attr("width", x)
        .attr("height", y.rangeBand());

    //Version labels
    chart.selectAll("text")
        .data(data)
        .enter().append("text")
        .attr("x", 0)
        .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
        .attr("dx", -3) // padding-right
        .attr("dy", ".35em") // vertical-align: middle
        .attr("text-anchor", "end") // text-align: right
        .text(function (data, index) {
            return labels[index] + " - " + d3.format(".2f")(data) + " op/s";
        });

    chart.selectAll("line")
        .data(x.ticks(10))
        .enter().append("line")
        .attr("x1", x)
        .attr("x2", x)
        .attr("y1", 0)
        .attr("y2", 120)
        .style("stroke", "#ccc");

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
        .attr("y2", 120)
        .style("stroke", "#000");
}
