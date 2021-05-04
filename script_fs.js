//1___Wolfram requires and AppID and an input value (planes flying)
AppId = "?appid=4P4QY6-3WWPV8T256"
query = "&i=What+airplanes+are+flying+overhead%3F"
wolfram_url = "http://api.wolframalpha.com/v1/simple" + AppId + query

//2___Youtube's API for frame information and the bloom API with horoscope notation
youtube_url = "https://www.youtube.com/iframe_api"
astro_url = "https://api.bloom.be/api"

//3___xkcd and tumblr???
xkcd_url = "https://xkcd.com/604/info.0.json"
tumblr_url = "https://api.tumblr.com"

// 4___Textpresso How to obtain an access token
// Textpresso API requires authentication for most of its endpoints - i.e., a valid token string must be supplied with the requests.
// Curl Request Example:
// curl -k -d "{\"token\":\"XXXXX\", \"query\": {\"keywords\": \"yeast AND two AND hybrid\", \"year\": \"2017\", \"type\": \"sentence\", \"corpora\": [\"C. elegans\"]}, \"include_sentences\": true}" https://textpressocentral.org:18080/v1/textpresso/api/search_documents
// textpresso = ""

// POST /v1/textpresso/api/search_documents HTTP/1.1
// Host: textpressocentral.org:18080
// Accept: application/json

// {
//    "token": "123456789",
//    "query": {
//       "keywords": "DYN-1",
//       "type": "document",
//       "case_sensitive": false,
//       "sort_by_year": false,
//       "count": 2,
//       "corpora": [
//                     "C. elegans",
//                     "C. elegans Supplementals"
//                  ]
//    }
// }

gaze_url = "wss://cloud.gazerecorder.com"


// Fetch Request
console.log("++URL++")
console.log(wolfram_url)
fetch(wolfram_url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });