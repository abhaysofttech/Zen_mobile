import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search-engine-employee-details',
  templateUrl: './search-engine-employee-details.page.html',
  styleUrls: ['./search-engine-employee-details.page.scss'],
})
export class SearchEngineEmployeeDetailsPage implements OnInit {

  public profilePicPath: any;
  public empName: string;
  public staffID: string;
  public reportingManager: string;
  public programManager: string;
  public totalExperience: string;
  public band: string;
  public technicalRating: string;
  public technicalExpertise: string;
  public solutionRating: string;
  public solutionExpertise: string;
  public projectName: string;
  public projectCode: string;
  public projectManager: string;
  public technicalExpertiseAccordian: string;
  public solutionAreasKnown: string;
  public nicheSkills: string;
  public allocationDetailsSubMenu: boolean = false;
  public technicalExpertiseSubMenu: boolean = false;
  public solutionAreasKnownSubMenu: boolean = false;
  public nicheSkillsSubMenu: boolean = false;
  public visaDetailsSubMenu: boolean = false;
  public certificatesSubMenu: boolean = false;
  public skillsFromHrmsSubMenu: boolean = false;
  public awardsSubMenu: boolean = false;
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public projectID: string;
  public trackID: string;
  public visaType: string;
  public visaStatus: string;
  public visaValidity: string;
  public certificates: string;
  public awards: string;
  public hrmsSkillPrimary: string;
  public hrmsSkillSecondary: string;
  public hrmsSkillTertionary: string;
  public hrmsSkillOthers: string;
  public associateRated: boolean = false;
  public searchKeyword: string;

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

