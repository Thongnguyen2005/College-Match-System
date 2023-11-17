
// shows the map
function initMap() {
    new google.maps.Map(document.getElementById("map"), {
      mapId: "53c1d93462e7e87b",
      center: { lat: 48.85, lng: 2.35 }, // how to set the location
      zoom: 12,  // set the zoom
    });
  }
  

  // find the lat and lng of for the center of the initMap function
  function locateCity(){
    const city = document.getElementById("name").value;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: city}, (results, status) => {
      // check if the lat and lng have been found
      if(status==="OK"){
        // The map, centered at that city and replace the previse map
        const myMap = new google.maps.Map(document.getElementById("map"), {
          center: results[0].geometry.location,
          zoom: 12,
        });
        // The marker, positioned at that city
        new google.maps.Marker({
          position: results[0].geometry.location,
          map: myMap,
        });
  
        // if not would be give you a alart on the page that it does not found the location
  }else{
    alert("Geocode was not successful for the following reason: " + status);
  }
    });
  };


  window.initMap = initMap;

  //-----------------------------------------
  // it does not found the information for lat and lng
  // the if statement does not work and give you and error

