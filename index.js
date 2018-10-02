




var catMoods = ["Sad cat", "Happy cat", "Hungry cat", "Angry cat", "Loving cat", "Confused cat", "Friendly cat", "Dumb cat", "Sleepy cat", "Funny cat" ];
var numberOfGIFs = 4;
var rating = "PG";

function renderButtons(){
	for(var i = 0; i < catMoods.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("cat-button");
        newButton.text(catMoods[i]);
        $("cat-button").addClass("cat-button");
		$("#button-container").append(newButton);
	}
    
    $(".cat-button").unbind("click");

	$(".cat-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("");
		populateGIFContainer($(this).text());
	});

}




function addButton(cat){
	if(catMoods.indexOf(cat) === -1) {
		catMoods.push(cat);
		$("#button-container").empty();
		renderButtons();
	}
}

function populateGIFContainer(cat){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + cat + 
		"&api_key=y8Gk4RavESRxPXj5otyF6pGM6Nf500iB&rating=" + rating + "&limit=" + numberOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("functionClass");
		$(".gif-image").unbind("click");
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#catMoods").val().trim());
		$("#catMoods").val("");
	});
});
