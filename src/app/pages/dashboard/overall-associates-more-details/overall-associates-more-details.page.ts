import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-overall-associates-more-details',
  templateUrl: './overall-associates-more-details.page.html',
  styleUrls: ['./overall-associates-more-details.page.scss'],
})
export class OverallAssociatesMoreDetailsPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public role: string;
  public smeListData: any = [];
  public potentialSmeListData: any = [];
  public nonSmeListData: any = [];
  public nonRatedListData: any = [];;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService) { 

      // Hide the side menu for more details page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })
    this.storage.get('role').then((data) => {
      this.role = data;
    })
    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;

      // Api call to get Overall associates more details data
      this.getOverallAssociatesMoreDetailsData();
    })
    }

  ngOnInit() {
  }

  // Below method used to get data for Overall associates more details
  getOverallAssociatesMoreDetailsData() {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.overallAssociatesMoreDetails(this.authToken, this.empNumber, this.role)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            // clear previous values
            this.smeListData = [];
            this.potentialSmeListData = [];
            this.nonSmeListData = [];
            this.nonRatedListData = [];

            let overallAssociatesMoreDetailsData = JSON.parse(response.data);
            console.log('Overall Associates more details data -> ', overallAssociatesMoreDetailsData)
            for (let data of overallAssociatesMoreDetailsData) {
              if (data.type == 'SME') {
                this.smeListData.push(data)
              } else if (data.type == 'Potential-SME') {
                this.potentialSmeListData.push(data)
              } else if (data.type == 'Non-SME') {
                this.nonSmeListData.push(data)
              } else if (data.type == 'Non-Rated') {
                this.nonRatedListData.push(data)
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

  // Employee number click event
  associateStaffNumberClick(data: any) {
    // Redirect to Drilldown page
    this.navCtrl.push('overall-associates-more-details-drilldown',
      {
        "moreDetailsData": data
      });
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
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
