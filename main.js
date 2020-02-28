// constant variables - will not change. address to the API.
const _ENDPOINT = "https://www.dnd5eapi.co/api/";
const _SPELLS = "spells/?name="

// search function. takes the text from the search box when the button is clicked,
// then calls the API's search function, passing in the text from the search box
// as a parameter.
// then calls displayResults function to render the results.
function search() {
    // an xhr object. this will contact the uri that's passed in to it,
    // and give you back the results that the API sends.
    var xhttp = new XMLHttpRequest();
    
    // grab text from the search box on the html page
    let search_string = document.getElementById("search_string").value;

    // construct the API search string. for example, this will resolve to:
    // http://www.dnd5eapi.co/api/spells/?name=magic
    // if magic is typed into the search box.
    let uri = _ENDPOINT + _SPELLS + search_string;

    // asks the xhttp object to get the data from our uri variable
    xhttp.open("GET", uri, true);

    // finalises the request
    xhttp.send();
    
    // this function waits until the data has been returned, then
    // calls the displayResults function, which takes the results
    // as a parameter
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            displayResults(xhttp.responseText);
        }
    };
}

// turns the results string into a json object so we can access the fields
// then we create some html as a string
// we insert it into the html page
function displayResults(response) {
    // convert results string into js object
    response = JSON.parse(response);
    
    // create empty string
    let string = "";

    // loop through each result object
    for (let i = 0; i < response.results.length; i++) {
        // add to string
        // create a div for this object
        string += "<div>";
        // create a header for the object's name
        string += "<h1>" + response.results[i].name + "</h1>";
        // create a paragraph showing the index info
        string += "<p>" + response.results[i].index + "</p>";
        // create a href link for the uri that's associated with this object
        string += "<a href=\"https://www.dnd5eapi.co" + response.results[i].url + "\">Click Here for More</a>";
        // close the div we opened on line 52
        string += "</div>";
    }

    // take our empty html div from index.html page,
    // and insert the string we just constructed into it
    document.getElementById("search_results").innerHTML = string;
}