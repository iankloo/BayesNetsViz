var width = 800,
    height = 800;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);


  

d3.json("data/iris.json", function(data) {

console.log(data);

  var node = svg.selectAll(".node")
      .data(data)
	 .enter().append("g")
      .attr("class", "node")
      .call(d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("drag", function(d) {
          d.x = d3.event.x, d.y = d3.event.y;
          d3.select(this).attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
          link.filter(function(l) { return l.source === d; }).attr("x1", d.x).attr("y1", d.y);
          link.filter(function(l) { return l.target === d; }).attr("x2", d.x).attr("y2", d.y);
        }));


node.append("circle")
      .attr("r", 50);

node.append("text")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.node })
    .attr("stroke", "red");

node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

});



