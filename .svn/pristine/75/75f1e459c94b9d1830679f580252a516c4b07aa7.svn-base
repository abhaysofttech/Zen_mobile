import { Component, NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform, Events } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const genderBreakUpChartdata = {
  "chart": {
    "caption": "GENDER WISE BREAK UP",
    "showlegend": "1",
    "showpercentvalues": "0",
    "legendposition": "bottom",
    "usedataplotcolorforlabels": "1",
    "theme": "fusion"
  },
  "data": []
};

const overAllAssociatesChartdata = {
  "chart": {
    "caption": "OVERALL ASSOCIATES",
    "subcaption": "",
    "showlegend": "1",
    "showpercentvalues": "1",
    "legendposition": "bottom",
    "usedataplotcolorforlabels": "1",
    "theme": "fusion"
  },
  "data": []
};

const leadWideDistributionChartdata = {
  "chart": {
    "caption": "LEAD WISE DISTRIBUTION",
    "subcaption": "",
    "showvalues": "0",
    "plotgradientcolor": "",
    "formatnumberscale": "0",
    "showplotborder": "0",
    "palettecolors": "#2BC18A ,#2095AE, #1485B4,#146397",
    "plottooltext": "$label produces $dataValue of energy from $seriesName",
    "canvaspadding": "1",
    "bgcolor": "FFFFFF",
    "showalternatehgridcolor": "1",
    "divLineDashed": "1",
    "divlinecolor": "FFF",
    "showcanvasborder": "0",
    "legendborderalpha": "0",
    "legendshadow": "0",
    "interactivelegend": "1",
    "showsum": "1",
    "canvasborderalpha": "0",
    "showborder": "0",
    "rotateValues": "1",
    "labelDisplay": "auto",
    "theme": "fusion"
  },
  "categories": [
    {
      "category": []
    }
  ],
  "dataset": [],
};

