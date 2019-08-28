import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-search-by-associate',
  templateUrl: './search-by-associate.page.html',
  styleUrls: ['./search-by-associate.page.scss'],
})
export class SearchByAssociatePage implements OnInit {

  public buttonIcon: string;
  public buttonText: string = "Back";
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empRole: string;
  public listData: string[];
  public selectedValue: string;
  private listItemSelected: boolean = false;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService) {

    // Hide the side menu for Search By Associate page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })
    this.storage.get('role').then((data) => {
      this.empRole = data;
    })
  }

  ngOnInit() {
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  // Below method to handle the user inputs
  searchValueChange(event: any) {

    // Check input keyword size
    if (event.detail.value.length > 2) {
      if (this.listItemSelected == false) {
        // Search Similar Associate API call
        this.searchSimilarAssociateAPI(event.detail.value);
      }
    }
  }

  clearFunction() {
    this.listItemSelected = false;
    this.listData = [];
  }

  // Below method to fetch similar associates data from api
  searchSimilarAssociateAPI(keyword: string) {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available

        this.api.searchSimilarAssociates(this.authToken, keyword)
          .then((response: any) => {

            this.listData = [];
            let searchSimilarAssociateResponse = JSON.parse(response.data);
            console.log('Search Similar Associate Response -> ', searchSimilarAssociateResponse)
            this.listData = searchSimilarAssociateResponse;
          })
          .catch((error) => {
            console.log(error)
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

  // Below method to handle the list click event
  selectAssociateFromList(data: string) {

    this.selectedValue = data;
    this.listData = [];
    this.listItemSelected = true;
  }

  // Below method to handle Search Associate click event
  searchAssociateBtnClick() {
    this.searchAssociateApiCall(this.selectedValue);
  }

  // This method will fetch the Associate details
  searchAssociateApiCall(keyword: string) {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.searchAssociate(this.authToken, keyword, this.empRole)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let searchAssociateResponse = JSON.parse(response.data);
            console.log('Search Associate Response -> ', searchAssociateResponse)

            if (searchAssociateResponse.listOfSearchAssociate.length == 0) {
              // Show alert with error message
              this.showAlert(Constants.ERROR_TITLE, "No Such Associate Found");
            } else {
              // Redirect to Employee details page
              let data = {
                "searchKeyword": keyword,
                "searchResponse": searchAssociateResponse
              }
              this.navCtrl.push('search-engine-employee-details', data)
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
