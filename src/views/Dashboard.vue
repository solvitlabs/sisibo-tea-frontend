<template>
  <div id="top">
    <Navbar />
    <div class="mx-3 my-4">
      <div class="mb-3 font-weight-bold">{{ dateToday }}</div>
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
                  <h5>{{ teadataCard.temperature }}&deg;C</h5>
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
                  <h5>
                    {{ teadataCard.image_time.split("T")[0] }}<br />{{
                      teadataCard.image_time.split("T")[1]
                    }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="temperature">
        <div class="charts card py-4 px-3 my-4 shadow-sm">
          <canvas id="temperature-chart"></canvas>
        </div>
      </div>
      <div id="humidity">
        <div class="charts card py-4 px-3 my-4 shadow-sm">
          <canvas id="humidity-chart"></canvas>
        </div>
      </div>
      <div id="rgb">
        <div class="charts card py-4 px-3 my-4 shadow-sm">
          <canvas id="rgb-chart"></canvas>
        </div>
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
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import {bus} from '@/main'

export default {
  name: "dashboard",
  components: {
    Navbar,
    FooterSection,
  },
  data() {
    return {
      dateToday: null,
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
    getDateToday() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      this.dateToday = mm + "/" + dd + "/" + yyyy;
    },
    getLoginInfo() {
      const logininfoStored = JSON.parse(localStorage.getItem("loginInfo"));
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
      fetch(`http://localhost:3000/api/teadata/10`, {
        headers: {
          token: this.loginInfo.id,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          this.teadata = result;
          this.extractMultipleTeadata(this.teadata);
        })
        .catch((error) => console.error(error));
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
      fetch(`http://localhost:3000/api/teadata/`, {
        headers: {
          token: this.loginInfo.id,
        },
      })
        .then((response) => response.json())
        .then((teadata) => {
          this.updateCards(teadata);
          this.updateAllCharts(teadata, false);
        })
        .catch((error) => console.log("error", error));
      this.watchForTeadata();
    },
    watchForTeadata() {
      setTimeout(() => {
        this.getTeadata();
      }, 60000);
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
    refreshAuthToken() {
      setTimeout(() => {
        let token = localStorage.getItem("loginInfo");
        token = JSON.parse(token);
        if (token) {
          fetch("http://localhost:3000/api/tokens", {
            method: "put",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: token.logininfo.id,
              extend: true,
            }),
          })
            .then((response) => {
              if (response.status == 200) {
                console.log("token refreshed successfully", response.status);
              } else {
                throw null;
              }
            })
            .catch(() => this.logout());
        } else {
          this.logout();
        }
      }, 60000);
    },
    logout() {
      let token = JSON.parse(localStorage.getItem("loginInfo"));
      token = token.logininfo;
      token = token.id;
      fetch(`http://localhost:3000/api/tokens/${token}`, {
        method: "delete",
      })
        .then((response) => {
          console.log("session terminated", response.status);
          localStorage.removeItem("loginInfo");
          this.$router.push("/");
        })
        .catch(() => {
          localStorage.removeItem("loginInfo");
          this.$router.push("/");
        });
    },
    generateReport() {
      fetch(`http://localhost:3000/api/teadata/10`, {
        headers: {
          token: this.loginInfo.id,
        },
      })
        .then((response) => response.json())
        .then((teadata) => {
          // Landscape export, 2×4 inches
          const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [8, 4]
          })

          doc.autoTable({
              styles: { fillColor: [245, 245, 245], fontSize: 11 },
              headStyles: { halign: 'center', fillColor: [40, 167, 69], fontStyle: 'bold', font: 'helvetica'},
              bodyStyles: {fontStyle: 'times'},
              head: [
                ['id','process id', 'red', 'green', 'blue', 'green', 'temperature', 'humidity', 'time']
              ],
              body: [
                [`${teadata[0].id}`, `${teadata[0].process_id}`, `${teadata[0].red}`, `${teadata[0].green}`, `${teadata[0].blue}`, `${teadata[0].temperature}`, `${teadata[0].humidity}`, `${teadata[0].image_time}`],
                [`${teadata[1].id}`, `${teadata[1].process_id}`, `${teadata[1].red}`, `${teadata[1].green}`, `${teadata[1].blue}`, `${teadata[1].temperature}`, `${teadata[1].humidity}`, `${teadata[1].image_time}`],
                [`${teadata[2].id}`, `${teadata[2].process_id}`, `${teadata[2].red}`, `${teadata[2].green}`, `${teadata[2].blue}`, `${teadata[2].temperature}`, `${teadata[2].humidity}`, `${teadata[2].image_time}`],
                [`${teadata[3].id}`, `${teadata[3].process_id}`, `${teadata[3].red}`, `${teadata[3].green}`, `${teadata[3].blue}`, `${teadata[3].temperature}`, `${teadata[3].humidity}`, `${teadata[3].image_time}`],
                [`${teadata[4].id}`, `${teadata[4].process_id}`, `${teadata[4].red}`, `${teadata[4].green}`, `${teadata[4].blue}`, `${teadata[4].temperature}`, `${teadata[4].humidity}`, `${teadata[4].image_time}`],
                [`${teadata[5].id}`, `${teadata[5].process_id}`, `${teadata[5].red}`, `${teadata[5].green}`, `${teadata[5].blue}`, `${teadata[5].temperature}`, `${teadata[5].humidity}`, `${teadata[5].image_time}`],
                [`${teadata[6].id}`, `${teadata[6].process_id}`, `${teadata[6].red}`, `${teadata[6].green}`, `${teadata[6].blue}`, `${teadata[6].temperature}`, `${teadata[6].humidity}`, `${teadata[6].image_time}`],
                [`${teadata[7].id}`, `${teadata[7].process_id}`, `${teadata[7].red}`, `${teadata[7].green}`, `${teadata[7].blue}`, `${teadata[7].temperature}`, `${teadata[7].humidity}`, `${teadata[7].image_time}`],
                [`${teadata[8].id}`, `${teadata[8].process_id}`, `${teadata[8].red}`, `${teadata[8].green}`, `${teadata[8].blue}`, `${teadata[8].temperature}`, `${teadata[8].humidity}`, `${teadata[8].image_time}`],
                [`${teadata[9].id}`, `${teadata[9].process_id}`, `${teadata[9].red}`, `${teadata[9].green}`, `${teadata[9].blue}`, `${teadata[9].temperature}`, `${teadata[9].humidity}`, `${teadata[9].image_time}`],
              ],
            })
            doc.autoPrint({variant:'non-conform'})
            doc.save('tea_report.pdf')
        })
        .catch((error) => console.log("error", error));
  },
  },
  created(){
    //  Generate Report
    bus.$on('GenerateReport', ()=>{
      this.generateReport()
    })
  },
  beforeMount() {
    let token = JSON.parse(localStorage.getItem("loginInfo"));
    token = token.logininfo;
    token = token.id;
    if (token) {
      fetch(`http://localhost:3000/api/tokens/${token}`)
        .then((response) => {
          if (!(response.status == 200)) {
            this.logout();
          }
        })
        .catch(() => this.logout());
    } else {
      this.logout();
    }
  },
  mounted() {
    this.getDateToday();
    this.getLoginInfo();
    this.createChart("temperature-chart", this.tempChartData);
    this.createChart("humidity-chart", this.humidityChartData);
    this.createChart("rgb-chart", this.rgbChartData);
    this.getMultipleTeadata();
    this.watchForTeadata();
    this.refreshAuthToken();
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

.charts {
  border-radius: 10px;
  transform: translateY(-0.5rem);
  transition: all 0.4s ease-in-out;
  height: 75vh;
  cursor: pointer;
}
</style>
