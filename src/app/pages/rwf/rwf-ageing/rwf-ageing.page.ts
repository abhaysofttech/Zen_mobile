import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-rwf-ageing',
  templateUrl: './rwf-ageing.page.html',
  styleUrls: ['./rwf-ageing.page.scss'],
})
export class RwfAgeingPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public ageLessThan7: string
  public age7To14: string;
  public age14To21: string;
  public age21To28: string;
  public age28Plus: string;
  public averageAge: string;

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

      // API call to get Ageing data
      this.ageingDataApiCall();
    })
  }

  ngOnInit() {
  }

  // This method used to fetch the Ageing data using API's
  ageingDataApiCall() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.rwfAgeing(this.authToken, this.empNumber)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let rwfAgeingResponse = JSON.parse(response.data);
            console.log('RWF Ageing Response -> ', rwfAgeingResponse)

            this.ageLessThan7 = rwfAgeingResponse.age7minus;
            this.age7To14 = rwfAgeingResponse.age7to14;
            this.age14To21 = rwfAgeingResponse.age14to21;
            this.age21To28 = rwfAgeingResponse.age21to28;
            this.age28Plus = rwfAgeingResponse.age28plus;
            this.averageAge = rwfAgeingResponse.averageAge;
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
