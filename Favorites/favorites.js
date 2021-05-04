var favoritesSection = document.querySelector(".favorites-list")
var favorites = JSON.parse(localStorage.getItem("favBreweries")) || []




for (var i=0; i<favorites.length; i++) {
    breweryId = favorites[i];
    var url = "https://api.openbrewerydb.org/breweries/" + breweryId;
    
    fetch(url)
    .then(function(response){
    return response.json();
    })
    .then(function(data){
        var firstDiv = document.createElement('div');
        firstDiv.setAttribute("class", "card");
        

        var secondDiv = document.createElement('div');
        secondDiv.setAttribute("class","card-content")
        firstDiv.appendChild(secondDiv);

        var brewPageLink = document.createElement('a');
        brewPageLink.setAttribute("class", "brewery-page");
        brewPageLink.setAttribute("href", "../Brewery-Search/brewery-page.html?breweryid=" + data.id);
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
        brewName.textContent = data.name;
        headerDiv.appendChild(brewName);

        var infoDiv = document.createElement("div");
        infoDiv.setAttribute("class","content");
        secondDiv.appendChild(infoDiv);

        var ulEl = document.createElement("ul");
        infoDiv.appendChild(ulEl);

        console.log("City: " + data.city)
        console.log("State: " + data.state)

        var brewUrl = data.website_url;

        //if the value for the url is null, don't generate line for it in html
        if(brewUrl === null) {
            console.log(data.website_url);
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

        favoritesSection.appendChild(firstDiv);
    })
}