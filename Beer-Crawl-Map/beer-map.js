var usrQuery = document.querySelector("#myquery")
var usrinputBtn = document.querySelector("#citybtn")
var mapEl = document.querySelector('#map')


usrinputBtn.addEventListener("click",function(){
  console.log("++Leigh's Button Call++");
    
    usrQuery.innerHTML=""; //removes previous search results when clicked
    centerCoordinates = [] //clears coordinates array
    latitudesSum = 0; //clears out previous sum   
    longitudesSum = 0; //clears out previous sum
    mapEl.setAttribute("class","map-visible");//hides map if user makes another search
    // viewMapBtn.setAttribute("class","button hidden") //hides map button
    // fullHeightDiv.setAttribute("class","full-height")//resets div to full height for footer

    var city = usrQuery.value.trim(); //saves the user input and trims any white space
    city = city.toLowerCase(); //makes the input lowercase to be input into API
    
    // var state = usrStateInput.options[usrStateInput.selectedIndex].text
    
    // lowState = state.toLowerCase(); //makes the input lowercase to be input into API
    var newUrl = beer_api + "?by_city=" + city + "&?by_state=" + lowState + "&per_page=50"
    
    if (usrCityInput.value == "" || usrStateInput.selectedIndex == 0) {
        modalEl.setAttribute("class","modal is-active");
        modalContentEl.textContent = "Please enter a city and state to continue."
        return;
    } else {

        fetch(newUrl)
        .then(function (response) {
            console.log(newUrl)
            if(response.ok) {
                return response.json().then(function (data) {
                usrCityInput.value = ""; //clears the city field
                usrStateInput.selectedIndex = 0; //clears the state field

                if(data.length == 0){
                    modalEl.setAttribute("class","modal is-active");
                    modalContentEl.textContent = "Please enter a valid city to continue."
                }else {
                    fullHeightDiv.setAttribute("class","")//removes full height class when results are displayed
                    viewMapBtn.setAttribute("class","button mapbtn") //makes the 'See on Map' button appear
            
                    for (i=0; i < data.length; i++) {
            
                        //only displays breweries that match the state selected by user and are not in planning
                        if(state == data[i].state && data[i].brewery_type !== "planning") {
                            console.log("Match" + i)
                            var firstDiv = document.createElement('div');
                            firstDiv.setAttribute("class", "card");
                            
                
                            var secondDiv = document.createElement('div');
                            secondDiv.setAttribute("class","card-content")
                            firstDiv.appendChild(secondDiv);
                
                            var brewPageLink = document.createElement('a');
                            brewPageLink.setAttribute("class", "brewery-page");
                            brewPageLink.setAttribute("href", "./brewery-page.html?breweryid=" + data[i].id);
                            secondDiv.appendChild(brewPageLink);
                
                            var headerDiv = document.createElement("div");
                            headerDiv.setAttribute("class","card-header");
                            brewPageLink.appendChild(headerDiv);
                
                            var brandImg = document.createElement("img");
                            brandImg.setAttribute("id","hop-brand");
                            brandImg.setAttribute("src","../Images/hop-3.png");
                            headerDiv.appendChild(brandImg);
                
                            var brewName = document.createElement("p");
                            brewName.setAttribute("class","title is-4 name");
                            brewName.textContent = data[i].name;
                            headerDiv.appendChild(brewName);
                
                            var infoDiv = document.createElement("div");
                            infoDiv.setAttribute("class","content");
                            secondDiv.appendChild(infoDiv);
                
                            var ulEl = document.createElement("ul");
                            infoDiv.appendChild(ulEl);
            
                
                            var brewUrl = data[i].website_url;
                
                            //if the value for the url is null, don't generate line for it in html
                            if(brewUrl === null) {
                                console.log(data[i].website_url);
                            } else {
                                var liUrl1 = document.createElement("li");
                                var imgIcon = document.createElement("img");
                                imgIcon.setAttribute("class","icon");
                                imgIcon.setAttribute("src","../Images/beer-icon.png");
                                liUrl1.appendChild(imgIcon);
                                var urlLink = document.createElement("a");
                                urlLink.setAttribute("href",data[i].website_url);
                                urlLink.setAttribute("target","blank");
                                urlLink.textContent = data[i].website_url;
                                liUrl1.appendChild(urlLink);
                                ulEl.appendChild(liUrl1);
                            }
                
                
                            var liUrl2 = document.createElement("li");
                            var imgIcon2 = document.createElement("img");
                            imgIcon2.setAttribute("class","icon");
                            imgIcon2.setAttribute("src","../Images/beer-icon.png");
                            liUrl2.appendChild(imgIcon2);
                            var brewType = data[i].brewery_type;
                            brewType = brewType.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                            var brewTypeEl = document.createTextNode("Brewery Type: " + brewType);
                            liUrl2.appendChild(brewTypeEl);
                            ulEl.appendChild(liUrl2);
                            
                            
                            brewPhone = data[i].phone;
            
            
                            if(brewPhone === null) {
                                console.log(data[i].website_url);
                            } else {
                            //for all phone numbers, puts them in the same format and addes dashes
                            var arrayBP = brewPhone.split("-");
                            var joinBP = arrayBP.join("");
                            var brewPhoneDash = joinBP.slice(0,3) + "-" + joinBP.slice(3,6) + "-" + joinBP.slice(6);
                            console.log(brewPhoneDash)
            
                            var liUrl3 = document.createElement("li");
                            var imgIcon3 = document.createElement("img");
                            imgIcon3.setAttribute("class","icon");
                            imgIcon3.setAttribute("src","../Images/beer-icon.png");
                            liUrl3.appendChild(imgIcon3);
                            var brewPhone = document.createTextNode("Phone number: " + brewPhoneDash)
                            liUrl3.appendChild(brewPhone);
                            ulEl.appendChild(liUrl3);
                            }
                
                            brewListEl.appendChild(firstDiv);
                
                            if(data[i].latitude === null) {
                                console.log("Coordinates null");
                            } else {
                                currentLat = parseFloat(data[i].latitude);
                                currentLong = parseFloat(data[i].longitude);
                                centerCount = centerCount + 1;
                                var currentCoord = {
                                    lat: currentLat,
                                    long: currentLong,
                                    name: data[i].name
                                }
                                centerCoordinates.push(currentCoord);
                            }
                            
                        } else {
                            console.log("No match")
                        }
                    }
                }

                });
            
            } else {
                modalEl.setAttribute("class","modal is-active");
                modalContentEl.textContent = "Please enter a valid city to continue."
                return;
            }
        })

    }

    
})

