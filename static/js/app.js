var jsonFile = d3.json('data/samples.json')
var dropMenu = d3.select('#selDataset')
  var subjectId = jsonFile.then(function(data){
  data.names.map(function(idNo){
    dropMenu.append('option').text(idNo)
  })
})

