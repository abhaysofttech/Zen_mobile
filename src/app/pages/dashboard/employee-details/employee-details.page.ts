import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.page.html',
  styleUrls: ['./employee-details.page.scss'],
})
export class EmployeeDetailsPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public profilePicPath: any;
  public empName: string;
  public staffID: string;
  public reportingManager: string;
  public programManager: string;
  public totalExperience: string;
  public empBand: string;
  public technicalRating: string;
  public technialExpertise: string;
  public solutionRating: string;
  public solutionExpertise: string;
  public projectID: string;
  public trackID: string;
  private tfWindowTileCategory: string;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private sanitizer: DomSanitizer) {

    // Hide the side menu for donut page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })

    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;

      // Bind the employee data
      this.employeeDetailsApiCall();
    })
  }

  ngOnInit() {
  }

  // More Information button click event
  moreInformation() {
    // Redirect to Employee More Info with charts page
    if (this.tfWindowTileCategory == "withWeightage") {
      this.navCtrl.push('employee-history-ratings', {
        "staffID": this.staffID,
        "projectID": this.projectID,
        "trackID": this.trackID
      })
    } else {
      this.navCtrl.push('employee-more-info-with-charts', {
        "staffID": this.staffID,
        "projectID": this.projectID,
        "trackID": this.trackID
      })
    }
  }

  employeeDetailsApiCall() {
    // get employee details from Nav service
    let employeeData = this.navCtrl.get()
    this.tfWindowTileCategory = employeeData.tileCategory;

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.fetchUserProfilePicture(this.authToken, employeeData.staff_Number)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let profilePicResponse = JSON.parse(response.data);
            console.log('Profile Picture Response -> ', profilePicResponse)
            if (profilePicResponse[0] != null) {
              this.profilePicPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + profilePicResponse[0]);
            }

            this.empName = employeeData.staff_Name;
            this.staffID = employeeData.staff_Number;
            this.reportingManager = employeeData.manager_Id;
            this.programManager = employeeData.pgm_Manager;
            this.totalExperience = employeeData.total_Experience;
            this.empBand = employeeData.band;
            this.technicalRating = employeeData.technical_rating;
            this.technialExpertise = employeeData.technologies;
            this.solutionRating = employeeData.functional_rating;
            this.solutionExpertise = employeeData.functionalities;
            this.projectID = employeeData.projectid;
            this.trackID = employeeData.trackid;
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
