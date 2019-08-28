import { Component, OnInit, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

const data = {
  "chart": {
    "caption": "Skill Count",
    "bgColor": "#FFFFCC",
    "use3DLighting": "0",
    "showShadow": "0",
    "enableSmartLabels": "0",
    "startingAngle": "0",
    "showPercentInTooltip": "0",
    "decimals": "1",
    "captionFontSize": "14",
    "subcaptionFontSize": "14",
    "subcaptionFontBold": "0",
    "toolTipColor": "#ffffff",
    "toolTipBorderThickness": "0",
    "toolTipBgColor": "#000000",
    "toolTipBgAlpha": "80",
    "toolTipBorderRadius": "2",
    "toolTipPadding": "5",
    "showHoverEffect": "1",
    "showLegend": "0",
    "legendBgColor": "#ffffff",
    "legendBorderAlpha": "0",
    "legendShadow": "0",
    "legendItemFontSize": "10",
    "legendItemFontColor": "#666666",
    "useDataPlotColorForLabels": "1",
    "showBorder": "1",
    "borderThickness": "4",
    "borderAlpha": "50",
    "borderColor": "#000000",
    "showLabels": "0",
    "showValues": "0"
  },
  "data": []
};

@Component({
  selector: 'app-rwf-management',
  templateUrl: './rwf-management.page.html',
  styleUrls: ['./rwf-management.page.scss'],
})
export class RwfManagementPage implements OnInit {

  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public nonRatedCount: string;
  public ratedCount: string;
  public totalAssociatesCount: number;
  public chartWidth = 300;
  public chartHeight = 400;
  public empRole: string;
  chartType = 'pie2d';
  chartDataFormat = 'json';
  chartDataSource = data;
  dataSource = data;
  chartObj: any;
  handler: any;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private zone: NgZone) {

    // Hide the side menu for RWF Management page
    this.menuCtrl.enable(false);

    // Get local DB values
    this.storage.get('role').then((data) => {
      this.empRole = data;
    })
    this.storage.get('encryptedToken').then((data) => {
      this.authToken = data;
    })
    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;

      // Api call to get Skill count data
      this.getSkillCountData();
    })
  }

  // Graph plot click handler
  dataplotClickHandler(eventObj, dataObj) {
    this.zone.run(() => {
      // Redirect to RWF Resource list for skill page
      this.navCtrl.push('rwf-resource-list-for-skill', { "selectedSkill": dataObj.categoryLabel })
    });
  }

  // Graph initialized event
  initialized($event) {
    this.chartObj = $event.chart;
  }

  ngOnInit() {
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  // Below method to get Skill Count data using API
  getSkillCountData() {
    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Start loader
        this.showLoader();

        this.api.rwfSkillCount(this.authToken, this.empNumber)
          .then((response: any) => {
            // Dismiss the loader
            this.dismissLoader();

            let rwfSkillCountResponse = JSON.parse(response.data);
            console.log('RWF Skill Count Response -> ', rwfSkillCountResponse)

            this.nonRatedCount = rwfSkillCountResponse.nonRatedcount;
            this.ratedCount = rwfSkillCountResponse.ratedCount;
            this.totalAssociatesCount = parseInt(rwfSkillCountResponse.nonRatedcount) +
              parseInt(rwfSkillCountResponse.ratedCount);

            this.dataSource.data = [];

            for (let i in rwfSkillCountResponse.skillCount)
              this.dataSource.data.push({
                label: i,
                value: rwfSkillCountResponse.skillCount[i]
              });

            // Graph click listeners
            this.handler = this.dataplotClickHandler.bind(this);
            this.chartObj.addEventListener('dataplotClick', this.handler);
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

  // Ageing click event
  ageingClick() {
    // Redirect to RWF Ageing page
    this.navCtrl.push('rwf-ageing')
  }

  // Demand Forecasting click event
  demandForecastingClick() {
    // Redirect to Demand List
    this.navCtrl.push('demand-list')
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
