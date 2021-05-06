var breweryNameEl = document.querySelector("#brew-name");
var brewImageEl = document.querySelector(".brew-img");
var breweryInfoEl = document.querySelector(".info");
var breweryFavBtn = document.querySelector("#favorite");
var mapEl = document.querySelector("#map");
var imagesArray = ["../Images/beer-barrels.jpg","../Images/beer-beer-beer.jpg", "../Images/beer-glass.jpg", "../Images/beer-ontap.jpg","../Images/beer-pour.jpg", "../Images/beer-signs-lightup.jpg", "../Images/beer-taps.jpg", "../Images/cans-beer.jpg", "../Images/friends-beer.jpg", "../Images/more-beer-taps.jpg", "../Images/pour-beer.jpg"]
var breweryId
var breweryLatitude
var breweyLongitude
var breweryFavorites = JSON.parse(localStorage.getItem("favBreweries")) || [];

//gets id sent from brewery search page through the page's url
function getId() {
   var queryString = document.location.search;
   var Id = queryString.split('=')[1];
   breweryId = Id;
   getInfo();
  };

//randomly pics an image from the imagesArray to display to the page
function displayRandomImage(){
   var randomImage = imagesArray[Math.floor(Math.random()*imagesArray.length)];
   brewImageEl.setAttribute("src",randomImage);
   console.log(randomImage)
}

//using the id obtained from teh getId function, pulls brewery info using fetch, similar to the brewery search page but different object references
function getInfo() {
   //open brewery DB website
   var url = "https://api.openbrewerydb.org/breweries/" + breweryId;

   fetch(url)
   .then(function(response){
      return response.json();
   })
   .then(function(data){

      //pulls brewery name from API and displays to page
      brewName = data.name
      breweryNameEl.textContent = data.name;

      //creates ul for list items
      var ulEl = document.createElement("ul");
      breweryInfoEl.appendChild(ulEl);

      //creates list item for the brewery type
      var brewUrl = data.website_url;
      var liUrl2 = document.createElement("li");
      var imgIcon2 = document.createElement("img"); //creates img element for beer icon
      imgIcon2.setAttribute("class","icon");
      imgIcon2.setAttribute("src","../Images/beer-icon.png");
      liUrl2.appendChild(imgIcon2);
      var brewType = data.brewery_type;
      brewType = brewType.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()); //capitalizes the brewery type
      var brewTypeEl = document.createTextNode("Brewery Type: " + brewType);
      liUrl2.appendChild(brewTypeEl);
      ulEl.appendChild(liUrl2);

      //creates list item for phone number if it's not null
      brewPhone = data.phone;      
      if(brewPhone === null) {
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

      //creates list item for the address
      var liUrl3 = document.createElement("li");
      var imgIcon3 = document.createElement("img");
      imgIcon3.setAttribute("class","icon");
      imgIcon3.setAttribute("src","../Images/beer-icon.png");
      liUrl3.appendChild(imgIcon3);
      var brewPhone = document.createTextNode("Address: " + data.street + ", " + data.city + ", " + data.state)
      liUrl3.appendChild(brewPhone);
      ulEl.appendChild(liUrl3);

      //creates list item for the website url if it's not null
      if(brewUrl === null) {
            console.log(data[i].website_url);
      } else {
            var liUrl1 = document.createElement("li");
            var imgIcon = document.createElement("img");
            imgIcon.setAttribute("class","icon");
            imgIcon.setAttribute("src","../Images/beer-icon.png");
            liUrl1.appendChild(imgIcon);
            var urlLink = document.createElement("a");
            urlLink.setAttribute("href",data.website_url);
            urlLink.setAttribute("target","blank");
            urlLink.textContent = data.website_url;
            liUrl1.appendChild(urlLink);
            ulEl.appendChild(liUrl1);
      }
            
      //displays map on page if the latitide isn't null
      if(data.latitude === null) {
         console.log("Coordinates null");
         return;
     } else {
      breweryLatitude = parseFloat(data.latitude); 
      breweyLongitude = parseFloat(data.longitude);
      console.log(breweryLatitude);
      console.log(breweyLongitude);
      mapEl.setAttribute("class","map-visible") //makes the map visible only if there are coordinates available
      initMap(breweryLatitude,breweyLongitude,brewName); //runs the function to dispaly a map for the data pulled from the API
     }
   })
}

//displays google map based on information pulled from the API
function initMap(brewlat,brewlong,name) {

    var options = {
       zoom:14.5,
       center: { lat:brewlat, lng:brewlong} //Coordinates of Brewery Location
    }
 var map = new google.maps.Map(document.getElementById('map'), options);
 
 //function to add marker for the location
 function addMarker(prop) {
    var marker = new google.maps.Marker({
       position: prop.coordinates, // Passing the coordinates
       map:map, 
       draggarble: false, // If set to true you can drag the marker
       title:prop.content
    });
    
 }

 //calling on the function to add the marker
 addMarker({
    coordinates:{lat: brewlat, lng: brewlong},
    content:name,
   }); 
 
}

//when the 'Add to Favorites' button in clicked, this function checks to see if it's already in local storage or not
breweryFavBtn.addEventListener("click", function(){
   checkFavorites();
   if (checkFavorites()) {
      console.log("Already favorite") //if already in local storage, does nothing
   } else {
      console.log("Not favorited yet") //if  not in local storage, adds to local storage
      breweryFavorites.push(breweryId);
      localStorage.setItem("favBreweries", JSON.stringify(breweryFavorites));
      breweryFavBtn.textContent = "Favorite"; //changes button to say 'Favorite'
      var hearticon = document.createElement("img"); 
      hearticon.setAttribute("id","heart-icon");
      hearticon.setAttribute("src","../Images/heart-icon.png")
      breweryFavBtn.appendChild(hearticon); //adds heart icon in button
   }

})

//checks to see if the brewery has already been added to local storage
function checkFavorites() {
   for (i=0; i<breweryFavorites.length; i++) {
      if(breweryId === breweryFavorites[i]) { //if the brewery is already in local storage, the button will say 'Favorite'
         console.log("running")
         breweryFavBtn.textContent = "Favorite";
         var hearticon = document.createElement("img");
         hearticon.setAttribute("id","heart-icon");
         hearticon.setAttribute("src","../Images/heart-icon.png")
         breweryFavBtn.appendChild(hearticon);
         var isFavorite = true
      } else {
         console.log("Id not in local storage")
         isFavorite = false
      }
   }
   return isFavorite; //tells the function for the event listener that the brewery is a favorite
}

function init() {
   getId();
   checkFavorites();
   displayRandomImage();
}

init();