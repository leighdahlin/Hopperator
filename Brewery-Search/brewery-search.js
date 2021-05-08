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
var centerCoordinates = [] //empty array to store the lats and longs for each brewery to determine the center to initalize the google map
var latitudesSum = 0; //initialize varible to sum all the lats
var longitudesSum = 0; //initialize varible to sum all the longs

//Open Brewery DB API link
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
    
    //if the user doesn't select a city or state, a modal will display, else it runs the fetch function
    if (usrCityInput.value == "" || usrStateInput.selectedIndex == 0) {
        modalEl.setAttribute("class","modal is-active");
        modalContentEl.textContent = "Please enter a city and state to continue."
        return;
    } else {

        fetch(newUrl)
        .then(function (response) {
            if(response.ok) {
                return response.json().then(function (data) {
                usrCityInput.value = ""; //clears the city field
                usrStateInput.selectedIndex = 0; //clears the state field

                //if the API doesn't pull any data, modal pops up asking for a valid city
                if(data.length == 0){
                    modalEl.setAttribute("class","modal is-active");
                    modalContentEl.textContent = "No brewery data. Please enter a valid city to continue."
                }else {
                    fullHeightDiv.setAttribute("class","")//removes full height class when results are displayed
                    viewMapBtn.setAttribute("class","button mapbtn") //makes the 'See on Map' button appear
            
                    for (i=0; i < data.length; i++) {
            
                        //only displays breweries that match the state selected by user and are not in planning
                        if(state == data[i].state && data[i].brewery_type !== "planning") {
                            console.log("Match" + i)
                            var firstDiv = document.createElement('div');
                            firstDiv.setAttribute("class", "card");
                            
                            //The code below creates the bulma structure of a card for each dataset extracted from the API
                            var secondDiv = document.createElement('div');
                            secondDiv.setAttribute("class","card-content")
                            firstDiv.appendChild(secondDiv);
                            
                            //makes the header an anchor that links to a page with  more information on the brewery
                            var brewPageLink = document.createElement('a');
                            brewPageLink.setAttribute("class", "brewery-page");
                            brewPageLink.setAttribute("href", "./brewery-page.html?breweryid=" + data[i].id);
                            secondDiv.appendChild(brewPageLink);
                
                            var headerDiv = document.createElement("div");
                            headerDiv.setAttribute("class","card-header");
                            brewPageLink.appendChild(headerDiv);
                            
                            //the img element before each item serves as a bullet point
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
                            brewType = brewType.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()); //capitalizes the first letter
                            var brewTypeEl = document.createTextNode("Brewery Type: " + brewType);
                            liUrl2.appendChild(brewTypeEl);
                            ulEl.appendChild(liUrl2);
                            
                            
                            brewPhone = data[i].phone;
            
                            //only displays the breweries phone number if it's not null
                            if(brewPhone === null) {
                                console.log(data[i].website_url);
                            } else {
                            //for all phone numbers, puts them in the same format and addes dashes
                            var arrayBP = brewPhone.split("-");
                            var joinBP = arrayBP.join("");
                            var brewPhoneDash = joinBP.slice(0,3) + "-" + joinBP.slice(3,6) + "-" + joinBP.slice(6);
            
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
                            
                            //only collects the lats and longs for each breweries if they're not null
                            if(data[i].latitude === null) {
                                console.log("Coordinates null");
                            } else {
                                currentLat = parseFloat(data[i].latitude);
                                currentLong = parseFloat(data[i].longitude);

                                //stores the lats, longs and brewery name into an array that was created globally
                                var currentCoord = {
                                    lat: currentLat,
                                    long: currentLong,
                                    name: data[i].name
                                }

                                //pushing currentCoord object into the array
                                centerCoordinates.push(currentCoord);
                            }
                            
                        } else {
                            console.log("No match")
                        }
                    }
                }

                });
            
            } else { //if the response status isn't ok, modal will pop up
                modalEl.setAttribute("class","modal is-active");
                modalContentEl.textContent = "Please enter a valid city to continue."
                return;
            }
        })

    }

    
})


//event listener for the 'See on Map' button that appears when a search is run
viewMapBtn.addEventListener("click", function(){
    //hides the map once clicked
    viewMapBtn.setAttribute("class","hidden")

    //divides the sum of all lat/longs collected for a city and divides them by the length of the array to get the center
    var divider = centerCoordinates.length;
    createCenter();
    centerLat = parseFloat(latitudesSum/divider);
    centerLong = parseFloat(longitudesSum/divider);

    //makes the map visible and sets the style for view height
    mapEl.setAttribute("class","map-visible");
    mapEl.setAttribute("style","height:35vh;");

    //runs the google API's initMap function for the center calculated above
    initMap(centerLat,centerLong);

    //for each lat/long in the centerCoodinates array, creates a marker with the title of the brewery
    for(var i=0; i<centerCoordinates.length; i++) {
        var brewLat = parseFloat(centerCoordinates[i].lat);
        var brewLon = parseFloat(centerCoordinates[i].long)
        var coordinates = { lat: brewLat, lng: brewLon }
        console.log(coordinates);
        var brewName = centerCoordinates[i].name
        addMarker(coordinates,brewName)
    }

})

//function to sum all the lats and longs collected in the centerCoodinates array
function createCenter() {

    for(var i=0; i<centerCoordinates.length; i++)  {
    latitudesSum = latitudesSum + centerCoordinates[i].lat;
    longitudesSum = longitudesSum + centerCoordinates[i].long;
    }

    return latitudesSum,longitudesSum;
}

//google maps API function to initialize the google map
//when the page opens, the function runs but is hidden
function initMap(bLat,bLong) {
    console.log("running initMap")
    myLatLng = { lat: bLat, lng: bLong };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: myLatLng,
    });
      
}

//function that adds markers to the google map
function addMarker(coordinates,names) {
    console.log("Function running")
    var marker = new google.maps.Marker({
       position: coordinates, 
       map:map, 
       title: names,
    });

 };

//function to close the modal
modalClose.addEventListener("click",function(){
    modalEl.setAttribute("class","modal")
})