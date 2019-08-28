import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-twenty-five-window-list-without-weightage',
  templateUrl: './twenty-five-window-list-without-weightage.page.html',
  styleUrls: ['./twenty-five-window-list-without-weightage.page.scss'],
})
export class TwentyFiveWindowListWithoutWeightagePage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public empRole: string;
  public listData: any;
  private tileCategory: string;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService) {

    // Hide the side menu for 25 window drill down page
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
      // On this page landing by default we are calling API
      this.withoutWeightageListApiCall();
    })
  }

  ngOnInit() {
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  withoutWeightageListApiCall() {
    // Get user clicked tile details using Nav Service
    let data = this.navCtrl.get()
    this.tileCategory = data.tileCategory;

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        // Check tile category
        if (data.tileCategory == "withWeightage") {

          this.api.withWeightageList(this.authToken, data.column, data.row, this.empNumber, this.empRole)
            .then((response: any) => {
              // Dismiss the loader
              this.dismissLoader();

              let withWeightageListResponse = JSON.parse(response.data);
              console.log('Without Weightage List Response -> ', withWeightageListResponse)
              if (withWeightageListResponse.length > 0) {
                this.listData = withWeightageListResponse;
              }
            })
            .catch((error) => {
              console.log(error)
              // Dismiss the loader
              this.dismissLoader();
              // Show alert with error message
              this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
            })
        } else if (data.tileCategory == "withoutWeightage") {

          this.api.withoutWeightageList(this.authToken, data.column, data.row, this.empNumber, this.empRole)
            .then((response: any) => {
              // Dismiss the loader
              this.dismissLoader();

              let withoutWeightageListResponse = JSON.parse(response.data);
              console.log('Without Weightage List Response -> ', withoutWeightageListResponse)
              if (withoutWeightageListResponse.length > 0) {
                this.listData = withoutWeightageListResponse;
              }
            })
            .catch((error) => {
              console.log(error)
              // Dismiss the loader
              this.dismissLoader();
              // Show alert with error message
              this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
            })
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  getEmployeeDetails(data: any) {
    // Redirect to Employee Details page
    data['tileCategory'] = this.tileCategory;
    this.navCtrl.push('employee-details', data)
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
