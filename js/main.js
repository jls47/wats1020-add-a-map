/* Begin by adding your on ready handler here, and then create the
   rest of your functions inside the on ready handler.

   (Note that you do not need to manually call Bootstrap functions in
   your Javascript because Bootstrap will automatically recognize your
   HTML structures and invoke the proper JS code accordingly. Be sure
   to reference the Bootstrap documentation.)
*/

// TODO: Inside of your on ready handler, invoke the Leaflet.js library
// to draw a map in your `#map-container` div.

// TODO: Add 2 layers to your map you have visuals. Use the Open Street Maps
// tiles served through the MapQuest CDN. Consult this example to set up
// the map tiles layers:


// TODO: Customize that Map to show markers with popups at no fewer than 3
// interesting locations. (You'll need to figure out the latitude/longitude for
// these locations using a mapping tool such as Google Maps.)
$(document).ready(function(){
//tab navigation

	//upon clicking the bootstrap tabs:
	$(".tab").click(function(e){
		//grab the tab's inner html
		var tabClass = $(this).html().toLowerCase();
		
		console.log(tabClass);
		//grabbing the active tab's inner html
		var active = document.getElementsByClassName("tab-pane fade in active")[0].id;
		console.log(active);
		
		//if the active tab includes the html of the clicked tab:
		if(active.toString().includes(tabClass.toString())){
			//do not scroll by default
			e.preventDefault();
			
			//smooth scroll!
			var target = this.hash;
			console.log("target" + target);
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 900, 'swing', function () {
				window.location.hash = target;
			});
			//at a rate of 900.
		}else{
			//If the active tab does not include the html of the clicked tab,
			//turn off the "active" class in the current active tab
			$(".nav-tabs").find(".active").toggleClass("active");
			//turn onn the "active" class in the new active tab
			$(".nav-tabs").find("#"+tabClass.replace(/i/, "")).toggleClass("active");
			//find the tab content and switch it to "in active" from the old one!
			$(".tab-content").find("#" + active).toggleClass("in active");
			$(".tab-content").find("#" + tabClass).toggleClass("in active");
			//window.location.replace("#" + tabClass);
			
			//don't regular scroll,
			e.preventDefault();

				var target = this.hash;
				var $target = $(target);
				
				//smooth scroll!
				
				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 900, 'swing', function () {
				window.location.hash = target;
				});
			
		}
	
	});
	
	
	
	
	
	
	
	
	
//MAPS	

//including the topographic layer:
var topo = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'

}),

//and the satellite layer:
satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'
}),

//and the street layer:
streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'
});

//put them all into an object to be included into the map:
var baseMaps = {
	"Topographic": topo,
	"Satellite": satellite,
	"Streets": streets
};

//including the points of interest with coordinates and popups!
var insPoint = L.marker([46.773421, -121.745159]).bindPopup("Inspiration Point"),
	SVT = L.marker([46.794075, -121.715850]).bindPopup("Stevens-Van Trump Historical Monument"),
	campMuir = L.marker([46.835563, -121.731734]).bindPopup("Camp Muir: First night"),
	ingGlacier = L.marker([46.838465, -121.712035]).bindPopup("Ingraham Glacier campsite: Second night")
	paradise = L.marker([46.785022, -121.734545]).bindPopup("Paradise, the closest town to Rainier")
	summit = L.marker([46.8523, -121.7603]).bindPopup("Mt Rainier's Summit")

//putting them all into a layer group
var POIs = L.layerGroup([insPoint, SVT, campMuir, ingGlacier, paradise, summit]);
	
//and then an overlay!
var overlayMaps = {
	"POIs": POIs
};

//finally, establishing the map container at map-container, with the satellite layer and POIs loaded by default
var myMap = L.map('map-container', {
	center: [46.85, -121.78],
	zoom: 11,
	layers: [satellite, POIs]
});

//and adding in layers to be switched between.
L.control.layers(baseMaps, overlayMaps).addTo(myMap);



});
	
