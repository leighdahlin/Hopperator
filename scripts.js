var usrinputBtn = document.querySelector("#citybtn")
var usrInput = document.querySelector("#bulma_fetch")

beer_api = "https://api.openbrewerydb.org/breweries"

usrinputBtn.addEventListener("click",function(){
    console.log("++ButtonPress++")
    var city = usrInput.value
    var newUrl = beer_api + "?by_city=" + city + "&per_page=20"
    console.log(newUrl);

    fetch(newUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        console.log(data);
    });

})

//new message on this line//add to this line

// fetch("https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries/search?query=dog", {
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-key": "SIGN-UP-FOR-KEY",
//         "x-rapidapi-host": "brianiswu-open-brewery-db-v1.p.rapidapi.com"
//     }
// })
// .then(response => {
//     console.log(response);
// })
// .catch(err => {
//     console.error(err);
// });