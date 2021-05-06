//Assign selector variables
var fullHeightDiv = document.querySelector("#full-height")
var modalEl = document.querySelector(".modal")
var modalContentEl = document.querySelector(".modal-text")
var modalClose = document.querySelector(".modal-close")
var usrinputBtn = document.querySelector("#citybtn")
var usrCityInput = document.querySelector("#city")
var usrStateInput = document.querySelector("#state")
var viewMapBtn = document.querySelector("#mapbtn")
var mapEl = document.querySelector('#map')
var brewListEl = document.querySelector(".breweries-list")
var centerLat = 38.5816; //using center of Sacrametno to initialize map
var centerLong = -121.4944; //using center of Sacrametno to initialize map
var centerCount = 0;
var centerCoordinates = []
var latitudesSum = 0;
var longitudesSum = 0;

beer_api = "https://api.openbrewerydb.org/breweries"

usrinputBtn.addEventListener("click",function(){
    
    brewListEl.innerHTML=""; //removes previous search results when clicked
    centerCoordinates = [] //clears coordinates array
    latitudesSum = 0; //clears out previous sum   
    longitudesSum = 0; //clears out previous sum
    mapEl.setAttribute("class","hidden");//hides map if user makes another search
    viewMapBtn.setAttribute("class","button hidden") //hides map button
    fullHeightDiv.setAttribute("class","full-height")//resets div to full height for footer

    var city = usrCityInput.value.trim(); //saves the user input and trims any white space
    city = city.toLowerCase(); //makes the input lowercase to be input into API
    
    var state = usrStateInput.options[usrStateInput.selectedIndex].text
    
    lowState = state.toLowerCase(); //makes the input lowercase to be input into API
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



viewMapBtn.addEventListener("click", function(){
    viewMapBtn.setAttribute("class","hidden")

    var divider = centerCoordinates.length;
    createCenter();
    centerLat = parseFloat(latitudesSum/divider);
    centerLong = parseFloat(longitudesSum/divider);
    console.log(centerLat);
    console.log(centerLong);

    mapEl.setAttribute("class","map-visible");
    mapEl.setAttribute("style","height:35vh;");

    initMap(centerLat,centerLong);

    for(var i=0; i<centerCoordinates.length; i++) {
        var brewLat = parseFloat(centerCoordinates[i].lat);
        var brewLon = parseFloat(centerCoordinates[i].long)
        var coordinates = { lat: brewLat, lng: brewLon }
        console.log(coordinates);
        var brewName = centerCoordinates[i].name
        addMarker(coordinates,brewName)
    }

})

function createCenter() {

    console.log(centerCoordinates);

for(var i=0; i<centerCoordinates.length; i++) {

    // console.log(centerCoordinates[i].long);
    
    latitudesSum = latitudesSum + centerCoordinates[i].lat;
    // console.log(latitudesSum)
    longitudesSum = longitudesSum + centerCoordinates[i].long;
    // console.log(longitudesSum)
}

return latitudesSum,longitudesSum;
}

function initMap(bLat,bLong) {
    console.log("running initMap")
    myLatLng = { lat: bLat, lng: bLong };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: myLatLng,
    });
  
    // new google.maps.Marker({
    //   position: myLatLng,
    //   map,
    //   title: "Sacramento!",
    // });
    
}

  

function addMarker(coordinates,names) {
    console.log("Function running")
    var marker = new google.maps.Marker({
       position: coordinates, // Passing the coordinates
       map:map, //Map that we need to add
       title: names,
    });

 };

 

// function activateModal() {
//     modalEl.setAttribute("class","modal is-active")
// }

modalClose.addEventListener("click",function(){
    modalEl.setAttribute("class","modal")
})