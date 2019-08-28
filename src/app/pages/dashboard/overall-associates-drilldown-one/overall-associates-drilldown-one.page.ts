import { NetworkService } from 'src/app/services/network.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController, LoadingController } from '@ionic/angular'
import { Storage } from '@ionic/storage';
import { Constants } from 'src/app/constants/Constants';
import { Network } from '@ionic-native/network/ngx';
import { NavService } from 'src/app/services/nav.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-overall-associates-drilldown-one',
  templateUrl: './overall-associates-drilldown-one.page.html',
  styleUrls: ['./overall-associates-drilldown-one.page.scss'],
})
export class OverallAssociatesDrilldownOnePage implements OnInit {

  public listData: any;
  public pageTitle: string;
  public empRole: string;
  public empNumber: string;
  private loader: any;
  private loaderActive: boolean = false;
  private authToken: string;

  constructor(public menuCtrl: MenuController,
    public platform: Platform,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public network: NetworkService,
    public api: ApiService,
    public navCtrl: NavService) {

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
      this.overAllAssociatesDrillDownApiCall();
    })
  }

  ngOnInit() {
  }

  overAllAssociatesDrillDownApiCall() {
    // Get data from Nav Control 
    var data = this.navCtrl.get();

    // Set page title
    this.pageTitle = data;

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found

      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.overAllAssociatesChartLabelDrillDown(this.authToken, this.empNumber, data, this.empRole)
          .then((response: any) => {

            // Dismiss the loader
            this.dismissLoader();

            let overAllAssociatesChartDrillDownResponse = JSON.parse(response.data);
            console.log('OverAll Associates Chart Drilldown Response -> ', overAllAssociatesChartDrillDownResponse)
            this.listData = overAllAssociatesChartDrillDownResponse;
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

  // Below method will get employee details
  employeeDetails(data: any) {
    // Redirect to OverAll Associates Details page
    this.navCtrl.push('overall-associates-drilldown-two', data)
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
