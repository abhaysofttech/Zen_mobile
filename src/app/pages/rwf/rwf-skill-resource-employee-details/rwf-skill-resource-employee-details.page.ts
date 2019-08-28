import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-rwf-skill-resource-employee-details',
  templateUrl: './rwf-skill-resource-employee-details.page.html',
  styleUrls: ['./rwf-skill-resource-employee-details.page.scss'],
})
export class RwfSkillResourceEmployeeDetailsPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;

  public empName: string;
  public empDesignation: string;
  public staffID: string;
  public location: string;
  public reportingManager: string;
  public programManager: string;
  public technicalSkills: string;
  public band: string;
  public technicalRating: string;
  public solutionRating: string;
  public availableFrom: string;
  public projectID: string;
  public trackID: string;
  public dropdown: string;
  public dropdown1: string;
  public managerID: string;
  public earMarkingReference: string;
  public dateRelease: string;
  public earMarkedBy: string;
  public data: any;

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
    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
    })
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
      // Bind Employee details data
      this.bindEmployeeDetailsData();
    })
  }

  ngOnInit() {
  }

  // Below method to get data from Nav service and bind into view
  bindEmployeeDetailsData() {
    this.data = this.navCtrl.get();

    this.earMarkedBy = this.data.manager1_Name
    this.dateRelease = this.data.date_release;
    this.earMarkingReference = this.data.earmarking_ref;
    this.managerID = this.data.manager_Id;
    this.dropdown = this.data.dropdown;
    this.dropdown1 = this.data.dropdown1;
    this.staffID = this.data.staff_Number;
    this.projectID = this.data.projectid;
    this.trackID = this.data.trackid;

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.rwfResourceGetRatingData(this.authToken, this.staffID)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let rwfResourceRatingDataResponse = JSON.parse(response.data);
            console.log('RWF Resource Rating Data Response -> ', rwfResourceRatingDataResponse)

            // Bind the response data
            this.empName = this.data.staff_Name;
            this.empDesignation = this.data.designation;
            this.location = this.data.location;
            this.reportingManager = this.data.manager_Id;
            this.programManager = this.data.pgm_Manager;
            this.technicalSkills = this.data.tech_skills;
            this.band = this.data.band;
            this.availableFrom = this.data.release_DATE;
            this.technicalRating = rwfResourceRatingDataResponse.techRatingData[0].techrating;
            this.solutionRating = rwfResourceRatingDataResponse.solRatingData[0].solrating;
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

  // Comments drop down change event
  commentsDropDownChange(event: any) {
    this.data.dropdown1 = event.detail.value
  }

  // Resource Earmarking drop down change event
  resourceEarmarkingDropDownChagne(event: any) {
    this.data.dropdown = event.detail.value;
  }

  // Resource Earmarking Reference drop down change event
  resourceEarmarkingReferenceDropDownChagne(event: any) {
    this.data.earmarking_ref = event.detail.value;
  }

  //Date change event
  dateChangeEvent(event: any) {
    this.data.requirement_date = event.detail.value;
  }

  // Technical Rating data click event
  technicalRatingClick() {
    // Redirect to Employee More Info with charts page
    this.navCtrl.push('employee-more-info-with-charts', {
      "staffID": this.staffID,
      "projectID": this.projectID,
      "trackID": this.trackID
    })
  }

  // Solution Rating data click event
  solutionRatingClick() {
    // Redirect to Employee More Info with charts page
    this.navCtrl.push('employee-more-info-with-charts', {
      "staffID": this.staffID,
      "projectID": this.projectID,
      "trackID": this.trackID
    })
  }

  // Select Associate button click event
  selectAssociate() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.rwfSelect(this.authToken, this.data, this.empNumber)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let rwfSaveResponse = JSON.parse(response.data);
            console.log('RWF Save Response -> ', rwfSaveResponse)

            // Show alert dialog
            this.showAlertNote('Please Note', 'You have selected ' +this.data.staff_Name)
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

  // De Select Associate button click event
  deSelectAssociate() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.rwfDelete(this.authToken, this.data, this.empNumber)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let rwfDeleteResponse = JSON.parse(response.data);
            console.log('RWF Delete Response -> ', rwfDeleteResponse)

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

  // Show alert note
  async showAlertNote(title: string, message: string) {
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
