// fetch

// let map;

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

beer_api = "https://api.openbrewerydb.org/breweries"

fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data))
;

function initMap() {
  const mySoul = {oldsoulLat,oldsoulLong}
  const myCity = { lat: 38.5816, lng: -121.4944};
  const myBreweries = [{lat: 38.58 , lng: -121.49 }, {lat: 38.57 , lng: -121.48 }];

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: myCity,
  });

  new google.maps.Marker({position: myCity,map,title: "Hello World!",});
  console.log("++Breweries LAT/LONG++");

  for (let i = 0; i < myBreweries.length; i++) {
    console.log("Brew Lat/Long for entry: "+i);
    console.log(myBreweries[i])
    new google.maps.Marker({position: myBreweries[i],map,title: "Brew of: "+i,});
  }
  new google.maps.Marker({position: myCity,map,title: "Dis My City",});
  
}