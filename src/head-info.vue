<template lang='pug'>
  ul
    li Time: {{meteo.time}}
    li Temperature: {{meteo.temperature}} degrees
    li Humidity: {{meteo.humidity}} %
    li Pressure: {{meteo.pressure}} hPa
    li Altitude: {{meteo.altitude}} m
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      meteo: {
        time: 0,
        temperature: 0,
        humidity: 0,
        pressure: 0,
        altitude: 0
      }
    };
  },
  mounted() {
    setInterval(this.getInfo, 2000);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios.get("/api/meteo").then(res => {
        //console.log(res.data);
        this.meteo = res.data;
      });
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
}
</style>