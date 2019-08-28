import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

const buChartData = {
  "chart": {
    "caption": "",
    "use3DLighting": "0",
    "showShadow": "0",
    "enableSmartLabels": "1",
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
    "borderAlpha": "50",
    "borderColor": "#000000",
    "showLabels": "1",
    "showValues": "1"
  },
  "data": []
};

const practiceChartData = {
  "chart": {
    "caption": "",
    "use3DLighting": "0",
    "showShadow": "0",
    "enableSmartLabels": "1",
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
    "borderAlpha": "50",
    "borderColor": "#000000",
    "showLabels": "1",
    "showValues": "1"
  },
  "data": []
};

const skillSetChartData = {
  "chart": {
    "caption": "",
    "use3DLighting": "0",
    "showShadow": "0",
    "enableSmartLabels": "1",
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
    "borderAlpha": "50",
    "borderColor": "#000000",
    "showLabels": "1",
    "showValues": "1"
  },
  "data": []
};

const bandChartData = {
  "chart": {
    "caption": "",
    "subcaption": "",
    "showBorder": "1",
    "borderColor": "#000000",
    "use3DLighting": "0",
    "enableSmartLabels": "1",
    "startingAngle": "310",
    "showLabels": "1",
    "showValues": "1",
    "showPercentValues": "0",
    "showLegend": "0",
    "centerLabel": "$label: $value",
    "centerLabelBold": "1",
    "showTooltip": "0",
    "decimals": "1",
    "useDataPlotColorForLabels": "1",
    "theme": "fusion"
  },
  "data": []
};

const poolAgeChartData = {
  "chart": {
    "caption": "",
    "subcaption": "",
    "showBorder": "1",
    "borderColor": "#000000",
    "use3DLighting": "0",
    "enableSmartLabels": "1",
    "startingAngle": "310",
    "showLabels": "1",
    "showValues": "1",
    "showPercentValues": "0",
    "showLegend": "0",
    "centerLabel": "$label: $value",
    "centerLabelBold": "1",
    "showTooltip": "0",
    "decimals": "1",
    "useDataPlotColorForLabels": "1",
    "theme": "fusion"
  },
  "data": []
};

const visaChartData = {
  "chart": {
    "caption": "",
    "subcaption": "",
    "showBorder": "1",
    "borderColor": "#000000",
    "use3DLighting": "0",
    "enableSmartLabels": "1",
    "startingAngle": "310",
    "showLabels": "1",
    "showValues": "1",
    "showPercentValues": "0",
    "showLegend": "0",
    "centerLabel": "$label: $value",
    "centerLabelBold": "1",
    "showTooltip": "0",
    "decimals": "1",
    "useDataPlotColorForLabels": "1",
    "theme": "fusion"
  },
  "data": []
};

@Component({
  selector: 'app-rwf-pipeline',
  templateUrl: './rwf-pipeline.page.html',
  styleUrls: ['./rwf-pipeline.page.scss'],
})
export class RwfPipelinePage implements OnInit {

  public selectViewVisaDivFlag: boolean = true;
  public selectViewPoolAgeDivFlag: boolean = true;
  public selectViewSkillSetDivFlag: boolean = true;
  public selectViewBandDivFlag: boolean = true;
  public selectViewPracticeDivFlag: boolean = true;
  public selectViewBuDivFlag: boolean = true;
  public selectYourViewFlag: boolean = false;
  public selectFiltersFlag: boolean = false;
  public buNamesList: any[];
  public practiceNamesList: any[];
  public skillNamesList: any[];
  public bandNamesList: any[];
  public poolAgeList: any[];
  public selectYourViewList: any[];
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public poolTileCount: string;
  public pipeLineTileCount: string;
  public visaResourcesTileCount: string;
  public majourSkillFamilyTileCount: string;
  public chartWidth = 300;
  public chartHeight = 300;
  chartType = 'pie2d';
  doughnutChartType = 'doughnut2d';
  chartDataFormat = 'json';
  byBusinessUnitChartDataSource = buChartData;
  byBusinessUnitDataSource = buChartData;
  byPracticeChartDataSource = practiceChartData;
  byPracticeDataSource = practiceChartData;
  bySkillSetChartDataSource = skillSetChartData;
  bySkillSetDataSource = skillSetChartData;
  byBandChartDataSource = bandChartData;
  byBandDataSource = bandChartData;
  byPoolAgeChartDataSource = poolAgeChartData;
  byPoolAgeDataSource = poolAgeChartData;
  byVisaChartDataSource = visaChartData;
  byVisaDataSource = visaChartData;
  rwfResourceListResponseData: any;

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

