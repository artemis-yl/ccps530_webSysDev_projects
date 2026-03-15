$(document).ready(function(){
    // Requirement #4.2 : "Download JSON object directly from URL if you know how"
    const jsonURL = "https://raw.githubusercontent.com/tofighi/dataset/main/big-data/web/car.json";
    
    // Requirement #3 : "AJAX calls with JQuery can be used to consume the JSON"
    $.getJSON(jsonURL, function(data) {
        //console.log(data);

        // update the car model and year
        $("#car-model").text(data.name);
        $("#car-year").text(data.year);

        // update the car image
        $("#car-image").replaceWith("<img src='" + data.imageURL + "' class='img-fluid'>");
        
        // update engine info
        $("#engine-type-info").text(data.engine.type);
        $("#engine-config-info").text(data.engine.configuration);
        $("#engine-size-info").text(data.engine.size);
        
        // update brake info
        $("#brake-front-info").text(data.brakes.front);
        $("#brake-back-info").text(data.brakes.back);
    });
});