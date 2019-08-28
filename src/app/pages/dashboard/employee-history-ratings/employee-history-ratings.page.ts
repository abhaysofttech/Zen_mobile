import { Component, OnInit, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

const lineChartData = {
  chart: {
    caption: "History Ratings",
    yaxisname: "Ratings",
    rotatelabels: "0",
    setadaptiveymin: "1",
    yAxisMinValue: "0",
    yAxisMaxValue: "5",
    numDivLines: "10",
    plottooltext: "$value",
    theme: "fusion"
  },
  data: []
};

@Component({
  selector: 'app-employee-history-ratings',
  templateUrl: './employee-history-ratings.page.html',
  styleUrls: ['./employee-history-ratings.page.scss'],
})
export class EmployeeHistoryRatingsPage implements OnInit {

  chartWidth = 320;
  chartHeight = 400;
  chartType = 'line';
  chartDataFormat = 'json';
  lineChartDataSource = lineChartData;
  private loader: any;
  private loaderActive: boolean = false;
  private apiResponse: any;
  public authToken: string;
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

      // get history rating charts api call
      this.getHistoryRating();
    })
  }

  // Graph plot click handler
  dataplotClickHandler(eventObj, dataObj) {

    // filter API response with user selected tooltip
    for (let data of this.apiResponse.Ratings) {
      if (data.finalRating == dataObj.value && data.lastUpdatedOn == dataObj.categoryLabel) {
        this.zone.run(() => {
          // Redirect to RWF Resource list for skill page
          this.navCtrl.push('employee-history-ratings-drilldown',
            {
              "staffName": this.apiResponse['Associate Details'].associateName,
              "staffNo": this.apiResponse['Associate Details'].staffNo,
              "projectId": data.projectId,
              "trackId": data.trackId,
              "iteration": data.iteration
            })
        });
      }
    }

  }

  // Graph initialized event
  initialized($event) {
    this.chartObj = $event.chart;
  }

  ngOnInit() {
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Clear the graph data
    this.lineChartDataSource.data = [];
  }

  // API call to fetch data from server
  getHistoryRating() {
    // get employee details from Nav service
    let employeeDetails = this.navCtrl.get()
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 100;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.withWeitageHistoryRatings(this.authToken, employeeDetails.staffID, employeeDetails.projectID, employeeDetails.trackID)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            // Clear previous values
            this.lineChartDataSource.data = [];
            this.apiResponse = {};

            this.apiResponse = JSON.parse(response.data);
            console.log('History ratings charts response -> ', this.apiResponse)

            // process chart data
            for (let data of this.apiResponse.Ratings) {
              this.lineChartDataSource.data.push({
                "label": data.lastUpdatedOn,
                "value": data.finalRating
              })
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