const data = {
  chart: {
    // "caption": "EBU WISE ASSOCIATE BREAKUP",
    showvalues: "0",
    plotgradientcolor: "",
    formatnumberscale: "0",
    showplotborder: "0",
    palettecolors: "#2BC18A,#007b7d,#1485B4,#787878,#2C560A,#DD9D82",
    canvaspadding: "1",
    bgcolor: "FFFFFF",
    showalternatehgridcolor: "1",
    divLineDashed: "1",
    divlinecolor: "FFF",
    showcanvasborder: "0",
    legendborderalpha: "0",
    legendshadow: "0",
    interactivelegend: "1",
    showsum: "1",
    canvasborderalpha: "0",
    showborder: "0",
    rotateValues: "1",
    labelDisplay: "auto"
  },
  "categories": [
    {
      "category": []
    }
  ],
  "dataset": []
};

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  genderChartWidth = 600;
  genderChartWHeight = 400;
  genderChartType = 'pie2d';
  leadWiseDistributionChartType = 'stackedcolumn2d';
  genderChartWDataFormat = 'json';
  genderChartWDataSource = genderBreakUpChartdata;
  overAllAssociatesDataSource = overAllAssociatesChartdata;
  leadWiseDistributionDataSource = leadWideDistributionChartdata;

  width = 300;
  height = 500;
  type = 'stackedbar2d';
  dataFormat = 'json';
  dataSource = data;
  public empRole: string;
  public empNumber: string;
  public roles;
  public accountName: string;
  public dp;
  public staffName: string;
  public authToken;
  private loader: any;
  private loaderActive: boolean = false;
  slideOpts = {
    effect: 'flip'
  };
  totalAssociatesCount = 0;
  totalBillableCount = 0;
  totalNonBillableCount = 0;
  totalInTransitCount = 0;
  totalEbrCount = 0;
  totalInPollCount = 0;
  totalRatedCount = 0;
  totalNicheSkillsCount = 0;
  totalSmeCount = 0;
  totalPipeLineCount = 0;
  totalOpenPositionsCount = 0;
  totalBillingInLoss = 0;
  totalOnshoreCount = 0;
  totalOffshoreCount = 0;
  totalVisaUnusedCount = 0;
  onShoreUniqueLocations = [];
  offShoreUniqueLocations = [];
  onShoreLocation1Count = 0;
  onShoreLocation2Count = 0;
  onShoreLocation3Count = 0;
  offShoreLocation1Count = 0;
  offShoreLocation2Count = 0;
  offShoreLocation3Count = 0;
  buList: [] = [];
  public userSelectedBU: string;
  public totalAssociatesResponseData: any;
  public totalAssociatesDashDhResponseData: any;
  public totalAssociatesDhDonutGraphData: any;
  public deliveryBillableResponseData: any;
  public deliveryBillableDashDhResponseData: any;
  public nonBillalbleResponseData: any;
  public nonBillalbleDashDhResponseData: any;
  public inTransitResponseData: any;
  public inTransitDashDhResponseData: any;
  public ebrResponseData: any;
  public ebrDashDhResponseData: any;
  public poolResponseData: any;
  public poolDashDhResponseData: any;
  public onShoreResponseData: any;
  public offShoreResponeData: any;
  public visaResponseData: any;
  public tfwWithoutWeightageData: any[];
  public tfwWithoutWeightagePercentageData: any[];
  public tfwWithWeightageData: any[];
  public tfwWithWeightagePercentageData: any[];

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private events: Events,
    private geolocation: Geolocation,
    private zone: NgZone) {

    // event listener to handle change role
    this.events.subscribe('roleChange', (data) => {
      console.log('roleChange')
      this.zone.run(() => {
        // Update emp role value
        this.empRole = data[0];
        // refresh the home page based on selected role
        this.orgViewData();
      });
    });

    // Get local db values
    this.storage.ready().then(() => {
      // local db is ready
      this.storage.get('empNumber').then((data) => {
        this.empNumber = data;
      })
      this.storage.get('roles').then((data) => {
        this.roles = data;
      })
      this.storage.get('accountName').then((data) => {
        this.accountName = data;
      })
      this.storage.get('dp').then((data) => {
        this.dp = data;
      })
      this.storage.get('staffName').then((data) => {
        this.staffName = data;
      })
      this.storage.get('encryptedToken').then((data) => {
        this.authToken = data;
      })
      this.storage.get('role').then((data) => {
        this.empRole = data;
        // On this page landing by default OrgView method will get call
        this.orgViewData();
      })
    })

    // Enable the side menu for Home page
    this.menuCtrl.enable(true);
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Clear the graph data
    this.dataSource.dataset = [];
    this.genderChartWDataSource.data = [];
    this.overAllAssociatesDataSource.data = [];
    this.leadWiseDistributionDataSource.dataset = [];
  }

  orgViewData() {

    // OrgView graph for CEO, BU & SRMGMT roles
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      // Check for platform ready or not
      if (this.platform.is('cordova')) {
        // platform found
        // Get screen width from platform and assign platform width value to graph width 
        // platform width -20 (left & right margins)
        this.width = this.platform.width() - 20;
        // Check for Internet connection
        if (this.network.checkNetWorkConnection()) {
          // Internet connection available
          // Start loader
          this.showLoader();

          this.api.getDashboardDataForCeoSrmgmtBu(this.authToken)
            .subscribe(response => {

              // Dismiss the loader
              this.dismissLoader();

              let dashboardGraphResponse = JSON.parse(response[0].data);
              console.log('Dashboard GraphResponse -> ', dashboardGraphResponse)
              var graphdata = dashboardGraphResponse.barChartData;

              // set BU value to All
              this.userSelectedBU = "All"

              // Send data to plotDashboardGraph method to plot the graph
              this.plotDashboardGraph(graphdata);

              // BU's list 
              this.buList = JSON.parse(response[1].data).account;

              // Update Total Associates Count
              this.totalAssociatesResponseData = JSON.parse(response[2].data);
              this.updateTotalAssociatesCount(this.totalAssociatesResponseData, this.userSelectedBU)

              // Update Billable Count
              this.deliveryBillableResponseData = JSON.parse(response[3].data);
              this.updateBillableCount(this.deliveryBillableResponseData, this.userSelectedBU)

              // Update Non Billable Count
              this.nonBillalbleResponseData = JSON.parse(response[4].data);
              this.updateNonBillableCount(this.nonBillalbleResponseData, this.userSelectedBU)

              // Update In Transit Count
              this.inTransitResponseData = JSON.parse(response[5].data);
              this.updateInTransitCount(this.inTransitResponseData, this.userSelectedBU)

              // Update EBR Count
              this.ebrResponseData = JSON.parse(response[6].data);
              this.updateEbrCount(this.ebrResponseData, this.userSelectedBU)

              // Update Pool Count
              this.poolResponseData = JSON.parse(response[7].data);
              this.updatePoolCount(this.poolResponseData, this.userSelectedBU)

              // Update OnShore Count
              this.onShoreResponseData = JSON.parse(response[8].data);
              this.updateOnShoreCount(this.onShoreResponseData, this.userSelectedBU)

              // Update OffShore Count
              this.offShoreResponeData = JSON.parse(response[9].data);
              this.updateOffShoreCount(this.offShoreResponeData, this.userSelectedBU)

              // Update Visa Count
              this.visaResponseData = JSON.parse(response[10].data);
              this.updateVisaCount(this.visaResponseData, this.userSelectedBU)

              // Update OnShore locations Count
              this.updateOnShoreUniqueLocationsCount(this.onShoreResponseData, this.userSelectedBU)

              // Update OffShore locations Count
              this.updateOffShoreUniqueLocationsCount(this.offShoreResponeData, this.userSelectedBU)

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
      // DH Role
      // Check for platform ready or not
      if (this.platform.is('cordova')) {
        // platform found
        // Get screen width from platform and assign platform width value to graph width 
        // platform width -20 (left & right margins)
        this.width = this.platform.width() - 20;
        // Check for Internet connection
        if (this.network.checkNetWorkConnection()) {
          // Internet connection available
          // Start loader
          this.showLoader();

          this.api.getDashboardDataForDh(this.authToken, this.empRole, this.accountName)
            .subscribe(response => {

              // Dismiss the loader
              this.dismissLoader();

              let dashboardGraphResponse = JSON.parse(response[0].data);
              console.log('Dashboard GraphResponse -> ', dashboardGraphResponse)
              var graphdata = dashboardGraphResponse.barChartData;

              // set BU value to All
              this.userSelectedBU = "All"

              // Send data to plotDashboardGraph method to plot the graph
              this.plotBuSpecificDashboardGraph(graphdata);

              // BU's list 
              this.buList = JSON.parse(response[1].data).account;

              // Update Total Associates Count
              this.totalAssociatesResponseData = JSON.parse(response[2].data);
              this.totalAssociatesDhDonutGraphData = JSON.parse(response[11].data);
              this.updateTotalAssociatesCount(this.totalAssociatesResponseData, this.userSelectedBU)

              // Update Billable Count
              this.updateBillableCount(JSON.parse(response[3].data), this.userSelectedBU)
              this.deliveryBillableDashDhResponseData = JSON.parse(response[12].data);

              // Update Non Billable Count
              this.updateNonBillableCount(JSON.parse(response[4].data), this.userSelectedBU)
              this.nonBillalbleDashDhResponseData = JSON.parse(response[13].data);

              // Update In Transit Count
              this.updateInTransitCount(JSON.parse(response[5].data), this.userSelectedBU)
              this.inTransitDashDhResponseData = JSON.parse(response[14].data);

              // Update EBR Count
              this.updateEbrCount(JSON.parse(response[6].data), this.userSelectedBU)
              this.ebrDashDhResponseData = JSON.parse(response[16].data);

              // Update Pool Count
              this.updatePoolCount(JSON.parse(response[7].data), this.userSelectedBU)
              this.poolDashDhResponseData = JSON.parse(response[15].data);

              // Update OnShore Count
              this.updateOnShoreCount(JSON.parse(response[8].data), this.userSelectedBU)
              this.onShoreResponseData = JSON.parse(response[17].data);

              // Update OffShore Count
              this.updateOffShoreCount(JSON.parse(response[9].data), this.userSelectedBU)
              this.offShoreResponeData = JSON.parse(response[9].data);

              // Update Visa Count
              this.updateVisaCount(JSON.parse(response[10].data), this.userSelectedBU)

              // Update OnShore locations Count
              this.updateOnShoreUniqueLocationsCount(JSON.parse(response[8].data), this.userSelectedBU)

              // Update OffShore locations Count
              this.updateOffShoreUniqueLocationsCount(JSON.parse(response[9].data), this.userSelectedBU)
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
    } else if (this.empRole == 'PGM' || this.empRole == "MGR") {
      // PGM Role
      // Check for platform ready or not
      if (this.platform.is('cordova')) {
        // platform found
        // Get screen width from platform and assign platform width value to graph width 
        // platform width -20 (left & right margins)
        this.genderChartWidth = this.platform.width() - 20;
        // Check for Internet connection
        if (this.network.checkNetWorkConnection()) {
          // Internet connection available
          // Start loader
          this.showLoader();

          this.api.getDashboardDataForPGM(this.authToken, this.empRole, this.empNumber)
            .subscribe(response => {
              // Dismiss the loader
              this.dismissLoader();

              let twentyFiveWindowDataResponse = JSON.parse(response[0].data);
              let genderData = JSON.parse(response[2].data);
              let leadwiseDistributionData = JSON.parse(response[3].data);
              let overAllAssociatesData = JSON.parse(response[4].data);

              // Plot Leadwise Distribution graph
              this.leadWiseDistributionDataSource.dataset = [];
              var graphdata = leadwiseDistributionData.barChartData;

              var dataByBU = [];
              var totalCount: number = 0;
              var i;
              var j;
              var k;
              for (i in graphdata) {
                if (
                  dataByBU[graphdata[i][2]] === undefined ||
                  dataByBU[graphdata[i][2]] === null
                ) {
                  dataByBU[graphdata[i][2]] = [];
                }
                dataByBU[graphdata[i][2]][graphdata[i][0]] = graphdata[i][1];
                totalCount = totalCount + parseInt(graphdata[i][1]);
              }
              this.leadWiseDistributionDataSource.chart.subcaption = "Total Count: " + totalCount;

              this.leadWiseDistributionDataSource.categories[0].category = [];
              var categoryWiseData = [];
              var categories = ["Non-Rated", "Non-SME", "Potential-SME"];
              categoryWiseData["SME"] = [];
              categoryWiseData["Potential-SME"] = [];
              categoryWiseData["Non-SME"] = [];
              categoryWiseData["Non-Rated"] = [];

              function zeroOnNull(object) {
                if (object === undefined || object === null) {
                  return "0";
                }
                return object;
              }

              for (i in dataByBU) {
                this.leadWiseDistributionDataSource.categories[0].category.push({
                  label: i
                });

                categoryWiseData["Non-Rated"].push(
                  zeroOnNull(dataByBU[i]["Non-Rated"])
                );
                categoryWiseData["Non-SME"].push(
                  zeroOnNull(dataByBU[i]["Non-SME"])
                );
                categoryWiseData["Potential-SME"].push(
                  zeroOnNull(dataByBU[i]["Potential-SME"])
                );
                categoryWiseData["SME"].push(zeroOnNull(dataByBU[i]["SME"]));
              }

              this.leadWiseDistributionDataSource.dataset = [];
              for (j in categoryWiseData) {
                var dataAsValueObject = [];
                for (k in categoryWiseData[j]) {
                  dataAsValueObject.push({
                    value: categoryWiseData[j][k]
                  });
                }

                this.leadWiseDistributionDataSource.dataset.push({
                  seriesname: j,
                  renderas: "Area",
                  data: dataAsValueObject
                });
              }

              // Plot Gender graph
              this.genderChartWDataSource.data = [];
              for (let i = 0; i < genderData.genderChartData.length; i++) {
                this.genderChartWDataSource.data.push({
                  "label": genderData.genderChartData[i][0],
                  "value": genderData.genderChartData[i][1]
                })
              }

              // Plot OverAll Associates graph
              this.overAllAssociatesDataSource.data = [];
              let totalAssociatesCount: number = 0;
              let overAllAssociateObjectKeys = Object.keys(overAllAssociatesData.pieChartData);

              for (let i = 0; i < overAllAssociateObjectKeys.length; i++) {
                this.overAllAssociatesDataSource.data.push({
                  "label": overAllAssociateObjectKeys[i],
                  "value": overAllAssociatesData.pieChartData[overAllAssociateObjectKeys[i]]
                })
                totalAssociatesCount = totalAssociatesCount + overAllAssociatesData.pieChartData[overAllAssociateObjectKeys[i]];
              }
              this.overAllAssociatesDataSource.chart.subcaption = "Total Count: " + totalAssociatesCount;

              // Assign values to the variable
              this.tfwWithoutWeightageData = twentyFiveWindowDataResponse.withoutWeightage;
              this.tfwWithoutWeightagePercentageData = twentyFiveWindowDataResponse.withoutWeightagePercentage;
              this.tfwWithWeightageData = twentyFiveWindowDataResponse.withWeightage;
              this.tfwWithWeightagePercentageData = twentyFiveWindowDataResponse.withWeightagePercentage;

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
  }

  // Overall associates more details click event
  overAllAssociatesMoreDetails() {
    // Redirect to more details page
    this.navCtrl.push('overall-associates-more-details')
  }

  // Leadwise distribution more details click event
  leadwiseDistributionMoreDetails() {
    // Redirect to more details page
    this.navCtrl.push('leadwise-distribution-more-details')
  }

  // with weightage more details click event
  twentyFiveWindowWithWeightageMoreDetails() {
    //Redirect to more details page
    this.navCtrl.push('twenty-five-window-with-weightage-more-details');
  }

  // without weightage more details click event
  twentyFiveWindowWithoutWeightageMoreDetails() {
    //Redirect to more details page
    this.navCtrl.push('twenty-five-window-without-weightage-more-details');
  }

  // Without weightage tile click event
  withoutWeightageTileClick(column: number, row: number) {
    this.navCtrl.push('twenty-five-window-list-without-weightage', {
      "column": column,
      "row": row,
      "tileCategory": "withoutWeightage"
    })
  }

  // With weightage tile click event
  withWeightageTileClick(column: number, row: number) {
    this.navCtrl.push('twenty-five-window-list-without-weightage', {
      "column": column,
      "row": row,
      "tileCategory": "withWeightage"
    })
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

  // Below method to handle the BU change event
  onBuChange(selectedBU: any) {
    // Update bu value on local variable
    this.userSelectedBU = selectedBU;
    // Clear graph values
    this.dataSource.dataset = [];
    this.dataSource.categories[0].category = [];
    // BU Specific Graph & Dashboard counts for CEO, SRMGMT & BU
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      // Check for platform ready or not
      if (this.platform.is('cordova')) {
        // platform found
        // Get screen width from platform and assign platform width value to graph width 
        // platform width -20 (left & right margins)
        this.width = this.platform.width() - 20;
        // Check for Internet connection
        if (this.network.checkNetWorkConnection()) {
          // Internet connection available
          // Start loader
          this.showLoader();

          this.api.getDashboardBuSpecificDataForCeoSrmgmtBu(this.authToken, selectedBU)
            .subscribe(response => {

              // Dismiss the loader
              this.dismissLoader();

              let dashboardGraphResponse = JSON.parse(response[0].data);
              console.log('Dashboard GraphResponse -> ', dashboardGraphResponse)
              var graphdata = dashboardGraphResponse.barChartData;

              // Send data to plotDashboardGraph method to plot the graph
              this.plotBuSpecificDashboardGraph(graphdata);

              // BU's list 
              this.buList = JSON.parse(response[1].data).account;

              // Update Total Associates Count
              this.updateTotalAssociatesCount(this.totalAssociatesResponseData, this.userSelectedBU)
              this.totalAssociatesDashDhResponseData = dashboardGraphResponse.barChartData;

              // Update Billable Count
              this.updateBillableCount(this.deliveryBillableResponseData, this.userSelectedBU)
              this.deliveryBillableDashDhResponseData = JSON.parse(response[2].data);

              // Update Non Billable Count
              this.updateNonBillableCount(this.nonBillalbleResponseData, this.userSelectedBU)
              this.nonBillalbleDashDhResponseData = JSON.parse(response[3].data);

              // Update In Transit Count
              this.updateInTransitCount(this.inTransitResponseData, this.userSelectedBU)
              this.inTransitDashDhResponseData = JSON.parse(response[4].data);

              // Update EBR Count
              this.updateEbrCount(this.ebrResponseData, this.userSelectedBU)
              this.ebrDashDhResponseData = JSON.parse(response[5].data);

              // Update Pool Count
              this.updatePoolCount(this.poolResponseData, this.userSelectedBU)
              this.poolDashDhResponseData = JSON.parse(response[6].data)

              // Update OnShore Count
              this.updateOnShoreCount(this.onShoreResponseData, this.userSelectedBU)

              // Update OffShore Count
              this.updateOffShoreCount(this.offShoreResponeData, this.userSelectedBU)

              // Update Visa Count
              this.updateVisaCount(this.visaResponseData, this.userSelectedBU)

              // Update OnShore locations Count
              this.updateOnShoreUniqueLocationsCount(this.onShoreResponseData, this.userSelectedBU)

              // Update OffShore locations Count
              this.updateOffShoreUniqueLocationsCount(this.offShoreResponeData, this.userSelectedBU)
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
    } else {
      // BU Specific Graph & Dashboard counts for DH
      // Check for platform ready or not
      if (this.platform.is('cordova')) {
        // platform found
        // Get screen width from platform and assign platform width value to graph width 
        // platform width -20 (left & right margins)
        this.width = this.platform.width() - 20;
        // Check for Internet connection
        if (this.network.checkNetWorkConnection()) {
          // Internet connection available
          // Start loader
          this.showLoader();

          this.api.getDashboardBuSpecificDataForDh(this.authToken, this.empRole, this.empNumber)
            .subscribe(response => {

              // Dismiss the loader
              this.dismissLoader();

              let dashboardGraphResponse = JSON.parse(response[0].data);
              console.log('Dashboard GraphResponse -> ', dashboardGraphResponse)
              var graphdata = dashboardGraphResponse.barChartData;


              // Send data to plotDashboardGraph method to plot the graph
              this.plotBuSpecificDashboardGraph(graphdata);

              // BU's list 
              this.buList = JSON.parse(response[1].data).account;

              // Update Total Associates Count
              this.updateTotalAssociatesCount(JSON.parse(response[2].data), this.userSelectedBU)
              this.totalAssociatesDhDonutGraphData = JSON.parse(response[11].data)

              // Update Billable Count
              this.updateBillableCount(JSON.parse(response[3].data), this.userSelectedBU)
              this.deliveryBillableResponseData = JSON.parse(response[3].data);

              // Update Non Billable Count
              this.updateNonBillableCount(JSON.parse(response[4].data), this.userSelectedBU)
              this.nonBillalbleResponseData = JSON.parse(response[4].data);

              // Update In Transit Count
              this.updateInTransitCount(JSON.parse(response[5].data), this.userSelectedBU)
              this.inTransitResponseData = JSON.parse(response[5].data);

              // Update EBR Count
              this.updateEbrCount(JSON.parse(response[7].data), this.userSelectedBU)
              this.ebrResponseData = JSON.parse(response[7].data);

              // Update Pool Count
              this.updatePoolCount(JSON.parse(response[6].data), this.userSelectedBU)
              this.poolResponseData = JSON.parse(response[6].data);

              // Update OnShore Count
              this.updateOnShoreCount(JSON.parse(response[8].data), this.userSelectedBU)
              this.onShoreResponseData = JSON.parse(response[11].data);

              // Update OffShore Count
              this.updateOffShoreCount(JSON.parse(response[9].data), this.userSelectedBU)
              this.offShoreResponeData = JSON.parse(response[11].data);

              // Update Visa Count
              this.updateVisaCount(JSON.parse(response[10].data), this.userSelectedBU)

              // Update OnShore locations Count
              this.updateOnShoreUniqueLocationsCount(JSON.parse(response[8].data), this.userSelectedBU)

              // Update OffShore locations Count
              this.updateOffShoreUniqueLocationsCount(JSON.parse(response[9].data), this.userSelectedBU)
            }, error => {
              console.log(error)
              // Dismiss the loader
              this.dismissLoader();
              // Show alert with error message
              this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
            })

          /**
           * Old Code
           * 
           
          this.api.dashboardBuSpecificGraphForDh(this.authToken, this.empRole, this.empNumber)
            .then((response: any) => {

              let dashboardGraphResponse = JSON.parse(response.data);
              console.log('Dashboard GraphResponse -> ', dashboardGraphResponse)
              var graphdata = dashboardGraphResponse.barChartData;

              // Call DashboarCounts API to get dashboard values
              this.api.dashboardCountsForDh(this.authToken, this.empNumber)
                .then((dashboardResponse: any) => {
                  // Dismiss the loader
                  this.dismissLoader();

                  let dashboardCountsResponse = JSON.parse(dashboardResponse.data)
                  console.log('Dashboard Counts Response -> ', dashboardCountsResponse)

                  // Send data to plot BU Specific DashboardGraph method to plot the graph
                  this.plotBuSpecificDashboardGraph(graphdata);
                  // Send data to update the dashboard counts
                  this.updateDashboardCounts(dashboardCountsResponse, selectedBU)
                })
                .catch((dashboardError) => {
                  console.log(dashboardError)
                  // Dismiss the loader
                  this.dismissLoader();
                  // Show alert with error message
                  this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
                })
            })
            .catch((error) => {
              console.log(error)
              // Dismiss the loader
              this.dismissLoader();
              // Show alert with error message
              this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
            })
            */
        } else {
          // Internet connectino not available
          this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
            Constants.NO_INTERNET_ALERT_SUB_TILE)
        }
      }
    }
  }

  // Below method to plot the Graph
  plotDashboardGraph(graphdata: any) {
    // Code to plot the chart
    let dataByBU = [];
    var i;
    var j;
    var k;
    for (i in graphdata) {
      if (
        // Changes done by mbatchu as per new graph API
        dataByBU[graphdata[i][1]] === undefined ||
        dataByBU[graphdata[i][1]] === null
      ) {
        dataByBU[graphdata[i][1]] = [];
      }
      dataByBU[graphdata[i][1]][graphdata[i][0]] = graphdata[i][2];
    }
    this.dataSource.categories[0].category = [];
    var categoryWiseData = [];
    var categories = [
      "SME",
      "Potential-SME",
      "Non-SME",
      "Non-Rated"
    ];
    categoryWiseData["SME"] = [];
    categoryWiseData["Potential-SME"] = [];
    categoryWiseData["Non-SME"] = [];
    categoryWiseData["Non-Rated"] = [];

    function zeroOnNull(object) {
      if (object === undefined || object === null) {
        return "0";
      }
      return object;
    }
    for (i in dataByBU) {
      this.dataSource.categories[0].category.push({
        label: i
      });

      categoryWiseData["Non-Rated"].push(
        zeroOnNull(dataByBU[i]["Non-Rated"])
      );
      categoryWiseData["Non-SME"].push(
        zeroOnNull(dataByBU[i]["Non-SME"])
      );
      categoryWiseData["Potential-SME"].push(
        zeroOnNull(dataByBU[i]["Potential-SME"])
      );
      categoryWiseData["SME"].push(zeroOnNull(dataByBU[i]["SME"]));
    }
    this.dataSource.dataset = [];
    for (j in categoryWiseData) {
      var dataAsValueObject = [];
      for (k in categoryWiseData[j]) {
        dataAsValueObject.push({
          value: categoryWiseData[j][k]
        });
      }

      this.dataSource.dataset.push({
        seriesname: j,
        renderas: "Area",
        data: dataAsValueObject
      });
    }
  }

  // Below method to plot BU specific Graph
  plotBuSpecificDashboardGraph(graphdata: any) {
    // Code to plot the chart
    let dataByBU = [];
    var i;
    var j;
    var k;
    for (i in graphdata) {
      if (
        // Changes done by mbatchu as per new graph API
        dataByBU[graphdata[i][2]] === undefined ||
        dataByBU[graphdata[i][2]] === null
      ) {
        dataByBU[graphdata[i][2]] = [];
      }
      dataByBU[graphdata[i][2]][graphdata[i][0]] = graphdata[i][1];
    }
    this.dataSource.categories[0].category = [];
    var categoryWiseData = [];
    var categories = [
      "SME",
      "Potential-SME",
      "Non-SME",
      "Non-Rated"
    ];
    categoryWiseData["SME"] = [];
    categoryWiseData["Potential-SME"] = [];
    categoryWiseData["Non-SME"] = [];
    categoryWiseData["Non-Rated"] = [];

    function zeroOnNull(object) {
      if (object === undefined || object === null) {
        return "0";
      }
      return object;
    }
    for (i in dataByBU) {
      this.dataSource.categories[0].category.push({
        label: i
      });

      categoryWiseData["Non-Rated"].push(
        zeroOnNull(dataByBU[i]["Non-Rated"])
      );
      categoryWiseData["Non-SME"].push(
        zeroOnNull(dataByBU[i]["Non-SME"])
      );
      categoryWiseData["Potential-SME"].push(
        zeroOnNull(dataByBU[i]["Potential-SME"])
      );
      categoryWiseData["SME"].push(zeroOnNull(dataByBU[i]["SME"]));
    }
    this.dataSource.dataset = [];
    for (j in categoryWiseData) {
      var dataAsValueObject = [];
      for (k in categoryWiseData[j]) {
        dataAsValueObject.push({
          value: categoryWiseData[j][k]
        });
      }

      this.dataSource.dataset.push({
        seriesname: j,
        renderas: "Area",
        data: dataAsValueObject
      });
    }
  }

  // Below method to handle Total Associates tile cilck event
  totalAssociatesTileClick(selectedBu: string) {
    // Redirect to DonutGraph page
    // Send tile & bu details to DonutGraph page
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Total Associates",
            "selectedBu": selectedBu,
            "graphData": this.totalAssociatesResponseData.associates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Total Associates",
            "selectedBu": selectedBu,
            "graphData": this.totalAssociatesDashDhResponseData
          })
      }
    } else if (this.empRole == 'DH') {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Total Associates",
            "selectedBu": selectedBu,
            "graphData": this.totalAssociatesDhDonutGraphData.barChartData
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Total Associates",
            "selectedBu": selectedBu,
            "graphData": this.totalAssociatesDhDonutGraphData.associates
          })
      }
    }
  }

  // Below method to handle Non Billable tile cilck event
  nonBillableTileClick(selectedBu: string) {
    // Redirect to DonutGraph page
    // Send tile & bu details to DonutGraph page
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Non Billable",
            "selectedBu": selectedBu,
            "graphData": this.nonBillalbleResponseData.NonbillableAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Non Billable",
            "selectedBu": selectedBu,
            "graphData": this.nonBillalbleDashDhResponseData.NonbillableAssociates
          })
      }
    } else if (this.empRole == 'DH') {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Non Billable",
            "selectedBu": selectedBu,
            "graphData": this.nonBillalbleDashDhResponseData.NonbillableAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Non Billable",
            "selectedBu": selectedBu,
            "graphData": this.nonBillalbleResponseData.NonbillableAssociates
          })
      }
    }
  }

  // Below method to handle Delivery Billable tile cilck event
  deliveryBillableTileClick(selectedBu: string) {
    // Redirect to DonutGraph page
    // Send tile & bu details to DonutGraph page
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Delivery Billable",
            "selectedBu": selectedBu,
            "graphData": this.deliveryBillableResponseData.billableAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Delivery Billable",
            "selectedBu": selectedBu,
            "graphData": this.deliveryBillableDashDhResponseData.billableAssociates
          })
      }
    } else if (this.empRole == 'DH') {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Delivery Billable",
            "selectedBu": selectedBu,
            "graphData": this.deliveryBillableDashDhResponseData.billableAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "Delivery Billable",
            "selectedBu": selectedBu,
            "graphData": this.deliveryBillableResponseData.billableAssociates
          })
      }
    }
  }

  // Below method to handle In Transit tile cilck event
  inTransitTileClick(selectedBu: string) {
    // Redirect to DonutGraph page
    // Send tile & bu details to DonutGraph page
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "In Transit",
            "selectedBu": selectedBu,
            "graphData": this.inTransitResponseData.InTransitAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "In Transit",
            "selectedBu": selectedBu,
            "graphData": this.inTransitDashDhResponseData.InTransitAssociates
          })
      }
    } else if (this.empRole == 'DH') {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "In Transit",
            "selectedBu": selectedBu,
            "graphData": this.inTransitDashDhResponseData.InTransitAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "In Transit",
            "selectedBu": selectedBu,
            "graphData": this.inTransitResponseData.InTransitAssociates
          })
      }
    }
  }

  // Below method to handle In EBR tile cilck event
  ebrTileClick(selectedBu: string) {
    // Redirect to DonutGraph page
    // Send tile & bu details to DonutGraph page
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "EBR",
            "selectedBu": selectedBu,
            "graphData": this.ebrResponseData.EBRAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "EBR",
            "selectedBu": selectedBu,
            "graphData": this.ebrDashDhResponseData.EBRAssociates
          })
      }
    } else if (this.empRole == 'DH') {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "EBR",
            "selectedBu": selectedBu,
            "graphData": this.ebrDashDhResponseData.EBRAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "EBR",
            "selectedBu": selectedBu,
            "graphData": this.ebrResponseData.EBRAssociates
          })
      }
    }
  }

  // Below method to handle In In Pool tile cilck event
  inPoolTileClick(selectedBu: string) {
    // Redirect to DonutGraph page
    // Send tile & bu details to DonutGraph page
    if (this.empRole == 'CEO' || this.empRole == 'BU' || this.empRole == "SRMGMT") {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "In Pool",
            "selectedBu": selectedBu,
            "graphData": this.poolResponseData.PoolAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "In Pool",
            "selectedBu": selectedBu,
            "graphData": this.poolDashDhResponseData.PoolAssociates
          })
      }
    } else if (this.empRole == 'DH') {
      if (selectedBu == 'All') {
        //ORG view
        this.navCtrl.push('donutgraph',
          {
            "tileName": "EBR",
            "selectedBu": selectedBu,
            "graphData": this.poolDashDhResponseData.PoolAssociates
          })
      } else {
        // My Dashboard
        this.navCtrl.push('donutgraph',
          {
            "tileName": "In Pool",
            "selectedBu": selectedBu,
            "graphData": this.poolResponseData.PoolAssociates
          })
      }
    }
  }

  // Below method to handle In OnShore Locations cilck event
  onShoreOtherLocationClick(selectedBu: string) {
    // Redirect to DonutGraph page
    // Send tile & bu details to DonutGraph page
    this.navCtrl.push('donutgraph',
      {
        "tileName": "Onshore Other Locations",
        "selectedBu": selectedBu,
        "graphData": this.onShoreResponseData.onshoreLocationWiseCount
      })
  }

  // Below method to handle In OffShore Locations cilck event
  offShoreOtherLocationClick(selectedBu: string) {
    // Redirect to DonutGraph page
    // Send tile & bu details to DonutGraph page
    this.navCtrl.push('donutgraph',
      {
        "tileName": "Offshore Other Locations",
        "selectedBu": selectedBu,
        "accountName": this.accountName,
        "graphData": this.offShoreResponeData.offshoreLocationWiseCount
      })
  }

  // Below method to handle OrgView button click
  orgViewButtonCilck() {
    // Clear graph values
    this.dataSource.dataset = [];
    this.dataSource.categories[0].category = [];
    // OrgView api call
    this.orgViewData();
  }

  // More details button click event
  moreDetailsBtnClick() {
    this.navCtrl.push('home-details', { "selectedBu": this.userSelectedBU });
  }

  // Below method to update Total Associates tile count
  updateTotalAssociatesCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalAssociatesCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalassociates = data.associates.filter(obj => obj.account_name === this.accountName)
        if (totalassociates.length > 0) {
          this.totalAssociatesCount = totalassociates[0].count;
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalAssociatesCount = data.associates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalAssociatesCount = data.associates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalAssociatesCount = data.associates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update Billable tile count
  updateBillableCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalBillableCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalBillable = data.billableAssociates.filter(obj => obj.account_name === this.accountName)
        if (totalBillable.length > 0) {
          this.totalBillableCount = totalBillable[0].count;
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalBillableCount = data.billableAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalBillableCount = data.billableAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalBillableCount = data.billableAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update Non Billable tile count
  updateNonBillableCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalNonBillableCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalNonBillable = data.NonbillableAssociates.filter(obj => obj.account_name === this.accountName)
        if (totalNonBillable.length > 0) {
          this.totalNonBillableCount = totalNonBillable[0].count;
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalNonBillableCount = data.NonbillableAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalNonBillableCount = data.NonbillableAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalNonBillableCount = data.NonbillableAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update In Transit tile count
  updateInTransitCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalInTransitCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalInTransit = data.InTransitAssociates.filter(obj => obj.account_name === this.accountName)
        if (totalInTransit.length > 0) {
          this.totalInTransitCount = totalInTransit[0].count;
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalInTransitCount = data.InTransitAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalInTransitCount = data.InTransitAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalInTransitCount = data.InTransitAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update EBR tile count
  updateEbrCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalEbrCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalEBR = data.EBRAssociates.filter(obj => obj.account_name === this.accountName)
        if (totalEBR.length > 0) {
          this.totalEbrCount = totalEBR[0].count;
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalEbrCount = data.EBRAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalEbrCount = data.EBRAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalEbrCount = data.EBRAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update Pool tile count
  updatePoolCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalInPollCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalPool = data.PoolAssociates.filter(obj => obj.account_name === this.accountName)
        if (totalPool.length > 0) {
          this.totalInPollCount = totalPool[0].count;
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalInPollCount = data.PoolAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalInPollCount = data.PoolAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalInPollCount = data.PoolAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
      }
    }
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
        if (totalRated.length > 0) {
          this.totalRatedCount = totalRated[0].rated;
        }
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
        if (totalNicheSkills.length > 0) {
          this.totalNicheSkillsCount = totalNicheSkills[0].niche_skills;
        }
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
        if (totalSme.length > 0) {
          this.totalSmeCount = totalSme[0].SME;
        }
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
        if (totalOpenPositions.length > 0) {
          this.totalOpenPositionsCount = totalOpenPositions[0].open_positions;
        }
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
        if (BillingInLoss.length > 0) {
          this.totalBillingInLoss = BillingInLoss[0].billing_loss;
        }
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

  // Below method to update OnShore count
  updateOnShoreCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalOnshoreCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const Onshore = data.onshoreLocationWiseCount.filter(obj => obj.account_name === this.accountName)
        if (Onshore.length > 0) {
          this.totalOnshoreCount = Onshore.reduce(function (previousValue, obj) {
            return previousValue + obj.count;
          }, 0);
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalOnshoreCount = data.onshoreLocationWiseCount.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalOnshoreCount = data.onshoreLocationWiseCount.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalOnshoreCount = data.onshoreLocationWiseCount.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update OffShore count
  updateOffShoreCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalOffshoreCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const Offshore = data.offshoreLocationWiseCount.filter(obj => obj.account_name === this.accountName)
        if (Offshore.length > 0) {
          this.totalOffshoreCount = Offshore.reduce(function (previousValue, obj) {
            return previousValue + obj.count;
          }, 0);
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalOffshoreCount = data.offshoreLocationWiseCount.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalOffshoreCount = data.offshoreLocationWiseCount.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        this.totalOffshoreCount = data.offshoreLocationWiseCount.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update UnUsed Visa count
  updateVisaCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalVisaUnusedCount = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const VisaUnused = data.visa.filter(obj => obj.account_name === this.accountName)
        if (VisaUnused.length > 0) {
          this.totalVisaUnusedCount = VisaUnused[0].count;
        }
      } else {
        // Role CEO, SRMGMT & BU
        if (this.empRole == "DH") {
          this.totalVisaUnusedCount = data.visa.reduce(function (previousValue, obj) {
            return previousValue + obj.COUNT;
          }, 0);
        } else {
          this.totalVisaUnusedCount = data.visa.reduce(function (previousValue, obj) {
            return previousValue + obj.count;
          }, 0);
        }
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalVisaUnusedCount = data.visa.reduce(function (previousValue, obj) {
          return previousValue + obj.COUNT;
        }, 0);
      } else {
        // Role CEO, SRMGMT & BU
        let EmpRole = this.empRole;
        this.totalVisaUnusedCount = data.visa.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            if (EmpRole == "DH") {
              return previousValue + obj.COUNT;
            } else {
              return previousValue + obj.count;
            }
          }
          return previousValue;
        }, 0);
      }
    }
  }

  // Below method to update OnShore Unique locations count
  updateOnShoreUniqueLocationsCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.onShoreUniqueLocations = [];
    this.onShoreLocation1Count = 0;
    this.onShoreLocation2Count = 0;
    this.onShoreLocation3Count = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const allLocations = data.onshoreLocationWiseCount.map(data => data.location)
        this.onShoreUniqueLocations = allLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[0]) {
            if (data.onshoreLocationWiseCount[i].account_name === this.accountName) {
              this.onShoreLocation1Count = this.onShoreLocation1Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[1]) {
            if (data.onshoreLocationWiseCount[i].account_name === this.accountName) {
              this.onShoreLocation2Count = this.onShoreLocation2Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[2]) {
            if (data.onshoreLocationWiseCount[i].account_name === this.accountName) {
              this.onShoreLocation3Count = this.onShoreLocation3Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
      } else {
        // Role CEO, SRMGMT & BU
        const allLocations = data.onshoreLocationWiseCount.map(data => data.location)
        this.onShoreUniqueLocations = allLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[0]) {
            this.onShoreLocation1Count = this.onShoreLocation1Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[1]) {
            this.onShoreLocation2Count = this.onShoreLocation2Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[2]) {
            this.onShoreLocation3Count = this.onShoreLocation3Count + data.onshoreLocationWiseCount[i].count;
          }
        }
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        const allLocations = data.onshoreLocationWiseCount.map(data => data.location)
        this.onShoreUniqueLocations = allLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[0]) {
            this.onShoreLocation1Count = this.onShoreLocation1Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[1]) {
            this.onShoreLocation2Count = this.onShoreLocation2Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[2]) {
            this.onShoreLocation3Count = this.onShoreLocation3Count + data.onshoreLocationWiseCount[i].count;
          }
        }
      } else {
        // Role CEO, SRMGMT & BU
        const allLocations = data.onshoreLocationWiseCount.map(data => data.location)
        this.onShoreUniqueLocations = allLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[0]) {
            if (data.onshoreLocationWiseCount[i].account_name === selectedBU) {
              this.onShoreLocation1Count = this.onShoreLocation1Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[1]) {
            if (data.onshoreLocationWiseCount[i].account_name === selectedBU) {
              this.onShoreLocation2Count = this.onShoreLocation2Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[2]) {
            if (data.onshoreLocationWiseCount[i].account_name === selectedBU) {
              this.onShoreLocation3Count = this.onShoreLocation3Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
      }
    }
  }

  // Below method to update OffShore Unique locations count
  updateOffShoreUniqueLocationsCount(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.offShoreUniqueLocations = [];
    this.offShoreLocation1Count = 0;
    this.offShoreLocation2Count = 0;
    this.offShoreLocation3Count = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const allOffShoreLocations = data.offshoreLocationWiseCount.map(data => data.location)
        this.offShoreUniqueLocations = allOffShoreLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[0]) {
            if (data.offshoreLocationWiseCount[i].account_name === this.accountName) {
              this.offShoreLocation1Count = this.offShoreLocation1Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[1]) {
            if (data.offshoreLocationWiseCount[i].account_name === this.accountName) {
              this.offShoreLocation2Count = this.offShoreLocation2Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[2]) {
            if (data.offshoreLocationWiseCount[i].account_name === this.accountName) {
              this.offShoreLocation3Count = this.offShoreLocation3Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
      } else {
        // Role CEO, SRMGMT & BU
        const allOffShoreLocations = data.offshoreLocationWiseCount.map(data => data.location)
        this.offShoreUniqueLocations = allOffShoreLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[0]) {
            this.offShoreLocation1Count = this.offShoreLocation1Count + data.offshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[1]) {
            this.offShoreLocation2Count = this.offShoreLocation2Count + data.offshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[2]) {
            this.offShoreLocation3Count = this.offShoreLocation3Count + data.offshoreLocationWiseCount[i].count;
          }
        }
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        const allOffShoreLocations = data.offshoreLocationWiseCount.map(data => data.location)
        this.offShoreUniqueLocations = allOffShoreLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[0]) {
            this.offShoreLocation1Count = this.offShoreLocation1Count + data.offshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[1]) {
            this.offShoreLocation2Count = this.offShoreLocation2Count + data.offshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[2]) {
            this.offShoreLocation3Count = this.offShoreLocation3Count + data.offshoreLocationWiseCount[i].count;
          }
        }
      } else {
        // Role CEO, SRMGMT & BU
        const allOffShoreLocations = data.offshoreLocationWiseCount.map(data => data.location)
        this.offShoreUniqueLocations = allOffShoreLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[0]) {
            if (data.offshoreLocationWiseCount[i].account_name === selectedBU) {
              this.offShoreLocation1Count = this.offShoreLocation1Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[1]) {
            if (data.offshoreLocationWiseCount[i].account_name === selectedBU) {
              this.offShoreLocation2Count = this.offShoreLocation2Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[2]) {
            if (data.offshoreLocationWiseCount[i].account_name === selectedBU) {
              this.offShoreLocation3Count = this.offShoreLocation3Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
      }
    }
  }

  // Below method used to update the Dashboard counts
  updateDashboardCounts(data: any, selectedBU: string) {
    console.log("Selected BU -> ", selectedBU)

    // Reset Values
    this.totalAssociatesCount = 0;
    this.totalBillableCount = 0;
    this.totalNonBillableCount = 0;
    this.totalInTransitCount = 0;
    this.totalEbrCount = 0;
    this.totalInPollCount = 0;
    this.totalRatedCount = 0;
    this.totalNicheSkillsCount = 0;
    this.totalSmeCount = 0;
    this.totalPipeLineCount = 0;
    this.totalOpenPositionsCount = 0;
    this.totalBillingInLoss = 0;
    this.totalOnshoreCount = 0;
    this.totalOffshoreCount = 0;
    this.totalVisaUnusedCount = 0;
    this.onShoreUniqueLocations = [];
    this.offShoreUniqueLocations = [];
    this.onShoreLocation1Count = 0;
    this.onShoreLocation2Count = 0;
    this.onShoreLocation3Count = 0;
    this.offShoreLocation1Count = 0;
    this.offShoreLocation2Count = 0;
    this.offShoreLocation3Count = 0;

    if (selectedBU == "All") {
      // All means By default view or Org view
      if (this.empRole == "DH") {
        // DH Role
        const totalassociates = data.associates.filter(obj => obj.account_name === this.accountName)
        this.totalAssociatesCount = totalassociates[0].count;

        const totalBillable = data.billableAssociates.filter(obj => obj.account_name === this.accountName)
        this.totalBillableCount = totalBillable[0].count;

        const totalNonBillable = data.NonbillableAssociates.filter(obj => obj.account_name === this.accountName)
        this.totalNonBillableCount = totalNonBillable[0].count;

        const totalInTransit = data.InTransitAssociates.filter(obj => obj.account_name === this.accountName)
        this.totalInTransitCount = totalInTransit[0].count;

        const totalEBR = data.EBRAssociates.filter(obj => obj.account_name === this.accountName)
        this.totalEbrCount = totalEBR[0].count;

        const totalPool = data.PoolAssociates.filter(obj => obj.account_name === this.accountName)
        this.totalInPollCount = totalPool[0].count;

        const totalRated = data.Rated.filter(obj => obj.BU === this.accountName)
        this.totalRatedCount = totalRated[0].rated;

        const totalNicheSkills = data.NicheSkills.filter(obj => obj.bu === this.accountName)
        this.totalNicheSkillsCount = totalNicheSkills[0].niche_skills;

        const totalSme = data.sme.filter(obj => obj.BU === this.accountName)
        this.totalSmeCount = totalSme[0].SME;

        const totalPipeLine = data.releasePiplepline.filter(obj => obj.BU === this.accountName)
        if (totalPipeLine.length > 0) {
          this.totalPipeLineCount = totalPipeLine[0].Release_count;
        }

        const totalOpenPositions = data.OpenPositions.filter(obj => obj.BU === this.accountName)
        this.totalOpenPositionsCount = totalOpenPositions[0].open_positions;

        const BillingInLoss = data.BillingLoss.filter(obj => obj.BU === this.accountName)
        this.totalBillingInLoss = BillingInLoss[0].billing_loss;

        const Onshore = data.onshoreLocationWiseCount.filter(obj => obj.account_name === this.accountName)
        if (Onshore.length > 0) {
          this.totalOnshoreCount = Onshore.reduce(function (previousValue, obj) {
            return previousValue + obj.count;
          }, 0);
        }

        const Offshore = data.offshoreLocationWiseCount.filter(obj => obj.account_name === this.accountName)
        if (Offshore.length > 0) {
          this.totalOffshoreCount = Offshore.reduce(function (previousValue, obj) {
            return previousValue + obj.count;
          }, 0);
        }

        const VisaUnused = data.visa.filter(obj => obj.account_name === this.accountName)
        if (VisaUnused.length > 0) {
          this.totalVisaUnusedCount = VisaUnused[0].count;
        }
        const allLocations = data.onshoreLocationWiseCount.map(data => data.location)
        this.onShoreUniqueLocations = allLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[0]) {
            if (data.onshoreLocationWiseCount[i].account_name === this.accountName) {
              this.onShoreLocation1Count = this.onShoreLocation1Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[1]) {
            if (data.onshoreLocationWiseCount[i].account_name === this.accountName) {
              this.onShoreLocation2Count = this.onShoreLocation2Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[2]) {
            if (data.onshoreLocationWiseCount[i].account_name === this.accountName) {
              this.onShoreLocation3Count = this.onShoreLocation3Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        const allOffShoreLocations = data.offshoreLocationWiseCount.map(data => data.location)
        this.offShoreUniqueLocations = allOffShoreLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[0]) {
            if (data.offshoreLocationWiseCount[i].account_name === this.accountName) {
              this.offShoreLocation1Count = this.offShoreLocation1Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[1]) {
            if (data.offshoreLocationWiseCount[i].account_name === this.accountName) {
              this.offShoreLocation2Count = this.offShoreLocation2Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[2]) {
            if (data.offshoreLocationWiseCount[i].account_name === this.accountName) {
              this.offShoreLocation3Count = this.offShoreLocation3Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
      } else {
        // Role CEO, SRMGMT & BU
        this.totalAssociatesCount = data.associates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalBillableCount = data.billableAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalNonBillableCount = data.NonbillableAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalInTransitCount = data.InTransitAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalEbrCount = data.EBRAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalInPollCount = data.PoolAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalRatedCount = data.Rated.reduce(function (previousValue, obj) {
          return previousValue + obj.rated;
        }, 0);
        this.totalNicheSkillsCount = data.NicheSkills.reduce(function (previousValue, obj) {
          return previousValue + obj.niche_skills;
        }, 0);
        this.totalSmeCount = data.sme.reduce(function (previousValue, obj) {
          return previousValue + obj.SME;
        }, 0);
        this.totalPipeLineCount = data.releasePiplepline.reduce(function (previousValue, obj) {
          return previousValue + obj.Release_count;
        }, 0);
        this.totalOpenPositionsCount = data.OpenPositions.reduce(function (previousValue, obj) {
          return previousValue + obj.open_positions;
        }, 0);
        this.totalBillingInLoss = data.BillingLoss.reduce(function (previousValue, obj) {
          return previousValue + obj.billing_loss;
        }, 0);
        this.totalOnshoreCount = data.onshoreLocationWiseCount.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalOffshoreCount = data.offshoreLocationWiseCount.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        if (this.empRole == "DH") {
          this.totalVisaUnusedCount = data.visa.reduce(function (previousValue, obj) {
            return previousValue + obj.COUNT;
          }, 0);
        } else {
          this.totalVisaUnusedCount = data.visa.reduce(function (previousValue, obj) {
            return previousValue + obj.count;
          }, 0);
        }
        const allLocations = data.onshoreLocationWiseCount.map(data => data.location)
        this.onShoreUniqueLocations = allLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[0]) {
            this.onShoreLocation1Count = this.onShoreLocation1Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[1]) {
            this.onShoreLocation2Count = this.onShoreLocation2Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[2]) {
            this.onShoreLocation3Count = this.onShoreLocation3Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        const allOffShoreLocations = data.offshoreLocationWiseCount.map(data => data.location)
        this.offShoreUniqueLocations = allOffShoreLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[0]) {
            this.offShoreLocation1Count = this.offShoreLocation1Count + data.offshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[1]) {
            this.offShoreLocation2Count = this.offShoreLocation2Count + data.offshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[2]) {
            this.offShoreLocation3Count = this.offShoreLocation3Count + data.offshoreLocationWiseCount[i].count;
          }
        }
      }
    } else {
      // else block for select any BU from drop down
      if (this.empRole == "DH") {
        // Role DH
        this.totalAssociatesCount = data.associates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalBillableCount = data.billableAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalNonBillableCount = data.NonbillableAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalInTransitCount = data.InTransitAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalEbrCount = data.EBRAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalInPollCount = data.PoolAssociates.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalRatedCount = data.Rated.reduce(function (previousValue, obj) {
          return previousValue + obj.rated;
        }, 0);
        this.totalNicheSkillsCount = data.NicheSkills.reduce(function (previousValue, obj) {
          return previousValue + obj.niche_skills;
        }, 0);
        this.totalSmeCount = data.sme.reduce(function (previousValue, obj) {
          return previousValue + obj.SME;
        }, 0);
        this.totalPipeLineCount = data.releasePiplepline.reduce(function (previousValue, obj) {
          return previousValue + obj.Release_count;
        }, 0);
        this.totalOpenPositionsCount = data.OpenPositions.reduce(function (previousValue, obj) {
          return previousValue + obj.open_positions;
        }, 0);
        this.totalBillingInLoss = data.BillingLoss.reduce(function (previousValue, obj) {
          return previousValue + obj.billing_loss;
        }, 0);
        this.totalOnshoreCount = data.onshoreLocationWiseCount.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalOffshoreCount = data.offshoreLocationWiseCount.reduce(function (previousValue, obj) {
          return previousValue + obj.count;
        }, 0);
        this.totalVisaUnusedCount = data.visa.reduce(function (previousValue, obj) {
          return previousValue + obj.COUNT;
        }, 0);
        const allLocations = data.onshoreLocationWiseCount.map(data => data.location)
        this.onShoreUniqueLocations = allLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[0]) {
            this.onShoreLocation1Count = this.onShoreLocation1Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[1]) {
            this.onShoreLocation2Count = this.onShoreLocation2Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[2]) {
            this.onShoreLocation3Count = this.onShoreLocation3Count + data.onshoreLocationWiseCount[i].count;
          }
        }
        const allOffShoreLocations = data.offshoreLocationWiseCount.map(data => data.location)
        this.offShoreUniqueLocations = allOffShoreLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[0]) {
            this.offShoreLocation1Count = this.offShoreLocation1Count + data.offshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[1]) {
            this.offShoreLocation2Count = this.offShoreLocation2Count + data.offshoreLocationWiseCount[i].count;
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[2]) {
            this.offShoreLocation3Count = this.offShoreLocation3Count + data.offshoreLocationWiseCount[i].count;
          }
        }
      } else {
        // Role CEO, SRMGMT & BU
        let EmpRole = this.empRole;
        this.totalAssociatesCount = data.associates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);

        this.totalBillableCount = data.billableAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
        this.totalNonBillableCount = data.NonbillableAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
        this.totalInTransitCount = data.InTransitAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
        this.totalEbrCount = data.EBRAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
        this.totalInPollCount = data.PoolAssociates.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
        this.totalRatedCount = data.Rated.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.rated;
          }
          return previousValue;
        }, 0);
        this.totalNicheSkillsCount = data.NicheSkills.reduce(function (previousValue, obj) {
          if (obj.bu === selectedBU) {
            return previousValue + obj.niche_skills;
          }
          return previousValue;
        }, 0);
        this.totalSmeCount = data.sme.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.SME;
          }
          return previousValue;
        }, 0);
        this.totalPipeLineCount = data.releasePiplepline.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.Release_count;
          }
          return previousValue;
        }, 0);
        this.totalOpenPositionsCount = data.OpenPositions.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.open_positions;
          }
          return previousValue;
        }, 0);
        this.totalBillingInLoss = data.BillingLoss.reduce(function (previousValue, obj) {
          if (obj.BU === selectedBU) {
            return previousValue + obj.billing_loss;
          }
          return previousValue;
        }, 0);
        this.totalOnshoreCount = data.onshoreLocationWiseCount.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
        this.totalOffshoreCount = data.offshoreLocationWiseCount.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            return previousValue + obj.count;
          }
          return previousValue;
        }, 0);
        this.totalVisaUnusedCount = data.visa.reduce(function (previousValue, obj) {
          if (obj.account_name === selectedBU) {
            if (EmpRole == "DH") {
              return previousValue + obj.COUNT;
            } else {
              return previousValue + obj.count;
            }
          }
          return previousValue;
        }, 0);
        const allLocations = data.onshoreLocationWiseCount.map(data => data.location)
        this.onShoreUniqueLocations = allLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[0]) {
            if (data.onshoreLocationWiseCount[i].account_name === selectedBU) {
              this.onShoreLocation1Count = this.onShoreLocation1Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[1]) {
            if (data.onshoreLocationWiseCount[i].account_name === selectedBU) {
              this.onShoreLocation2Count = this.onShoreLocation2Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.onshoreLocationWiseCount.length; i++) {
          if (data.onshoreLocationWiseCount[i].location === this.onShoreUniqueLocations[2]) {
            if (data.onshoreLocationWiseCount[i].account_name === selectedBU) {
              this.onShoreLocation3Count = this.onShoreLocation3Count + data.onshoreLocationWiseCount[i].count;
            }
          }
        }
        const allOffShoreLocations = data.offshoreLocationWiseCount.map(data => data.location)
        this.offShoreUniqueLocations = allOffShoreLocations.filter((x, i, a) => x && a.indexOf(x) === i)
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[0]) {
            if (data.offshoreLocationWiseCount[i].account_name === selectedBU) {
              this.offShoreLocation1Count = this.offShoreLocation1Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[1]) {
            if (data.offshoreLocationWiseCount[i].account_name === selectedBU) {
              this.offShoreLocation2Count = this.offShoreLocation2Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
        for (var i = 0; i < data.offshoreLocationWiseCount.length; i++) {
          if (data.offshoreLocationWiseCount[i].location === this.offShoreUniqueLocations[2]) {
            if (data.offshoreLocationWiseCount[i].account_name === selectedBU) {
              this.offShoreLocation3Count = this.offShoreLocation3Count + data.offshoreLocationWiseCount[i].count;
            }
          }
        }
      }
    }
  }
}
