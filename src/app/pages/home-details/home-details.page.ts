import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform, Events } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.page.html',
  styleUrls: ['./home-details.page.scss'],
})
export class HomeDetailsPage implements OnInit {

  public empRole: string;
  public authToken: string;
  public accountName: string;
  public empNumber: string;
  private loader: any;
  private loaderActive: boolean = false;

  totalRatedCount = 0;
  totalNicheSkillsCount = 0;
  totalSmeCount = 0;
  totalPipeLineCount = 0;
  totalOpenPositionsCount = 0;
  totalBillingInLoss = 0;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private events: Events
  ) {

    // Hide the side menu for donut page
    this.menuCtrl.enable(false);

    // Get vlaues from local DB
    this.storage.get('accountName').then((data) => {
      this.accountName = data;
    })
    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
    })
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })
    this.storage.get('role').then((data) => {
      this.empRole = data;
      // API call 
      this.getDataFromAPI();
    })
  }

  ngOnInit() {
  }

  // Fetch data from API
  getDataFromAPI() {
    let data = this.navCtrl.get();

    // Dashboard counts for CEO, BU & SRMGMT roles
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      // Check for platform ready or not
      if (this.platform.is('cordova')) {
        // platform found
        // Check for Internet connection
        if (this.network.checkNetWorkConnection()) {
          // Internet connection available
          // Start loader
          this.showLoader();

          this.api.getFooterDashboardForCeoSrmgmtBu(this.authToken)
            .subscribe(response => {

              // Dismiss the loader
              this.dismissLoader();

              // Update Rated Count
              this.updateRatedCount(JSON.parse(response[0].data), data.selectedBu)

              // Update Niche Skills Count
              this.updateNicheSkillsCount(JSON.parse(response[1].data), data.selectedBu)

              // Update SME Count
              this.updateSmeCount(JSON.parse(response[2].data), data.selectedBu)

              // Update Release Pipeline Count
              this.updateReleasePipelineCount(JSON.parse(response[3].data), data.selectedBu)

              // Update Open positions Count
              this.updateOpenPositionsCount(JSON.parse(response[4].data), data.selectedBu)

              // Update Billing loss Count
              this.updateBillingLossCount(JSON.parse(response[5].data), data.selectedBu)

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
    } else if (this.empRole == 'DH') {
      // Check for platform ready or not
      if (this.platform.is('cordova')) {
        // platform found
        // Check for Internet connection
        if (this.network.checkNetWorkConnection()) {
          // Internet connection available
          // Start loader
          this.showLoader();
          if (data.selectedBu == "All") {
            // All means By default view or Org view
            this.api.getFooterDashboardForCeoSrmgmtBu(this.authToken)
              .subscribe(response => {

                // Dismiss the loader
                this.dismissLoader();

                // Update Rated Count
                this.updateRatedCount(JSON.parse(response[0].data), data.selectedBu)

                // Update Niche Skills Count
                this.updateNicheSkillsCount(JSON.parse(response[1].data), data.selectedBu)

                // Update SME Count
                this.updateSmeCount(JSON.parse(response[2].data), data.selectedBu)

                // Update Release Pipeline Count
                this.updateReleasePipelineCount(JSON.parse(response[3].data), data.selectedBu)

                // Update Open positions Count
                this.updateOpenPositionsCount(JSON.parse(response[4].data), data.selectedBu)

                // Update Billing loss Count
                this.updateBillingLossCount(JSON.parse(response[5].data), data.selectedBu)

              }, error => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          } else {
            // else block for select any BU from drop down
            this.api.getFooterDashboardForDh(this.authToken, this.empNumber)
              .subscribe(response => {

                // Dismiss the loader
                this.dismissLoader();

                // Update Rated Count
                this.updateRatedCount(JSON.parse(response[0].data), data.selectedBu)

                // Update Niche Skills Count
                this.updateNicheSkillsCount(JSON.parse(response[1].data), data.selectedBu)

                // Update SME Count
                this.updateSmeCount(JSON.parse(response[2].data), data.selectedBu)

                // Update Release Pipeline Count
                this.updateReleasePipelineCount(JSON.parse(response[3].data), data.selectedBu)

                // Update Open positions Count
                this.updateOpenPositionsCount(JSON.parse(response[4].data), data.selectedBu)

                // Update Billing loss Count
                this.updateBillingLossCount(JSON.parse(response[5].data), data.selectedBu)

              }, error => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else {
          // Internet connectino not available
          this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
            Constants.NO_INTERNET_ALERT_SUB_TILE)
        }
      }
    }
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  // Below method to update Rated count
  updateRatedCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalRatedCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalRated = data.Rated.filter(obj => obj.BU === this.accountName)
        this.totalRatedCount = totalRated[0].rated;
      } else {
        // Role CEO, SRMGMT & BU
        this.totalRatedCount = data.Rated.reduce(function (previousValue, obj) {
          return previousValue + obj.rated;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalRatedCount = data.Rated.reduce(function (previousValue, obj) {
          return previousValue + obj.rated;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalRatedCount = data.Rated.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.rated;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update Niche skills count
  updateNicheSkillsCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalNicheSkillsCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalNicheSkills = data.NicheSkills.filter(obj => obj.bu === this.accountName)
        this.totalNicheSkillsCount = totalNicheSkills[0].niche_skills;
      } else {
        // Role CEO, SRMGMT & BU
        this.totalNicheSkillsCount = data.NicheSkills.reduce(function (previousValue, obj) {
          return previousValue + obj.niche_skills;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalNicheSkillsCount = data.NicheSkills.reduce(function (previousValue, obj) {
          return previousValue + obj.niche_skills;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalNicheSkillsCount = data.NicheSkills.reduce(function (previousValue, obj) {
          if (obj.bu === selectedBU) {
            return previousValue + obj.niche_skills;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update SME count
  updateSmeCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalSmeCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalSme = data.sme.filter(obj => obj.BU === this.accountName)
        this.totalSmeCount = totalSme[0].SME;
      } else {
        // Role CEO, SRMGMT & BU
        this.totalSmeCount = data.sme.reduce(function (previousValue, obj) {
          return previousValue + obj.SME;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalSmeCount = data.sme.reduce(function (previousValue, obj) {
          return previousValue + obj.SME;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalSmeCount = data.sme.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.SME;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update Release Pipeline count
  updateReleasePipelineCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalPipeLineCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalPipeLine = data.releasePiplepline.filter(obj => obj.BU === this.accountName)
        if (totalPipeLine.length > 0) {
          this.totalPipeLineCount = totalPipeLine[0].Release_count;
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalPipeLineCount = data.releasePiplepline.reduce(function (previousValue, obj) {
          return previousValue + obj.Release_count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalPipeLineCount = data.releasePiplepline.reduce(function (previousValue, obj) {
          return previousValue + obj.Release_count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalPipeLineCount = data.releasePiplepline.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.Release_count;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update Open Positinos count
  updateOpenPositionsCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalOpenPositionsCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalOpenPositions = data.OpenPositions.filter(obj => obj.BU === this.accountName)
        this.totalOpenPositionsCount = totalOpenPositions[0].open_positions;
      } else {
        // Role CEO, SRMGMT & BU
        this.totalOpenPositionsCount = data.OpenPositions.reduce(function (previousValue, obj) {
          return previousValue + obj.open_positions;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalOpenPositionsCount = data.OpenPositions.reduce(function (previousValue, obj) {
          return previousValue + obj.open_positions;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalOpenPositionsCount = data.OpenPositions.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.open_positions;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update Billing Loss count
  updateBillingLossCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalBillingInLoss = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const BillingInLoss = data.BillingLoss.filter(obj => obj.BU === this.accountName)
        this.totalBillingInLoss = BillingInLoss[0].billing_loss;
      } else {
        // Role CEO, SRMGMT & BU
        this.totalBillingInLoss = data.BillingLoss.reduce(function (previousValue, obj) {
          return previousValue + obj.billing_loss;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalBillingInLoss = data.BillingLoss.reduce(function (previousValue, obj) {
          return previousValue + obj.billing_loss;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalBillingInLoss = data.BillingLoss.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.billing_loss;
          }
          return previousValue;
        }, 0);
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
