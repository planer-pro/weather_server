
<template lang="pug">
  div.chart
    chart(:chart-data="datacollection")
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
    setInterval(this.getHistory, 4000);
  },
  methods: {
    getHistory() {
      axios.get("/api/history").then(res => {
        this.datacollection = {
          datasets: [
            {
              label: "Temp",
              fill: false,
              borderColor: "#f87979",
              data: res.data.temp
            },
            {
              label: "Hum",
              fill: false,
              borderColor: "#7979f8",
              data: res.data.hum
            },
            {
              label: "Press",
              fill: false,
              borderColor: "#797968",
              data: res.data.press
            },
            {
              label: "Alt",
              fill: false,
              borderColor: "#a9032f",
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