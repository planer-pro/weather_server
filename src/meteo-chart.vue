
<template lang="pug">
  div.chart
    chart(:chart-data="datacollection")
</template>

<script>
import Chart from "./Chart.js";

import axios from "axios";

export default {
  components: {
    Chart
  },
  data() {
    return {
      datacollection: null
    };
  },
  mounted() {
    // console.log(this);
    this.getHistory();
    setInterval(this.getHistory, 2000);
  },
  methods: {
    getHistory() {
      axios.get("/api/history").then(res => {
        // this.data.datasets[0].data = res.data.temperature;
        // this.data.datasets[1].data = res.data.humidity;
        // console.log(this._chart);

        this.datacollection = {
          datasets: [
            {
              label: "Temp",
              fill: false,
              borderColor: "#f87979",
              data: res.data.temperature
            },
            {
              label: "Hum",
              fill: false,
              borderColor: "#7979f8",
              data: res.data.humidity
            }
          ]
        };
      });
    }
  }
};
</script>

<style>
.chart {
  /* max-width: 80%; */
  margin: 0 20px;
}
</style>