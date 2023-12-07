function initMap() {
  new google.maps.Map(document.getElementById("map"), {
    // mapId: "53c1d93462e7e87b",
    mapId: "69e512c76b5c7143",
    center: { lat: 48.85, lng: 2.35 },
    zoom: 12,
  });
}

function locateCity(){
const city = document.getElementById("name").value;
const rad=document.getElementById("rad").value;

const geocoder = new google.maps.Geocoder();
geocoder.geocode({address: city}, (results, status) => {
  if(status==="OK"){
    //get longtitudes and latitudes of the center
    const centerLocation = results[0].geometry.location;

    // The map, centered at that city
    const myMap = new google.maps.Map(document.getElementById("map"), {
      center: centerLocation,
      zoom: 13,
    });

    // The marker, positioned at that city
    new google.maps.Marker({
      position: results[0].geometry.location,
      map: myMap,
      //title: results[0].name, 
    });

    //call function locateRestaurents()
    locateRestaurants(centerLocation, myMap ,rad);
}else{
alert("Geocode was not successful for the following reason: " + status);
}
});
};


function locateRestaurants(center, map, radius ){
  //access methods of PlacesService class in API Places by creating a instance
  const placesService = new google.maps.places.PlacesService(map);

  //radius and type are adjustable
  const request = {
    location: center,
    radius: radius * 1609.34, // convert radius miles into meters
    type: "restaurant",
  };

  //uses method nearbySearch to search for restaurants nearby
  placesService.nearbySearch(request, (results, status) => {
    if (status==="OK") {
      //results is an array of places, and it holds different properties of different places
      //some properties of the place we use in this case are geometry.location and name
      for (let i = 0; i < results.length; i++){
        const place = results[i];

        console.log(place);

        //Set the marker color to blue
        const blueMarker = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
        const marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          icon: blueMarker,
          title: place.name, 
        });

        const distance = google.maps.geometry.spherical.computeDistanceBetween(request.location, marker.position) / 1609;
        //request.location is similar to center, which is location of chosen location
        //convert meters to miles

        const contentString = 
          `<h1>${marker.getTitle()}</h1>` +
          `<p>Distance frorm your chosen location: ${distance.toFixed(2)} miles</p>`
          //2 decimal points for distance in miles
        ;

        //display information when user clicks the marker
        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          arialabel: marker.getTitle(),
        });
        marker.addListener("click", () => { //action when clicking the marker
          infowindow.open({
            anchor: marker,
            //anchor is like the beginning point
            map,
          })
        });
      }
    }
    else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
};
window.initMap = initMap;
