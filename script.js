/** Fetch account info from a public database */
document.getElementById('search-bar').onsubmit=function() {
	// Declare vars
    var feild = document.getElementById('data');  
    var results = document.getElementById('results');
    var result_loading = document.getElementById('result-loading');
    var result_container = document.getElementById('result-container');
    var result_img =document.getElementById('result-img');
    var result_name = document.getElementById('result-name');
    var result_uuid = document.getElementById('result-uuid');

    // Set up the html before loading
    feild.disabled = true;
    results.className = "bg-info";
    results.style.display = "block";
    result_loading.style.display = "block";
    result_container.style.display = "none";

    var request = new XMLHttpRequest();
    request.onload =  function() {
    	// Grab data and assing feilds
        try {
            var response = JSON.parse(request.responseText);
            
            // If error exists throw the message
            if (response.error != null) {
            	throw response.error;
            }

            var base = "https://api.year4000.net/avatar/" + response.name + "/32?hat";

            result_img.src = base;
            result_name.innerHTML = response.name;
            result_uuid.value = response.full_uuid;
            results.className = "bg-success";
            result_loading.style.display = "none";
            result_container.style.display = "block";
        }
        // When error grabing data show dummy
        catch(e) {
            result_img.src = "https://api.year4000.net/avatar/" + feild.value + "/32?hat";
            result_name.innerHTML = feild.value;
            result_uuid.value = "Unknown UUID";
            results.className = "bg-warning";
            result_loading.style.display = "none";
            result_container.style.display = "block";
        }
        finally {
            feild.disabled = false;
        }
    };

    // request.open("GET","https://api.year4000.net/accounts/" + feild.value + "?compact", true);
    request.open("GET","https://mc-api.net/v3/uuid/" + feild.value, true);
    request.send();
    return false;
}

/** Select the text feild */
var highlight = function() {
    this.select();
}

document.getElementById('data').onclick = highlight;
document.getElementById('result-uuid').onclick = highlight;
