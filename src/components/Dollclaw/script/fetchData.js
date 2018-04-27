export let fetchData = (superagent, that) => {
  superagent
    .get("/proj-assets/dollclaw/data/data.json")
    .then(res => {
      let data = JSON.parse(res.text);

      // setMark(data, color, markers, radius)
      that.setMark(data[2008], "#DC143C", that.markers.o2008, 1500);
      that.setMark(data[2009], "#D2691E", that.markers.o2009, 1500);
      that.setMark(data[2010], "#00008B", that.markers.o2010, 1500);
      that.setMark(data[2011], "#008B8B", that.markers.o2011, 1500);
      that.setMark(data[2012], "#B8860B", that.markers.o2012, 1500);
      that.setMark(data[2013], "#006400", that.markers.o2013, 1500);
      that.setMark(data[2014], "#8B008B", that.markers.o2014, 1500);
      that.setMark(data[2015], "#943126", that.markers.o2015, 1500);
      that.setMark(data[2016], "#8B0000", that.markers.o2016, 1500);
      that.setMark(data[2017], "#8FBC8F", that.markers.o2017, 1500);
      that.setMark(data[2018], "#2F4F4F", that.markers.o2018, 1500);

      data = null;

    })
    .catch(err => {
        console.log(err);
    });

};
