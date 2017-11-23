import HeadInfo from "./head-info"
import Chart from "./chart"

var app = new Vue({
    el: '#app',
    data: {},
    components: {
        "head-info": HeadInfo,
        "chart": Chart
    }
})