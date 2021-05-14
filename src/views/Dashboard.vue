<template>
  <div>
    <Navbar />
    <div class="mx-3 my-4">
      <div class="mb-3 font-weight-bold">23rd January, 2021</div>
      <div class="row flex-row flex-nowrap" id="cust-card-row">
        <div
          v-for="(teadataCard, teadataCardIndex) in teadata"
          :key="teadataCardIndex"
          class="shadow-sm cust-card ml-3 mr-3 mb-3"
        >
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
                  <h5>{{ teadataCard.temperature }}C</h5>
                </div>
                <div>
                  <div>Humidity</div>
                  <h5>{{ teadataCard.humidity }}</h5>
                </div>
              </div>
              <div class="d-flex flex-row">
                <div class="mr-3">
                  <div>ExpectedTime</div>
                  <h5>14:56:30</h5>
                </div>
                <div>
                  <div>SnapshotTime</div>
                  <h5>{{ teadataCard.image_time }}</h5>
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
      loginInfo: null,
      tempChartData: tempChartData,
      humidityChartData: humidityChartData,
      rgbChartData: rgbChartData,
      teadata: null,
      teadataExtracted: {
        temperature: [],
        red: [],
        green: [],
        blue: [],
        humidity: [],
      },
    };
  },
  methods: {
    getAuthToken() {
      const logininfoStored = JSON.parse(localStorage.getItem("logininfo"));
      this.loginInfo =
        logininfoStored == null ? null : logininfoStored.logininfo;
    },
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
      fetch(`/api/teadata/${this.loginInfo.employeeid}/10`, {
        headers: {
          token: this.loginInfo.id,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          this.teadata = result;
          this.extractMultipleTeadata(this.teadata);
        })
        .catch((error) => console.log("error", error));
    },
    extractMultipleTeadata(teadataResponse) {
      for (let k = 0; k < teadataResponse.length; k++) {
        const teadataRow = teadataResponse[k];
        this.teadataExtracted.temperature.push(teadataRow.temperature);
        this.teadataExtracted.humidity.push(teadataRow.humidity);
        this.teadataExtracted.red.push(teadataRow.red);
        this.teadataExtracted.green.push(teadataRow.green);
        this.teadataExtracted.blue.push(teadataRow.blue);
      }
      this.updateAllCharts(this.teadataExtracted, true);
    },
    getTeadata() {
      var teadata;
      fetch(`/api/teadata/${this.loginInfo.employeeid}`, {
        headers: {
          token: this.loginInfo.id,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          teadata = JSON.parse(result);
          this.updateCards(teadata);
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
    updateCards(teadata) {
      this.teadata.shift();
      this.teadata.push(teadata);
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
    updateMultipleDataValues(chartDataValues, chartDataValue) {
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
        chartDataValues = this.updateMultipleDataValues(
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
        redDataValues = this.updateMultipleDataValues(redDataValues, red);
      } else {
        redDataValues.shift();
        redDataValues.push(red);
      }
      //Green
      var greenDataValues = this.rgbChartData.data.datasets[1].data;
      if (isMultiple) {
        greenDataValues = this.updateMultipleDataValues(greenDataValues, green);
      } else {
        greenDataValues.shift();
        greenDataValues.push(green);
      }
      //Blue
      var blueDataValues = this.rgbChartData.data.datasets[2].data;
      if (isMultiple) {
        blueDataValues = this.updateMultipleDataValues(blueDataValues, blue);
      } else {
        blueDataValues.shift();
        blueDataValues.push(blue);
      }
      // Rerender Chart
      this.createChart("rgb-chart", this.rgbChartData);
    },
  },
  mounted() {
    this.getAuthToken();
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
