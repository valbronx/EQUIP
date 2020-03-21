function myFunction(x) {
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function but() {

var btn = document.createElement("BUTTON");
btn.setAttribute("id", "btn"); 
btn.innerHTML = "Tous / Aucun";  

var parent=document.getElementsByClassName('leaflet-control-layers-overlays')[0];
parent.insertBefore(btn, parent.firstChild);

document.addEventListener('click',function(e){

    if(e.target && e.target.id== 'btn'){

	if(e.target.innerHTML== "Tous / Aucun"){
		e.target.innerHTML="Tous";
		var t=false;
	}else{
		if(e.target.innerHTML== "Tous"){
		e.target.innerHTML="Aucun";
			var t=true;
		}else{
			e.target.innerHTML="Tous";
			var t=false;
		}
	}
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = t;
    }
	checkboxes[0].dispatchEvent(new Event('click'));
	}
 });
 }








function createPopupContent(feature) {
    html ='<div class="popup">';
	if (feature.properties.ActLib=='nan'){
	html+="<b style='text-align:center ;font-size: 1.5em;'>"+feature.properties.categorie+"</b><br><br>"
	}else{	html+="<b style='text-align:center;font-size: 1.5em;'>"+feature.properties.ActLib+"</b><br><br>"};
	if (feature.properties.ActNivLib !='nan'){
		html += '<br><span>Niveau: </span>' + feature.properties.ActNivLib;
	}
	
	html += '<br><span>Ville: </span>' + feature.properties.ComLib;
	html += '<br><span>Nom de l\équipement: </span>' + feature.properties.EquNom;
	if (feature.properties.InsNom){
		html += '<br><span>Nom de l\'installation: </span>' + feature.properties.InsNom;
	}


  html +='<br><div>';
  html += '<button onclick="myFunction(this.parentNode.children[1])">Plus d\'infos </button>';
  html += '<span class="myDIV"    style="display: none;">';
  html += feature.properties.info;
  html += '</span>';

 html +='</div>';
 html +='</div>';
return html; 
}





var mymap = L.map('map1').setView([48.86198,2.33967], 13);



L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

L.control.locate().addTo(mymap);
 
  var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false
}).on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([bbox.getSouthEast(),bbox.getNorthEast(),bbox.getNorthWest(),bbox.getSouthWest()]);
    mymap.fitBounds(poly.getBounds());
  }).addTo(mymap);
  

var parentGroup = new L.markerClusterGroup({
	showCoverageOnHover: false,
	maxClusterRadius:100,
    iconCreateFunction: function(cluster) {
        var digits = (cluster.getChildCount()+'').length;
        return L.divIcon({ 
            html: cluster.getChildCount(), 
            className: 'cluster digits-'+digits,
            iconSize: null 
        });
    }
}).addTo(mymap);
var subs = {};

var  control= L.control.layers(null, null).addTo(mymap);


function fetchit(url){
	
	
	};


function testdata(data) {
	
    var categories = new Set();
    
	for (var i in data.features) {
      var feature = data.features[i];
      categories.add(feature.properties.categorie);
    }
    
    categories.forEach(function(category) {
      var sub=L.featureGroup.subGroup(parentGroup).addTo(mymap);
      var layer = L.geoJSON(data, {
        filter: function(f){ if (f.properties.categorie === category) return true; },
		pointToLayer: function (feature, latlng) {
			 var smallIcon = new L.Icon({
			 iconSize: [27, 27],
			 iconAnchor: [13, 27],
			 popupAnchor:  [1, -24],
			 iconUrl: feature.properties.url_image
			 });
        return L.marker(latlng, {icon: smallIcon}).bindPopup(createPopupContent(feature));
	  }}).addTo(sub);
	control.addOverlay(sub, category);
	
	
  }) 
 
  };  






function concatGeoJSON(arrs){
	var arrf=arrs[0].features;
	var i;
	for (i = 1; i < arrs.length; i++) {
		arrf=arrf.concat(arrs[i].features);
	} ;
	
    return { 
        "type" : "FeatureCollection",
        "features": arrf
    }
}


const success = res => res.ok ? res.json() : Promise.resolve({});

var deps=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
       21, 22, 23, 24, 25, 26, 27, 28, 29, '29', '2A', '2B', '30', 30, 31,
       32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
       49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
       66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
       83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 971, 972, 973,
       974, 975, 976, 977, 978, 986, 987, 988];
	   
var urls=[];
deps.forEach(function(dep){
	urls.push("https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/valbronx/EQUIP/master/cleaning/departements/"+dep.toString()+".geojson");
});
 
	 
var newList=[];
urls.forEach(function(url){

	const j = fetch(url,{
    method: 'GET',
	    dataType: "json",
    contentType: "application/json; charset=iso-8859-1",
    headers: {
      "Content-type": "application/json;charset=iso-8859-1"
    }  }).then(success);
	newList.push(j);
});




getAll = async () => {
Promise.all(newList)
.then((arrs) => {


testdata(concatGeoJSON(arrs));
but();
})
.catch(err => console.error(err));
}


getAll();
