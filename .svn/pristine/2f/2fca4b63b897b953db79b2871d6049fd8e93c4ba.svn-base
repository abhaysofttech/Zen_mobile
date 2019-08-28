import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-pgm-distribution-drill-down',
  templateUrl: './pgm-distribution-drill-down.page.html',
  styleUrls: ['./pgm-distribution-drill-down.page.scss'],
})
export class PgmDistributionDrillDownPage implements OnInit {

  public listData: any;
  public pageTitle: string;
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public empRole: string;

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
    })

    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
    })

    this.storage.get('role').then((data) => {
      this.empRole = data;
      // On this page landing by default OrgView method will get call
      this.pgmDistributionDrillDownApiCall();
    })
  }

  ngOnInit() {
  }

  pgmDistributionDrillDownApiCall() {

    // Get data from Nav service
    var data = this.navCtrl.get();

    // Set page title dynamically
    this.pageTitle = data.dataSetName;

    // Check for platform ready or not
    if (this.platform.is('cordova')) {

      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.pgmBarGraphDrillDown(this.authToken, this.empNumber, data.dataSetName, data.categoryLabel, this.empRole)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let pgmDistributionDrillDownResponse = JSON.parse(response.data);
            console.log('PGM Distribution Drilldown Response -> ', pgmDistributionDrillDownResponse)
            this.listData = pgmDistributionDrillDownResponse;
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
