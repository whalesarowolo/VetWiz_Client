

window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        animationEnabled: true,
        title:{
            text: "Farmers Value Chain Data Analysis"
        },
        legend:{
            cursor: "pointer",
            itemclick: explodePie
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}: <strong>{y}</strong>",
            indexLabel: "{name}",
            dataPoints: [
                { y: 12460, name: "Rice Farmers", exploded: true },
                { y: 9039, name: "Sorghum Farmers" },
                { y: 7046, name: "Tomatoes Farmers" },
                { y: 8697, name: "Groundnut Farmers" },
                { y: 2054, name: "Sheep Farmers" },
                { y: 3096, name: "Goat Farmers" },
                { y: 2045, name: "Cattle Farmers" },
                { y: 3059, name: "Pig Farmers" },
                { y: 2059, name: "Poultry Farmers" },
            ]
        }]
    });
    chart.render();
    }
    
    function explodePie (e) {
        if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
        } else {
            e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
        }
        e.chart.render();
    
    }