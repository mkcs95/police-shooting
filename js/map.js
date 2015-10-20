// Function to draw your map
var drawMap = function() {

  // Create map and set view
  var map = L.map('map').setView([40, -100], 4)


  // Create a tile layer variable using the appropriate url
  var layer =L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Execute your function to get data
  getData(map)

}

// Function for getting data

var getData = function(map) {
	console.log("In getData");
	$.get('data/response.json',function(data) {
		customBuild(data, map);
	});
	// $.ajax({
 //  		url: ('data/response.json'),
 //  		type: "get",
 //  		success: customBuild(data, map),
 //  		dataType: "json"
	// });


  // Execute an AJAX request to get the data in data/response.js


  // When your request is successful, call your customBuild function

}

	  var victimMale = new L.LayerGroup([]);
    var victimFemale = new L.LayerGroup([]);
    var victimUnknown = new L.LayerGroup([]);
    //var victimHispanic = new L.LayerGroup([]);
    //var victimNotHispanic = new L.LayerGroup([]);


// Loop through your data and add the appropriate layers and points
var customBuild = function(victims, map) {
	// Be sure to add each layer to the map
    var hispanicMale = 0;	
    var notHispanicMale = 0;
    var hispanicFemale = 0; 
    var notHispanicFemale = 0;
    var hispanicUnknown = 0; 
    var notHispanicUnknown = 0;


    victims.forEach(function (victim) {
    	
         if (victim["Victim's Gender"] == "Male")  {
            if (victim["Hispanic or Latino Origin"] == "Hispanic or Latino origin") {
                hispanicMale += 1;
            } else {
                notHispanicMale += 1;
            }
         	var circle = new L.circleMarker([victim["lat"], victim["lng"]], {color: "blue"});
         	circle.addTo(victimMale);
         	circle.bindPopup(victim.Summary + "(" + "link".link(victim["Source Link"]) + ")" );
          }
         else if (victim["Victim's Gender"] == "Female"){
           if (victim["Hispanic or Latino Origin"] == "Hispanic or Latino origin") {
                hispanicFemale += 1;
            } else {
                notHispanicFemale += 1;
            }  
          var circle = new L.circleMarker([victim["lat"], victim["lng"]], {color: "red"});
         	circle.addTo(victimFemale);
         	circle.bindPopup(victim.Summary + "(" + "link".link(victim["Source Link"]) + ")" );
          }
         else {
            if (victim["Hispanic or Latino Origin"] == "Hispanic or Latino origin") {
                hispanicUnknown += 1;
            } else {
                notHispanicUnknown += 1;
            } 
         	var circle = new L.circleMarker([victim["lat"], victim["lng"]], {color: "gray"});
         	circle.addTo(victimUnknown);
         	circle.bindPopup(victim.Summary + "(" + "link".link(victim["Source Link"]) + ")" );
         }

        //else if (victim["Hispanic or Latino Origin"] == "Hispanic or Latino orgin"){  
        // 	layer.addTo(victimHispanic);
        // }
        //else if (victim["Hispanic or Latino Origin"] == "Not of Hispanic or Latino orgin"){  
        // 	layer.addTo(victimNotHispanic);
        //}

    });

    //var members = victimHispanic.getLayers().length;
    //console.log(members);
    var layers = {
    	"Men": victimMale,
    	"Female": victimFemale,
    	"Unknown": victimUnknown
    	//"Hispanic": victimHispanic,
    	//"Not Hispanic":victimNotHispanic
    }
   	L.control.layers(null, layers).addTo(map);


    $("#datapoint").html(hispanicMale);
    $("#datapoint2").html(notHispanicMale);

    $("#coolness").html(hispanicFemale);
    $("#coolness2").html(notHispanicFemale);

    $("#alaska").html(hispanicUnknown);
    $("#alaska2").html(notHispanicUnknown);

}


	// Once layers are on the map, add a leaflet controller that shows/hides layers
  



