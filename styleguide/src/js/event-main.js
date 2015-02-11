//Main js file for module

var showMore = false;

var showTas = function() {
	if(($(window).width()) < 1023){
		$('#tasTile').fadeIn("slow");
	}
	else if((($(window).width()) > 1023)&&(showMore === false)){
		$('#tasTile').hide();
	}
};


var loadTiles = function(){
	$("#nswTile").hide().delay(300).fadeIn("slow");
	$("#saTile").hide().delay(500).fadeIn("slow");
	$("#waTile").hide().delay(700).fadeIn("slow");
	$("#tasTile").hide().delay(1200);
	$("#ntTile").hide();
	$("#qldTile").hide();
	$("#showMore").hide().delay(1200).fadeIn("slow");
	
};





$(document).ready(function(){
	//run functions on load
	loadTiles();
	showTas();

	$("#reload").click(function(){
		loadTiles();
		$("#showMore").text("Show More Events");
		showMore = false;
	});
	$("#showMore").click(function(){
		showMore = true;
		$('#tasTile').delay(200).fadeIn("slow");
		$('#ntTile').delay(400).fadeIn("slow");
		$('#qldTile').delay(600).fadeIn("slow");
		$(this).text("All events loaded");
	});
});

$(window).resize(function(){
	//run functions on resize
	showTas();
});
