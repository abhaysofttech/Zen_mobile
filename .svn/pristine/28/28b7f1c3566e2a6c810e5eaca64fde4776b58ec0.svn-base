import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

const solutionData = {
  "chart": {
    "caption": "Solution",
    "xAxisname": "Quarter",
    "yAxisName": "Rating",
    "yAxisMaxValue": "5",
    "yAxisMinValue": "0",
    "adjustDiv": "0",
    "numDivLines": "9",
    "baseFontColor": "#333333",
    "baseFont": "Helvetica Neue,Arial",
    "captionFontSize": "14",
    "subcaptionFontSize": "14",
    "subcaptionFontBold": "0",
    "bgColor": "#FFFFCC",
    "showShadow": "0",
    "canvasBgColor": "#ffffff",
    "canvasBorderAlpha": "0",
    "divlineAlpha": "100",
    "divlineColor": "#999999",
    "divlineThickness": "1",
    "divLineIsDashed": "1",
    "divLineDashLen": "1",
    "divLineGapLen": "1",
    "usePlotGradientColor": "0",
    "showplotborder": "0",
    "valueFontColor": "#ffffff",
    "placeValuesInside": "0",
    "showHoverEffect": "1",
    "rotateValues": "1",
    "showXAxisLine": "1",
    "xAxisLineThickness": "1",
    "xAxisLineColor": "#999999",
    "showAlternateHGridColor": "0",
    "legendBgAlpha": "0",
    "legendBorderAlpha": "0",
    "legendShadow": "0",
    "legendItemFontSize": "10",
    "legendItemFontColor": "#666666",
    "showValues": "0",
    "showBorder": "1",
    "borderThickness": "4",
    "borderAlpha": "50",
    "borderColor": "#000000"
  },
  "categories": [
    {
      "category": []
    }
  ],
  "dataset": [
    {
      "seriesname": "",
      "data": [
        {
          "value": ""
        },
        {
          "value": ""
        },
        {
          "value": ""
        }]
    }
  ]
};

const technicalData = {
  "chart": {
    "caption": "Technical",
    "xAxisname": "Quarter",
    "yAxisName": "Rating",
    "yAxisMaxValue": "5",
    "yAxisMinValue": "0",
    "adjustDiv": "0",
    "numDivLines": "9",
    "baseFontColor": "#333333",
    "baseFont": "Helvetica Neue,Arial",
    "captionFontSize": "14",
    "subcaptionFontSize": "14",
    "subcaptionFontBold": "0",
    "bgColor": "#FFFFCC",
    "showShadow": "0",
    "canvasBgColor": "#ffffff",
    "canvasBorderAlpha": "0",
    "divlineAlpha": "100",
    "divlineColor": "#999999",
    "divlineThickness": "1",
    "divLineIsDashed": "1",
    "divLineDashLen": "1",
    "divLineGapLen": "1",
    "usePlotGradientColor": "0",
    "showplotborder": "0",
    "valueFontColor": "#ffffff",
    "placeValuesInside": "0",
    "showHoverEffect": "1",
    "rotateValues": "1",
    "showXAxisLine": "1",
    "xAxisLineThickness": "1",
    "xAxisLineColor": "#999999",
    "showAlternateHGridColor": "0",
    "legendBgAlpha": "0",
    "legendBorderAlpha": "0",
    "legendShadow": "0",
    "legendItemFontSize": "10",
    "legendItemFontColor": "#666666",
    "showValues": "0",
    "showBorder": "1",
    "borderThickness": "4",
    "borderAlpha": "50",
    "borderColor": "#000000"
  },
  "categories": [
    {
      "category": [
        {
          "label": ""
        },
        {
          "label": ""
        },
        {
          "label": ""
        }
      ]
    }
  ],
  "dataset": [
    {
      "seriesname": "",
      "data": [
        {
          "value": ""
        },
        {
          "value": ""
        },
        {
          "value": ""
        }]
    }
  ]
};

@Component({
  selector: 'app-employee-more-info-with-charts',
  templateUrl: './employee-more-info-with-charts.page.html',
  styleUrls: ['./employee-more-info-with-charts.page.scss'],
})
export class EmployeeMoreInfoWithChartsPage implements OnInit {

