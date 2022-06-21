// Create the buildChart function.
function buildCharts(sample) {
    // Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    var metadata = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    var metadataArray = data.metadata.filter((sampleObj) => sampleObj.id == sample);
    var metadata1 = metadataArray[0]

    // Create a variable that holds the first sample in the array.
    // 2. Create a variable that holds the first sample in the metadata array.

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = otu_ids;

    var otu_labels = otu_labels;

    var sample_values = sample_values;

    // 3. Create a variable that holds the washing frequency.

    var wfreq = parseFloat(metadata1.wfreq);  
    //var wfreq= parseInt(washing_frequnecy);

    // Create the yticks for the bar chart.

    
    var yticks = otu_ids.slice(0, 10).map(otuID => OTU ${otuID}).reverse()     


    // Use Plotly to plot the bar data and layout.
    //Plotly.newPlot();
    Plotly.newPlot('bar', barData, barLayout);  

    // Use Plotly to plot the bubble data and layout.
    //Plotly.newPlot();
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);


    // 4. Create the trace for the gauge chart.
    var gaugeData = [
    {
    domain: {x: [0,1], y: [0, 1] },
    value: wfreq,
    type: indicator,
    mode: "gauge + number",
    title: {text: "Belly Button Washing Frequency"},
    gauge: {
      axis: { range: [null, 10] },
      steps: [
        {range: [0, 250], color: "black" }
      ] 
    }
  }
  ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 500, height: 500, margin:  { t: 0, b: 0} } ;



    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
