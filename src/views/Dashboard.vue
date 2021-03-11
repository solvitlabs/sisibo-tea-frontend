<template>
  <div>
    <Navbar />
    <div class="mx-3 my-4">
      <div class="mb-3 font-weight-bold">23rd January, 2021</div>
      <div class="row flex-row flex-nowrap" id="cust-card-row">
        <div class="shadow-sm cust-card ml-3 mr-3 mb-3">
          <div>
            <img
              class="card-img-top"
              src="../assets/images/logo.jpg"
              alt="Card image cap"
            />
            <div class="py-2 px-4">
              <div class="d-flex flex-row">
                <div class="mr-3">
                  <div>Temperature</div>
                  <h5>20C</h5>
                </div>
                <div>
                  <div>Humidity</div>
                  <h5>20C</h5>
                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="mr-3">
                  <div>ExpectedTime</div>
                  <h5>14:56:30</h5>
                </div>
                <div>
                  <div>SnapshotTime</div>
                  <h5>14:16:30</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shadow-sm cust-card mr-3 mb-3">
          <div>
            <img
              class="card-img-top"
              src="../assets/images/logo.jpg"
              alt="Card image cap"
            />
            <div class="py-2 px-4">
              <div class="d-flex flex-row">
                <div class="mr-3">
                  <div>Temperature</div>
                  <h5>20C</h5>
                </div>
                <div>
                  <div>Humidity</div>
                  <h5>20C</h5>
                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="mr-3">
                  <div>ExpectedTime</div>
                  <h5>14:56:30</h5>
                </div>
                <div>
                  <div>SnapshotTime</div>
                  <h5>14:16:30</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shadow-sm cust-card mr-3 mb-3">
          <div>
            <img
              class="card-img-top"
              src="../assets/images/logo.jpg"
              alt="Card image cap"
            />
            <div class="py-2 px-4">
              <div class="d-flex flex-row">
                <div class="mr-3">
                  <div>Temperature</div>
                  <h5>20C</h5>
                </div>
                <div>
                  <div>Humidity</div>
                  <h5>20C</h5>
                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="mr-3">
                  <div>ExpectedTime</div>
                  <h5>14:56:30</h5>
                </div>
                <div>
                  <div>SnapshotTime</div>
                  <h5>14:16:30</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-3 my-4">
        <canvas id="temperature-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../layout/Navbar";
import Chart from "chart.js";
import tempChartData from "../layout/chart-data.js";

export default {
  name: "dashboard",
  components: {
    Navbar,
  },
  data() {
    return {
      tempChartData: tempChartData,
    };
  },
  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
      myChart;
    },
  },
  mounted() {
    this.createChart("temperature-chart", this.tempChartData);
  },
};
</script>

<style scoped>
#cust-card-row {
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}

.cust-card {
  width: 20rem;
  border-radius: 5px;
}

.cust-card-body {
  white-space: normal;
}
</style>
