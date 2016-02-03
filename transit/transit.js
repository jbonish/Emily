var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
			zoom: 10, // The larger the zoom number, the bigger the zoom
			center: me,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;
var scheduleData;
var herjson = new XMLHttpRequest();
jstr = '[{"line":"Blue","name":"Wonderland","latitude":42.41342,"longitude":-70.991648},{"line":"Blue","name":"Revere Beach","latitude":42.40784254,"longitude":-70.99253321},{"line":"Blue","name":"Beachmont","latitude":42.39754234,"longitude":-70.99231944},{"line":"Blue","name":"Suffolk Downs","latitude":42.39050067,"longitude":-70.99712259},{"line":"Blue","name":"Orient Heights","latitude":42.386867,"longitude":-71.004736},{"line":"Blue","name":"Wood Island","latitude":42.3796403,"longitude":-71.02286539},{"line":"Blue","name":"Airport","latitude":42.374262,"longitude":-71.030395},{"line":"Blue","name":"Maverick","latitude":42.36911856,"longitude":-71.03952958},{"line":"Blue","name":"Aquarium","latitude":42.359784,"longitude":-71.051652},{"line":"Blue","name":"State Street","latitude":42.358978,"longitude":-71.057598},{"line":"Blue","name":"Government Center","latitude":42.359705,"longitude":-71.059215},{"line":"Blue","name":"Bowdoin","latitude":42.361365,"longitude":-71.062037},{"line":"Orange","name":"Oak Grove","latitude":42.43668,"longitude":-71.071097},{"line":"Orange","name":"Malden Center","latitude":42.426632,"longitude":-71.07411},{"line":"Orange","name":"Wellington","latitude":42.40237,"longitude":-71.077082},{"line":"Orange","name":"Sullivan","latitude":42.383975,"longitude":-71.076994},{"line":"Orange","name":"Community College","latitude":42.373622,"longitude":-71.069533},{"line":"Orange","name":"North Station","latitude":42.365577,"longitude":-71.06129},{"line":"Orange","name":"Haymarket","latitude":42.363021,"longitude":-71.05829},{"line":"Orange","name":"State Street","latitude":42.358978,"longitude":-71.057598},{"line":"Orange","name":"Downtown Crossing","latitude":42.355518,"longitude":-71.060225},{"line":"Orange","name":"Chinatown","latitude":42.352547,"longitude":-71.062752},{"line":"Orange","name":"Tufts Medical","latitude":42.349662,"longitude":-71.063917},{"line":"Orange","name":"Back Bay","latitude":42.34735,"longitude":-71.075727},{"line":"Orange","name":"Mass Ave","latitude":42.341512,"longitude":-71.083423},{"line":"Orange","name":"Ruggles","latitude":42.336377,"longitude":-71.088961},{"line":"Orange","name":"Roxbury Crossing","latitude":42.331397,"longitude":-71.095451},{"line":"Orange","name":"Jackson Square","latitude":42.323132,"longitude":-71.099592},{"line":"Orange","name":"Stony Brook","latitude":42.317062,"longitude":-71.104248},{"line":"Orange","name":"Green Street","latitude":42.310525,"longitude":-71.107414},{"line":"Orange","name":"Forest Hills","latitude":42.300523,"longitude":-71.113686},{"line":"Red","name":"Alewife","latitude":42.395428,"longitude":-71.142483},{"line":"Red","name":"Davis","latitude":42.39674,"longitude":-71.121815},{"line":"Red","name":"Porter Square","latitude":42.3884,"longitude":-71.119149},{"line":"Red","name":"Harvard Square","latitude":42.373362,"longitude":-71.118956},{"line":"Red","name":"Central Square","latitude":42.365486,"longitude":-71.103802},{"line":"Red","name":"Kendall/MIT","latitude":42.36249079,"longitude":-71.08617653},{"line":"Red","name":"Charles/MGH","latitude":42.361166,"longitude":-71.070628},{"line":"Red","name":"Park Street","latitude":42.35639457,"longitude":-71.0624242},{"line":"Red","name":"Downtown Crossing","latitude":42.355518,"longitude":-71.060225},{"line":"Red","name":"South Station","latitude":42.352271,"longitude":-71.055242},{"line":"Red","name":"Broadway","latitude":42.342622,"longitude":-71.056967},{"line":"Red","name":"Andrew","latitude":42.330154,"longitude":-71.057655},{"line":"Red","name":"JFK/UMass","latitude":42.320685,"longitude":-71.052391},{"line":"Red","name":"North Quincy","latitude":42.275275,"longitude":-71.029583},{"line":"Red","name":"Wollaston","latitude":42.2665139,"longitude":-71.0203369},{"line":"Red","name":"Quincy Center","latitude":42.251809,"longitude":-71.005409},{"line":"Red","name":"Quincy Adams","latitude":42.233391,"longitude":-71.007153},{"line":"Red","name":"Braintree","latitude":42.2078543,"longitude":-71.0011385},{"line":"Red","name":"Savin Hill","latitude":42.31129,"longitude":-71.053331},{"line":"Red","name":"Fields Corner","latitude":42.300093,"longitude":-71.061667},{"line":"Red","name":"Shawmut","latitude":42.29312583,"longitude":-71.06573796},{"line":"Red","name":"Ashmont","latitude":42.284652,"longitude":-71.064489}]';
var locations = JSON.parse(jstr);
var line;
var markerlist = [];


