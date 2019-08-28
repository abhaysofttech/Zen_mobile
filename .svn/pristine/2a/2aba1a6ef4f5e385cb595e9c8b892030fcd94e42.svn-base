import { Component, OnInit, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { NavService } from 'src/app/services/nav.service';
import { Constants } from 'src/app/constants/Constants';

const data = {
  "chart": {
    "caption": "Overall Associates distribution",
    "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
    "bgColor": "#FFFFCC",
    "use3DLighting": "0",
    "showShadow": "0",
    "enableSmartLabels": "0",
    "startingAngle": "0",
    "showPercentInTooltip": "0",
    "decimals": "1",
    "captionFontSize": "14",
    "subcaptionFontSize": "14",
    "subcaptionFontBold": "0",
    "toolTipColor": "#ffffff",
    "toolTipBorderThickness": "0",
    "toolTipBgColor": "#000000",
    "toolTipBgAlpha": "80",
    "toolTipBorderRadius": "2",
    "toolTipPadding": "5",
    "showHoverEffect": "1",
    "showLegend": "1",
    "legendBgColor": "#ffffff",
    "legendBorderAlpha": "0",
    "legendShadow": "0",
    "legendItemFontSize": "10",
    "legendItemFontColor": "#666666",
    "useDataPlotColorForLabels": "1",
    "showBorder": "1",
    "borderThickness": "4",
    "borderAlpha": "50",
    "borderColor": "#000000",
    "theme": "fusion",
  },
  "data": []
};

@Component({
  selector: 'app-overall-associates',
  templateUrl: './overall-associates.page.html',
  styleUrls: ['./overall-associates.page.scss'],
})
export class OverallAssociatesPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public empRole: string;
  chartWidth = 300;
  chartHeight = 400;
  chartType = 'pie2d';
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
      this.overAllAssociatesApiCall();
    })

  }

  // Graph plot click handler
  dataplotClickHandler(eventObj, dataObj) {
    this.zone.run(() => {
      // Redirect to OverAll Associates drill down page 1
    this.navCtrl.push('overall-associates-drilldown-one', dataObj.categoryLabel)
    });
  }

  // Graph initialized event
  initialized($event) {
    this.chartObj = $event.chart;
  }

  ngOnInit() {

  }

  overAllAssociatesApiCall() {
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

        this.api.overAllAssociates(this.authToken, this.empNumber, this.empRole)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let overAllAssociatesResponse = JSON.parse(response.data);
            console.log('OverAll Associates Response -> ', overAllAssociatesResponse)

            this.dataSource.data = [];
            var chartData = overAllAssociatesResponse.pieChartData;

            for (var key in chartData) {
              this.dataSource.data.push({
                label: key,
                value: chartData[key]
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
