import HeadInfo from "./head-info"
import MeteoChart from "./meteo-chart"

var app = new Vue({
    el: '#app',
    data: {},
    components: {
        "head-info": HeadInfo,
        "meteo-chart": MeteoChart
    }
})