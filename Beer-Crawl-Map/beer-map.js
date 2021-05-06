query = []
function getInputValue(){
  // Selecting the input element and get its value 
  var query = document.getElementById("myInput").value;
  return query;
};
query = "/search?query="+query; 

byPostalUrl = "https://api.openbrewerydb.org/breweries?by_postal=95818"
byQuery1 = "https://api.openbrewerydb.org/breweries"+query
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
function initMap() {
  myLatLng = { lat: 38.5603, lng: -121.4970 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: myLatLng,
  });

  
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Sacramento!",
    // icon: "file:///Users/fsandoval/Desktop/761767-1.png",
  });

}


// function initMap() {
// map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 10,
//     //   Where your map will inherently start at.
//     // City Center
//     center: { lat: 38.575, lng: -121.494 },
// });
// // Example coords. of old soul
// oldsoulLat = 38.5781
// oldsoulLong = -121.4780
// new google.maps.LatLng(33.91851096391805, -121.2344058214569)
// // marker = new google.maps.Marker({
// //     map,
// //     draggable: true,
// //     animation: google.maps.Animation.DROP,
// //     position: { lat: 59.327, lng: 18.067 },
// //   });
// //   marker.addListener("click", toggleBounce);
// // }

// // Adds lines to map and change it to a dark green color
// poly = new google.maps.Polyline({
//     strokeColor: "#4a7c59",
//     strokeOpacity: 1.0,
//     strokeWeight: 3,
//   });
//   poly.setMap(map);
//   // Add a listener for the click event
//   map.addListener("click", addLatLng);

//   // Handles click events on a map, and adds a new point to the Polyline.
//   function addLatLng(event) {
//       const path = poly.getPath();
//       // Because path is an MVCArray, we can simply append a new coordinate
//       // and it will automatically appear.
//       path.push(event.latLng);
//       // Add a new marker at the new plotted point on the polyline.
//       new google.maps.Marker({
//         position: event.latLng,
//         title: "#" + path.getLength(),
//         map: map,
//       });
//   }
// }

// function toggleBounce() {
//     if (marker.getAnimation() !== null) {
//       marker.setAnimation(null);
//     } else {
//       marker.setAnimation(google.maps.Animation.BOUNCE);
//     }
//   }

// // // Pulls the earthquake epicenters and sets them to the heatmap on map interface
// // // Create a <script> tag and set the USGS URL as the source.
// // const script = document.createElement("script");
// // // This example uses a local copy of the GeoJSON stored at
// // // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
// // script.src =
// //     "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
// // document.getElementsByTagName("head")[0].appendChild(script);

// // function eqfeed_callback(results) {
// // const heatmapData = [];

// // for (let i = 0; i < results.features.length; i++) {
// //     const coords = results.features[i].geometry.coordinates;
// //     const latLng = new google.maps.LatLng(coords[1], coords[0]);
// //     heatmapData.push(latLng);
// // }
// // const heatmap = new google.maps.visualization.HeatmapLayer({
// //     data: heatmapData,
// //     dissipating: true,
// //     map: map,
// // });
// // }

// Example coords. of old soul
oldsoulLat = 38.5781
oldsoulLong = -121.4780

// beer_api = "https://api.openbrewerydb.org/breweries"
// // "https://api.openbrewerydb.org/breweries?by_distance=38.8977,77.0365"
// for (let i = 0; i < brew.length; i++) {
//   const element = array[i];
  
// }

// async function fetchData() {
//   confirm("Running")





  // let response = await fetch(byPostalUrl)
  // .then(response => response.json())
  // .then(function(data){
  //   brewObj = data

  //   var myBreweries = [brewObj[0],brewObj[1]];
  //   console.log("Hardcoded breweries as an array: "+ myBreweries);


  //   for (let index = 0; index < brewObj.length; index++) {
  //   console.log("for loop brew object w index is: "+brewObj[0])
  //   var myCity = { lat: 38.5816, lng: -121.4944};
  //   var currentBrewery = brewObj[index];
  //   var latitude = currentBrewery.latitude
  //   var longitude = currentBrewery.longitude
  //   var breweryName = currentBrewery.name 

  //   console.log("current lat is : "+latitude);
  //   console.log("current long is : "+longitude);
  //   map.markers.push

  //   markerObj = {
  //     position : myBreweries[index],

  //   }


  //   // myBreweries[index] = {lat: parseFloat(latitude) , lng: parseFloat(longitude)};
  //   // localStorage.setItem(brewName,)
    
  //   // console.log(latitude)
  //   // console.log(longitude)

  //   // initMap(latitude,longitude,brewName);

  //   // function initMap(lat,long,brewName) {
      
  //     // console.log("++Initializing Map++");
  //     // console.log("breweries lat init: "+ lat);
  //     // console.log("breweries long init: "+ long);
  //     // console.log("breweries name init: "+ brewName);
      
  //   // }

//     };

//     function initMap() {
//       const myLatLng = { lat: -25.363, lng: 131.044 };
//       const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 4,
//         center: myLatLng,
//       });
//       new google.maps.Marker({
//         position: myLatLng,
//         map,
//         title: "Hello World!",
//       });
//     };

//     console.log(myBreweries)


//     function mapmaker() {
//       for (let index = 0; index < myBreweries.length; index++) {


//         console.log(myBreweries[index])

//         const map = new google.maps.Map(document.getElementById("map"), {
//           zoom: 10,
//           center: myCity,
//         });

//         new google.maps.Marker({
//           position: myBreweries[index],
//           map,
//           title: breweryName,}
//         );

//         new google.maps.Marker({
//           position: myCity,
//           map,
//           title: "Dis My City",
//           });
        
//       }
//     }

//     mapmaker();


//   });

//   // let response = await fetch(byPostalUrl);
//   // let data = await response.json();
//   // data = JSON.stringify(data);
//   // data = JSON.parse(data);
//   // console.log(data)
//   // return data;
// }



// function initMap(lat,long,brewName) {
  
//   console.log("++Initializing Map++");
//   console.log("breweries lat init: "+ lat);
//   console.log("breweries long init: "+ long);
//   console.log("breweries name init: "+ brewName);

//   myCity = { lat: 38.5816, lng: -121.4944};
//   myBreweries = {lat: parseFloat(lat) , lng: parseFloat(long) };
//   console.log(myBreweries)
//   breweryName = brewName

//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 10,
//     center: myCity,
//   });

//   var something = new google.maps.Marker({
//     position: myBreweries,
//     map,
//     title: breweryName,}
//   );

//   something

//   new google.maps.Marker({
//     position: myCity,
//     map,
//     title: "Dis My City",
//     });
  
// }