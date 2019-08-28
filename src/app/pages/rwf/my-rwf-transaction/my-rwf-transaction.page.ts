import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform, PopoverController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';
import { AssociateObject } from './associateObject';
import { IonContent } from '@ionic/angular';
import { DatePipe } from '@angular/common'

const lineChartData = {
  chart: {
    caption: "History Ratings",
    yaxisname: "Ratings",
    rotatelabels: "0",
    setadaptiveymin: "1",
    yAxisMinValue: "0",
    yAxisMaxValue: "5",
    numDivLines: "10",
    plottooltext: "$value",
    theme: "fusion"
  },
  data: []
};

@Component({
  selector: 'app-my-rwf-transaction',
  templateUrl: './my-rwf-transaction.page.html',
  styleUrls: ['./my-rwf-transaction.page.scss'],
})
export class MyRwfTransactionPage implements OnInit {

  @ViewChild('pageScroll') content: IonContent;
  @ViewChild('picker') calendarPicker: any;

  chartWidth = 320;
  chartHeight = 400;
  chartType = 'line';
  chartDataFormat = 'json';
  lineChartDataSource = lineChartData;
  private apiResponse: any;
  public ratingDetailsApiResponse: any;
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empRole: string;
  public empNumber: string;
  public listData: any[];
  private selectedCandidatesObjectArray: any[] = [];
  public selectButtonVisible: boolean = false;
  associateObject: AssociateObject = {};
  public selectedCandidatesDataObject: any;
  public shortlistedCandidatesDataObject: any;
  public showRatingsGraph: boolean = false;
  public showRatingDetails: boolean = false;
  public showDetailsViewForSelectedCandidates: boolean = false;
  public showDetailsViewForShortlistedCandidates: boolean = false;
  public technicalEvalutionData: any;
  public functionalEvalutionData1: any;
  public functionalEvalutionData2: any;
  public todaysData: string;

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
    private datepipe: DatePipe) {

    // Get today date, which will set to Requirement date calendar
    this.todaysData = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    // Hide the side menu for My RWF Transactions page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('role').then((data) => {
      this.empRole = data;
    })
    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
    })
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;

      // Fetch My RWF Transactions data
      this.getMyRwfTransactionsResultsData();
    })
  }

  ngOnInit() {
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  // Below method to fetch My RWF Transaction data
  getMyRwfTransactionsResultsData() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.getMyRwfTransactions(this.authToken, this.empNumber, this.empRole)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let myRwfTransactionsResponse = JSON.parse(response.data);
            console.log('My RWF Transactions Response -> ', myRwfTransactionsResponse)

            // clear the previous list values
            this.listData = [];
            this.listData = myRwfTransactionsResponse.data

            // Sort list data, show shortlisted data will be first & selected data will be last
            this.listData = this.sortListByKey(this.listData, "dropdown")

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

  // Handle Ratings click event
  ratingsClick(data: any) {
    console.log(data)

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 35;
      this.chartHeight = this.platform.height() - 100;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.withWeitageHistoryRatings(this.authToken, data.StaffNo, data.AssociateData.projectid,
          data.AssociateData.trackid)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            // Clear previous values
            this.lineChartDataSource.data = [];
            this.apiResponse = {};

            this.apiResponse = JSON.parse(response.data);
            console.log('History ratings charts response -> ', this.apiResponse)

            // process chart data
            for (let data of this.apiResponse.Ratings) {
              this.lineChartDataSource.data.push({
                "label": data.lastUpdatedOn,
                "value": data.finalRating
              })
            }

            // show graph
            this.showRatingsGraph = true;
            // Scroll to screen top position
            this.content.scrollToTop(0);
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

  // Rating details click event
  ratingDetailsClick(ratingsData, associateName) {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.withWeitageHistoryRatingsDrilldown(this.authToken, associateName,
          ratingsData.staffNo, ratingsData.projectId, ratingsData.trackId, ratingsData.iteration)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            // Clear previous values
            this.ratingDetailsApiResponse = {};
            this.technicalEvalutionData = {};
            this.functionalEvalutionData1 = {};
            this.functionalEvalutionData2 = {};

            this.ratingDetailsApiResponse = JSON.parse(response.data);
            this.technicalEvalutionData = this.ratingDetailsApiResponse['Technical Evaluation']
            this.functionalEvalutionData1 = this.ratingDetailsApiResponse['Functional Evaluation 1']
            this.functionalEvalutionData2 = this.ratingDetailsApiResponse['Functional Evaluation 2']
            console.log('History ratings drilldown charts response -> ', this.ratingDetailsApiResponse)

            // Show rating details
            this.showRatingDetails = true;
            // Scroll to screen top position
            this.content.scrollToTop(0);
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

  // Selected candidates check box change event listner
  shortlistedCandidateCheckboxChange(event: any, data: any, position) {
    if (event.detail.checked == true) {
      // checkbox value checked
      // selected value add into array
      this.selectedCandidatesObjectArray.push(data)
    } else if (event.detail.checked == false) {
      // checkbox value unchecked
      // remove unchecked data from array
      var index = this.selectedCandidatesObjectArray.indexOf(data);
      this.selectedCandidatesObjectArray.splice(index, 1)
    }

    // Enable or disable submit button based on the array size
    if (this.selectedCandidatesObjectArray.length == 0) {
      // Disable submit button
      this.selectButtonVisible = false;
    } else {
      // Enable submit button
      this.selectButtonVisible = true;
    }
  }

  // Submit button click event
  async submitBtnClick() {
    // Initialize variable
    let dataArray: any[] = [];
    // Prepare object array for Submit API call
    for (let i = 0; i < this.selectedCandidatesObjectArray.length; i++) {
      let dataObject = {};

      dataObject['staff_id'] = this.selectedCandidatesObjectArray[i].StaffNo;
      dataObject['mgr_id'] = this.selectedCandidatesObjectArray[i].AssociateData.manager_Id;
      dataObject['release_date'] = this.selectedCandidatesObjectArray[i].AssociateData.date_release;
      dataObject['available_date'] = this.selectedCandidatesObjectArray[i].AssociateData.available_date;
      dataObject['requirement_date'] = this.selectedCandidatesObjectArray[i].AssociateData.requirement_date;
      dataObject['ear_status'] = "Selected";
      dataObject['ear_reference'] = this.selectedCandidatesObjectArray[i].AssociateData.earmarking_ref;
      dataObject['shared_status'] = this.selectedCandidatesObjectArray[i].AssociateData.shared_status;
      dataObject['coments_id'] = this.selectedCandidatesObjectArray[i].AssociateData.coments_id;
      dataObject['select_status'] = this.selectedCandidatesObjectArray[i].AssociateData.select_status;
      dataObject['pgm_Manager'] = this.selectedCandidatesObjectArray[i].AssociateData.pgm_Manager;
      dataObject['comments'] = this.selectedCandidatesObjectArray[i].AssociateData.comments;
      dataObject['Shortlisted_DATE'] = this.selectedCandidatesObjectArray[i].AssociateData.shortlisted_DATE;
      dataObject['res_mgmt_id'] = this.selectedCandidatesObjectArray[i].AssociateData.res_mgmt_id;
      dataObject['earmarked_on_date'] = null;
      dataObject['desk_loc'] = null;
      dataObject['asset_details'] = null;
      dataObject['staff_name'] = this.selectedCandidatesObjectArray[i].AssociateData.staff_Name;
      dataObject['source'] = this.selectedCandidatesObjectArray[i].AssociateData.source;
      dataObject['scheduler_date'] = null;
      dataObject['Rated_NonRated'] = null;
      dataObject['Rated_since'] = null;
      dataObject['cecDeactivationdate'] = null;
      dataObject['RESIGNATION_GIVEN_DATE'] = null;
      dataObject['SEPERATION_DATE'] = null;
      dataObject['RESIGNATION_COMMENTS'] = null;
      dataObject['RELEASE_COMMENTS'] = null;
      // insert dataobject into array
      dataArray.push(dataObject)
    }
    // Code to show alert dialog for confirmation before submitting
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'The selected resource(s) will be inserted at once. Are you sure want to proceed now.',
      buttons: [{
        text: "No",
        handler: (noClick) => {
        }
      },
      {
        text: "Yes",
        handler: (okClick) => {

          // Check for platform ready or not
          if (this.platform.is('cordova')) {
            // platform found
            // Check for Internet connection
            if (this.network.checkNetWorkConnection()) {
              // Internet connection available
              // Start loader
              this.showLoader();

              this.api.submitShortlistMyRwfTransactionsData(this.authToken, this.empNumber, this.empRole, dataArray)
                .then((response: any) => {

                  console.log('My RWF Submit Response -> ', response)

                  if (response.status == 200 && response.data == "Submit Successful") {

                    // Refresh My RWF Transactions page
                    this.api.getMyRwfTransactions(this.authToken, this.empNumber, this.empRole)
                      .then((response: any) => {
                        // Dismiss the loader
                        this.dismissLoader();

                        let myRwfTransactionsResponse = JSON.parse(response.data);
                        console.log('My RWF Transactions Response -> ', myRwfTransactionsResponse)

                        // clear the previous list values
                        this.listData = [];
                        this.listData = myRwfTransactionsResponse.data

                        // Sort list data, show shortlisted data will be first & selected data will be last
                        this.listData = this.sortListByKey(this.listData, "dropdown")

                      })
                      .catch((error) => {
                        console.log(error)
                        // Dismiss the loader
                        this.dismissLoader();
                        // Show alert with error message
                        this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
                      })
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
      }]
    });

    alert.backdropDismiss = false;
    await alert.present();
  }

  // Show date picker on calender icon click event
  showDatePicker() {
    this.calendarPicker.open();
  }

  // Rating details close button click event
  ratingDetailsCloseButton() {
    // hide rating details
    this.showRatingDetails = false;
  }

  // Shortlisted candidates detailed view close button click event
  shortlistedCandidatesDetailViewCloseButton() {
    //hide details view
    this.showDetailsViewForShortlistedCandidates = false;
    //clear object data
    this.shortlistedCandidatesDataObject = {};
  }

  // Selected candidates detailed view close button click event
  selectedCandidatesDetailViewCloseButton() {
    //hide details view
    this.showDetailsViewForSelectedCandidates = false;
    //clear object data
    this.selectedCandidatesDataObject = {};
  }

  // Graph close button click event
  graphCloseButton() {
    // hide graph
    this.showRatingsGraph = false;
    // Clear graph data
    this.lineChartDataSource.data = [];
  }

  // Handle Detail view for Shortlisted Candidates click event
  detailViewForShortlistedCandidates(data: any, position: any) {
    //show details view
    this.showDetailsViewForShortlistedCandidates = true;
    // Scroll to screen top position
    this.content.scrollToTop(0);
    // clear previous value
    this.shortlistedCandidatesDataObject = {};
    // Assign value to the object
    this.shortlistedCandidatesDataObject = data;
  }

  // Handle Detail view for Selected Candidates click event
  detailViewForSelectedCandidates(data: any) {
    //show details view
    this.showDetailsViewForSelectedCandidates = true;
    // Scroll to screen top position
    this.content.scrollToTop(0);
    // clear previous value
    this.selectedCandidatesDataObject = {};
    // Assign value to the object
    this.selectedCandidatesDataObject = data;
  }

  // Handle cancel shortlist click event
  async cancelShortlistBtnClick(data: any) {

    // Code to show alert dialog for confirmation before cancelling
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: 'Do you want to cancel shortlisted associate?',
      buttons: [{
        text: "No",
        handler: (noClick) => {
        }
      },
      {
        text: "Yes",
        handler: (okClick) => {
          // Clear previous values
          let associateDataArray: any[] = []
          this.associateObject = {};

          // Prepare Associate object
          this.associateObject.staff_id = data.StaffNo;
          this.associateObject.mgr_id = data.AssociateData.mgr_id;
          this.associateObject.release_date = data.AssociateData.date_release;
          this.associateObject.available_date = data.AssociateData.available_date;
          this.associateObject.requirement_date = data.AssociateData.requirement_date;
          this.associateObject.ear_status = data.AssociateData.ear_status;
          this.associateObject.ear_reference = data.AssociateData.earmarking_ref;
          this.associateObject.shared_status = data.AssociateData.shared_status;
          this.associateObject.coments_id = data.AssociateData.coments_id;
          this.associateObject.select_status = data.AssociateData.select_status;
          this.associateObject.pgm_Manager = data.AssociateData.pgm_Manager;
          this.associateObject.comments = data.AssociateData.comments;
          this.associateObject.Shortlisted_DATE = data.AssociateData.shortlisted_DATE;
          this.associateObject.res_mgmt_id = data.AssociateData.res_mgmt_id;
          this.associateObject.earmarked_on_date = null;
          this.associateObject.desk_loc = null;
          this.associateObject.asset_details = null;
          this.associateObject.staff_name = data.AssociateData.staff_Name;
          this.associateObject.source = data.AssociateData.source;
          this.associateObject.scheduler_date = null;
          this.associateObject.Rated_NonRated = null;
          this.associateObject.Rated_since = null;
          this.associateObject.cecDeactivationdate = null;
          this.associateObject.RESIGNATION_GIVEN_DATE = null;
          this.associateObject.SEPERATION_DATE = null;
          this.associateObject.RESIGNATION_COMMENTS = data.AssociateData.res_comments;
          this.associateObject.RELEASE_COMMENTS = data.AssociateData.rel_comments;

          // Push associate object into array
          associateDataArray.push(this.associateObject);

          // Check for platform ready or not
          if (this.platform.is('cordova')) {
            // platform found
            // Check for Internet connection
            if (this.network.checkNetWorkConnection()) {
              // Internet connection available
              // Start loader
              this.showLoader();

              this.api.cancelShortlistMyRwfTransactionsData(this.authToken, this.empNumber, this.empRole, associateDataArray)
                .then((response: any) => {

                  console.log('My RWF Cancel Shortlist Response -> ', response)

                  if (response.status == 200 && response.data == "Cancel Successful") {

                    // Refresh My RWF Transactions page
                    this.api.getMyRwfTransactions(this.authToken, this.empNumber, this.empRole)
                      .then((response: any) => {
                        // Dismiss the loader
                        this.dismissLoader();

                        let myRwfTransactionsResponse = JSON.parse(response.data);
                        console.log('My RWF Transactions Response -> ', myRwfTransactionsResponse)

                        // clear the previous list values
                        this.listData = [];
                        this.listData = myRwfTransactionsResponse.data

                        // Sort list data, show shortlisted data will be first & selected data will be last
                        this.listData = this.sortListByKey(this.listData, "dropdown")

                      })
                      .catch((error) => {
                        console.log(error)
                        // Dismiss the loader
                        this.dismissLoader();
                        // Show alert with error message
                        this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
                      })
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
      }]
    });

    alert.backdropDismiss = false;
    await alert.present();
  }

  // Sorting list
  public sortListByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a.AssociateData[key]; var y = b.AssociateData[key];
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
