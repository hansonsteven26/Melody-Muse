const dogKey = "live_FTU78RuBy8JufSDO0cYsxxEjUweRpQ8Vaa7oRI682TC2gEVMzBSGe1WxqUxkiDjj"
const dogUrl = "https://api.thedogapi.com/v1/breeds?breed_ids=1"
let imageEl = document.getElementById("card-1")
let breedImage = document.getElementById("breedImage")
let searchEl = document.getElementById("breedInput");
let breedName = "";
let searchButton = document.getElementById("searchButton");
let favoriteBtnEL = "";
let number = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}; 

searchButton.addEventListener("click", function () {
    for (let i = 0; i < 3; i++) {
        document.getElementById("card-" + i).setAttribute("src", "");
        document.getElementById(i).classList.add("hidden");
    }
    breedName = searchEl.value;

    $.ajax({

        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/dogs?name=' + breedName,
        headers: { 'X-Api-Key': '9otJVZp5fJ9qMc2fEsmc/g==YNaJYpvMld2P9utw' },
        contentType: 'application/json',
        success: function (result) {

            if (result.length == 0) {
                let errorMessage = $("#modal-error-message");
                errorMessage.text(`The breed \"${breedName}\" does not exist in the API.`)
                no_breed_modal.showModal();
            }

            for (let i = 0; i < 3 && i < result.length; i++) {
                let imageLink = result[i].image_link;
                document.getElementById('card-' + i).setAttribute("src", imageLink);
                document.getElementById(i).classList.remove("hidden");
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

            // Show the modal
            document.getElementById("breedTitle").textContent = result[0].name;
            document.getElementById("breedDescription").textContent = "Trainability 1 to 5: " + result[0].trainability;
            document.getElementById("breedHeight").textContent = "Height: " + result[0].max_height_male + " cm";
            document.getElementById("breedWeight").textContent = "Weight: " + result[0].max_weight_male + " kg";
            let modal = document.getElementById("modal");
            modal.classList.remove("hidden");
            favoriteBtnEL = document.getElementById("favorite-button");
            favoriteBtnEL.addEventListener("click", saveFavorites);



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

function isLocalStorageAvailable(){
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

function saveFavorites() {
    let breedTitle = document.getElementById("breedTitle").textContent;
    localStorage.setItem(`fav-${number}`, breedTitle);
    let favListItem = document.getElementById(`fav-${number}`);
    console.log(document.getElementById("fav-" + number).textContent);
    favListItem.textContent = localStorage.getItem(`fav-${number}`);
    number++;
    if (number > 2) {
        number = 0;
    }
}

function fetchExtraFacts() {
    $.ajax({
        method: 'GET',
        url: 'https://api.thedogapi.com/v1/breeds?',
        headers: { 'X-Api-Key': 'live_FTU78RuBy8JufSDO0cYsxxEjUweRpQ8Vaa7oRI682TC2gEVMzBSGe1WxqUxkiDjj' },
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            let breedList = [{}];
            let randomBreed = {
                name: result[0].name,
                use: result[0].bred_for
            }
            for (let i = 0; i < 20; i++) {
                randomBreed = {
                    name: result[i].name,
                    use: result[i].bred_for,
                };
                breedList.push(randomBreed)              
            }
            function populateBanner() {
                let cardName = document.getElementById("card-name");
                let bredFor = document.getElementById("card-bred-for");
                let ranNum = getRandomInt(20);
                ranNum = getRandomInt(20);
                    if (ranNum == 0) {
                        ranNum = 1
                    };
                    cardName.textContent = breedList[ranNum].name;
                    bredFor.textContent = "Breed characteristics and strengths: " + breedList[ranNum].use + ".";
                setInterval(function () {
                    ranNum = getRandomInt(20);
                    if (ranNum == 0) {
                        ranNum = 1
                    };
                    cardName.textContent = breedList[ranNum].name;
                    bredFor.textContent = "Breed characteristics and strengths: " + breedList[ranNum].use + ".";
                }, 5000);
            };
            populateBanner();
            console.log(breedList);  
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
        
    });
}

fetchExtraFacts();