      // Api call to get the RWF Dashboard data
      this.getRwfPipeLineData();
    })
  }

  ngOnInit() {
  }

  // Get RWF Pipeline data using API's
  getRwfPipeLineData() {
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
        // this.showLoader();

        this.api.getRwfPipelineDropDownData(this.authToken)
          .then((response: any) => {
            // Dismiss the loader
            // this.dismissLoader();

            let rwfPipeLineDropdownDataResponse = JSON.parse(response.data);
            console.log('RWF Pipeline Dropdown Response -> ', rwfPipeLineDropdownDataResponse)

            // Clear the values
            this.buNamesList = [];
            this.practiceNamesList = [];
            this.skillNamesList = [];
            this.bandNamesList = [];
            this.poolAgeList = [];
            this.selectYourViewList = [];

            // Select BU dropdown data
            for (let i = 0; i < rwfPipeLineDropdownDataResponse.buNames.length; i++) {
              let data = {
                "bu": "",
                "isSelected": false
              }
              data.bu = rwfPipeLineDropdownDataResponse.buNames[i];
              data.isSelected = true;
              this.buNamesList.push(data)
            }

            // Comma seperated BU's
            let buArray: string[] = [];
            for (let bu of this.buNamesList) {
              buArray.push(bu.bu)
            }

            // Select Practice dropdown data
            for (let i = 0; i < rwfPipeLineDropdownDataResponse.practiceNames.length; i++) {
              let data = {
                "practiceName": "",
                "isSelected": false
              }
              data.practiceName = rwfPipeLineDropdownDataResponse.practiceNames[i];
              data.isSelected = true;
              this.practiceNamesList.push(data)
            }

            // Comma seperated Practices's
            let practiceArray: string[] = [];
            for (let practice of this.practiceNamesList) {
              practiceArray.push(practice.practiceName)
            }

            // Select Skill dropdown data
            for (let i = 0; i < rwfPipeLineDropdownDataResponse.skillNames.length; i++) {
              let data = {
                "skillName": "",
                "isSelected": false
              }
              data.skillName = rwfPipeLineDropdownDataResponse.skillNames[i];
              data.isSelected = true;
              this.skillNamesList.push(data)
            }

            // Comma seperated Skill's
            let skillArray: string[] = [];
            for (let skill of this.skillNamesList) {
              skillArray.push(skill.skillName)
            }

            // Select Band dropdown data
            for (let i = 0; i < rwfPipeLineDropdownDataResponse.bandList.length; i++) {
              let data = {
                "bandName": "",
                "isSelected": false
              }
              data.bandName = rwfPipeLineDropdownDataResponse.bandList[i];
              data.isSelected = true;
              this.bandNamesList.push(data)
            }

            // Comma seperated Band's
            let bandArray: string[] = [];
            for (let band of this.bandNamesList) {
              bandArray.push(band.bandName)
            }

            // Select Pool age dropdown data
            this.poolAgeList.push({ "poolAge": "0-7 days", "isSelected": true, "value": "0" });
            this.poolAgeList.push({ "poolAge": "7-14 days", "isSelected": true, "value": "1" });
            this.poolAgeList.push({ "poolAge": "15-28 days", "isSelected": true, "value": "2" });
            this.poolAgeList.push({ "poolAge": "> 28 days", "isSelected": true, "value": "3" });

            // Comma seperated Pool age's
            let poolArray: string[] = [];
            for (let pool of this.poolAgeList) {
              poolArray.push(pool.value)
            }

            // Select your view check boxes by default selected all
            this.selectYourViewList.push({ "buName": "BU", "isSelected": true });
            this.selectYourViewList.push({ "buName": "Practice", "isSelected": true });
            this.selectYourViewList.push({ "buName": "Band", "isSelected": true });
            this.selectYourViewList.push({ "buName": "Skillset", "isSelected": true });
            this.selectYourViewList.push({ "buName": "Pool Inflow Age", "isSelected": true });
            this.selectYourViewList.push({ "buName": "Visa", "isSelected": true });

            // API call to get the RWF Pipeline data
            this.getRwfPipeLineDataFromAPI(this.authToken, buArray.toString(), practiceArray.toString(),
              skillArray.toString(), bandArray.toString(), poolArray.toString());

          })
          .catch((error) => {
            console.log(error)
            // Dismiss the loader
            // this.dismissLoader();
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

  // Select View BU check box change listener
  selectViewBuCheckBoxChangeEvent(data: any) {
    if (data == false) {
      this.selectYourViewList[0].isSelected = false;
      this.selectViewBuDivFlag = false;
    } else if (data == true) {
      this.selectYourViewList[0].isSelected = true;
      this.selectViewBuDivFlag = true;
    }
  }

  // Select View Practice check box change listener
  selectViewPracticeCheckBoxChangeEvent(data: any) {
    if (data == false) {
      this.selectYourViewList[1].isSelected = false;
      this.selectViewPracticeDivFlag = false;
    } else if (data == true) {
      this.selectYourViewList[1].isSelected = true;
      this.selectViewPracticeDivFlag = true;
    }
  }

  // Select View Band check box change listener
  selectViewBandCheckBoxChangeEvent(data: any) {
    if (data == false) {
      this.selectYourViewList[2].isSelected = false;
      this.selectViewBandDivFlag = false;
    } else if (data == true) {
      this.selectYourViewList[2].isSelected = true;
      this.selectViewBandDivFlag = true;
    }
  }

  // Select View Skill Set check box change listener
  selectViewSkillSetCheckBoxChangeEvent(data: any) {
    if (data == false) {
      this.selectYourViewList[3].isSelected = false;
      this.selectViewSkillSetDivFlag = false;
    } else if (data == true) {
      this.selectYourViewList[3].isSelected = true;
      this.selectViewSkillSetDivFlag = true;
    }
  }

  // Select View Pool Age check box change listener
  selectViewPoolAgeCheckBoxChangeEvent(data: any) {
    if (data == false) {
      this.selectYourViewList[4].isSelected = false;
      this.selectViewPoolAgeDivFlag = false;
    } else if (data == true) {
      this.selectYourViewList[4].isSelected = true;
      this.selectViewPoolAgeDivFlag = true;
    }
  }

  // Select View Visa check box change listener
  selectViewVisaCheckBoxChangeEvent(data: any) {
    if (data == false) {
      this.selectYourViewList[5].isSelected = false;
      this.selectViewVisaDivFlag = false;
    } else if (data == true) {
      this.selectYourViewList[5].isSelected = true;
      this.selectViewVisaDivFlag = true;
    }
  }

  // BU Select All / DeSelect All event
  selectAllBuChangeEvent(event: any) {
    console.log("data changed " + event)
  }

  // Get Selected BU values
  getSelectedBuDropdownValues(data: string[]) {
    // Loop to maintain select & deselect BU states
    for (let bu of this.buNamesList) {
      if (data.includes(bu.bu)) {
        // BU found, make it true
        this.buNamesList.find(item => item.bu == bu.bu).isSelected = true;
      } else {
        // BU didn't found, make it false
        this.buNamesList.find(item => item.bu == bu.bu).isSelected = false;
      }
    }
  }

  // Get Selected Practice values
  getSelectedPracticeDropdownValues(data: any) {
    // Loop to maintain select & deselect Practice states
    for (let practice of this.practiceNamesList) {
      if (data.includes(practice.practiceName)) {
        // Practice name found, make it true
        this.practiceNamesList.find(item => item.practiceName == practice.practiceName).isSelected = true;
      } else {
        // Practice name didn't found, make it false
        this.practiceNamesList.find(item => item.practiceName == practice.practiceName).isSelected = false;
      }
    }
  }

  // Get Skill values
  getSelectedSkillDropdownValues(data: any) {
    // Loop to maintain select & deselect Skill states
    for (let skill of this.skillNamesList) {
      if (data.includes(skill.skillName)) {
        // Skill name found, make it true
        this.skillNamesList.find(item => item.skillName == skill.skillName).isSelected = true;
      } else {
        // Skill name didn't found, make it false
        this.skillNamesList.find(item => item.skillName == skill.skillName).isSelected = false;
      }
    }
  }

  // Get Band values
  getSelectedBandDropdownValues(data: any) {
    // Loop to maintain select & deselect Band states
    for (let band of this.bandNamesList) {
      if (data.includes(band.bandName)) {
        // Band name found, make it true
        this.bandNamesList.find(item => item.bandName == band.bandName).isSelected = true;
      } else {
        // Band name didn't found, make it false
        this.bandNamesList.find(item => item.bandName == band.bandName).isSelected = false;
      }
    }
  }

  // Get Pool Age values
  getSelectedPoolAgeDropdownValues(data: any) {
    // Loop to maintain select & deselect Pool Age states
    for (let age of this.poolAgeList) {
      if (data.includes(age.value)) {
        // Pool age found, make it true
        this.poolAgeList.find(item => item.poolAge == age.poolAge).isSelected = true;
      } else {
        // Pool age didn't found, make it false
        this.poolAgeList.find(item => item.poolAge == age.poolAge).isSelected = false;
      }
    }
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
  }

  // Go button click event
  rwfPipeLineSelectFiltersGoBtnClick() {
    // Toggle selct filters menu
    if (this.selectFiltersFlag == false) {
      this.selectFiltersFlag = true;
    } else if (this.selectFiltersFlag == true) {
      this.selectFiltersFlag = false;
    }

    // Get selected BU's
    let buArray = [];
    for (let i = 0; i < this.buNamesList.length; i++) {
      if (this.buNamesList[i].isSelected == true) {
        buArray.push(this.buNamesList[i].bu)
      }
    }

    // Get selected Practice's
    let practiceArray = [];
    for (let i = 0; i < this.practiceNamesList.length; i++) {
      if (this.practiceNamesList[i].isSelected == true) {
        practiceArray.push(this.practiceNamesList[i].practiceName)
      }
    }

    // Get selected Skills's
    let skillArray = [];
    for (let i = 0; i < this.skillNamesList.length; i++) {
      if (this.skillNamesList[i].isSelected == true) {
        skillArray.push(this.skillNamesList[i].skillName)
      }
    }

    // Get selected Band's
    let bandArray = [];
    for (let i = 0; i < this.bandNamesList.length; i++) {
      if (this.bandNamesList[i].isSelected == true) {
        bandArray.push(this.bandNamesList[i].bandName)
      }
    }

    // Get selected Pool age's
    let poolArray = [];
    for (let i = 0; i < this.poolAgeList.length; i++) {
      if (this.poolAgeList[i].isSelected == true) {
        poolArray.push(this.poolAgeList[i].value)
      }
    }

    // Call API to get updated data
    this.getRwfPipeLineDataFromAPI(this.authToken, buArray.toString(), practiceArray.toString(),
      skillArray.toString(), bandArray.toString(), poolArray.toString())
  }

  // Generic method to get RWF Pipeline data
  getRwfPipeLineDataFromAPI(authToken: string, buArray: string, practiceArray: string,
    skillArray: string, bandArray: string, poolArray: string) {

    // Show loader
    this.showLoader()

    this.api.getRwfPipeLineData(authToken, buArray.toString(), practiceArray.toString(),
      skillArray.toString(), bandArray.toString(), poolArray.toString())
      .subscribe(response => {

        // Dismiss the loader
        this.dismissLoader()

        // Update Tile counts
        let topStripResponse = JSON.parse(response[0].data);
        this.pipeLineTileCount = topStripResponse.poolPipelineTotalCount.pipeline;
        this.visaResourcesTileCount = topStripResponse.pipelineVisaTotalCount.withVisa;
        this.majourSkillFamilyTileCount = Object.keys(topStripResponse.topFamilySkill).toString();

        let graphResponse = JSON.parse(response[1].data);
        // Common method to plot the graphs
        this.plotMultipleGraphs(graphResponse);

        // more details data
        this.rwfResourceListResponseData = [];
        this.rwfResourceListResponseData = JSON.parse(response[2].data);
      }, error => {
        console.log(error)
        // Dismiss the loader
        this.dismissLoader();
        // Show alert with error message
        this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
      })
  }

  // Plot multiple graphs
  plotMultipleGraphs(graphResponse: any) {
    // Plot By Business Unit pie chart
    this.byBusinessUnitDataSource.data = [];
    this.byBusinessUnitDataSource.chart.caption = "BY BUSINESS UNIT";
    for (let i = 0; i < graphResponse.buWise.length; i++) {
      this.byBusinessUnitDataSource.data.push({
        label: graphResponse.buWise[i]._id,
        value: graphResponse.buWise[i].count
      })
    }

    // Plot By Practice pie chart
    this.byPracticeDataSource.data = [];
    this.byPracticeDataSource.chart.caption = "BY PRACTICE";
    for (let i = 0; i < graphResponse.practiceWise.length; i++) {
      this.byPracticeDataSource.data.push({
        label: graphResponse.practiceWise[i]._id,
        value: graphResponse.practiceWise[i].count
      })
    }

    // Plot By Band donut chart
    this.byBandDataSource.data = [];
    this.byBandDataSource.chart.caption = "BY BAND";
    for (let i = 0; i < graphResponse.bandList.count.length; i++) {
      this.byBandDataSource.data.push({
        label: graphResponse.bandList.count[i]._id,
        value: graphResponse.bandList.count[i].count
      })
    }

    // Plot By Skill set pie chart
    this.bySkillSetDataSource.data = [];
    this.bySkillSetDataSource.chart.caption = "BY SKILL SET";
    for (let key in graphResponse.skillList.count) {
      this.bySkillSetDataSource.data.push({
        label: key,
        value: graphResponse.skillList.count[key]
      })
    }

    // Plot By Pool Age donut chart
    this.byPoolAgeDataSource.data = [];
    this.byPoolAgeDataSource.chart.caption = "BY POOL AGE";
    for (let i = 0; i < graphResponse.poolAgeList.count.length; i++) {
      if (graphResponse.poolAgeList.count[i]._id == "-7") {
        this.byPoolAgeDataSource.data.push({
          label: "0 - 7 days",
          value: graphResponse.poolAgeList.count[i].count
        })
      }
      if (graphResponse.poolAgeList.count[i]._id == "-14") {
        this.byPoolAgeDataSource.data.push({
          label: "7-14 days",
          value: graphResponse.poolAgeList.count[i].count
        })
      }
      if (graphResponse.poolAgeList.count[i]._id == "-28") {
        this.byPoolAgeDataSource.data.push({
          label: "15-28 days",
          value: graphResponse.poolAgeList.count[i].count
        })
      }
      if (graphResponse.poolAgeList.count[i]._id == "-Infinity") {
        this.byPoolAgeDataSource.data.push({
          label: "> 28 days",
          value: graphResponse.poolAgeList.count[i].count
        })
      }
    }

    // Plot By Visa donut chart
    this.byVisaDataSource.data = [];
    this.byVisaDataSource.chart.caption = "BY VISA";
    for (let key in graphResponse.visaStatus) {
      this.byVisaDataSource.data.push({
        label: key,
        value: graphResponse.visaStatus[key]
      })
    }
  }

  // Select Your View click event
  selectYourViewClick() {
    // Toggle select your view
    if (this.selectYourViewFlag == false) {
      this.selectYourViewFlag = true;
    } else if (this.selectYourViewFlag == true) {
      this.selectYourViewFlag = false;
    }
  }

  // Select filters click event
  selectFiltersClick() {
    // Toggle selct filters menu
    if (this.selectFiltersFlag == false) {
      this.selectFiltersFlag = true;
    } else if (this.selectFiltersFlag == true) {
      this.selectFiltersFlag = false;
    }
  }

  // By Business Unit more click button event
  businessUnitMoreBtnClick(event: any) {
    this.navCtrl.push('rwf-dashboard-more-details',
      {
        "pageTitle": "Associates Business Details",
        "data": this.rwfResourceListResponseData
      })
  }

  // By Practice more click button event
  practiceMoreBtnClick(event: any) {
    this.navCtrl.push('rwf-dashboard-more-details',
      {
        "pageTitle": "Associate Practice Details",
        "data": this.rwfResourceListResponseData
      })
  }

  // By Band more click button event
  bandMoreBtnClick(event: any) {
    this.navCtrl.push('rwf-dashboard-more-details',
      {
        "pageTitle": "Associate Band Details",
        "data": this.rwfResourceListResponseData
      })
  }

  // By SkillSet more click button event
  skillSetMoreBtnClick(event: any) {
    this.navCtrl.push('rwf-dashboard-more-details',
      {
        "pageTitle": "Associate Skill Details",
        "sourcePage": "RWF Pipeline",
        "data": this.rwfResourceListResponseData
      })
  }

  // By Pool Age more click button event
  poolAgeMoreBtnClick(event: any) {
    this.navCtrl.push('rwf-dashboard-more-details',
      {
        "pageTitle": "Associate Pool Age Details",
        "data": this.rwfResourceListResponseData
      })
  }

  // By Visa more click button event
  visaMoreBtnClick(event: any) {
    this.navCtrl.push('rwf-dashboard-more-details',
      {
        "pageTitle": "Associate Visa Details",
        "data": this.rwfResourceListResponseData
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
}
