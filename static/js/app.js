// made function to call values for data.names to append into drop down menu
var dropMenu = d3.select('#selDataset')
// variable to add to build chart to insert meta data in to Demographic info Card
var demoOutput = d3.select("#sample-metadata");
// variable to add Top 10 Bacteria Cultures Found
var bargraph = d3.select('#bar')

//default plots
d3.json('data/samples.json').then(data => {
  data;
  //printed out for accuarcy
  console.log('item array', data.names);
  dropDownlist(data);
  buildChart(data.names[0]);
  buildBar(data.names[0]);
  buildBubble(data.names[0]);
  myGauge(data.names[0])
});
// called function to append drop down list
function dropDownlist(data) {
  data.names.forEach(id => dropMenu.append('option').text(id));


};

// Function called by DOM changes
function optionChanged(id) {
  // Event to build new chart when a new ID is selected in the drop down list
  console.log('option changed:', id);
  buildChart(id);
  buildBar(id);
  buildBubble(id);
  myGauge(id);
};
// fuction to 
function buildChart(id) {
  console.log('building chart for ', id);
  chart_data = d3.json('data/samples.json').then(data => {
    data;
    names = data.names.filter(s => s == id);
    metadata = data.metadata.filter(m => m.id == id);
    sample = data.samples.filter(s => s.id == id);
    // Test Console log for first value in sample_values
    console.log('first sample_value result in samples', sample[0].sample_values = sample[0].sample_values[0])
    // sample[0].sample_values = samples[0].sample_values.map(value => +value);
    // The filtered arrays
    console.log('filter names: ', names);
    console.log('filter metadata: ', metadata);
    console.log('filter sample: ', sample);
    // each filtered items
    console.log('name', names[0]);
    console.log('sample', sample[0]);
    console.log('metadata', metadata[0]);
    // nested properties within the sample and metadata
    my_age = metadata[0].age;
    my_sample_values = sample[0].sample_values;
    console.log('my_sample_values: ', my_sample_values);
    console.log(metadata[0].age);
    console.log(sample[0].otu_ids);
    console.log(sample[0].sample_values);
    console.log(sample[0].otu_labels);

    // Demographic info section
    // Clears out Demographic Info box
    demoOutput.html('');
    // Push data into demographic info card
    Object.entries(metadata[0]).map(([key, value]) => demoOutput.append('p').text(`${key}: ${value}`))



  });
};



function buildBar(id) {
  d3.json('data/samples.json').then(data => {
    data;
    var myBacteria = data.samples.filter(s => s.id == id)[0];
    console.log('my bacteria selection: ', myBacteria);
    console.log('X values: ', myBacteria.sample_values.slice(0, 10));
    console.log('y values: ', myBacteria.otu_ids.slice(0, 10));
    console.log('text: ', myBacteria.otu_labels.slice(0, 10));

    var trace1 = {
      x: myBacteria.sample_values.slice(0, 10).reverse(),
      y: myBacteria.otu_ids.slice(0, 10).map(otus => `OTU S${otus}`).reverse(),
      text: myBacteria.otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h'
    };

    // Create the data array for the plot
    var data = [trace1];
    // Define the plot layout
    var layout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot('bar', data, layout);
  });
};

function buildBubble(id) {
  d3.json('data/samples.json').then(data => {
    data;
    var myBacteria = data.samples.filter(s => s.id == id)[0];
    console.log('my bacteria selection: ', myBacteria);
    console.log('X values: ', myBacteria.otu_ids);
    console.log('y values: ', myBacteria.sample_values);
    console.log('markers ',myBacteria.otu_labels);

    var trace1 = {
      x: myBacteria.otu_ids,
      y: myBacteria.sample_values,
      mode: 'markers',
      text: myBacteria.otu_labels,

      marker: {
        size: myBacteria.sample_values,
        color: myBacteria.otu_ids,
        

      }
    };

    // Create the data array for the plot
    var data = [trace1];
    // Define the plot layout
    var layout = {
      title: "Bacteria Cultures Per Sample",

    };
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot('bubble', data, layout);
  });
};

function myGauge(id){
  d3.json('data/samples.json').then(data => {
    data;
    var myBacteria = data.metadata.filter(m => m.id == id)[0];
    washFrequency = myBacteria.wfreq;
    console.log(washFrequency);
  var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        type: 'indicator',
        mode: 'gauge',
        value: washFrequency,

        title: {
            text: 'Belly Button Washing Frequency <br><span style="color:grey;">Scrubs per Week</span>',
            
        },
        gauge: {
            axis: { range: [null, 9], tickwidth: 1, tickcolor: 'darkgrey', nticks: 10},
            bar: { color: 'green', thickness: 0.3 },
            bgcolor: 'white',
            borderwidth: 01,
            bordercolor: 'black',
            

            axes: [{
                pointers: [{
                    type: 'Marker',
                    markerType: 'Circle'
                }]
            }],
            steps: [
              { range: [0, 1], color: '#f4f8f8' },
              { range: [1, 2], color: '#E9F2F2' },
              { range: [2, 3], color: '#D4E6E5' },
              { range: [3, 4], color: '#BED9D8'},
              { range: [4, 5], color: '#A8CCCD' },
              { range: [5, 6], color: '#92BFC0' },
              { range: [6, 7], color: '#7BB4B3' },
              { range: [7, 8], color: '#64A6A6' },
              { range: [8, 9], color: '#4B9A9A' }
          ],                      
          threshold: {
            line: { color: "purple", width: 4 },
            thickness: 0.75,
            value: washFrequency
          }
        },
    },
];
// Layout 
var layout = {
    width: 440,
    height: 360,
    margin: { t: 35, r: 15, l: 15, b: 0 },
    font: { color: 'black', family: 'Arial' }
};
// Render the plot to the div tag with id 'gauge'
Plotly.newPlot('gauge', data, layout);
});
};
