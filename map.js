function getLocation() {
  var locationInput = document.getElementById("locationInput").value;

  if (locationInput.trim() === "") {
      alert("Please enter a location.");
      return;
  }


  geocodeAddress(locationInput, function (error, locationInfo) {
    if (error) {
        document.getElementById("demo").innerHTML = "Error: " + error;
    } else {
        document.getElementById("demo").innerHTML = "Latitude: " + locationInfo.lat + "<br>Longitude: " + locationInfo.lng;

        // Now you can use the obtained latitude and longitude for your purposes (e.g., display on a map).
    }
  });
}

function geocodeAddress(location, callback) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'address': location }, function (results, status) {
      if (status === 'OK') {
          var locationInfo = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
          };
          callback(null, locationInfo);
      } else {
          callback(status, null);
      }
  });
}

function initMap(latitude, longitude) {
    new google.maps.Map(document.getElementById("map"), {
      mapId: "53c1d93462e7e87b",
      center: { lat: latitude, lng: longitude},
      zoom: 12,
    });
  }
  
  window.initMap = initMap;