byPostalUrl = "https://api.openbrewerydb.org/breweries?by_postal=95818"
// byQuery1 = "https://api.openbrewerydb.org/breweries"+query
byQuery2 = "https://api.openbrewerydb.org/breweries/search?query=Davis"
byDistanceTo = "https://api.openbrewerydb.org/breweries?by_distance=38.575764,-121.478851"

var breweryName = []
var breweryLat = []
var breweryLong = []
var marker = []

fetch(byQuery2)
.then(function(response){
return response.json();
})
.then(function(data){
var breweryArray = data
console.log(breweryArray)

//Go through breweryArray and add marker
for (let i = 0; i < breweryArray.length; i++) {
  addMarker({
    lat: parseFloat(breweryArray[i].latitude),
    lng:parseFloat(breweryArray[i].longitude)},
    breweryArray[i].name)
}

})


// Base function for adding a marker
function addMarker(coordinates,names) {
   var marker = new google.maps.Marker({
      position: coordinates, // Passing the coordinates
      map:map, //Map that we need to add
      title: names ,
      icon: "../Images/beer-icon-small.png",
      draggable: true,
   });
}
// Base function for adding a map
// function initMap() {
//   myLatLng = { lat: 38.5603, lng: -121.4970 };
//   map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 8,
//     center: myLatLng,
//   });

  
//   new google.maps.Marker({
//     position: myLatLng,
//     map,
//     title: "Sacramento!",
//     // icon: "file:///Users/fsandoval/Desktop/761767-1.png",
//   });

// }
