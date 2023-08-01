const dogKey="live_FTU78RuBy8JufSDO0cYsxxEjUweRpQ8Vaa7oRI682TC2gEVMzBSGe1WxqUxkiDjj"
const dogUrl="https://api.thedogapi.com/v1/breeds?breed_ids=1"
let imageEl= document.getElementById("card-1")
let breedImage=document.getElementById("breedImage")

let searchButton= document.getElementById("searchButton");
searchButton.addEventListener("click",function(){
})

async function checkEvents(){
    const response = await fetch(dogUrl + `&apikey=${dogKey}`);
     let data = await response.json();

    console.log(data);
}
checkEvents();

var breedName = 'poodle'
$.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/dogs?name=' + breedName,
    headers: { 'X-Api-Key': '9otJVZp5fJ9qMc2fEsmc/g==YNaJYpvMld2P9utw'},
    contentType: 'application/json',
    success: function(result) {
    for(let i = 0; i < 3; i++) {
        let imageLink= result[i].image_link;
        document.getElementById('card-' +i).setAttribute("src", imageLink);
        console.log(imageEl.getAttribute("src"))

        console.log(result[0].image_link)
    }
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }}
});