function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	herjson.open("GET", "http://mbtamap.herokuapp.com/mapper/rodeo.json", true);
	herjson.send(null);
	herjson.onreadystatechange = dataReady;
}

function dataReady()
{
	// The readyState numbers:
	// 0 = not initialized
	// 1 = Set up
	// 2 = Sent
	// 3 = In Progress
	// 4 = Complete
	//console.log(herjson.readyState);
	//console.log(herjson.responseText);

	if (herjson.readyState == 4 && herjson.status == 200)
	{
	   scheduleData = JSON.parse(herjson.responseText);
	   getMyLocation();
	} else if (herjson.readyState == 4 && herjson.status == 500)
	{
		alert("MBTA schedule unable to load");
	}
}

function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);

	// Update map and go there...
	map.panTo(me);
	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "I'm here at " + me.lat() + ", " + me.lng()
	});
	marker.setMap(map);


	for (place in locations) {
		if (scheduleData["line"] == locations[place].line.toLowerCase()){
			mark = new google.maps.Marker({
				position: new google.maps.LatLng(locations[place].latitude, locations[place].longitude),
				title: locations[place].name,
				icon: 'strongbad.gif'
			});

			markerlist.push(mark);

			mark.setMap(map);
			var color;
			if (scheduleData["line"] == "red") 
				color = '#FF0000';
			else if (scheduleData["line"] == "orange")
				color = '#FF6600';
			else if (scheduleData["line"] == "blue")
				color = '#0000FF';

			if (place > 0 && scheduleData["line"] == locations[place-1].line.toLowerCase()
				&& locations[place].name != "Savin Hill"){
				line = new google.maps.Polyline({
					path: [mark.position, new google.maps.LatLng(locations[place - 1].latitude, locations[place-1].longitude)],
					strokeWeight: 3,
					strokeColor: color,
    				strokeOpacity: 1.0
				});
				line.setMap(map);
			}
			createWindow(mark, place);
			if (scheduleData["line"] == "red") {
				line = new google.maps.Polyline({
					path: [new google.maps.LatLng(42.320685,-71.052391),
						   new google.maps.LatLng(42.31129,-71.053331)],
					strokeWeight: 3,
					strokeColor: color,
    				strokeOpacity: 1.0
				});
				line.setMap(map);
			}
		}
	}
	find_closest();
}

function find_closest()
{
	Number.prototype.toRad = function() {
   		return this * Math.PI / 180;
	}

	var R = 6371;
	var distance = [];
	var closest = 0;
	for (i in locations) {
		if (locations[i].line.toLowerCase() == scheduleData["line"]) {
			var dLat = (locations[i]["latitude"]-myLat).toRad();
			var dLon = (locations[i]["longitude"]-myLng).toRad();
			var myLatRad = myLat.toRad();
			var othLatRad = locations[i]["latitude"].toRad();

			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		       		Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(myLatRad) * Math.cos(othLatRad);
		    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
			var d = R * c;
			var m = 0.621371 * d;
			distance.push({"distance":m, "title":locations[i]["name"]});
		}
	}

	distance.sort(function(a, b){
		return a["distance"] - b["distance"];
	});



	// Open info window on click of marker
	contentString = marker.title + "<br>" + "Closest station is " + distance[0].distance + 
				    " miles away at " + distance[0].title;
	infowindow.setContent(contentString);
	infowindow.open(map, marker);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(contentString);
		infowindow.open(map, marker);
	});



}
function createWindow(mark, place)
{
	var sdata = [];
	var contentString = '<div id = "title">' + mark.title + '</div><hr id="thr"><br>';
	var dest = [];
	for (i in scheduleData.schedule) {
		for (j in scheduleData.schedule[i].Predictions) {
			if (scheduleData.schedule[i].Predictions[j].Stop == mark.title) {
				sdata.push(scheduleData.schedule[i].Predictions[j]);
				dest.push(scheduleData.schedule[i].Destination)
			}
		}
	}
	
	for (k in sdata) {
		contentString += "Arriving in "
		contentString += String(sdata[k].Seconds) + ' seconds, <br>';
		contentString += "Destination: "
		contentString += String(dest[k]) + "<hr><br id = ntbr>";
	}

	google.maps.event.addListener(mark, 'click', function() {

		infowindow.setContent(contentString);
		infowindow.open(map, mark);
	});
}

