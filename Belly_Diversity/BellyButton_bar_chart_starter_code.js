function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var metadata = data.samples;

    console.log("hello");
   
    // 4. Create a variable that filters the samples for the object with the desired sample number.

    var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
    var result = resultArray[0]

    //  5. Create a variable that holds the first sample in the array.

    var firstSample = d3.json("samples.json").then(function(data){
    firstSample = data.metadata[0];
     
    });

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

    var otu_ids = result.otu_ids;
    console.log(otu_ids);

    var otu_labels = result.otu_labels;

    var sample_values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    const array_id = otu_ids;
    ytick = array_id.reverse().slice(0,10).map((x => " otu_id " + x));
            

    // 8. Create the trace for the bar chart. 
  

    var trace = {

     y: [342, 357, 2188, 2110, 340, 2065, 121, 1968, 1960, 2235],

     x: [0, 40, 47, 50, 51, 71, 78, 113, 126, 16],


    
     type: 'bar',
     orientation: 'h'
    };
    var barData = [trace];
    console.log(otu_ids);
    console.log(sample_values);
   
    // 9. Create the layout for the bar chart. 
    var barLayout = {
    title: "Top 10 Bacteria Cultures Found",
    // xaxis: {otu_labels },
    //yaxis: { otu_ids},
     
     };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);  
  });
  }
