<template>
    <v-container>
        <v-row>
          <div id="graph"></div>
        </v-row>
    </v-container>
</template>
  
  <script>
  import Plotly from 'plotly.js-basic-dist'
  //import { watch } from 'vue';
  
  export default {
    mounted() {
        // 描画領域1
        Plotly.newPlot("graph", this.data.series, this.layout);
        
        setInterval(() => {
            this.data.series[0].y[3] += 1;
            for (let i = 0; i < this.data.series[0].y.length; i++) {
                this.data.series[0].y[i] = Math.random() * 10;
            }
            
            //Plotly.update("graph", this.data, this.layout);
        }, 2000);

    },
    data() {
        return {
            data: {
                series: [
                    {
                        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    }
                ]
            },
            layout: {
                legend : { showlegend : true } 
            },
        };
    },
    watch: {
        'data.series': {
            handler (next) {
                Plotly.redraw("graph", next, this.layout);
            },
            deep: true,
        },   
    },
  }         

 </script>