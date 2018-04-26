export let fetchData = (superagent, that) => {
  superagent
    .get("/proj-assets/dollclaw/data/o2008.json")
    .then(res => {
      const data = JSON.parse(res.text);
      that.setMark(data, "#943126", that.markers.o2008, 2000);
      that.storeData(that.data.o2008, data);
    })
    .catch(err => {
        that.getDataFail(err);
    });

  superagent
    .get("/proj-assets/dollclaw/data/o2009.json")
    .then(res => {
      const data = JSON.parse(res.text);
      that.setMark(data, "#0abab5", that.markers.o2009, 6000);
      that.storeData(that.data.o2009, data);
    })
    .catch(err => {
        that.getDataFail(err);
    });
};
