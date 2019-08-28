import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-employee-history-ratings-drilldown',
  templateUrl: './employee-history-ratings-drilldown.page.html',
  styleUrls: ['./employee-history-ratings-drilldown.page.scss'],
})
export class EmployeeHistoryRatingsDrilldownPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public apiResponse: any;
  public technicalEvalutionData: any;
  public functionalEvalutionData1: any;
  public functionalEvalutionData2: any;
  public authToken: string;

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

      // get history rating chart drilldown api call
      this.getHistoryRatingDrilldown();
    })
  }

  ngOnInit() {
  }

  // API call to fetch data from server
  getHistoryRatingDrilldown() {
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

        this.api.withWeitageHistoryRatingsDrilldown(this.authToken, employeeDetails.staffName,
          employeeDetails.staffNo, employeeDetails.projectId, employeeDetails.trackId, employeeDetails.iteration)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            // Clear previous values
            this.apiResponse = {};
            this.technicalEvalutionData = {};
            this.functionalEvalutionData1 = {};
            this.functionalEvalutionData2 = {};

            this.apiResponse = JSON.parse(response.data);
            this.technicalEvalutionData = this.apiResponse['Technical Evaluation']
            this.functionalEvalutionData1 = this.apiResponse['Functional Evaluation 1']
            this.functionalEvalutionData2 = this.apiResponse['Functional Evaluation 2']
            console.log('History ratings drilldown charts response -> ', this.apiResponse)
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
