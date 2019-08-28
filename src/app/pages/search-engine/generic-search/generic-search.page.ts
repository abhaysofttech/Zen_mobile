import { Component, OnInit, NgZone, ChangeDetectorRef  } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform, Events } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-generic-search',
  templateUrl: './generic-search.page.html',
  styleUrls: ['./generic-search.page.scss'],
})
export class GenericSearchPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empRole: string;
  public empNumber: string;
  public allSkillsList: any[];
  public filteredSkillsList: any[];
  public skillTypeList: any[];
  public fromBandList: any[];
  public toBandList: any[];
  public billabilityList: any[];
  public projectOrPoolList: any[];
  public accountList: any[];
  public locationList: any[];
  public toBandModelData: string;
  public showList: boolean = false;
  public selectedSkillValue: string = "";
  public finalselectedSkillValue: string = "All";
  public selectedAccountValue: string = "All";
  public selectedSkillType: string = "Project Rated Skills"
  public selectedLocation: string = "All";
  public selectedFromBand: string = "All";
  public selectedToBand: string = "All";
  public selectedBillability: string = "All";
  public selectedProjectOrPool: string = "All"
  public listItemSelected: boolean = false;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private events: Events) {

    // Hide the side menu for Search By Associate page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
    })
    this.storage.get('role').then((data) => {
      this.empRole = data;
    })
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;

      // Fetch dropdown values
      this.getGenericSearchDropdownValues();
    })
  }

  ngOnInit() {
  }

  // Below API to fetch Generic Search dropdown values
  getGenericSearchDropdownValues() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        // API call
        this.api.getGenericSearchDropdownsData(this.authToken, this.empNumber, this.empRole)
          .subscribe(response => {
            // Dismiss the loader
            this.dismissLoader();

            console.log('Generic search dropdown values -> ', response)

            // Clear the values
            this.skillTypeList = [];
            this.fromBandList = [];
            this.toBandList = [];
            this.billabilityList = [];
            this.projectOrPoolList = [];
            this.accountList = [];
            this.locationList = [];
            this.allSkillsList = [];

            // Account dropdown data
            let accountData = JSON.parse(response[1].data);
            this.accountList.push({
              "accountId": "All",
              "accountName": "All"
            })
            this.accountList.push(accountData[0])

            // Skill type dropdown data
            this.skillTypeList.push("Project Rated Skills");
            this.skillTypeList.push("HRMS Skills");

            // Skill autocomplete data
            let allSkillsData = JSON.parse(response[2].data);
            this.allSkillsList = allSkillsData;
            this.filteredSkillsList = allSkillsData;

            // Location dropdown data
            let locationData = JSON.parse(response[0].data)
            this.locationList = locationData;

            // From band dropdown data
            this.fromBandList.push("All")
            this.fromBandList.push("D1")
            this.fromBandList.push("D2")
            this.fromBandList.push("E1")
            this.fromBandList.push("E2")
            this.fromBandList.push("F1")
            this.fromBandList.push("F2")
            this.fromBandList.push("F3")
            this.fromBandList.push("G0")
            this.fromBandList.push("G1")
            this.fromBandList.push("G2")
            this.fromBandList.push("M0")
            this.fromBandList.push("P0")
            this.fromBandList.push("R0")
            this.fromBandList.push("S0")

            // To band dropdown data
            this.toBandList.push("All")

            // Billability dropdown data
            this.billabilityList.push("All")
            this.billabilityList.push("Billable")
            this.billabilityList.push("Non Billable")
            this.billabilityList.push("EBR")
            this.billabilityList.push("InTransit")
            this.billabilityList.push("Pool")

            // Project/Pool dropdown data
            this.projectOrPoolList.push("All")
            this.projectOrPoolList.push("Project")
            this.projectOrPoolList.push("Pool")

          }, error => {
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

  // To band dropdown chagne listener
  toBandValueChange(event: any) {
    this.selectedToBand = event.detail.value;
  }

  // From band dropdown change listener
  fromBandValueChange(event: any) {
    this.selectedFromBand = event.detail.value

    if (event.detail.value == "All") {
      console.log('All')
      this.toBandModelData = ""
      this.toBandModelData = "All"
      this.toBandList = [];
    } else if (event.detail.value == "D1") {
      console.log('D1')
      this.toBandModelData = "D1"
      this.toBandList = [];
      this.toBandList.push("D1")
      this.toBandList.push("D2")
      this.toBandList.push("E1")
      this.toBandList.push("E2")
      this.toBandList.push("F1")
      this.toBandList.push("F2")
      this.toBandList.push("F3")
      this.toBandList.push("G0")
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "D2") {
      this.toBandModelData = "D2"
      this.toBandList = [];
      this.toBandList.push("D2")
      this.toBandList.push("E1")
      this.toBandList.push("E2")
      this.toBandList.push("F1")
      this.toBandList.push("F2")
      this.toBandList.push("F3")
      this.toBandList.push("G0")
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "E1") {
      this.toBandModelData = "E1"
      this.toBandList = [];
      this.toBandList.push("E1")
      this.toBandList.push("E2")
      this.toBandList.push("F1")
      this.toBandList.push("F2")
      this.toBandList.push("F3")
      this.toBandList.push("G0")
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "E2") {
      this.toBandModelData = "E2"
      this.toBandList = [];
      this.toBandList.push("E2")
      this.toBandList.push("F1")
      this.toBandList.push("F2")
      this.toBandList.push("F3")
      this.toBandList.push("G0")
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "F1") {
      this.toBandModelData = "F1"
      this.toBandList = [];
      this.toBandList.push("F1")
      this.toBandList.push("F2")
      this.toBandList.push("F3")
      this.toBandList.push("G0")
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "F2") {
      this.toBandModelData = "F2"
      this.toBandList = [];
      this.toBandList.push("F2")
      this.toBandList.push("F3")
      this.toBandList.push("G0")
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "F3") {
      this.toBandModelData = "F3"
      this.toBandList = [];
      this.toBandList.push("F3")
      this.toBandList.push("G0")
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "G0") {
      this.toBandModelData = "G0"
      this.toBandList = [];
      this.toBandList.push("G0")
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "G1") {
      this.toBandModelData = "G1"
      this.toBandList = [];
      this.toBandList.push("G1")
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "G2") {
      this.toBandModelData = "G2"
      this.toBandList = [];
      this.toBandList.push("G2")
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "M0") {
      this.toBandModelData = "M0"
      this.toBandList = [];
      this.toBandList.push("M0")
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "P0") {
      this.toBandModelData = "P0"
      this.toBandList = [];
      this.toBandList.push("P0")
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "R0") {
      this.toBandModelData = "R0"
      this.toBandList = [];
      this.toBandList.push("R0")
      this.toBandList.push("S0")
    } else if (event.detail.value == "S0") {
      this.toBandModelData = "S0"
      this.toBandList = [];
      this.toBandList.push("S0")
    }
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  // Below method to handle the list click event
  selectSkillFromList(data: string) {
    this.showList = false;
    this.selectedSkillValue = data;
    this.finalselectedSkillValue = data;
    this.filteredSkillsList = [];
    this.listItemSelected = true;
    // this.filteredSkillsList = this.allSkillsList;
  }

  clearFunction() {
    this.showList = false;
    this.listItemSelected = false;
    this.filteredSkillsList = this.allSkillsList;
  }

  // Below method to handle the user inputs
  searchValueChange(event: any) {

    this.showList = true;
    if (event.detail.value.length > 2) {
      if (this.listItemSelected == false) {
        this.filteredSkillsList = this.filteredSkillsList.filter(item => {
          return item.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1;
        })
      }
    } else if (event.detail.value.length == 0) {
      this.filteredSkillsList = this.allSkillsList;
    }
  }

  // Search button click event
  searchBtnClick() {
    // Redirect to Generic search detail page
    console.log(this.finalselectedSkillValue)
    console.log(this.selectedAccountValue)
    console.log(this.selectedSkillType)
    console.log(this.selectedLocation)
    console.log(this.selectedFromBand)
    console.log(this.selectedToBand)
    console.log(this.selectedBillability)
    console.log(this.selectedProjectOrPool)
    this.navCtrl.push('generic-search-results', {
      "skill": this.finalselectedSkillValue,
      "account": this.selectedAccountValue,
      "skillType": this.selectedSkillType,
      "location": this.selectedLocation,
      "fromBand": this.selectedFromBand,
      "toBand": this.selectedToBand,
      "billability": this.selectedBillability,
      "projectOrPool": this.selectedProjectOrPool
    })
  }

  // Get Project/Pool values
  getSelectedProjectOrPoolDropdownValues(data: string) {
    this.selectedProjectOrPool = data;
  }

  // Get Billabiliy values
  getSelectedBillabilityDropdownValues(data: string) {
    this.selectedBillability = data;
  }

  // Get Location values
  getSelectedLocationDropdownValues(data: string) {
    this.selectedLocation = data;
  }

  // Get Skill Type values
  getSelectedSkillTypeDropdownValues(data: string) {
    this.selectedSkillType = data;
  }

  // Get Selected Account values
  getSelectedAccountDropdownValues(account: any) {
    this.selectedAccountValue = account;
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
