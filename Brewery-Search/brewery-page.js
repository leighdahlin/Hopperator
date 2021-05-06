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


function getId() {
   var queryString = document.location.search;
   var Id = queryString.split('=')[1];
   breweryId = Id;
   getInfo();
  };

function displayRandomImage(){
   var randomImage = imagesArray[Math.floor(Math.random()*imagesArray.length)];
   brewImageEl.setAttribute("src",randomImage);
   console.log(randomImage)

}

function getInfo() {
   var url = "https://api.openbrewerydb.org/breweries/" + breweryId;

   fetch(url)
   .then(function(response){
      return response.json();
   })
   .then(function(data){
      console.log(data)
      brewName = data.name
      breweryNameEl.textContent = data.name;

      var ulEl = document.createElement("ul");
         breweryInfoEl.appendChild(ulEl);

      var brewUrl = data.website_url;
      var liUrl2 = document.createElement("li");
      var imgIcon2 = document.createElement("img");
      imgIcon2.setAttribute("class","icon");
      imgIcon2.setAttribute("src","../Images/beer-icon.png");
      liUrl2.appendChild(imgIcon2);
      var brewType = data.brewery_type;
      brewType = brewType.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
      var brewTypeEl = document.createTextNode("Brewery Type: " + brewType);
      liUrl2.appendChild(brewTypeEl);
      ulEl.appendChild(liUrl2);

      var liUrl3 = document.createElement("li");
      var imgIcon3 = document.createElement("img");
      imgIcon3.setAttribute("class","icon");
      imgIcon3.setAttribute("src","../Images/beer-icon.png");
      liUrl3.appendChild(imgIcon3);
      var brewPhone = document.createTextNode("Phone number: " + data.phone)
      liUrl3.appendChild(brewPhone);
      ulEl.appendChild(liUrl3);

      var liUrl3 = document.createElement("li");
      var imgIcon3 = document.createElement("img");
      imgIcon3.setAttribute("class","icon");
      imgIcon3.setAttribute("src","../Images/beer-icon.png");
      liUrl3.appendChild(imgIcon3);
      var brewPhone = document.createTextNode("Address: " + data.street + ", " + data.city + ", " + data.state)
      liUrl3.appendChild(brewPhone);
      ulEl.appendChild(liUrl3);
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
                urlLink.setAttribute("href",data.website_url);
                urlLink.setAttribute("target","blank");
                urlLink.textContent = data.website_url;
                liUrl1.appendChild(urlLink);
                ulEl.appendChild(liUrl1);
            }
            

      
      if(data.latitude === null) {
         console.log("Coordinates null");
         return;
     } else {
      breweryLatitude = parseFloat(data.latitude); 
      breweyLongitude = parseFloat(data.longitude);
      console.log(breweryLatitude);
      console.log(breweyLongitude);
      mapEl.setAttribute("class","map-visible")
      initMap(breweryLatitude,breweyLongitude,brewName);
     }
   })
}

function initMap(brewlat,brewlong,name) {

    var options = {
       zoom:14.5,
       center: { lat:brewlat, lng:brewlong} //Coordinates of Brewery Location
    }
 var map = new google.maps.Map(document.getElementById('map'), options);
 
 function addMarker(prop) {
    var marker = new google.maps.Marker({
       position: prop.coordinates, // Passing the coordinates
       map:map, //Map that we need to add
       draggarble: false,// If set to true you can drag the marker
       title:prop.content
    });
    
 }
 

 addMarker({
    coordinates:{lat: brewlat, lng: brewlong},
    content:name,
   }); // Brewery Coordinates
 
}

breweryFavBtn.addEventListener("click", function(){
   
   checkFavorites();
   if (checkFavorites()) {
      console.log("Already favorite") //if already in local storage, does nothing
   } else {
      console.log("Not favorited yet") //if  not in local storage, adds to local storage
      breweryFavorites.push(breweryId);
      localStorage.setItem("favBreweries", JSON.stringify(breweryFavorites));
   }

})

//checks to see if the brewery has already been added to local storage
function checkFavorites() {
   for (i=0; i<breweryFavorites.length; i++) {
      if(breweryId === breweryFavorites[i]) {
         breweryFavBtn.textContent = "Favorite"
         var isFavorite = true
      } else {
         console.log("Id not in local storage")
         isFavorite = false
      }
   }
   return isFavorite;
}


 getId();
 checkFavorites();
 displayRandomImage();