var width = 800,
    height = 800;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);
  

d3.json("data/iris.json", function(data) {

	console.log(data);

	var force = d3.layout.force().linkDistance(250)
		.size([width, height]);

	force
		.nodes(data.nodes)
		.links(data.links)
		.start();

	console.log(data.nodes);

	force.start();

	var link = svg.selectAll(".link")
		.data(data.links)
		.enter().append("line")
		.attr("class", "link")
		.attr("stroke", "black")
		.attr("stroke-width", 1);

	var node = svg.selectAll(".node")
		.data(data.nodes)
		.enter().append("circle")
		.attr("class", "node")
		.attr("r", 10)
		.attr("fill", "blue")
		.call(force.drag);

	node.append("title")
		.text(function(d) {return d.names; });
	
 	force.on("tick", function() {
    		link.attr("x1", function(d) { return d.source.x; })
        	.attr("y1", function(d) { return d.source.y; })
        	.attr("x2", function(d) { return d.target.x; })
        	.attr("y2", function(d) { return d.target.y; });

    	node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

});