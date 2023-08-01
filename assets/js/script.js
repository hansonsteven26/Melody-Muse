<<<<<<< HEAD
const dogKey="live_FTU78RuBy8JufSDO0cYsxxEjUweRpQ8Vaa7oRI682TC2gEVMzBSGe1WxqUxkiDjj"
const dogUrl="https://api.thedogapi.com/v1/breeds?breed_ids=1"
let imageEl= document.getElementById("card-1")
let breedImage=document.getElementById("breedImage")
let searchEl = document.getElementById("breedInput")
=======
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
            for (let i = 0; i < 3; i++) {
                let imageLink = result[i].image_link;
                document.getElementById('card-' + i).setAttribute("src", imageLink);

                console.log(result[i].image_link)
                console.error();
            }
            error: function ajaxError(jqXHR) {
                console.error('Error: ', jqXHR.responseText);
            }
            
        }

    });
>>>>>>> 4c2e13628bb28ee3583720e8eb6384339e0f9d9d

})

async function checkEvents() {
    const response = await fetch(dogUrl + `&apikey=${dogKey}`);
    let data = await response.json();

}
checkEvents();


<<<<<<< HEAD
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/dogs?name=' + breedName,
    headers: { 'X-Api-Key': '9otJVZp5fJ9qMc2fEsmc/g==YNaJYpvMld2P9utw'},
    contentType: 'application/json',
    success: function(result) {
    for(let i = 0; i < 3; i++) {
        let imageLink= result[i].image_link;
        document.getElementById('card-' +i).setAttribute("src", imageLink);
        
    }
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }}
});
=======
>>>>>>> 4c2e13628bb28ee3583720e8eb6384339e0f9d9d
