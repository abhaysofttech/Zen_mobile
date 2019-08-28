import { Component, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform, MenuController, NavController, Events, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Constants } from './constants/Constants';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  dashboardMenuVisible: boolean = false;
  associatesManagementMenuVisible: boolean = false;
  rwfMenuVisible: boolean = false;
  personalInfoMenuVisible: boolean = false;
  searchEngineMenuVisibale: boolean = false;
  projectManagementMenuVisible: boolean = false;
  dataUploadMenuVisible: boolean = false;
  setupMenuVisible: boolean = false;
  changeRoleData: any = null;
  pauseTime: any;
  resumeTime: any;

  public role: any;
  public defaultRole: any;
  public empName: any;
  public empRoles: string[] = [];
  public profilePicPath: any;
  public appPages = [
    {
      title: 'Home',
      url: '/home'
    },
    {
      title: 'Dashboard',
      url: '/dashboard'
    },
    {
      title: 'RWF',
      url: '/rwf'
    },
    {
      title: 'Personal Info',
      url: '/personalinfo'
    },
    {
      title: 'Search Engine',
      url: '/searchengine'
    },
    {
      title: 'Directory',
      url: '/directory'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private storage: Storage,
    private navCtrl: NavController,
    private events: Events,
    private sanitizer: DomSanitizer,
    private alertController: AlertController,
    private zone: NgZone
  ) {

    // this.storage.get('staffName').then((data) => {
    //   this.empName = data;
    // })

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

     // Application went to background or user switches to new application pause method will be call
     this.platform.pause.subscribe(() => {
      // Capture the timestamp
      this.pauseTime = new Date();
      console.log('App Paused');
    })
    // Application resumes from the background or user came back from other application resume method will be call
    this.platform.resume.subscribe(() => {
      // Capture the timestamp
      this.resumeTime = new Date();
      console.log('App Resumed');
      // Calculate the time difference between pause timestamp & resume timestamp
      let diffTime = this.resumeTime - this.pauseTime;
      // Difference time is morethan the limit then user need to login again
      if (diffTime - Constants.SESSION_TIMEOUT_LIMIT > 0) {
        // Time difference is morethan the limit
        this.sessionExpireAlertDialog();
      }
    })

    // Get login role from Angular Events
    this.events.subscribe('userInformation', (data) => {
      this.role = data[0];
      this.defaultRole = data[0];
      this.empName = data[1];
      this.profilePicPath = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + data[2]);

      // emp roles data
      this.empRoles = [];
      this.empRoles = data[3]
    })
  }

  async sessionExpireAlertDialog() {
    console.log('Inside alert method');
    // Code to show session expired alert dialog 
    const alert = await this.alertController.create({
      header: 'Session Expired',
      message: 'Your session expired due to inactivity. Please click Ok to login again.',
      buttons: [
        {
          text: "Ok",
          handler: (okClick) => {
            // Redirect to Login page
            this.pauseTime = null;
            this.resumeTime = null;
            this.navCtrl.navigateRoot('login')
          }
        }]
    });
    alert.backdropDismiss = false;
    await alert.present();
  }

  // Role change event
  async onRoleChange(role: string) {

    if (role.length > 0) {

      // Code to close the side menu
      this.menuCtrl.close()

      // Code to show alert dialog to change the role
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Do you want to change the role?',
        buttons: [{
          text: "No",
          handler: (noClick) => {
            this.changeRoleData = null;
          }
        },
        {
          text: "Yes",
          handler: (okClick) => {
            // Update newly selected role in database
            this.storage.set('role', role).then((response: any) => {
              // refresh the side menu content based on role
              this.role = response;
              // refresh the landing page based on role
              this.events.publish('roleChange', [this.role])
            })
              .catch((error: any) => {
                console.log(error)
                this.showAlert('Alert', 'Unable to switch role, please try after sometime');
              })
          }
        }]
      });

      alert.backdropDismiss = false;
      await alert.present();
    }
  }

  homeMenuClick() {
    // Code to close the side menu
    this.menuCtrl.close()
  }

  // Directory menu click
  directoryMenuClick() {
    // Code to close the side menu
    this.menuCtrl.close()
    // Redirect to Directory page
    this.navCtrl.navigateForward('directory')
  }

  // Demand Forecasting menu click
  demandForecastingMenuClick() {
    // Uncollapse RWF menu
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    // Code to close the side menu
    this.menuCtrl.close()
    // Redirect to RWF Demand List
    this.navCtrl.navigateForward('demand-list')
  }

  // My RWF Transaction menu click
  myRwfTransactionMenuClick() {
    // Uncollapse RWF menu
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    // Code to close the side menu
    this.menuCtrl.close()
    // Redirect to My RWF Transaction page
    this.navCtrl.navigateForward('my-rwf-transaction')
  }

  // RWF Dashboard menu click
  rwfDashboardMenuClick() {
    // Uncollapse RWF menu
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    // Code to close the side menu
    this.menuCtrl.close()
    // Redirect to RWF Dashboard List
    this.navCtrl.navigateForward('rwf-dashboard-tabs/rwf-dashboard')
  }

  // RWF Dashboard menu click
  profileUpdateMenuClick() {
    // Uncollapse RWF menu
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    // Code to close the side menu
    this.menuCtrl.close()
    // Redirect to RWF Dashboard List
    this.navCtrl.navigateForward('profileUpdate');
  }

  // RWF Management menu click 
  rwfManagementMenuClick() {
    // Uncollapse RWF menu
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    // Code to close the side menu
    this.menuCtrl.close()
    // Redirect to RWF Management page
    this.navCtrl.navigateForward('rwf-management')
  }

  // 25 Window menu click
  twentyFiveWindowMenuClick() {
    // Uncollapse Dashboard menu
    if (this.dashboardMenuVisible == true) {
      this.dashboardMenuVisible = false;
    }
    // Code to close the side menu
    this.menuCtrl.close()
    // Redirect to 25 Window page
    this.navCtrl.navigateForward('twenty-five-window')
  }

  // Search By Associate menu click
  searchByAssociateMenuClick() {
    // Uncollapse Dashboard menu 
    if (this.searchEngineMenuVisibale == true) {
      this.searchEngineMenuVisibale = false;
    }
    // Code to close the side menu
    this.menuCtrl.close()

    // Redirect to Search By Associate page
    this.navCtrl.navigateForward('search-by-associate')
  }

  // Generic Search menu click
  genericSearchMenuClick() {
    // Uncollapse Dashboard menu 
    if (this.searchEngineMenuVisibale == true) {
      this.searchEngineMenuVisibale = false;
    }
    // Code to close the side menu
    this.menuCtrl.close()

    // Redirect to Search By Associate page
    this.navCtrl.navigateForward('generic-search')
  }

  dashBoardMenuClick() {
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    if (this.personalInfoMenuVisible == true) {
      this.personalInfoMenuVisible = false;
    }
    if (this.searchEngineMenuVisibale == true) {
      this.searchEngineMenuVisibale = false;
    }
    if (this.associatesManagementMenuVisible == true) {
      this.associatesManagementMenuVisible = false;
    }
    if (this.projectManagementMenuVisible == true) {
      this.projectManagementMenuVisible = false;
    }
    if (this.dashboardMenuVisible == false) {
      this.dashboardMenuVisible = true;
    } else if (this.dashboardMenuVisible == true) {
      this.dashboardMenuVisible = false;
    }
  }

  associatesManagementMenuClick() {
    if (this.dashboardMenuVisible == true) {
      this.dashboardMenuVisible = false;
    }
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    if (this.personalInfoMenuVisible == true) {
      this.personalInfoMenuVisible = false;
    }
    if (this.searchEngineMenuVisibale == true) {
      this.searchEngineMenuVisibale = false;
    }
    if (this.projectManagementMenuVisible == true) {
      this.projectManagementMenuVisible = false;
    }
    if (this.associatesManagementMenuVisible == false) {
      this.associatesManagementMenuVisible = true;
    } else if (this.associatesManagementMenuVisible == true) {
      this.associatesManagementMenuVisible = false;
    }
  }

  projectManagementMenuClick() {
    if (this.dashboardMenuVisible == true) {
      this.dashboardMenuVisible = false;
    }
    if (this.associatesManagementMenuVisible == true) {
      this.associatesManagementMenuVisible = false;
    }
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    if (this.personalInfoMenuVisible == true) {
      this.personalInfoMenuVisible = false;
    }
    if (this.searchEngineMenuVisibale == true) {
      this.searchEngineMenuVisibale = false;
    }
    if (this.projectManagementMenuVisible == false) {
      this.projectManagementMenuVisible = true;
    } else if (this.projectManagementMenuVisible == true) {
      this.projectManagementMenuVisible = false;
    }
  }

  rwfMenuClick() {
    if (this.dashboardMenuVisible == true) {
      this.dashboardMenuVisible = false;
    }
    if (this.personalInfoMenuVisible == true) {
      this.personalInfoMenuVisible = false;
    }
    if (this.searchEngineMenuVisibale == true) {
      this.searchEngineMenuVisibale = false;
    }
    if (this.associatesManagementMenuVisible == true) {
      this.associatesManagementMenuVisible = false;
    }
    if (this.projectManagementMenuVisible == true) {
      this.projectManagementMenuVisible = false;
    }
    if (this.dataUploadMenuVisible == true) {
      this.dataUploadMenuVisible = false;
    }
    if (this.setupMenuVisible == true) {
      this.setupMenuVisible = false;
    }
    if (this.rwfMenuVisible == false) {
      this.rwfMenuVisible = true;
    } else if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
  }

  personalInfoMenuClick() {
    if (this.dashboardMenuVisible == true) {
      this.dashboardMenuVisible = false;
    }
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    if (this.searchEngineMenuVisibale == true) {
      this.searchEngineMenuVisibale = false;
    }
    if (this.associatesManagementMenuVisible == true) {
      this.associatesManagementMenuVisible = false;
    }
    if (this.projectManagementMenuVisible == true) {
      this.projectManagementMenuVisible = false;
    }
    if (this.dataUploadMenuVisible == true) {
      this.dataUploadMenuVisible = false;
    }
    if (this.setupMenuVisible == true) {
      this.setupMenuVisible = false;
    }
    if (this.personalInfoMenuVisible == false) {
      this.personalInfoMenuVisible = true;
    } else if (this.personalInfoMenuVisible == true) {
      this.personalInfoMenuVisible = false;
    }
  }

  searchEngineMenuClick() {
    if (this.dashboardMenuVisible == true) {
      this.dashboardMenuVisible = false;
    }
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    if (this.personalInfoMenuVisible == true) {
      this.personalInfoMenuVisible = false;
    }
    if (this.associatesManagementMenuVisible == true) {
      this.associatesManagementMenuVisible = false;
    }
    if (this.projectManagementMenuVisible == true) {
      this.projectManagementMenuVisible = false;
    }
    if (this.searchEngineMenuVisibale == false) {
      this.searchEngineMenuVisibale = true;
    } else if (this.searchEngineMenuVisibale == true) {
      this.searchEngineMenuVisibale = false;
    }
  }

  dataUploadMenuClick() {
    if (this.setupMenuVisible == true) {
      this.setupMenuVisible = false;
    }
    if (this.personalInfoMenuVisible == true) {
      this.personalInfoMenuVisible = false;
    }
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    if (this.dataUploadMenuVisible == false) {
      this.dataUploadMenuVisible = true;
    } else if (this.dataUploadMenuVisible == true) {
      this.dataUploadMenuVisible = false;
    }
  }

  setupMenuClick() {
    if (this.dataUploadMenuVisible == true) {
      this.dataUploadMenuVisible = false;
    }
    if (this.personalInfoMenuVisible == true) {
      this.personalInfoMenuVisible = false;
    }
    if (this.rwfMenuVisible == true) {
      this.rwfMenuVisible = false;
    }
    if (this.setupMenuVisible == false) {
      this.setupMenuVisible = true;
    } else if (this.setupMenuVisible == true) {
      this.setupMenuVisible = false;
    }
  }

  logOut() {

    // Clear the selected value
    this.changeRoleData = null;
    // unsubscribe the rolechange event
    this.events.unsubscribe('roleChange');
    // Redirect to Login page
    this.navCtrl.navigateRoot('login')
  }

  // Generic method to display alert message with Ok button
  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }
}
