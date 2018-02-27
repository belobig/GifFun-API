$(document).ready(function () {

	var topics = ['the legend of zelda', 'super mario bros', 'tekken', 'street fighter', 'mortal kombat', 'Halo: Combat Evolved', 'zork', 'clash of clans', 'starcraft', 'world of warcraft'];

	var searchTerm = 'video games';
	var apiKey = 'yXCvgqoPDZar0CdVaI1gXpmg9HErARJf';
	var imgAnimateURL = '';
	var imgStillURL = '';
	var image = '';
	var fig = $("<figure>");

	// Display buttons at the top of the page
	function showButtons() {

		// Deleting buttons prior to adding new buttons to avoid repeats
		$("#buttons").empty();

		// Looping through the array of button titles
		for (let h = 0; h < topics.length; h++) {
			var button = $("<button>");
			button.addClass("gifBtn btn btn-kelly");
			button.text(topics[h]);
			$("#buttons").append(button);
		}
	}

	// Function to display Gif Info
	function displayGIFinfo() {
		var searchTerm = $(this).text();
		var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + searchTerm + '&limit=10&lang=en';

		$("#gifArea").empty();

		$.ajax({
			url: queryUrl,
			method: "GET"
		}).then(function (response) {
			console.log(response);


			var rating = '';
			var pRating = '';

			for (let i = 0; i < response.data.length; i++) {
				imgStillURL = response.data[i].images.fixed_width_still.url;
				imgAnimateURL = response.data[i].images.fixed_width.url;
				image = $("<img>").attr("src", imgStillURL);
				image.addClass("img-rounded buffer gifs");
				image.attr("data-still", imgStillURL);
				image.attr("data-animate", imgAnimateURL);
				image.attr("data-state", "still");
				rating = response.data[i].rating;
				pRating = $("<figcaption>").text("Rating: " + rating);
				$("#gifArea").append(fig);
				$(fig).append(image);
				$(fig).append(pRating);
			}

		});
	}

	// Click event listener to add gifs to page when a button from the list at the top is clicked
	$(document).on("click", ".gifBtn", displayGIFinfo);

	// Function to determine if gif is paused or animated, and change accordingly
	function gifClick() {
		var currentGif = $(this);
		var state = currentGif.attr("data-state");
		var animateUrl = currentGif.attr("data-animate");
		var stillUrl = currentGif.attr("data-still");
		// console.log("Gif clicked");
		if (state === "still") {
			currentGif.attr("src", animateUrl);
			currentGif.attr("data-state", "animate");
		} else {
			currentGif.attr("src", stillUrl);
			currentGif.attr("data-state", "still");
		}
	}

	// Click listener on each gif to pause or unpause
	$(document).on("click", ".gifs", gifClick);

	// Add a video game button
	$("#add-game").on("click", function (event) {
		event.preventDefault();
		// This line grabs the input from the textbox
		var game = $("#gif-input").val().trim();

		// Adding game from the textbox to my array
		topics.push(game);

		// Calling showButtons which handles the processing of my topics array
		showButtons();
	});



	showButtons();

});