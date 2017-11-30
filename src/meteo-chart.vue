
<template lang="pug">
  div.chart
    chart(:chart-data="datacollection" :height="300" :width="1200")
</template>

<script>
import Chart from "./chart.js";

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
    this.getHistory();
    setInterval(this.getHistory, 300000);//5min request
  },
  methods: {
    getHistory() {
      axios.get("/api/history").then(res => {
        this.datacollection = {
          datasets: [
            {
              label: "Temp",
              fill: false,
              borderColor: '#EF5350',
              data: res.data.temp
            },
            {
              label: "Hum",
              fill: false,
              borderColor: '#536DFE',
              data: res.data.hum
            },
            {
              label: "Press",
              fill: false,
              borderColor: '#A5D6A7',
              data: res.data.press
            },
            {
              label: "Alt",
              fill: false,
              borderColor: '#FFF59D',
              data: res.data.alt
            }
          ]
        };
      });
    }
  }
};
</script>

<style>

</style>