var width = 800,
    height = 800;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);


  

d3.json("data/iris.json", function(data) {

svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 20)
    .attr("refY", 0)
    .attr("markerWidth", 10)
    .attr("markerHeight", 10)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

console.log(data);

var n = 1000,
    nodes = d3.range(n).map(function() { return {}; }),
    links = d3.range(n).map(function(d) { return {source: d, target: (d + 3) % n}; });


var force = d3.layout.force().linkDistance(250)
    .nodes(data.nodes)
    .links(data.links)
    .size([width, height]);

  force.start();
  for (var i = n * n; i > 0; --i) force.tick();
  force.stop();


  var link = svg.append("g")
		.attr("class", "link")
		.selectAll("line")
      .data(data.links)
    .enter().append("line")
	.attr("stroke", "#999")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; })
	.attr("marker-end", "url(#end)");

  var node = svg.append("g")
		.attr("class", "node")
	.selectAll("circle")
      .data(data.nodes)
    .enter().append("circle")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 10)
      .call(d3.behavior.drag()
        .origin(function(d) { return d; })
        .on("drag", function(d) {
          d.x = d3.event.x, d.y = d3.event.y;
          d3.select(this).attr("cx", d.x).attr("cy", d.y);
          link.filter(function(l) { return l.source === d; }).attr("x1", d.x).attr("y1", d.y);
          link.filter(function(l) { return l.target === d; }).attr("x2", d.x).attr("y2", d.y);
        }));


});