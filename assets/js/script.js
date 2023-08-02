const dogKey = "live_FTU78RuBy8JufSDO0cYsxxEjUweRpQ8Vaa7oRI682TC2gEVMzBSGe1WxqUxkiDjj"
const dogUrl = "https://api.thedogapi.com/v1/breeds?breed_ids=1"
let imageEl = document.getElementById("card-1")
let breedImage = document.getElementById("breedImage")
let searchEl = document.getElementById("breedInput");
let breedName = "";
let searchButton = document.getElementById("searchButton");
let favoriteBtnEL = "";

searchButton.addEventListener("click", function () {
    for (let i = 0; i < 3; i++){
        document.getElementById("card-" + i).setAttribute("src", "");
        document.getElementById(i).classList.add("hidden");
    }
    // we want the value of the search box to display cards
    // show cards that CONTAIN search input
    breedName = searchEl.value;
    console.log(searchEl.value);
    // $('img[type="src"]').val('');

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
        let src= event.target.getAttribute("src");
        let temp=src.split("/");
        let breedName= temp[5].replace(".jpg","").replace("_","%20");
      // Get the breed name from the input field

      console.log(event.target)
      // Fetch breed information from the API
      fetchBreedInformation(breedName,event.target);
      

    });
  }
  function fetchBreedInformation(breedName) {
  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/dogs?name='+breedName+'&min_height&max_height&min_weight&max_weight&max_life_expectancy&shedding&barking&energy&protectiveness&trainability',
    headers: { 'X-Api-Key': '9otJVZp5fJ9qMc2fEsmc/g==YNaJYpvMld2P9utw'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);
        // document.getElementById("breedTitle").textContent = breedInfo.name;
        // document.getElementById("breedDescription").textContent = breedInfo.description;
  
          // Show the modal
          document.getElementById("breedTitle").textContent = result[0].name;
          document.getElementById("breedDescription").textContent = "Trainability 1 to 5: " + result[0].trainability;
          document.getElementById("breedHeight").textContent = "Height: " + result[0].max_height_male + " cm";
          document.getElementById("breedWeight").textContent = "Weight: " + result[0].max_weight_male + " kg";
          let modal = document.getElementById("modal");
          modal.classList.remove("hidden");
           favoriteBtnEL = document.getElementById("favorite-button");
            favoriteBtnEL.addEventListener("click", displayFavorites);

          

    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
  }
// function saveFavorite() {
//    localStorage.setItem("fav-0", breedName);
//     localStorage.setItem("fav-1", breedName);
//     localStorage.setItem("fav-2", breedName);
// };
function displayFavorites() {
    const favBreedsElement = document.getElementById('fav-breed');
    favBreedsElement.innerHTML = '';
    localStorage.setItem("fav-0", breedName);

    for (let i = 0; i < localStorage.length; i++) {
        const name = localStorage.getItem("fav-" + i);
        const li = document.createElement('li');
        li.textContent = `${name}`;
        favBreedsElement.appendChild(li);
    }
}
displayFavorites();
//store high scores
// function saveName(breedName) {
//     localStorage.setItem("fav-0", breedName);
//     console.log($,{breedName});
// }
// saveName();







 

