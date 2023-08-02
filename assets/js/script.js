const dogKey = "live_FTU78RuBy8JufSDO0cYsxxEjUweRpQ8Vaa7oRI682TC2gEVMzBSGe1WxqUxkiDjj"
const dogUrl = "https://api.thedogapi.com/v1/breeds?breed_ids=1"
let imageEl = document.getElementById("card-1")
let breedImage = document.getElementById("breedImage")
let searchEl = document.getElementById("breedInput");
let breedName = "";
let searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
    // we want the value of the search box to display cards
    // show cards that CONTAIN search input
    breedName = searchEl.value;
    console.log(searchEl.value);

    $.ajax({

        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/dogs?name=' + breedName,
        headers: { 'X-Api-Key': '9otJVZp5fJ9qMc2fEsmc/g==YNaJYpvMld2P9utw' },
        contentType: 'application/json',
        success: function (result) {
            for (let i = 0; i < 3 && i < result.length; i++) {
                let imageLink = result[i].image_link;
                document.getElementById('card-' + i).setAttribute("src", imageLink);
                document.getElementById(i).classList.remove("hidden");

                console.log(result[i].image_link)
                console.error();
            }
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
        }

    });

})

async function checkEvents() {
    const response = await fetch(dogUrl + `&apikey=${dogKey}`);
    let data = await response.json();

}
checkEvents();

// Add a click event listener to each image

for (let i = 0; i < 3; i++) {
    let imageEl = document.getElementById("card-" + i);
    imageEl.addEventListener("click", function (event) {
        let src = event.target.getAttribute("src");
        let temp = src.split("/");
        let breedName = temp[5].replace(".jpg", "").replace("_", "%20");
        // Get the breed name from the input field

        console.log(event.target)
        // Fetch breed information from the API
        fetchBreedInformation(breedName, event.target);


    });
}
function fetchBreedInformation(breedName) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/dogs?name=' + breedName + '&min_height&max_height&min_weight&max_weight&max_life_expectancy&shedding&barking&energy&protectiveness&trainability',
        headers: { 'X-Api-Key': '9otJVZp5fJ9qMc2fEsmc/g==YNaJYpvMld2P9utw' },
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            // document.getElementById("breedTitle").textContent = breedInfo.name;
            // document.getElementById("breedDescription").textContent = breedInfo.description;

            // Show the modal
            let modal = document.getElementById("modal");
            modal.classList.remove("hidden");
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

