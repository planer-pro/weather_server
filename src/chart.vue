


<script>
import { Line } from "vue-chartjs";
// import Bar from "../node_modules/vue-chartjs/es/BaseCharts/Bar.js";

export default {
  extends: Line,
  mounted() {
    // Переопределение базового рендер метода с реальными данными.
    this.renderChart(
      {
        datasets: [
          {
            label: "Temp",
            fill: false,
            borderColor: "#f87979",
            data: [
              {
                x: new Date(2017, 1, 1, 1),
                y: 1
              },
              {
                t: new Date(2017, 1, 1, 2),
                y: -30
              },
              {
                t: new Date(2017, 1, 1, 3),
                y: 7
              },
              {
                t: new Date(2017, 1, 2, 7),
                y: 30
              }
            ]
          },
          {
            label: "Hum",
            fill: false,
            borderColor: "#7979f8",
            data: [
              {
                x: new Date(2017, 1, 1, 1),
                y: 2
              },
              {
                t: new Date(2017, 1, 1, 2),
                y: 4
              },
              {
                t: new Date(2017, 1, 1, 3),
                y: 90
              },
              {
                t: new Date(2017, 1, 2, 7),
                y: 3
              }
            ]
          }
        ]
      },
      {
        drawOnChartArea: false,
        scales: {
          xAxes: [
            {
              type: "time"
            }
          ]
        }
      }
    );
  }
};
</script>