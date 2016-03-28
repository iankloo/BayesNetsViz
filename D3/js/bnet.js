var width = 800,
    height = 800;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);


  

d3.json("data/iris.json", function(data) {

console.log(data);

  data.links.forEach(function(d) {
    d.source = data.nodes[d.source];
    d.target = data.nodes[d.target];
  });

 var link = svg.append("g")
      .attr("class", "link")
    .selectAll("line")
      .data(data.links)
    .enter().append("line")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

 


  var node = svg.selectAll(".node")
      .data(data.nodes)
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
      .attr("r", 30);

node.append("text")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.node })
    .attr("stroke", "red");

node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

});



