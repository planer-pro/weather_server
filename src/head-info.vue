<template lang='pug'>
  ul
    li Time: {{time}}
    li Temperature: {{temperature}} degrees
    li Humidity: {{humidity}} %
    li Pressure: {{pressure}} hPa
    li Altitude: {{altitude}} m
</template>


<script>
export default {
  data() {
    return {
      time: 35,
      temperature: 125,
      humidity: 75,
      pressure: 990,
      altitude: 220
    };
  }
};
</script>

<style>
ul {
  list-style-type: none;
}
</style>