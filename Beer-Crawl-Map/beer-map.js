var usrQuery = document.querySelector("#myquery")
var usrinputBtn = document.querySelector("#citybtn")
var beer_api = "https://api.openbrewerydb.org/breweries/search?query="
let newUrl 
// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
Markers = []
var marker = []
var contentString = []
// uluru = { lat: -25.363, lng: 131.044 };
sac = {lat: 38.1328, lng: -121.2722}
// crawlPlanCoordinates = [
//     { lat: 37.772, lng: -122.214 },
//     { lat: 21.291, lng: -157.821 },
//     { lat: -18.142, lng: 178.431 },
//     uluru,
// ];
// crawlPlanNames = [
//     "Place 1",
//     "Lugar 2",
//     "Lieu 3",
//     "Uluru",
// ];
// crawlbarURL = [
//     "https://everything2.com",
//     "https://www.w3schools.com/howto/howto_js_dropdown.asp",
//     "https://datacadamia.com/ssh/x11/display",
//     "https://everything2.com",

// ]

var breweryName = []
var breweryLat = []
var breweryLong = []
var breweryStreet = []
var breweryType = []
var breweryURL = []


// This button function will run to modify the brewery array into corresponding brewery variables
usrinputBtn.addEventListener("click",function(){


    console.log("++++");
    console.log(usrQuery.value)


    
    var city = usrQuery.value.trim(); //saves the user input and trims any white space
    usrQuery.value=""; //removes previous search results when clicked
    city = city.toLowerCase(); //makes the input lowercase to be input into API
    var newUrl = beer_api + city + "&per_page=5"




    //Feed the newUrl into the fetch function to retrieve objects based on the userquery
    var breweryArray = []
    fetch(newUrl)
    .then(function(response){
    return response.json();
    })
    .then(function(data){

        crawlPlanCoordinates = []
        crawlPlanNames = []
        crawlbarURL = []

        var breweryArray = data
        console.log(breweryArray)

        
        for (let i = 0; i < breweryArray.length; i++) { //Go through breweryArray and add marker

            if (isNaN(breweryArray[i].latitude))
            continue;

            breweryName.push(breweryArray[i].name);
            breweryLat.push(parseFloat(breweryArray[i].latitude));
            breweryLong.push(parseFloat(breweryArray[i].longitude));
            breweryStreet.push(breweryArray[i].street + "," + breweryArray[i].state)
            breweryType.push(breweryArray[i].brewery_type)
            crawlbarURL.push(breweryArray[i].website_url),
            crawlPlanNames.push(breweryArray[i].name)
            crawlPlanCoordinates.push({ lat:parseFloat(breweryArray[i].latitude) , lng:parseFloat(breweryArray[i].longitude) })



        //End of for loop
        }

        makeMarker(
            breweryName,
            crawlPlanCoordinates,
            breweryType,
            crawlbarURL
        );

        console.log(crawlPlanCoordinates);

        


        function initMap(crawlPlanCoordinates,) {
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 4,
                center: sac,
            });

            crawlPath = new google.maps.Polyline({
                path: crawlPlanCoordinates,
                geodesic: true,
                strokeColor: "#4a7c59",
                strokeOpacity: 1.0,
                strokeWeight: 4,
            });

            crawlPath.setMap(null);  //makes the polyline appear on the map
            if (crawlPlanCoordinates) {
                crawlPath.setMap(map);
            }

        //   makeMarker();

        }












    // End of fetch function
    })





// End of button click
})


function initMap() {//This serves to call the function into existence
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: sac,
    });
}



