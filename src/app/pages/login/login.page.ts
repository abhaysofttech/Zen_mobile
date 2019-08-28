import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, AlertController, NavController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx'
import { ApiService } from 'src/app/services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public defaultPaddingLeft: number = 0;
  public screenProRatio: number = 0;
  private loader: any;
  private loaderActive: boolean = false;
  private happinessIndexValue: number;
  private devicePlatfrom: string;
  private gpsLocation: string = "";
  public happinessSliderValue: number = 50;
  public sadImageShowFlag: boolean = true;
  public sadArrowsShowFlag: boolean = true;
  public happyImageShowFlag: boolean = true;
  public happyArrowShowFlag: boolean = true;
  public smilyImageSrc: string;
  loginData = {
    username: '',
    // password: ''
    password: '$Zen2017'
  }

  constructor(public menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private network: NetworkService,
    private alertCtrl: AlertController,
    private api: ApiService,
    private storage: Storage,
    private router: Router,
    private secureStorage: SecureStorage,
    private navCtrl: NavController,
    private platform: Platform,
    private events: Events,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private openNativeSettings: OpenNativeSettings,
    private alertController: AlertController) {

    // Hide the side menu for login page
    this.menuCtrl.enable(false);

    // Default smily image will be nuetral
    this.happinessIndexValue = 50;
    this.smilyImageSrc = "../../../assets/imgs/nuetral.png";

    this.initializeApp();

  }

  initializeApp() {
    // Check user location services are available or not
    this.platform.ready().then((ready) => {
      this.diagnostic.isGpsLocationEnabled().then((isAvailable) => {
        if (isAvailable == false) {
          // Location services are disabled
          this.locationServicesAreNotAvailableAlert();
        }
      })
    })

    // Calculate screen pro rate ration for emoji sliding
    if (this.platform.is('cordova')) {
      // screen width minus left & rigth padding
      this.screenProRatio = (this.platform.width() - 130) / 100;
      console.log(this.screenProRatio);
      this.defaultPaddingLeft = this.happinessIndexValue * this.screenProRatio;
    }
  }

  ngOnInit() {

  }

  async locationServicesAreNotAvailableAlert() {

    // Alert to open settings page
    const alert = await this.alertController.create({
      header: 'Your Location Services are disabled',
      message: 'Turn On Location Services to Allow "ZenForte" to Determine Your Location, Click "Ok" to open settings page',
      buttons: ['No Thanks',
        {
          text: "Ok",
          handler: (okClick) => {

            this.openNativeSettings.open('location');
          }
        }]
    });

    alert.backdropDismiss = false;
    await alert.present();
  }

  // Happiness change event
  loginSliderValueChange(event: any) {
    this.happinessIndexValue = event.detail.value;
    document.querySelector(".emoji-style").setAttribute("style", "padding-left:" + this.happinessIndexValue * this.screenProRatio + "px")

    if (event.detail.value == 50) {
      this.smilyImageSrc = "../../../assets/imgs/nuetral.png";
    } else if (event.detail.value < 10) {
      this.smilyImageSrc = "../../../assets/imgs/sad5.png";
    } else if (event.detail.value < 20) {
      this.smilyImageSrc = "../../../assets/imgs/sad4.png";
    } else if (event.detail.value < 30) {
      this.smilyImageSrc = "../../../assets/imgs/sad3.png";
    } else if (event.detail.value < 40) {
      this.smilyImageSrc = "../../../assets/imgs/sad2.png";
    } else if (event.detail.value < 50) {
      this.smilyImageSrc = "../../../assets/imgs/sad1.png";
    } else if (event.detail.value > 90) {
      this.smilyImageSrc = "../../../assets/imgs/happy5.png";
    } else if (event.detail.value > 95) {
      document.querySelector(".emoji-style").setAttribute("style", "justify-content: flex-end")
    } else if (event.detail.value > 80) {
      this.smilyImageSrc = "../../../assets/imgs/happy4.png";
    } else if (event.detail.value > 70) {
      this.smilyImageSrc = "../../../assets/imgs/happy3.png";
    } else if (event.detail.value > 60) {
      this.smilyImageSrc = "../../../assets/imgs/happy2.png";
    } else if (event.detail.value > 50) {
      this.smilyImageSrc = "../../../assets/imgs/happy1.png";
    }


    /**
     * Happiness index phase 2 code
        if (event.detail.value == 50) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/nuetral.png') no-repeat left center / cover");
        } else if (event.detail.value < 10) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/sad5.png') no-repeat left center / cover");
        } else if (event.detail.value < 20) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/sad4.png') no-repeat left center / cover");
        } else if (event.detail.value < 30) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/sad3.png') no-repeat left center / cover");
        } else if (event.detail.value < 40) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/sad2.png') no-repeat left center / cover");
        } else if (event.detail.value < 50) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/sad1.png') no-repeat left center / cover");
        } else if (event.detail.value > 90) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/happy5.png') no-repeat left center / cover");
        } else if (event.detail.value > 80) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/happy4.png') no-repeat left center / cover");
        } else if (event.detail.value > 70) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/happy3.png') no-repeat left center / cover");
        } else if (event.detail.value > 60) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/happy2.png') no-repeat left center / cover");
        } else if (event.detail.value > 50) {
          document.querySelector(".login-slider-style").setAttribute("style", "--knob-background: url('../../../assets/imgs/happy1.png') no-repeat left center / cover");
        }
    */

    /**
     * Happiness index phase 1 code
     * 
    // If value is 100 then user is happy, if 0 then user is sad
    if (event.detail.value == "100") {
      this.happinessIndexFlag = "Y"
      // hide sad image
      this.sadImageShowFlag = false;
      this.sadArrowsShowFlag = false;
      this.happyArrowShowFlag = false;
      // Call doLogin method
      this.doLogin();
    } else if (event.detail.value == "0") {
      this.happinessIndexFlag = "N"
      // shide happy image
      this.happyImageShowFlag = false;
      this.happyArrowShowFlag = false;
      this.sadArrowsShowFlag = false;
      // Call doLogin method
      this.doLogin();
    } else {
      // not happy not sad, visible happy and sad images
      this.happyImageShowFlag = true;
      this.sadImageShowFlag = true
      this.sadArrowsShowFlag = true;
      this.happyArrowShowFlag = true;
    } */
  }

  onProgressTouchEnd() {
    this.doLogin()
  }

  // Below method is used to validate user credentials with ZenForte server
  doLogin() {

    // Fetch GPS location
    this.platform.ready().then((platformReady) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        // Fetch the Geo location and store into variable
        this.gpsLocation = resp.coords.latitude + ", " + resp.coords.longitude
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    })

    // Check device type
    if (this.platform.is('android')) {
      this.devicePlatfrom = "Android"
    } else if (this.platform.is('ios')) {
      this.devicePlatfrom = "iOS"
    }

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();
        // Validate user credentials with the help of API
        this.api.login(this.loginData.username, this.loginData.password)
          .then((response: any) => {

            let loginResponse = JSON.parse(response.data);
            console.log('Login Response -> ', loginResponse)
            // Check for user credentials are valid or not
            if (loginResponse.sessionBean == null) {
              // Credentials are incorrect
              // check for number of unsuccessful login attempts
              if (loginResponse.hasOwnProperty('LoginAttemptsLeft')) {
                // Prepare message with number of unsuccessful counts
                let loginAttemptsMessage: string;
                loginAttemptsMessage = "After " + loginResponse.LoginAttemptsLeft +
                  " consecutive unsuccessful login attempts your account will be locked."
                // Show alert message
                this.showAlertWithLeftLoginAttempts(Constants.ERROR_TITLE, "Incorrect username or password",
                  loginAttemptsMessage);
              } else if (loginResponse.hasOwnProperty('status')) {
                // Account locked block of code
                if (loginResponse.status == "Locked") {
                  // show alert with number of seconds left to unlock account
                  this.showAlert(Constants.ERROR_TITLE,
                    "Your account has been locked temporarily, please try again in "
                    + loginResponse.secondsLeftToUnlock + " seconds.")
                }
              }
              // Dismiss the loader
              this.dismissLoader();
              // Reset values
              this.loginData.username = "";
              this.loginData.password = "";
              // Set slider value to default value
              this.happinessSliderValue = 50;
              this.happinessIndexValue = 50;
              this.smilyImageSrc = "../../../assets/imgs/nuetral.png";
              document.querySelector(".emoji-style").setAttribute("style", "padding-left:" + this.happinessIndexValue * this.screenProRatio + "px")
            } else {
              // User credentials are valid
              let token: string;
              if (Constants.ENVIRONMENT == 'Stage') {
                // Stage Environment we are not storing Encrypted Token
                token = '';
              } else if (Constants.ENVIRONMENT == 'Prod') {
                // Prod Environment we are storing Encrypted Token in Local DB
                this.storage.set('encryptedToken', loginResponse.values.encryptedToken)
                token = loginResponse.values.encryptedToken;
              }
              // Save logged in user details in local db
              this.storage.set('empNumber', loginResponse.sessionBean.authenticationVO.staffNo)
              this.storage.set('roles', loginResponse.roles)
              this.storage.set('accountName', loginResponse.account)
              this.storage.set('role', loginResponse.sessionBean.authenticationVO.role)
              this.storage.set('dp', loginResponse.sessionBean.authenticationVO.image)
              this.storage.set('staffName', loginResponse.sessionBean.authenticationVO.staffName)

              // Publish user role event using Angular Events
              this.events.publish('userInformation', [loginResponse.sessionBean.authenticationVO.role,
              loginResponse.sessionBean.authenticationVO.staffName,
              loginResponse.sessionBean.authenticationVO.image, loginResponse.roles])

              // API call to save user happiness
              this.api.saveHappinessIndex(token, loginResponse.sessionBean.authenticationVO.staffNo,
                this.gpsLocation, this.devicePlatfrom, this.happinessIndexValue, new Date().toString())
                .then((response: any) => {
                  // Dismiss the loader
                  this.dismissLoader();

                  console.log('Happiness Index Response -> ', response);

                  // Redirect to Home page
                  this.navCtrl.navigateRoot('home')
                })
                .catch((error: any) => {
                  console.log(error)
                  // Dismiss the loader
                  this.dismissLoader();
                  // Show alert with error message
                  this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
                  // Reset values
                  this.loginData.username = "";
                  this.loginData.password = "";
                  // Set slider value to default value
                  this.happinessSliderValue = 50;
                  this.happinessIndexValue = 50;
                  this.smilyImageSrc = "../../../assets/imgs/nuetral.png";
                  document.querySelector(".emoji-style").setAttribute("style", "padding-left:" + this.happinessIndexValue * this.screenProRatio + "px")
                })
            }
          })
          .catch((error: any) => {
            console.log(error)
            // Dismiss the loader
            this.dismissLoader();
            // Show alert with error message
            this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
            // Reset values
            this.loginData.username = "";
            this.loginData.password = "";
            // Set slider value to default value
            this.happinessSliderValue = 50;
            this.happinessIndexValue = 50;
            this.smilyImageSrc = "../../../assets/imgs/nuetral.png";
            document.querySelector(".emoji-style").setAttribute("style", "padding-left:" + this.happinessIndexValue * this.screenProRatio + "px")
          })
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
        // Set slider value to default value
        this.happinessSliderValue = 50;
        this.happinessIndexValue = 50;
        this.smilyImageSrc = "../../../assets/imgs/nuetral.png";
        document.querySelector(".emoji-style").setAttribute("style", "padding-left:" + this.happinessIndexValue * this.screenProRatio + "px")
      }
    }
  }

  // method to display alert message with left login attempts message
  async showAlertWithLeftLoginAttempts(title: string, subTitle: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subTitle,
      message: message,
      buttons: ['Ok']
    })
    await alert.present();
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
