//fetch map data
export const fetchData = (superagent, that) => {
  superagent
    .get("/proj-assets/dollclaw/data/data.json")
    .then(res => {
      let data = JSON.parse(res.text);

      const markers = that.markers;
      const length = markers.length;

      // setMark(data, color, group, radius, map)
      for(let i = 0; i < length; i++){
        that.setMark(
          data[markers[i].year], 
          markers[i].color,
          markers[i].group,
          markers[i].radius,
          that.map
        );
      }

      data = null;

    })
    .catch(err => {
        console.log(err);
    });

};

//set map marker (circle)
export const setMark = (data, color, group, radius, map) => {
  const dataLength = data.length;

  for (let i = 0; i < dataLength; i++) {

    const position = {
      lat: data[i].location.lat,
      lng: data[i].location.lng
    };

    // init and store marker
    group.push(
      //circle mark
      new google.maps.Circle({
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map: map,
        center: position,
        radius: radius
      })
    );
  }
}

//toggle marker visibility
export const toggleMarker = (group, state) => {
  if (state) {
    group.forEach(element => {
      //hide marker
      element.setOptions({
        strokeOpacity: 0,
        fillOpacity: 0
      });

    });       
  } else {
    group.forEach(element => {
      //show marker
      element.setOptions({
        strokeOpacity: 0.8,
        fillOpacity: 0.35
      });
    });   
  }
}

//init google map
export const initMap = (that) => {
  //map center
  const mapcenter = { lat: 23.740611, lng: 121.001421 };

  //map option
  const mapOptions = {
    zoom: 8,
    center: mapcenter
  };

  //set map
  that.map = new google.maps.Map(
    document.getElementById("mapContent"),
    mapOptions
  );
}

//set markers radius
export const setMarkerRadius = (group, radius) => {
  group.forEach(element => {
    element.setRadius(radius);
  });
}

//remove marker from map
export const removeMarker = (group) => {
  group.forEach(element => {            
    element.setMap(null);
  });
  group = [];
}