      // Fetch Profile picture
      this.getProfilePictureApiCall();
    })
  }

  ngOnInit() {
  }

  // Below method used to get the user details and profile picutre etc...
  getProfilePictureApiCall() {
    // Get data from navctrl
    var dataFromNavCtrl = this.navCtrl.get();
    this.searchKeyword = dataFromNavCtrl.searchKeyword;
    var data = dataFromNavCtrl.searchResponse;

    // Check staff number available or not from data to fetch user image from API
    if (Object.keys(data).includes('listDataVO3')) {
      // Associate has been rated
      this.associateRated = true;
      // Check for platform ready or not
      if (this.platform.is('cordova')) {
        // platform found
        // Check for Internet connection
        if (this.network.checkNetWorkConnection()) {
          // Internet connection available
          // Start loader
          this.showLoader();

          this.api.fetchUserProfilePicture(this.authToken, data.listDataVO3[0].staff_Number)
            .then((response: any) => {
              // Dismiss the loader
              this.dismissLoader();

              let profilePictureResponse = JSON.parse(response.data);
              console.log('Associate Profile Picutre API Response -> ', profilePictureResponse)
              if (profilePictureResponse[0] != null) {
                this.profilePicPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + profilePictureResponse[0]);
              }

              // Bind rated data to html
              this.empName = data.listDataVO3["0"].staff_Name;
              this.staffID = data.listDataVO3["0"].staff_Number;
              this.reportingManager = data.listDataVO3["0"].manager_Id;
              this.programManager = data.listDataVO3["0"].pgm_Manager;
              this.totalExperience = data.listDataVO3["0"].total_Experience;
              this.band = data.listDataVO3["0"].band;
              this.technicalRating = data.listDataVO3["0"].technical_rating;
              this.technicalExpertise = data.listDataVO3["0"].technologies;
              this.solutionRating = data.listDataVO3["0"].functional_rating;
              this.solutionExpertise = data.listDataVO3["0"].functionalities;
              this.solutionExpertise = data.listDataVO3["0"].functionalities;
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
    } else {
      // Associate not rated
      this.associateRated = false;
      this.programManager = data.listOfSearchAssociate["0"].pgm;
    }

    // Bind common data to html
    this.projectName = data.listOfSearchAssociate["0"].project_name;
    this.projectCode = data.listOfSearchAssociate["0"].project_code;
    this.projectManager = data.listOfSearchAssociate["0"].project_manager;
    if (data.listOfSearchAssociate["0"].tech_skills != null) {
      this.technicalExpertiseAccordian = data.listOfSearchAssociate["0"].tech_skills;
    } else {
      this.technicalExpertiseAccordian = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].solution != null) {
      this.solutionAreasKnown = data.listOfSearchAssociate["0"].solution;
    } else {
      this.solutionAreasKnown = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].niche_skills != null) {
      this.nicheSkills = data.listOfSearchAssociate["0"].niche_skills;
    } else {
      this.nicheSkills = "NO DATA AVAILABLE";
    }
    this.projectID = data.listOfSearchAssociate["0"].niche_skills;
    this.trackID = data.listOfSearchAssociate["0"].trackid;
    if (data.listOfSearchAssociate["0"].visa_type != null) {
      this.visaType = data.listOfSearchAssociate["0"].visa_type;
    } else {
      this.visaType = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].visa_status != null) {
      this.visaStatus = data.listOfSearchAssociate["0"].visa_status;
    } else {
      this.visaStatus = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].visa_validity != null) {
      this.visaValidity = data.listOfSearchAssociate["0"].visa_validity;
    } else {
      this.visaValidity = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].certifications != null) {
      this.certificates = data.listOfSearchAssociate["0"].certifications;
    } else {
      this.certificates = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].accolades != null) {
      this.awards = data.listOfSearchAssociate["0"].accolades;
    } else {
      this.awards = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].hrmsskillPrimary != null) {
      this.hrmsSkillPrimary = data.listOfSearchAssociate["0"].hrmsskillPrimary;
    } else {
      this.hrmsSkillPrimary = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].hrmsskillSecondary != null) {
      this.hrmsSkillSecondary = data.listOfSearchAssociate["0"].hrmsskillSecondary;
    } else {
      this.hrmsSkillSecondary = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].hrmsskillTertionary != null) {
      this.hrmsSkillTertionary = data.listOfSearchAssociate["0"].hrmsskillTertionary;
    } else {
      this.hrmsSkillTertionary = "NO DATA AVAILABLE";
    }
    if (data.listOfSearchAssociate["0"].hrmsskillOthers != null) {
      this.hrmsSkillOthers = data.listOfSearchAssociate["0"].hrmsskillOthers;
    } else {
      this.hrmsSkillOthers = "NO DATA AVAILABLE";
    }
  }

  // More Information button click event
  moreInformation() {
    // Redirect to Employee More Info with charts page
    this.navCtrl.push('employee-more-info-with-charts', {
      "staffID": this.staffID,
      "projectID": this.projectID,
      "trackID": this.trackID
    })
  }

  // Allocation details click event
  alloationDetailsItemClick() {
    if (this.allocationDetailsSubMenu == false) {
      this.allocationDetailsSubMenu = true;
    } else if (this.allocationDetailsSubMenu == true) {
      this.allocationDetailsSubMenu = false;
    }
    if (this.technicalExpertiseSubMenu == true) {
      this.technicalExpertiseSubMenu = false;
    }
    if (this.solutionAreasKnownSubMenu == true) {
      this.solutionAreasKnownSubMenu = false;
    }
    if (this.nicheSkillsSubMenu == true) {
      this.nicheSkillsSubMenu = false;
    }
    if (this.visaDetailsSubMenu == true) {
      this.visaDetailsSubMenu = false;
    }
    if (this.certificatesSubMenu == true) {
      this.certificatesSubMenu = false;
    }
    if (this.awardsSubMenu == true) {
      this.awardsSubMenu = false;
    }
    if (this.skillsFromHrmsSubMenu == true) {
      this.skillsFromHrmsSubMenu = false;
    }
  }

  // Technical expertise click event
  technicalExpertiseItemClick() {
    if (this.technicalExpertiseSubMenu == false) {
      this.technicalExpertiseSubMenu = true;
    } else if (this.technicalExpertiseSubMenu == true) {
      this.technicalExpertiseSubMenu = false;
    }
    if (this.allocationDetailsSubMenu == true) {
      this.allocationDetailsSubMenu = false;
    }
    if (this.solutionAreasKnownSubMenu == true) {
      this.solutionAreasKnownSubMenu = false;
    }
    if (this.nicheSkillsSubMenu == true) {
      this.nicheSkillsSubMenu = false;
    }
    if (this.visaDetailsSubMenu == true) {
      this.visaDetailsSubMenu = false;
    }
    if (this.certificatesSubMenu == true) {
      this.certificatesSubMenu = false;
    }
    if (this.awardsSubMenu == true) {
      this.awardsSubMenu = false;
    }
    if (this.skillsFromHrmsSubMenu == true) {
      this.skillsFromHrmsSubMenu = false;
    }
  }

  // Solution areas known details click event
  solutionAreasKnownItemClick() {
    if (this.solutionAreasKnownSubMenu == false) {
      this.solutionAreasKnownSubMenu = true;
    } else if (this.solutionAreasKnownSubMenu == true) {
      this.solutionAreasKnownSubMenu = false;
    }
    if (this.allocationDetailsSubMenu == true) {
      this.allocationDetailsSubMenu = false;
    }
    if (this.technicalExpertiseSubMenu == true) {
      this.technicalExpertiseSubMenu = false;
    }
    if (this.nicheSkillsSubMenu == true) {
      this.nicheSkillsSubMenu = false;
    }
    if (this.visaDetailsSubMenu == true) {
      this.visaDetailsSubMenu = false;
    }
    if (this.certificatesSubMenu == true) {
      this.certificatesSubMenu = false;
    }
    if (this.awardsSubMenu == true) {
      this.awardsSubMenu = false;
    }
    if (this.skillsFromHrmsSubMenu == true) {
      this.skillsFromHrmsSubMenu = false;
    }
  }

  // Niche skills  click event
  nicheSkillsItemClick() {
    if (this.nicheSkillsSubMenu == false) {
      this.nicheSkillsSubMenu = true;
    } else if (this.nicheSkillsSubMenu == true) {
      this.nicheSkillsSubMenu = false;
    }
    if (this.allocationDetailsSubMenu == true) {
      this.allocationDetailsSubMenu = false;
    }
    if (this.technicalExpertiseSubMenu == true) {
      this.technicalExpertiseSubMenu = false;
    }
    if (this.solutionAreasKnownSubMenu == true) {
      this.solutionAreasKnownSubMenu = false;
    }
    if (this.visaDetailsSubMenu == true) {
      this.visaDetailsSubMenu = false;
    }
    if (this.certificatesSubMenu == true) {
      this.certificatesSubMenu = false;
    }
    if (this.awardsSubMenu == true) {
      this.awardsSubMenu = false;
    }
    if (this.skillsFromHrmsSubMenu == true) {
      this.skillsFromHrmsSubMenu = false;
    }
  }

  // Visa details click event
  visaDetailsItemClick() {
    if (this.visaDetailsSubMenu == false) {
      this.visaDetailsSubMenu = true;
    } else if (this.visaDetailsSubMenu == true) {
      this.visaDetailsSubMenu = false;
    }
    if (this.allocationDetailsSubMenu == true) {
      this.allocationDetailsSubMenu = false;
    }
    if (this.technicalExpertiseSubMenu == true) {
      this.technicalExpertiseSubMenu = false;
    }
    if (this.solutionAreasKnownSubMenu == true) {
      this.solutionAreasKnownSubMenu = false;
    }
    if (this.nicheSkillsSubMenu == true) {
      this.nicheSkillsSubMenu = false;
    }
    if (this.certificatesSubMenu == true) {
      this.certificatesSubMenu = false;
    }
    if (this.awardsSubMenu == true) {
      this.awardsSubMenu = false;
    }
    if (this.skillsFromHrmsSubMenu == true) {
      this.skillsFromHrmsSubMenu = false;
    }
  }

  // Certificate details click event
  certificationsItemClick() {
    if (this.certificatesSubMenu == false) {
      this.certificatesSubMenu = true;
    } else if (this.certificatesSubMenu == true) {
      this.certificatesSubMenu = false;
    }
    if (this.allocationDetailsSubMenu == true) {
      this.allocationDetailsSubMenu = false;
    }
    if (this.technicalExpertiseSubMenu == true) {
      this.technicalExpertiseSubMenu = false;
    }
    if (this.solutionAreasKnownSubMenu == true) {
      this.solutionAreasKnownSubMenu = false;
    }
    if (this.nicheSkillsSubMenu == true) {
      this.nicheSkillsSubMenu = false;
    }
    if (this.visaDetailsSubMenu == true) {
      this.visaDetailsSubMenu = false;
    }
    if (this.awardsSubMenu == true) {
      this.awardsSubMenu = false;
    }
    if (this.skillsFromHrmsSubMenu == true) {
      this.skillsFromHrmsSubMenu = false;
    }
  }

  // Award details click event
  awardsItemClick() {
    if (this.awardsSubMenu == false) {
      this.awardsSubMenu = true;
    } else if (this.awardsSubMenu == true) {
      this.awardsSubMenu = false;
    }
    if (this.allocationDetailsSubMenu == true) {
      this.allocationDetailsSubMenu = false;
    }
    if (this.technicalExpertiseSubMenu == true) {
      this.technicalExpertiseSubMenu = false;
    }
    if (this.solutionAreasKnownSubMenu == true) {
      this.solutionAreasKnownSubMenu = false;
    }
    if (this.nicheSkillsSubMenu == true) {
      this.nicheSkillsSubMenu = false;
    }
    if (this.visaDetailsSubMenu == true) {
      this.visaDetailsSubMenu = false;
    }
    if (this.certificatesSubMenu == true) {
      this.certificatesSubMenu = false;
    }
    if (this.skillsFromHrmsSubMenu == true) {
      this.skillsFromHrmsSubMenu = false;
    }
  }

  // Skills for HRMS click event
  skillsFromHrmsItemClick() {
    if (this.skillsFromHrmsSubMenu == false) {
      this.skillsFromHrmsSubMenu = true;
    } else if (this.skillsFromHrmsSubMenu == true) {
      this.skillsFromHrmsSubMenu = false;
    }
    if (this.awardsSubMenu == true) {
      this.awardsSubMenu = false;
    }
    if (this.allocationDetailsSubMenu == true) {
      this.allocationDetailsSubMenu = false;
    }
    if (this.technicalExpertiseSubMenu == true) {
      this.technicalExpertiseSubMenu = false;
    }
    if (this.solutionAreasKnownSubMenu == true) {
      this.solutionAreasKnownSubMenu = false;
    }
    if (this.nicheSkillsSubMenu == true) {
      this.nicheSkillsSubMenu = false;
    }
    if (this.visaDetailsSubMenu == true) {
      this.visaDetailsSubMenu = false;
    }
    if (this.certificatesSubMenu == true) {
      this.certificatesSubMenu = false;
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
