// Made variable for json call for data
var jsonFile = d3.json('data/samples.json')
var demoOutput = d3.select("#sample-metadata");
// made function to call values for data.names to append into drop down menu
function dropDownlist(){
var dropMenu = d3.select('#selDataset')
jsonFile.then(data => {
  data.names.forEach(id => dropMenu.append('option').text(id))
  
});
};


// called function




















dropDownlist();