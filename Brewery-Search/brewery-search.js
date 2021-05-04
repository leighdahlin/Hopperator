//Assign selector variables
var usrinputBtn = document.querySelector("#citybtn")
var usrCityInput = document.querySelector("#city")
var usrStateInput = document.querySelector("#state")
var viewMapBtn = document.querySelector("#mapbtn")
var mapEl = document.querySelector('#map')
var brewListEl = document.querySelector(".breweries-list")
var centerLat = 0;
var centerLong = 0;
var centerCount = 0;
var centerCoordinates = []
var latitudesSum = 0;
var longitudesSum = 0;


beer_api = "https://api.openbrewerydb.org/breweries"

//want to "send"

usrinputBtn.addEventListener("click",function(){
    brewListEl.innerHTML=""; //removes previous search results when clicked
    centerCoordinates = [] //clears coordinates array
    viewMapBtn.setAttribute("class","mapbtn")

    var city = usrCityInput.value.trim();
    city = city.toLowerCase();
    var state = usrStateInput.options[usrStateInput.selectedIndex].text
    lowState = state.toLowerCase();
    var newUrl = beer_api + "?by_city=" + city + "&?by_state=" + lowState + "&per_page=50"

    // console.log(newUrl);

    fetch(newUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        for (i=0; i < data.length; i++) {
            if(state == data[i].state) {

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
    
                var liUrl3 = document.createElement("li");
                var imgIcon3 = document.createElement("img");
                imgIcon3.setAttribute("class","icon");
                imgIcon3.setAttribute("src","../Images/beer-icon.png");
                liUrl3.appendChild(imgIcon3);
                var brewPhone = document.createTextNode("Phone number: " + data[i].phone)
                liUrl3.appendChild(brewPhone);
                ulEl.appendChild(liUrl3);
    
                brewListEl.appendChild(firstDiv);
    
                if(data[i].latitude === null) {
                    console.log("Coordinates null");
                    return;
                } else {
                    currentLat = parseFloat(data[i].latitude);
                    currentLong = parseFloat(data[i].longitude);
                    centerCount = centerCount + 1;
                    var currentCoord = {
                        lat: currentLat,
                        long: currentLong
                    }
                    centerCoordinates.push(currentCoord);
                    // console.log(centerCoordinates);
                }
                
            } else {
                console.log("No match")
            }
        }
    });
})

viewMapBtn.addEventListener("click", function(){
    var divider = centerCoordinates.length;
    console.log("Button pressed!")
    createCenter();
    centerLat = parseFloat(latitudesSum/divider);
    centerLong = parseFloat(longitudesSum/divider);
    console.log(centerLat);
    console.log(centerLong);

    mapEl.setAttribute("class","map-visible");

    initMap();

    function initMap() {
        myLatLng = { lat: centerLat, lng: centerLong };
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          center: myLatLng,
        });
      
        new google.maps.Marker({
          position: myLatLng,
          map,
          title: "Sacramento!",
        });  
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

function addMarker(coordinates,names) {
    var marker = new google.maps.Marker({
       position: coordinates, // Passing the coordinates
       map:map, //Map that we need to add
       title: names ,
    });
 }
 
 
 



//  addMarker({
//     coordinates:{lat: brewlat, lng: brewlong},
//     content:name,
//    }); // Brewery Coordinates