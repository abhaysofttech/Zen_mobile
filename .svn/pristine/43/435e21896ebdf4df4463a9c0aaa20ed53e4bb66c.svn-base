import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { TreeNode } from 'primeng/api';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { TestBed } from '@angular/core/testing';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.page.html',
  styleUrls: ['./directory.page.scss'],
})
export class DirectoryPage implements OnInit {

  @ViewChild('pageScroll') content: IonContent;

  public profilePicPath: any;
  private authToken: string;
  private empNumber: string;
  private loader: any;
  private loaderActive: boolean = false;
  public directoryResponse: any;
  public directoryImagesPath: any;
  public listData: string[];
  public selectedValue: string;
  private listItemSelected: boolean = false;
  public treeNodeList: TreeNode[] = [];
  public reporteesList: any[] = [];

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private sanitizer: DomSanitizer,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer) {

    // Hide the side menu for donut page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })
    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
      // Fetch Directory data
      this.getDirectoryDataApiCall(this.empNumber);
    })


  }

  ngOnInit() {
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

  // Below method to fetch similar associates data from api
  searchSimilarAssociateAPI(keyword: string) {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available

        this.api.searchSimilarAssociatesForDirectory(this.authToken, keyword)
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
  selectAssociateFromList(data: Object) {

    this.selectedValue = data['name'];
    this.listData = [];
    this.listItemSelected = true;
    this.directoryResponse = {};
    this.directoryResponse.manager = {};

    // API call to fetch data for selected associate
    this.getDirectoryDataApiCall(data['id']);
  }

  clearFunction() {
    this.listItemSelected = false;
    this.listData = [];
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  // API call to fetch Directory data
  getDirectoryDataApiCall(staffNumber: string) {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();
        // API call
        this.api.getDirectoryData(this.authToken, staffNumber)
          .subscribe(response => {

            let responseData = JSON.parse(response[0].data);
            console.log('Directory Response -> ', responseData)
            this.directoryResponse = responseData;

            let profilePictureResponse = JSON.parse(response[1].data);
            console.log('Profile Picutre API Response -> ', profilePictureResponse)
            if (profilePictureResponse != null) {
              this.profilePicPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + profilePictureResponse);
            }

            this.directoryImagesPath = this.api.getDirectoryImagesPath()

            // API to fetch Hierarchie data
            this.api.getUserProfileWithHierarchie(this.authToken, staffNumber)
              .then(response => {
                // Dismiss the loader
                this.dismissLoader();

                this.treeNodeList = response.hierarchy;
                console.log(this.treeNodeList)

                // Set tree width 100%
                document.querySelector(".ui-tree").setAttribute("style","width: 100%;");
              })
              .catch(
                error => this.handleGetProfileErrors(error, this)
              );
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

  // Send email to associate
  async mailAssociate(mailId: string) {
    // Dialog to open mail confirmation
    const mailDialog = await this.alertCtrl.create({
      message: 'Do you want send an mail to ' + this.directoryResponse.staff_name,
      buttons: ['Cancel', {
        text: 'Send Email',
        handler: () => {
          let email = {
            to: mailId,
            isHtml: true
          }
          // Send email via email client
          this.emailComposer.open(email);
        }
      }]
    })
    await mailDialog.present();
  }

  // Make a phone call to associate
  async callAssociate(number: string) {
    if (number != null) {
      // contact number available  
      // alert dialog to make call
      const callDialog = await this.alertCtrl.create({
        message: 'Do you want to call ' + this.directoryResponse.staff_name,
        buttons: ['Cancel', {
          text: 'Call',
          handler: () => {
            this.callNumber.callNumber(number, true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
          }
        }]
      })
      await callDialog.present();
    } else {
      // contact not number available  
      this.showAlert('Alert', 'Associate contact number not available to make call')
    }
  }

  // Hierarchie triangle click event
  loadNode(event) {
    let updatedData : TreeNode[] = [];
    if (event.node) {
      if (event.node.data.lazyLoading) {
        this.api.getReporteeHierarchie(this.authToken, event.node.data.id)
          .then(response => {
            for(let data of response){
              data.data.image = this.api.getDirectoryImagesPath() + data.data.image
              updatedData.push(data)
            }
            event.node.children = updatedData
          })
          .catch(error => this.handleGetProfileErrors(error, this));
      }
    }
  }

  // Hierarchie name click event
  loadUserProfileOnClick(empNumber: string) {
    // Scroll to screen top position
    this.content.scrollToTop(0);
    // API call to fetch the data
    this.getDirectoryDataApiCall(empNumber);
  }

  // Generic method to handle errors
  handleGetProfileErrors(error: any, thisObj: any) {
    console.log(error)
    // Dismiss the loader
    this.dismissLoader();
    alert("Error in Retrieval of Data" + error);
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
