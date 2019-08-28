import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform, PopoverController, Events } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';
import { SortPopoverComponent } from './sort-popover/sort-popover.component';

@Component({
  selector: 'app-generic-search-results',
  templateUrl: './generic-search-results.page.html',
  styleUrls: ['./generic-search-results.page.scss'],
})
export class GenericSearchResultsPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empRole: string;
  public listData: any[];

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private popoverController: PopoverController,
    private events: Events) {

    // Hide the side menu for Search By Associate page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('role').then((data) => {
      this.empRole = data;
    })
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;

      // Fetch Search resuls
      this.getSearchResultsData();
    })
  }

  ngOnInit() {
  }

  // Staff ID click event
  staffIdClick(keyword: string) {
    this.searchAssociateApiCall(keyword)
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

  // Below metod to fetch data from API
  getSearchResultsData() {
    // Get user clicked tile details using Nav Service
    let data = this.navCtrl.get()

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.getGenericSearchData(this.authToken, data.account, data.skill, data.location, data.fromBand,
          data.toBand, data.billability, data.skillType, data.projectOrPool)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let genericSearchResponse = JSON.parse(response.data);
            console.log('Generic Search Response -> ', genericSearchResponse)

            // clear the previous list values
            this.listData = genericSearchResponse
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

  // Below method to clear the search values
  clearFunction() {

  }

  // Filter menu click event
  async filterMenuClick(event: Event) {
    const popover = await this.popoverController.create({
      component: SortPopoverComponent,
      event: event,
      translucent: true
    });
    // Get sort filter data from Angular Events
    this.events.subscribe('sortFilter', (data) => {
      // Sort Array dta
      this.sortArray(data)
    });
    return await popover.present();
  }

  sortArray(data: string) {
    if (data == 'staffIdAsc') {
      // Staff ID Ascending order
      this.listData = this.ascOrderSortByKey(this.listData, 'staffid')
    } else if (data == 'staffIdDesc') {
      // Staff ID Descending order
      this.listData = this.desOrderSortByKey(this.listData, 'staffid')
    } else if (data == 'staffNameAsc') {
      // Staff ID Ascending order
      this.listData = this.ascOrderSortByKey(this.listData, 'staffname')
    } else if (data == 'staffNameDesc') {
      // Staff ID Descending order
      this.listData = this.desOrderSortByKey(this.listData, 'staffname')
    } else if (data == 'pmNameAsc') {
      // Staff ID Ascending order
      this.listData = this.ascOrderSortByKey(this.listData, 'pm')
    } else if (data == 'pmNameDesc') {
      // Staff ID Descending order
      this.listData = this.desOrderSortByKey(this.listData, 'pm')
    }
    // unsubscribe event
    this.events.unsubscribe('sortFilter');
  }

  // Ascending order sorting
  public ascOrderSortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 0 : 1));
    });
  }

  // Descending order sorting
  public desOrderSortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 0 : 1));
    });
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