  chartWidth = 320;
  chartHeight = 400;
  chartType = 'mscolumn2d';
  chartDataFormat = 'json';
  chartSolutionDataSource = solutionData;
  chartTechnicalDataSource = technicalData;
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public listData: any;
  public empName: string
  slideOpts = {
    effect: 'flip'
  };

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService) {

    // Hide the side menu for donut page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;

      // More information with charts api call
      this.moreInfoWithCharts();
    })
  }

  ngOnInit() {
  }

  parseData() {


  }

  moreInfoWithCharts() {
    // get employee details from Nav service
    let employeeDetails = this.navCtrl.get()
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.withoutWeightageMoreInfoWithCharts(this.authToken, employeeDetails.staffID, employeeDetails.projectID, employeeDetails.trackID)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let moreInfoWithChartsResponse = JSON.parse(response.data);
            console.log('More Info with charts response -> ', moreInfoWithChartsResponse)

            this.listData = moreInfoWithChartsResponse.tabledetails;
            this.empName = moreInfoWithChartsResponse.tabledetails[0].staff_Name;

            // Clear the existing values
            this.chartSolutionDataSource.categories[0].category = [];
            for(let i = 0; i < this.chartSolutionDataSource.dataset.length; i++){
              this.chartSolutionDataSource.dataset[i].seriesname = ""
              for(let j = 0; j< this.chartSolutionDataSource.dataset[i].data.length; j++){
                this.chartSolutionDataSource.dataset[i].data[j].value = "";
              }
            }

            var iterationSolution = moreInfoWithChartsResponse.iterationSolution;
            var RatingSolution = moreInfoWithChartsResponse.RatingSolution;
            var technologySolution = moreInfoWithChartsResponse.technologySolution;
            for (var i = 0; i < iterationSolution.length; i++) {
              console.log(iterationSolution[i]);
              this.chartSolutionDataSource.categories[0].category.push({
                label: iterationSolution[i]
              });
            }
            var iteration1 = [];
            var iteration2 = [];
            var iteration3 = [];
            for (var k in RatingSolution) {
              if (RatingSolution[k].iteration == "1") {
                iteration1.push(RatingSolution[k]);
              }
              if (RatingSolution[k].iteration == "2") {
                iteration2.push(RatingSolution[k]);
              }
              if (RatingSolution[k].iteration == "3") {
                iteration3.push(RatingSolution[k]);
              }
            }
            for (var j = 0; j < technologySolution.length; j++) {
              this.chartSolutionDataSource.dataset.push({
                seriesname: technologySolution[j],
                data: [
                  {
                    value: "0"
                  },
                  {
                    value: "0"
                  },
                  {
                    value: "0"
                  }
                ]
              });
            }
            for (var j = 0; j < technologySolution.length; j++) {
              for (
                i = 0;
                i <
                Math.max(iteration1.length, iteration2.length, iteration3.length);
                i++
              ) {
                if (iteration1[i] == undefined || iteration1[i] == null) {
                } else {
                  if (iteration1[i].techskill == technologySolution[j]) {
                    this.chartSolutionDataSource.dataset[j + 1].data[0].value =
                      iteration1[i].rating;
                  } else {
                  }
                }

                if (iteration2[i] === undefined || iteration2[i] === null) {
                } else {
                  if (iteration2[i].techskill == technologySolution[j]) {
                    this.chartSolutionDataSource.dataset[j + 1].data[1].value =
                      iteration2[i].rating;
                  } else {
                  }
                }

                if (iteration3[i] === undefined || iteration3[i] === null) {
                } else {
                  if (iteration3[i].techskill == technologySolution[j]) {
                    this.chartSolutionDataSource.dataset[j + 1].data[2].value =
                      iteration3[i].rating;
                  } else {
                  }
                }
              }
            }

            var iterationTechnical = moreInfoWithChartsResponse.iterationTechnical;
            var RatingTechnical = moreInfoWithChartsResponse.RatingTechnical;
            var technologyTechnical = moreInfoWithChartsResponse.technologyTechnical;
            for (var l = 0; l < iterationTechnical.length; l++) {
              console.log(iterationTechnical[l]);
              // $scope.dataSourceZen.categories[0].category.push({"label":$scope.iterationSolution[i]});
              this.chartTechnicalDataSource.categories[0].category[l].label =
                iterationTechnical[l];
            }
            var iteration1 = [];
            var iteration2 = [];
            var iteration3 = [];
            for (var l = 0; l < RatingTechnical.length; l++) {
              if (RatingTechnical[l].iteration == "1") {
                iteration1.push(RatingTechnical[l]);
              }
              if (RatingTechnical[l].iteration == "2") {
                iteration2.push(RatingTechnical[l]);
              }
              if (RatingTechnical[l].iteration == "3") {
                iteration3.push(RatingTechnical[l]);
              }
            }
            for (var j = 0; j < technologyTechnical.length; j++) {
              this.chartTechnicalDataSource.dataset.push({
                seriesname: technologyTechnical[j],
                data: [
                  {
                    value: "0"
                  },
                  {
                    value: "0"
                  },
                  {
                    value: "0"
                  }
                ]
              });
              for (
                var i = 0;
                i <
                Math.max(iteration1.length, iteration2.length, iteration3.length);
                i++
              ) {
                if (iteration1[i] == undefined || iteration1[i] == null) {
                } else {
                  if (iteration1[i].techskill == technologyTechnical[j]) {
                    this.chartTechnicalDataSource.dataset[j + 1].data[0].value =
                      iteration1[i].rating;
                  } else {
                  }
                }

                if (iteration2[i] == undefined || iteration2[i] == null) {
                } else {
                  if (iteration2[i].techskill == technologyTechnical[j]) {
                    this.chartTechnicalDataSource.dataset[j + 1].data[1].value =
                      iteration2[i].rating;
                  } else {
                  }
                }

                if (iteration3[i] == undefined || iteration3[i] == null) {
                } else {
                  if (iteration3[i].techskill == technologyTechnical[j]) {
                    this.chartTechnicalDataSource.dataset[j + 1].data[2].value =
                      iteration3[i].rating;
                  } else {
                  }
                }
              }
            }
          })
          .catch((error) => {
            console.log(error)
            // Dismiss the loader
            this.dismissLoader();
            // Show alert with error message
            this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
          })
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Generic method to display alert message with Ok button
  async showAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

  // Generic method to display the loader
  async showLoader() {
    this.loaderActive = true;
    this.loader = await this.loadingCtrl.create({
      message: 'Please wait...',
      spinner: 'crescent',
    });
    await this.loader.present();
  }

  // Generic method to dismiss the loader
  async dismissLoader() {
    if (this.loaderActive === true) {
      await this.loader.dismiss();
    }
    this.loaderActive = false;
  }
}
