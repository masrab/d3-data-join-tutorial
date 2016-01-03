
var low = 5,  // min radius
high = 30,  // max radius
n = 10,  // num circles
radius = getRandIntArray(low, high, n);

var gap = 15,
height = 200,
width = 640;

var svg = d3.select("#palette-vis").append("svg")
.attr("width", width)
.attr("height", height);


var data = getCircleData(radius);

// Initial render
update(data);

var updateBtn = document.getElementById("update-btn");

updateBtn.addEventListener("click", function() {
	update(getCircleData(getRandIntArray(low, high, getRandIntArray(1,n,1)[0])))
});


function update(data) {
	
	console.log("data length: " + data.length);
	var circ = svg.selectAll("circle").data(data);

	// exit
	console.log("Exit: " + circ.exit()[0].length);
	circ.exit()
	.attr("class", "exit")
	.transition().duration(1000)
	.attr("r",0)
	.remove();
	
	// update
	console.log("Current: " + circ[0].length);
	circ
	.attr("class", "update")
	.transition().duration(2000)
	.attr("cx", function(d){return d.x})
	.attr("cy", function(d){return d.y})
	.attr("r", function(d){return d.r});

	// enter
	console.log("Enter: " + circ.enter()[0].length);
	circ.enter().append("circle")
	.attr("class", "enter")
	.attr("cx", function(d){return d.x})
	.attr("cy", function(d){return d.y})
	.attr("r", 0)
	.transition().duration(2000)
	.attr("r", function(d){return d.r});

	circ.on("mouseover", function(d,i) {

		d3.select("#dataLabel").html(JSON.stringify(d,null, 2));

	})
	
	updateLabels(data);
}


function updateLabels(data) {

	var dataLabel = svg.selectAll("text")
	.data(data)
	.attr("class", "update");

	dataLabel.exit().remove();
	dataLabel.enter().append("text")
	.attr("class", "enter");


	dataLabel
	.text(function(d) {return d.r;})
	.attr("x", function(d, i) { return d.x; })
	.attr("dx", -12)
	.attr("y", height - 10);;

}

// generate data
function randomIntInc (low, high) {
	return Math.floor(Math.random() * (high - low + 1) + low);
}

function getRandIntArray(low, high, n) {
	var arr = [];
	for (var i=0; i<n; i++) {
		arr.push(randomIntInc(low, high));
	}
	return arr;
}

function getPaletteWidth (radius, gap) {
	return d3.sum(radius) * 2 + (radius.length-1) * gap + 2 * gap;
}

function getCircleData (radius) {
	return radius.map(function (r, i, arr){

		return {x: getPaletteWidth(arr.slice(0, i), gap) + r,
			y: height / 2,
			r:  r}
		}
		)

}