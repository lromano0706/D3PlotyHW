var demoOutput = d3.select("#sample-metadata");
// made function to call values for data.names to append into drop down menu
var dropMenu = d3.select('#selDataset')d3.json('data/samples.json').then(data => {
data = data[0];
console.log(data);
dropDownlist(data);
buildChart(data.names[0]);
});// called function
function dropDownlist(data) {
data.names.forEach(id => dropMenu.append('option').text(id))
};
a
function optionChanged(id) {
// Event to build new chart when a new ID is selected in the drop down list
console.log('option changed:', id);
buildChart(id);
};function buildChart(id) {
console.log('building chart for ', id);  chart_data = d3.json('data/samples.json').then(data => {
data = data[0];    names = data.names.filter(s => s == id);
metadata = data.metadata.filter(m => m.id == id);
sample = data.samples.filter(s => s.id == id);    // Doesn't work :(
sample[0].sample_values = sample[0].sample_values.map(value => +value);    // The filtered arrays
console.log('filter names: ', names);
console.log('filter metadata: ', metadata);
console.log('filter sample: ', sample);    // each filtered items
console.log('name', names[0]);
console.log('sample', sample[0]);
console.log('metadata', metadata[0]);    // nested properties within the sample and metadata
my_age = metadata[0].age;
my_sample_values = sample[0].sample_values.sort().reverse();
console.log('my_sample_values: ', my_sample_values);    console.log(metadata[0].age);
console.log(sample[0].otu_ids);
console.log(sample[0].sample_values);
console.log(sample[0].otu_labels);  });}