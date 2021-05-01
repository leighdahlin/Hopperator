// When we init map we could utilize parameters to enter the coordinates from another api call into this function
oldsoulLat = 38.5781
oldsoulLong = -121.4780

function initMap() {

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13, // 1:world 5:continent 10:city 20:buildings
      center: { lat: 38.575, lng: -121.494 }, // This is where you can start the search nearby. (sacs coord are this... )
    });

    const geocoder = new google.maps.Geocoder(); // Sets the geocoder into the constant for later
    const infowindow = new google.maps.InfoWindow(); //I dunno what the info window is yet
    // Upon hitting submit button feed into the geocodeLatLng
    document.getElementById("submitLatLong").addEventListener("click", () => {
        console.log("Click button running geocodeLatLang");
        geocodeLatLng(geocoder, map, infowindow);
    });

    //This allows one to manually add polygons onto the map itself and add points
    var drawingManager = new google.maps.drawing.DrawingManager();
    drawingManager.setMap(map);
  }
  

  function geocodeLatLng(geocoder, map, infowindow) {
    //Takes a single number and split it into 2 pieces of an array for later of the form "122.87,37.23"
    const input = document.getElementById("latlng").value;
    const latlngStr = input.split(",", 2);
    const latlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1]),
    };

    // Takes lat and long feeds it into the geocoder api to search names based off of the latlong
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === "OK") {
        
        if (results[0]) {
          map.setZoom(11);
          const marker = new google.maps.Marker({
            position: latlng,
            map: map,
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

var drawingManager = new google.maps.drawing.DrawingManager();
drawingManager.setMap(map);

// // Simple Map
// let map;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     //   Where your map will inherently start at.
//     center: { lat: 38.575, lng: -121.494 },
//     zoom: 12,
//   });
// }

// var drawingManager = new google.maps.drawing.DrawingManager();
// drawingManager.setMap(map);