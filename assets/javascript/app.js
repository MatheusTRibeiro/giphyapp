$(document).ready(function () {

    // original array 
    var animals = ["cat", "dog", "rabbit"];

    // creates a button for every item within the animals array
    function renderButtons() {
        $("#buttonsHolder").empty();

        for (let i = 0; i < animals.length; i++) {

            var animalName = animals[i];

            var newButton = $("<button>");

            newButton.addClass("animal");
            newButton.on("click", getGifs);
            newButton.attr("data-animal", animalName);

            newButton.text(animalName);

            $("#buttonsHolder").append(newButton);


        }
    }
    //adds new buttons to the page
    $("body").on("click", "#submitAnimal", function (event) {
        event.preventDefault();

        var newButton = $("#animalInput").val().trim();

        animals.push(newButton);

        $("animalInput").empty();
        renderButtons();
    });

    renderButtons();



    // On button click AJAX function is performed to connect to Giphy API. 
    function getGifs() {

        var animalName = $(this).attr("data-animal");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&api_key=oJBlmF9dfs5DDgoNqZfhbZUiUcqCWqDv&limit=10";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(queryURL);

            // store response data within results variable
            var results = response.data;
            // loop through results creating and displaying the content
            for (let i = 0; i < results.length; i++) {

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var giphyImage = $("<img>");
                giphyImage.attr("src", results[i].images.fixed_height.url);
                giphyImage.addClass("gifs");
                giphyImage.attr("still", results[i].images.fixed_height_still.url);
                giphyImage.attr("animated", results[i].images.fixed_height.url);
                giphyImage.attr("state", "animated");
                $("#animalsHolder").prepend(p);
                $("#animalsHolder").prepend(giphyImage);
            }

        });
    }

    // Plays or pauses gifs on user click

    $("body").on("click", ".gifs", function () {

        var state = $(this).attr("state");

        if (state === "animated") {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
        }
        if (state === "still") {
            $(this).attr("src", $(this).attr("animated"));
            $(this).attr("state", "animated");
        };
    });
});
