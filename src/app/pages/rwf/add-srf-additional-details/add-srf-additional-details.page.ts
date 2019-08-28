import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-add-srf-additional-details',
  templateUrl: './add-srf-additional-details.page.html',
  styleUrls: ['./add-srf-additional-details.page.scss'],
})
export class AddSrfAdditionalDetailsPage implements OnInit {

  addSrfMenuVisible: boolean = false;
  public srfBtnText: string = "+ Add SRF";
  slideOpts = {
    effect: 'flip'
  };
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public empRole: string;
  public demandID: string;
  public demandDetails: any;
  public srfDetails: any;
  public addSRFData = {
    SRFNumber: "NA",
    name: "NA",
    candidatestatus: "select",
    sourcedby: "select",
    comments: "NA",
    offeredon: "NA",
    expecteddoj: "NA",
    actualdoj: "NA",
    srfstatus: "NA"
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
    this.storage.get('role').then((data) => {
      this.empRole = data;
    })
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })
    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
      // Get data from Nav Service and bind 
      this.additionalDetailsApiCall();
    })
  }

  ngOnInit() {
  }

  // Additional Details api call
  additionalDetailsApiCall() {
    // Get data from Nav Service
    this.demandID = this.navCtrl.get();
    console.log(this.demandID)

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.demandAdditionalDetails(this.authToken, this.empNumber, this.empRole, this.demandID)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            var additionalDetailsResponse = JSON.parse(response.data);
            console.log('Additional Details Response -> ', additionalDetailsResponse)
            this.demandDetails = additionalDetailsResponse.matrixEmpDetails[0];
            this.srfDetails = additionalDetailsResponse.matrixEmpDetails3[0]

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

  // Save SFF details
  srfSaveDetails() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.saveSrf(this.authToken, this.empNumber, this.addSRFData, this.demandID)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            var sarSaveResponse = JSON.parse(response.data);
            console.log('SRF Save Response -> ', sarSaveResponse)

            // Show success message
            this.showAlert('Alert', 'Successfully Added')

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

  // Add SRF No change event
  addSrfNoChangeEvent(value: any) {
    this.addSRFData.SRFNumber = value;
  }

  // SRF status change event
  srfStatusChangeEvent(value: any) {
    this.addSRFData.srfstatus = value;
  }

  // Candidate name change event
  nameOfCandidateChangeEvent(value: any) {
    this.addSRFData.name = value;
  }

  // SRF comments change event
  srfCommentsChangeEvent(value: any) {
    this.addSRFData.comments = value;
  }

  // Add Srf button click event
  addSrfBtnClick() {
    if (this.addSrfMenuVisible == false) {
      this.addSrfMenuVisible = true;
      this.srfBtnText = "- Add SRF"
    } else if (this.addSrfMenuVisible == true) {
      this.addSrfMenuVisible = false;
      this.srfBtnText = "+ Add SRF"
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
