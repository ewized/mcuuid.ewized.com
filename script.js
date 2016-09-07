/** Fetch account info from a public database */
document.getElementById('search-bar').onsubmit = function() {
    // Declare vars
    var feild = document.getElementById('data');  
    var results = document.getElementById('results');
    var result_loading = document.getElementById('result-loading');
    var result_container = document.getElementById('result-container');
    var result_img =document.getElementById('result-img');
    var result_name = document.getElementById('result-name');
    var result_uuid = document.getElementById('result-uuid');
    var nameSearch = feild.value.split("-").length == 5;

    // Set up the html before loading
    feild.disabled = true;
    results.className = "bg-info";
    results.style.display = "block";
    result_loading.style.display = "block";
    result_container.style.display = "none";

    var request = new XMLHttpRequest();
    request.onload = function() {
        // Grab data and assing feilds
        try {
            var response = JSON.parse(request.responseText);
            // If error exists throw the message
            if (response.code != null) {
                throw response.msg;
            }
            result_img.src = "https://api.year4000.net/avatar/" + response.uuid + "?size=32";
            result_name.innerHTML = response.name;
            result_uuid.value = response.uuid;
            results.className = "bg-success";
            result_loading.style.display = "none";
            result_container.style.display = "block";
        } catch(e) { // When error grabing data show dummy
            result_img.src = "https://api.year4000.net/avatar/" + feild.value + "?size=32";
            result_name.innerHTML = !nameSearch ? feild.value : "Unknown Name";
            result_uuid.value = nameSearch ? feild.value : "Unknown UUID";
            results.className = "bg-warning";
            result_loading.style.display = "none";
            result_container.style.display = "block";
        } finally {
            feild.disabled = false;
        }
    };

    request.open("GET", "https://api.year4000.net/minecraft/" + feild.value, true);
    request.send();
    return false;
}

/** Select the text feild */
var highlight = function() {
    this.select();
}

document.getElementById('data').onclick = highlight;
document.getElementById('result-uuid').onclick = highlight;
