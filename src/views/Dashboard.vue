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
      <div class="mx-3 my-4">
        <canvas id="humidity-chart"></canvas>
      </div>
      <div class="mx-3 my-4">
        <canvas id="rgb-chart"></canvas>
      </div>
    </div>
    <FooterSection />
  </div>
</template>

<script>
import Navbar from "../layout/Navbar";
import FooterSection from "../layout/FooterSection";
import Chart from "chart.js";
import tempChartData from "../layout/temp-chart-data.js";
import humidityChartData from "../layout/humidity-chart-data.js";
import rgbChartData from "../layout/rgb-chart-data.js";

export default {
  name: "dashboard",
  components: {
    Navbar,
    FooterSection,
  },
  data() {
    return {
      tempChartData: tempChartData,
      humidityChartData: humidityChartData,
      rgbChartData: rgbChartData,
      apiUrl: "http://localhost:3000",
      teadata: {
        temperature: [],
        red: [],
        green: [],
        blue: [],
        humidity: [],
      },
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
    getMultipleTeadata() {
      var teadataResponse;
      fetch(`${this.apiUrl}/api/teadata/multiple?count=3`)
        .then((response) => response.json())
        .then((result) => {
          teadataResponse = JSON.parse(result).teadata;
          this.extractAllData(teadataResponse);
        })
        .catch((error) => console.log("error", error));
    },
    extractAllData(teadataResponse) {
      for (let k = 0; k < teadataResponse.length; k++) {
        const teadataRow = teadataResponse[k];
        this.teadata.temperature.push(teadataRow.temperature);
        this.teadata.humidity.push(teadataRow.humidity);
        this.teadata.red.push(teadataRow.red);
        this.teadata.green.push(teadataRow.green);
        this.teadata.blue.push(teadataRow.blue);
      }
      this.updateAllCharts(this.teadata, true);
    },
    getTeadata() {
      var teadata;
      fetch(`${this.apiUrl}/api/teadata`)
        .then((response) => response.json())
        .then((result) => {
          teadata = JSON.parse(result);
          console.log("teadata", teadata.temperature);
          this.updateAllCharts(teadata, false);
        })
        .catch((error) => console.log("error", error));
      this.watchForTeadata();
    },
    watchForTeadata() {
      setTimeout(() => {
        this.getTeadata();
      }, 360000);
    },
    updateAllCharts(teadata, isMultiple) {
      this.updateChart(
        "temperature-chart",
        this.tempChartData,
        teadata.temperature,
        isMultiple
      );
      this.updateChart(
        "humidity-chart",
        this.humidityChartData,
        teadata.humidity,
        isMultiple
      );
      this.updateRgbChart(teadata.red, teadata.green, teadata.blue, isMultiple);
    },
    updateMultipleValues(chartDataValues, chartDataValue) {
      for (let l = 0; l < chartDataValue.length; l++) {
        chartDataValues.push(chartDataValue[l]);
      }
      return chartDataValues;
    },
    updateChart(chartDataHtmlId, chartData, chartDataValue, isMultiple) {
      // Update Label
      var chartDataLabels = chartData.data.labels;
      chartDataLabels.shift();
      chartDataLabels.push((Number(chartDataLabels[8]) + 6).toString());
      // Update Values
      var chartDataValues = chartData.data.datasets[0].data;
      if (isMultiple) {
        chartDataValues = this.updateMultipleValues(
          chartDataValues,
          chartDataValue
        );
      } else {
        chartDataValues.shift();
        chartDataValues.push(chartDataValue);
      }
      // Rerender Chart
      this.createChart(chartDataHtmlId, chartData);
    },

    updateRgbChart(red, green, blue, isMultiple) {
      // Update Label
      var rgbChartDataLabels = this.rgbChartData.data.labels;
      rgbChartDataLabels.shift();
      rgbChartDataLabels.push((Number(rgbChartDataLabels[8]) + 6).toString());
      // Update Values
      //Red
      var redDataValues = this.rgbChartData.data.datasets[0].data;
      if (isMultiple) {
        redDataValues = this.updateMultipleValues(redDataValues, red);
      } else {
        redDataValues.shift();
        redDataValues.push(red);
      }
      //Green
      var greenDataValues = this.rgbChartData.data.datasets[1].data;
      if (isMultiple) {
        greenDataValues = this.updateMultipleValues(greenDataValues, green);
      } else {
        greenDataValues.shift();
        greenDataValues.push(green);
      }
      //Blue
      var blueDataValues = this.rgbChartData.data.datasets[2].data;
      if (isMultiple) {
        blueDataValues = this.updateMultipleValues(blueDataValues, blue);
      } else {
        blueDataValues.shift();
        blueDataValues.push(blue);
      }
      // Rerender Chart
      this.createChart("rgb-chart", this.rgbChartData);
    },
  },
  mounted() {
    this.createChart("temperature-chart", this.tempChartData);
    this.createChart("humidity-chart", this.humidityChartData);
    this.createChart("rgb-chart", this.rgbChartData);
    this.getMultipleTeadata();
    this.watchForTeadata();
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
