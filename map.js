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
    //get longtitudes and latitudes of the center
    const centerLocation = results[0].geometry.location;

    // The map, centered at that city
    const myMap = new google.maps.Map(document.getElementById("map"), {
      center: centerLocation,
      zoom: 12,
    });
    // The marker, positioned at that city
    new google.maps.Marker({
      position: results[0].geometry.location,
      map: myMap,
      //title: results[0].name, 
    });

    //call function locateRestaurents()
    locateRestaurants(centerLocation, myMap);

}else{
alert("Geocode was not successful for the following reason: " + status);
}
});
};

/*This function:
- Find the latitudes and longtitudes of restaurents nearby 2-3 miles of the selected location from locatyCity() function
- Mark all restaurents nearby the selected location

Procedure:
- 
*/
function locateRestaurants(center, map){
  //access methods of PlacesService class in API Places by creating a instance
  const placesService = new google.map.places.PlacesService(map);

  //radius and type are adjustable
  const request = {
    location: center,
    radius: 2 * 1609.34, // convert 2 miles into meters
    type: "restaurant",
  };

  //uses method nearbySearch to search for restaurants nearby
  placesService.nearbySearch(request, (results, status) => {
    if (status==="OK") {
      //results is an array of places, and it holds different properties of different places
      //some properties of the place we use in this case are geometry.location and name
      for (let i = 0; i < results.length; i++){
        const place = results[i];
        new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: place.name, 
        });
      }
    }
    else {
      console.error("Error fetching restaurants:", status);
    }
  });
}
window.initMap = initMap;
