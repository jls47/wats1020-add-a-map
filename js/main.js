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


	$(".tab").click(function(e){
		var tabClass = $(this).html().toLowerCase();
		console.log(tabClass);
		
		var active = document.getElementsByClassName("tab-pane fade in active")[0].id;
		console.log(active);
		if(active.toString().includes(tabClass.toString())){
			//window.location.replace("#" + tabClass);
			e.preventDefault();

			var target = this.hash;
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 900, 'swing', function () {
				window.location.hash = target;
			});
			
		}else{
			$(".nav-tabs").find(".active").toggleClass("active");
			$(".nav-tabs").find("#"+tabClass.replace(/i/, "")).toggleClass("active");
			$(".tab-content").find("#" + active).toggleClass("in active");
			$(".tab-content").find("#" + tabClass).toggleClass("in active");
			//window.location.replace("#" + tabClass);
			
			e.preventDefault();

				var target = this.hash;
				var $target = $(target);

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top
				}, 900, 'swing', function () {
				window.location.hash = target;
				});
			
		}
		
		//window.location.href = ("#" + tabClass);
		//window.location.replace("#description");
		
	});
	
	
	
	
	
	
	
	
	
//MAPS	
var topo = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'

}),

satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'
}),

streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2NoYWVmMTYiLCJhIjoiY2l5bDE1aHZ5MDAydTJ3bnpoaWZqbWpkcSJ9.ip2r4oOtxQdBmGDcL7IaWA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'your.mapbox.project.id'
});

var baseMaps = {
	"Topographic": topo,
	"Satellite": satellite,
	"Streets": streets
};

var insPoint = L.marker([46.773421, -121.745159]).bindPopup("Inspiration Point"),
	SVT = L.marker([46.794075, -121.715850]).bindPopup("Stevens-Van Trump Historical Monument"),
	campMuir = L.marker([46.835563, -121.731734]).bindPopup("Camp Muir"),
	paradise = L.marker([46.785022, -121.734545]).bindPopup("Paradise, the closest town to Rainier")

var POIs = L.layerGroup([insPoint, SVT, campMuir, paradise]);
	
var overlayMaps = {
	"POIs": POIs
};

//var mymap = L.map('map-container').setView([46.86, -121.89], 13);
var myMap = L.map('map-container', {
	center: [46.85, -121.78],
	zoom: 11,
	layers: [satellite, POIs]
});

L.control.layers(baseMaps, overlayMaps).addTo(myMap);
});
	
