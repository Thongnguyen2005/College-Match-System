function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    mapId: "53c1d93462e7e87b",
    center: { lat: 48.85, lng: 2.35 },
    zoom: 12,
  });
}
function locateCity(){
const city = document.getElementById("name").value;
const geocoder = new google.maps.Geocoder();
geocoder.geocode({address: city}, (results, status) => {
  if(status==="OK"){
    // The map, centered at that city
    const myMap = new google.maps.Map(document.getElementById("map"), {
      center: results[0].geometry.location,
      zoom: 12,
    });
    // The marker, positioned at that city
    new google.maps.Marker({
      position: results[0].geometry.location,
      map: myMap,
    });

}else{
alert("Geocode was not successful for the following reason: " + status);
}
});
};

window.initMap = initMap;

