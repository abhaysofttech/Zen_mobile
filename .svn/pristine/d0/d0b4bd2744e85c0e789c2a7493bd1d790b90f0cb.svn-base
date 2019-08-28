import { NavService } from 'src/app/services/nav.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import * as FusionCharts from 'fusioncharts';
// import * as FusionCharts from 'libs/fusioncharts/js/fusioncharts'

// Listening using global events
FusionCharts.addEventListener('initialized', function (opts) {
  // Prints id of the chart that has initialized
  console.log("Chart with id " + opts + " has been initialized.");
});

const data = {
  "chart": {
    "showvalues": "0",
    "plotgradientcolor": "",
    "formatnumberscale": "0",
    "showplotborder": "0",
    "palettecolors": "#2BC18A,#007b7d,#1485B4,#787878,#2C560A,#DD9D82",
    "canvaspadding": "1",
    "bgcolor": "FFFFFF",
    "showalternatehgridcolor": "1",
    "divLineDashed": "1",
    "divlinecolor": "FFF",
    "showcanvasborder": "0",
    "legendborderalpha": "0",
    "legendshadow": "0",
    "interactivelegend": "1",
    "showsum": "1",
    "canvasborderalpha": "0",
    "showborder": "0",
    "rotateValues": "1",
    "labelDisplay": "auto",
    "theme": "fusion"
  },
  "categories": [
    {
      "category": []
    }
  ],
  "dataset": [],
};

@Component({
  selector: 'app-pgm-distribution',
  templateUrl: './pgm-distribution.page.html',
  styleUrls: ['./pgm-distribution.page.scss'],
})
export class PgmDistributionPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public empRole: string;
  chartWidth = 300;
  chartHeight = 400;
  chartType = 'stackedcolumn2d';
  chartDataFormat = 'json';
  chartDataSource = data;
  dataSource = data;
  chartObj: any;
  handler: any;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private zone: NgZone) {
    // Hide the side menu for donut page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })

    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
    })

    this.storage.get('role').then((data) => {
      this.empRole = data;
      // On this page landing by default OrgView method will get call
      this.pgmDistributionApiCall();
    })
  }

  // Graph plot click handler
  dataplotClickHandler(eventObj, dataObj) {
    this.zone.run(() => {
      let data = {
        "dataSetName": dataObj.datasetName,
        "categoryLabel": dataObj.categoryLabel
      }
      // Redirect to OverAll Associates drill down page 1
      this.navCtrl.push('pgm-distribution-drill-down', data)
    });
  }

  // Graph initialized event
  initialized($event) {
    this.chartObj = $event.chart;
  }

  ngOnInit() {
  }

  pgmDistributionApiCall() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -30 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.pgmDistribution(this.authToken, this.empNumber, this.empRole)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let pgmDistributionResponse = JSON.parse(response.data);
            console.log('PGM Distribution Response -> ', pgmDistributionResponse)

            this.dataSource.dataset = [];
            var graphdata = pgmDistributionResponse.barChartData;

            var dataByBU = [];
            var i;
            var j;
            var k;
            for (i in graphdata) {
              if (
                dataByBU[graphdata[i][2]] === undefined ||
                dataByBU[graphdata[i][2]] === null
              ) {
                dataByBU[graphdata[i][2]] = [];
              }
              dataByBU[graphdata[i][2]][graphdata[i][0]] = graphdata[i][1];
            }

            this.dataSource.categories[0].category = [];
            var categoryWiseData = [];
            var categories = ["Non-Rated", "Non-SME", "Potential-SME"];
            categoryWiseData["Non-Rated"] = [];
            categoryWiseData["Non-SME"] = [];
            categoryWiseData["Potential-SME"] = [];
            categoryWiseData["SME"] = [];

            function zeroOnNull(object) {
              if (object === undefined || object === null) {
                return "0";
              }
              return object;
            }
            console.log(dataByBU);
            for (i in dataByBU) {
              this.dataSource.categories[0].category.push({
                label: i
              });

              categoryWiseData["Non-Rated"].push(
                zeroOnNull(dataByBU[i]["Non-Rated"])
              );
              categoryWiseData["Non-SME"].push(
                zeroOnNull(dataByBU[i]["Non-SME"])
              );
              categoryWiseData["Potential-SME"].push(
                zeroOnNull(dataByBU[i]["Potential-SME"])
              );
              categoryWiseData["SME"].push(zeroOnNull(dataByBU[i]["SME"]));
            }
            console.log(categoryWiseData);
            this.dataSource.dataset = [];
            for (j in categoryWiseData) {
              var dataAsValueObject = [];
              for (k in categoryWiseData[j]) {
                dataAsValueObject.push({
                  value: categoryWiseData[j][k]
                });
              }

              this.dataSource.dataset.push({
                seriesname: j,
                renderas: "Area",
                data: dataAsValueObject
              });
            }

            // Graph click listeners
            this.handler = this.dataplotClickHandler.bind(this);
            this.chartObj.addEventListener('dataplotClick', this.handler);
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
