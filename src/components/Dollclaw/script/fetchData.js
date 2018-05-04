export let fetchData = (superagent, that) => {
  superagent
    .get("/proj-assets/dollclaw/data/data.json")
    .then(res => {
      let data = JSON.parse(res.text);

      const markers = that.markers;
      const length = markers.length;

      // setMark(data, color, group, radius)
      for(let i = 0; i < length; i++){
        that.setMark(
          data[markers[i].year], 
          markers[i].color,
          markers[i].group,
          markers[i].radius 
        );
      }

      data = null;
      // that.mapData = data;
      // console.log(that.mapData);

      // return data;

    })
    .catch(err => {
        console.log(err);
    });

};