function makeMarker(BARNAME,LATLONG,TYPE,URL) {

    console.log("+++++BARNAME,COORD,TYPE,URL++++");
    console.log(BARNAME);
    console.log(LATLONG);
    console.log(TYPE);
    console.log(URL);
    console.log("+++++++++");
        const flightPath = new google.maps.Polyline({
            path: LATLONG,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        
        flightPath.setMap(map);










    for (let j = 0; j < BARNAME.length; j++) {

    contentString[j] = //Sets the string content in modal box to name[3],url[3]
    '<div class="dropdown">' +
    '<button onclick="myFunction()" class="dropbtn">Dropdown</button>' +
    '<div id="myDropdown" class="dropdown-content">' +
    '<a href="#">Link 1</a>' +
    '<a href="#">Link 2</a>' +
    '<a href="#">Link 3</a>' +
    '</div>' +
    '</div>' +
    '<script>' +
    // '/* When the user clicks on the button,' +
    // 'toggle between hiding and showing the dropdown content */' +
    'function myFunction() {' +
    'document.getElementById("myDropdown").classList.toggle("show");' +
    '}'+
    '// Close the dropdown if the user clicks outside of it' +
    'window.onclick = function(event) {' +
    'if (!event.target.matches(".dropbtn")) {' +
    'var dropdowns = document.getElementsByClassName("dropdown-content");' +
    'var i;' +
    'for (i = 0; i < dropdowns.length; i++) {' +
    'var openDropdown = dropdowns[i];' +
    'if (openDropdown.classList.contains("show")) {' +
    'openDropdown.classList.remove("show");' +
    '}'+
    '}'+
    '}'+
    '}'+
    '</script>'+



    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">'+ BARNAME[j] +'</h1>' +
    '<div id="bodyContent">' +
    "<p><b>"+TYPE[j]+"</b>, also referred to as <b>Ayers Rock</b>, is a large " +
    "sandstone rock formation in the southern part of the " +
    "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
    "south west of the nearest large town, Alice Springs; 450&#160;km " +
    "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
    "features of the Uluru - Kata Tjuta National Park. Uluru is " +
    "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
    "Aboriginal people of the area. It has many springs, waterholes, " +
    "rock caves and ancient paintings. Uluru is listed as a World " +
    "Heritage Site.</p>" +
    '<p>Attribution: Uluru, <a href='+ URL[j] +'>' +
    "VISIT US FOR MORE INFO!</a>  " +
    "(last visited June 22, 2009).</p>" +
    "</div>" +
    "</div>";

    console.log(contentString);
    infowindow = new google.maps.InfoWindow(
        {content: contentString[j],}
    );

    //Creates the marker with the a latlong object and the name of the marker
    marker[j] = new google.maps.Marker({
        position: LATLONG[j],
        map,
        title: BARNAME[j],
        icon: "../Images/beer-icon-small.png",
    });
    var lat = marker[j].getPosition().lat();
    var lng = marker[j].getPosition().lng();
    console.log(marker);

    // TODO: Add a button that will save to local storage the lat long and name of brewery
    marker[j].addListener("click", () => {  // Add a click listener for each marker, and set up the info window.
        infowindow.open(map, marker[j]);
        infowindow.close();
        // infowindow.setContent(marker.getTitle()); //Show just the title
        infowindow.open(marker[j].getMap(), marker[j]);
        console.log(infowindow.position.lat()); //Returns the value of : -25.363
    
        localStorage.setItem(j, marker[j]+'++Tom++'+URL);
        localStorage.setItem(BARNAME, TYPE);
        cat = localStorage.getItem('myCat');
        });

    console.log("the marker lat and lng are"+lat+","+lng);
    Markers.push(marker[j])
    // Markers.getMap(map)
    marker[j].setMap(map);

    

        
    }


}

// TODO: Read value of query feed into fetch

// TODO: fetch retrieve crawlCoordinates in an object within an array [{lat:INT , lng:INT },{},{}]
// TODO: Get coordinates,name,url,street,brewery_type,(phone?) used to plan crawl











// https://api.openbrewerydb.org/breweries

// [
//   ...
//   {
//     id: 299,
//     name: "Almanac Beer Company",
//     brewery_type: "micro",
//     street: "651B W Tower Ave",
//     address_2: null,
//     address_3: null,
//     city: "Alameda",
//     state: "California",
//     county_province: null,
//     postal_code: "94501-5047",
//     country: "United States",
//     longitude: "-122.306283180899",
//     latitude: "37.7834497667258",
//     phone: "4159326531",
//     website_url: "http://almanacbeer.com",
//     updated_at: "2018-08-23T23:24:11.758Z",
//     created_at: "2018-08-23T23:24:11.758Z"
//   },
//   ...
// ]