import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-twenty-five-window',
  templateUrl: './twenty-five-window.page.html',
  styleUrls: ['./twenty-five-window.page.scss'],
})
export class TwentyFiveWindowPage implements OnInit {

  slideOpts = {
    effect: 'flip'
  };
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public empRole: string;
  // Varibales for without weightage
  public _1X1: any;
  public _1X2: any;
  public _1X3: any;
  public _1X4: any;
  public _1X5: any;
  public _2X1: any;
  public _2X2: any;
  public _2X3: any;
  public _2X4: any;
  public _2X5: any;
  public _3X1: any;
  public _3X2: any;
  public _3X3: any;
  public _3X4: any;
  public _3X5: any;
  public _4X1: any;
  public _4X2: any;
  public _4X3: any;
  public _4X4: any;
  public _4X5: any;
  public _5X1: any;
  public _5X2: any;
  public _5X3: any;
  public _5X4: any;
  public _5X5: any;
  // variables for without weightage %
  public _1X1p: any;
  public _1X2p: any;
  public _1X3p: any;
  public _1X4p: any;
  public _1X5p: any;
  public _2X1p: any;
  public _2X2p: any;
  public _2X3p: any;
  public _2X4p: any;
  public _2X5p: any;
  public _3X1p: any;
  public _3X2p: any;
  public _3X3p: any;
  public _3X4p: any;
  public _3X5p: any;
  public _4X1p: any;
  public _4X2p: any;
  public _4X3p: any;
  public _4X4p: any;
  public _4X5p: any;
  public _5X1p: any;
  public _5X2p: any;
  public _5X3p: any;
  public _5X4p: any;
  public _5X5p: any;
  // variables for without weightage superscript
  public _1X1pd: any;
  public _1X2pd: any;
  public _1X3pd: any;
  public _1X4pd: any;
  public _1X5pd: any;
  public _2X1pd: any;
  public _2X2pd: any;
  public _2X3pd: any;
  public _2X4pd: any;
  public _2X5pd: any;
  public _3X1pd: any;
  public _3X2pd: any;
  public _3X3pd: any;
  public _3X4pd: any;
  public _3X5pd: any;
  public _4X1pd: any;
  public _4X2pd: any;
  public _4X3pd: any;
  public _4X4pd: any;
  public _4X5pd: any;
  public _5X1pd: any;
  public _5X2pd: any;
  public _5X3pd: any;
  public _5X4pd: any;
  public _5X5pd: any;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService) {

    // Hide the side menu for 25 window page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })

    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
    })

    this.storage.get('role').then((data) => {
      this.empRole = data;
      // On this page landing by default we are calling API
      this.twentyFiveWindowApiCall();
    })
  }

  ngOnInit() {
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  twentyFiveWindowApiCall() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.twentyFiveWindow(this.authToken, this.empNumber, this.empRole)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let twentyWindowResponse = JSON.parse(response.data);
            console.log('Twenty Five Window Response -> ', twentyWindowResponse)

            // Bind the response
            // Without weightage
            this._1X5 = twentyWindowResponse.withoutWeightage[0].value1;
            this._2X5 = twentyWindowResponse.withoutWeightage[0].value2;
            this._3X5 = twentyWindowResponse.withoutWeightage[0].value3;
            this._4X5 = twentyWindowResponse.withoutWeightage[0].value4;
            this._5X5 = twentyWindowResponse.withoutWeightage[0].value5;
            this._1X4 = twentyWindowResponse.withoutWeightage[1].value1;
            this._2X4 = twentyWindowResponse.withoutWeightage[1].value2;
            this._3X4 = twentyWindowResponse.withoutWeightage[1].value3;
            this._4X4 = twentyWindowResponse.withoutWeightage[1].value4;
            this._5X4 = twentyWindowResponse.withoutWeightage[1].value5;
            this._1X3 = twentyWindowResponse.withoutWeightage[2].value1;
            this._2X3 = twentyWindowResponse.withoutWeightage[2].value2;
            this._3X3 = twentyWindowResponse.withoutWeightage[2].value3;
            this._4X3 = twentyWindowResponse.withoutWeightage[2].value4;
            this._5X3 = twentyWindowResponse.withoutWeightage[2].value5;
            this._1X2 = twentyWindowResponse.withoutWeightage[3].value1;
            this._2X2 = twentyWindowResponse.withoutWeightage[3].value2;
            this._3X2 = twentyWindowResponse.withoutWeightage[3].value3;
            this._4X2 = twentyWindowResponse.withoutWeightage[3].value4;
            this._5X2 = twentyWindowResponse.withoutWeightage[3].value5;
            this._1X1 = twentyWindowResponse.withoutWeightage[4].value1;
            this._2X1 = twentyWindowResponse.withoutWeightage[4].value2;
            this._3X1 = twentyWindowResponse.withoutWeightage[4].value3;
            this._4X1 = twentyWindowResponse.withoutWeightage[4].value4;
            this._5X1 = twentyWindowResponse.withoutWeightage[4].value5;

            // Without weightage Percentage
            this._1X5p = twentyWindowResponse.withoutWeightagePercentage[0].value1;
            this._1X5pd = twentyWindowResponse.withoutWeightagePercentage[0].deviationval1;
            this._2X5p = twentyWindowResponse.withoutWeightagePercentage[0].value2;
            this._2X5pd =
              twentyWindowResponse.withoutWeightagePercentage[0].deviationval2;
            this._3X5p = twentyWindowResponse.withoutWeightagePercentage[0].value3;
            this._3X5pd =
              twentyWindowResponse.withoutWeightagePercentage[0].deviationval3;
            this._4X5p = twentyWindowResponse.withoutWeightagePercentage[0].value4;
            this._4X5pd =
              twentyWindowResponse.withoutWeightagePercentage[0].deviationval4;
            this._5X5p = twentyWindowResponse.withoutWeightagePercentage[0].value5;
            this._5X5pd =
              twentyWindowResponse.withoutWeightagePercentage[0].deviationval5;
            this._1X4p = twentyWindowResponse.withoutWeightagePercentage[1].value1;
            this._1X4pd =
              twentyWindowResponse.withoutWeightagePercentage[1].deviationval1;
            this._2X4p = twentyWindowResponse.withoutWeightagePercentage[1].value2;
            this._2X4pd =
              twentyWindowResponse.withoutWeightagePercentage[1].deviationval2;
            this._3X4p = twentyWindowResponse.withoutWeightagePercentage[1].value3;
            this._3X4pd =
              twentyWindowResponse.withoutWeightagePercentage[1].deviationval3;
            this._4X4p = twentyWindowResponse.withoutWeightagePercentage[1].value4;
            this._4X4pd =
              twentyWindowResponse.withoutWeightagePercentage[1].deviationval4;
            this._5X4p = twentyWindowResponse.withoutWeightagePercentage[1].value5;
            this._5X4pd =
              twentyWindowResponse.withoutWeightagePercentage[1].deviationval5;
            this._1X3p = twentyWindowResponse.withoutWeightagePercentage[2].value1;
            this._1X3pd =
              twentyWindowResponse.withoutWeightagePercentage[2].deviationval1;
            this._2X3p = twentyWindowResponse.withoutWeightagePercentage[2].value2;
            this._2X3pd =
              twentyWindowResponse.withoutWeightagePercentage[2].deviationval2;
            this._3X3p = twentyWindowResponse.withoutWeightagePercentage[2].value3;
            this._3X3pd =
              twentyWindowResponse.withoutWeightagePercentage[2].deviationval3;
            this._4X3p = twentyWindowResponse.withoutWeightagePercentage[2].value4;
            this._4X3pd =
              twentyWindowResponse.withoutWeightagePercentage[2].deviationval4;
            this._5X3p = twentyWindowResponse.withoutWeightagePercentage[2].value5;
            this._5X3pd =
              twentyWindowResponse.withoutWeightagePercentage[2].deviationval5;
            this._1X2p = twentyWindowResponse.withoutWeightagePercentage[3].value1;
            this._1X2pd =
              twentyWindowResponse.withoutWeightagePercentage[3].deviationval1;
            this._2X2p = twentyWindowResponse.withoutWeightagePercentage[3].value2;
            this._2X2pd =
              twentyWindowResponse.withoutWeightagePercentage[3].deviationval2;
            this._3X2p = twentyWindowResponse.withoutWeightagePercentage[3].value3;
            this._3X2pd =
              twentyWindowResponse.withoutWeightagePercentage[3].deviationval3;
            this._4X2p = twentyWindowResponse.withoutWeightagePercentage[3].value4;
            this._4X2pd =
              twentyWindowResponse.withoutWeightagePercentage[3].deviationval4;
            this._5X2p = twentyWindowResponse.withoutWeightagePercentage[3].value5;
            this._5X2pd =
              twentyWindowResponse.withoutWeightagePercentage[3].deviationval5;
            this._1X1p = twentyWindowResponse.withoutWeightagePercentage[4].value1;
            this._1X1pd =
              twentyWindowResponse.withoutWeightagePercentage[4].deviationval1;
            this._2X1p = twentyWindowResponse.withoutWeightagePercentage[4].value2;
            this._2X1pd =
              twentyWindowResponse.withoutWeightagePercentage[4].deviationval2;
            this._3X1p = twentyWindowResponse.withoutWeightagePercentage[4].value3;
            this._3X1pd =
              twentyWindowResponse.withoutWeightagePercentage[4].deviationval3;
            this._4X1p = twentyWindowResponse.withoutWeightagePercentage[4].value4;
            this._4X1pd =
              twentyWindowResponse.withoutWeightagePercentage[4].deviationval4;
            this._5X1p = twentyWindowResponse.withoutWeightagePercentage[4].value5;
            this._5X1pd =
              twentyWindowResponse.withoutWeightagePercentage[4].deviationval5;
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

  // Without weightage tile click event
  withoutWeightageTileClick(column: number, row: number) {
    this.navCtrl.push('twenty-five-window-list-without-weightage', {
      "column": column,
      "row": row,
      "tileCategory": "withoutWeightage"
    })
  }

  // Overall Associates click event
  overAllAssociatesClick() {
    // Redirect to OverAll Associates page
    this.navCtrl.push('overall-associates')
  }

  pgmDistributionClick() {
    // Redirect to PGM Distribution page
    this.navCtrl.push('pgm-distribution')
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
