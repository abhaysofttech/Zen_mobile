import { ApiService } from './../../services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, Platform, AlertController, LoadingController } from '@ionic/angular'
import { Storage } from '@ionic/storage';
import { Constants } from 'src/app/constants/Constants';
import { Network } from '@ionic-native/network/ngx';
import { NavService } from 'src/app/services/nav.service';
import { Observable } from 'rxjs';

const data = {
  "chart": {
    "caption": "",
    "subcaption": "",
    "showBorder": "0",
    "use3DLighting": "0",
    "enableSmartLabels": "1",
    "startingAngle": "310",
    "showLabels": "0",
    "showValues": "1",
    "showPercentValues": "0",
    "showLegend": "1",
    "centerLabel": "Associate in $label: $value",
    "centerLabelBold": "1",
    "showTooltip": "0",
    "decimals": "1",
    "useDataPlotColorForLabels": "1",
    "theme": "fusion"
  },
  "data": []
};

@Component({
  selector: 'app-donutgraph',
  templateUrl: './donutgraph.page.html',
  styleUrls: ['./donutgraph.page.scss'],
})
export class DonutgraphPage implements OnInit {

  public pageTitle: string;
  public chartWidth = 300;
  public chartHeight = 500;
  chartType = 'doughnut2d';
  chartDataFormat = 'json';
  chartDataSource = data;
  public empRole: string;
  public accountName: string;
  public empNumber: string;
  private loader: any;
  private loaderActive: boolean = false;
  private authToken: string;
  dataSource = data;

  constructor(public menuCtrl: MenuController,
    public platform: Platform,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public network: NetworkService,
    public api: ApiService,
    public navCtrl: NavService) {

    // Hide the side menu for donut page
    this.menuCtrl.enable(false);

    this.initializeApp();
  }

  // Handle page destroy life cycle method 
  ngOnDestroy() {
    // Enable the side menu for donut page
    this.menuCtrl.enable(true);
    // Clear the graph data
    this.dataSource.data = [];
  }

  initializeApp() {

    // Get user clicked tile details using Nav Service
    let data = this.navCtrl.get()

    // Update page Title
    this.pageTitle = data.tileName;
    // Update chart Title
    this.dataSource.chart.caption = this.pageTitle;

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 100;
    }

    // Get logged in user details from local database
    this.storage.get('encryptedToken').then((token) => {
      this.authToken = token;
    })
    this.storage.get('accountName').then((account_name) => {
      this.accountName = account_name;
    })
    this.storage.get('empNumber').then((emp_number) => {
      this.empNumber = emp_number;
    })
    this.storage.get('role').then((empRoleFromDB) => {

      this.empRole = empRoleFromDB;

      // Process data to plot the graph
      this.processDataToPlotTheGraph(data.selectedBu, data.tileName, data.graphData , data.accountName)
      /**
      if (data.tileName == 'Total Associates') {
        this.totalAssociates(data.tileName, data.selectedBu);
      } else if (data.tileName == 'Delivery Billable') {
        this.deliveryBillable(data.tileName, data.selectedBu);
      } else if (data.tileName == 'Non Billable') {
        this.nonBillable(data.tileName, data.selectedBu);
      } else if (data.tileName == 'In Transit') {
        this.inTransit(data.tileName, data.selectedBu);
      } else if (data.tileName == 'EBR') {
        this.ebr(data.tileName, data.selectedBu);
      } else if (data.tileName == 'In Pool') {
        this.inPool(data.tileName, data.selectedBu, data.data);
      } else if (data.tileName == 'On Shore Other Locations') {
        this.onShoreOtherLocations(data.tileName, data.selectedBu);
      } else if (data.tileName == 'Off Shore Other Locations') {
        this.offShoreOtherLocations(data.tileName, data.selectedBu);
      }*/
    })
  }

  ngOnInit() {
  }

  // Below method to process data to plot the graph
  processDataToPlotTheGraph(selectedBU: string, tileName: string, graphData: [], accountName: string) {
    // Check for employee role
    if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
      // CEO, SRMGMT & BU Role
      if (selectedBU == 'All') {
        // OrgView
        if (tileName == 'Onshore Other Locations' || tileName == 'Offshore Other Locations') {
          // Onshore & Offshore Other Location
          this.onShoreAndOffShoreUniqueLocationsPlotGraph(graphData)
        } else {
          // Remaining tiles
          this.plotDonutGraph(graphData);
        }
      } else {
        // BU selection from My Dashboard
        if (tileName == 'Total Associates') {
          this.plotBuSpecificDonutGraph(graphData)
        } else if (tileName == 'Onshore Other Locations' || tileName == 'Offshore Other Locations') {
          this.onShoreAndOffShoreUniqueLocationsForSelectedBuPlotGraph(graphData, selectedBU)
        } else {
          this.plotDonutGraphForDh(graphData)
        }
      }
    } else if (this.empRole == 'DH') {
      // DH Role
      if (selectedBU == 'All') {
        // OrgView
        if (tileName == 'Total Associates') {
          this.plotBuSpecificDonutGraph(graphData);
        } else if (tileName == 'Onshore Other Locations') {
          this.onShoreAndOffShoreUniqueLocationsPlotGraph(graphData)
        } else if (tileName == 'Offshore Other Locations') {
          this.onShoreAndOffShoreUniqueLocationsForSelectedBuPlotGraph(graphData, accountName)
        } else {
          this.plotDonutGraphForDh(graphData)
        }
      } else {
        // BU selection from My Dashboard
        if (tileName == 'Onshore Other Locations' || tileName == 'Offshore Other Locations') {
          this.onShoreAndOffShoreUniqueLocationsPlotGraph(graphData)
        } else {
          this.plotDonutGraphPGM(graphData)
        }
      }
    }
  }

  // Below method to plot Onshore & Offshore locaitons graph for MyDashboard
  onShoreAndOffShoreUniqueLocationsForSelectedBuPlotGraph(graphdata: any, selectedBU: string) {
    var graphDataLocations = [];
    var count = 0;
    for (let i in graphdata) {
      graphDataLocations.push(graphdata[i].location)
    }
    var uniqueLocations = [];
    this.dataSource.data = [];
    uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
    console.log(uniqueLocations)
    for (let i in uniqueLocations) {
      var dataCount = 0;
      for (var key in graphdata) {
        console.log(graphdata[key])
        if (uniqueLocations[i] == graphdata[key].location) {
          if (selectedBU == graphdata[key].account_name) {
            dataCount += graphdata[key].count

            this.dataSource.data.push({
              label: uniqueLocations[i],
              value: dataCount
            });
          }
        }
      }
    }
    for (let i in graphdata) {
      count += graphdata[i].count;
      console.log(count);
    }

  }

  // Below method to plot Onshore & Offshore locaitons graph for ORG view
  onShoreAndOffShoreUniqueLocationsPlotGraph(graphdata: any) {
    var graphDataLocations = [];
    for (let i in graphdata) {
      graphDataLocations.push(graphdata[i].location)
    }
    var uniqueLocations = [];
    var count: number = 0;
    this.dataSource.data = [];
    uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
    // console.log(uniqueLocations)
    for (let i in uniqueLocations) {
      var dataCount = 0;
      for (var key in graphdata) {
        // console.log(graphdata[key])
        if (uniqueLocations[i] == graphdata[key].location) {
          dataCount += graphdata[key].count
        }
      }
      this.dataSource.data.push({
        label: uniqueLocations[i],
        value: dataCount
      });
    }
    for (let i in graphdata) {
      count += graphdata[i].count;
      // console.log(count);
    }
  }

  // Below method for OffShore Other Locations
  offShoreOtherLocations(tileName: string, selectedBU: string) {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 50;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Check for employee role
        if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
          // CEO, SRMGMT & BU Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                var graphdata = donutChartResponse.offshoreLocationWiseCount;
                var graphDataLocations = [];
                for (let i in graphdata) {
                  graphDataLocations.push(graphdata[i].location)
                }
                var uniqueLocations = [];
                var count: number = 0;
                this.dataSource.data = [];
                uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
                console.log(uniqueLocations)
                for (let i in uniqueLocations) {
                  var dataCount = 0;
                  for (var key in graphdata) {
                    console.log(graphdata[key])
                    if (uniqueLocations[i] == graphdata[key].location) {
                      dataCount += graphdata[key].count
                    }
                  }
                  this.dataSource.data.push({
                    label: uniqueLocations[i],
                    value: dataCount
                  });
                }
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.offshoreLocationWiseCount;
                var graphDataLocations = [];
                var count = 0;
                for (let i in graphdata) {
                  graphDataLocations.push(graphdata[i].location)
                }
                var uniqueLocations = [];
                this.dataSource.data = [];
                uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
                console.log(uniqueLocations)
                for (let i in uniqueLocations) {
                  var dataCount = 0;
                  for (var key in graphdata) {
                    console.log(graphdata[key])
                    if (uniqueLocations[i] == graphdata[key].location) {
                      if (selectedBU == graphdata[key].account_name) {
                        dataCount += graphdata[key].count

                        this.dataSource.data.push({
                          label: uniqueLocations[i],
                          value: dataCount
                        });
                      }
                    }
                  }
                }
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // $scope.dataSource.defaultCenterLabel = "Total : " + count;
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else if (this.empRole == 'DH') {
          // DH Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, this.accountName)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                var graphdata = donutChartResponse.offshoreLocationWiseCount;
                var graphDataLocations = [];
                for (let i in graphdata) {
                  graphDataLocations.push(graphdata[i].location)
                }
                var uniqueLocations = [];
                var count: number = 0;
                this.dataSource.data = [];
                uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
                console.log(uniqueLocations)
                for (let i in uniqueLocations) {
                  var dataCount = 0;
                  for (var key in graphdata) {
                    console.log(graphdata[key])
                    if (uniqueLocations[i] == graphdata[key].location) {
                      dataCount += graphdata[key].count
                    }
                  }
                  this.dataSource.data.push({
                    label: uniqueLocations[i],
                    value: dataCount
                  });
                }
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForDh(this.authToken, this.empNumber)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.offshoreLocationWiseCount;
                var graphDataLocations = [];
                var count = 0;
                for (let i in graphdata) {
                  graphDataLocations.push(graphdata[i].location)
                }
                var uniqueLocations = [];
                this.dataSource.data = [];
                uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
                console.log(uniqueLocations)
                for (let i in uniqueLocations) {
                  var dataCount = 0;
                  for (var key in graphdata) {
                    console.log(graphdata[key])
                    if (uniqueLocations[i] == graphdata[key].location) {
                      dataCount += graphdata[key].count
                    }
                  }
                  this.dataSource.data.push({
                    label: uniqueLocations[i],
                    value: dataCount
                  });
                }
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // $scope.dataSource.defaultCenterLabel = "Total : " + count;
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Below method for OnShore Other Locations
  onShoreOtherLocations(tileName: string, selectedBU: string) {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 50;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Check for employee role
        if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
          // CEO, SRMGMT & BU Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                var graphdata = donutChartResponse.onshoreLocationWiseCount;
                var graphDataLocations = [];
                for (let i in graphdata) {
                  graphDataLocations.push(graphdata[i].location)
                }
                var uniqueLocations = [];
                var count: number = 0;
                this.dataSource.data = [];
                uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
                console.log(uniqueLocations)
                for (let i in uniqueLocations) {
                  var dataCount = 0;
                  for (var key in graphdata) {
                    console.log(graphdata[key])
                    if (uniqueLocations[i] == graphdata[key].location) {
                      dataCount += graphdata[key].count
                    }
                  }
                  this.dataSource.data.push({
                    label: uniqueLocations[i],
                    value: dataCount
                  });
                }
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.onshoreLocationWiseCount;
                var graphDataLocations = [];
                var count = 0;
                for (let i in graphdata) {
                  graphDataLocations.push(graphdata[i].location)
                }
                var uniqueLocations = [];
                this.dataSource.data = [];
                uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
                console.log(uniqueLocations)
                for (let i in uniqueLocations) {
                  var dataCount = 0;
                  for (var key in graphdata) {
                    console.log(graphdata[key])
                    if (uniqueLocations[i] == graphdata[key].location) {
                      if (selectedBU == graphdata[key].account_name) {
                        dataCount += graphdata[key].count

                        this.dataSource.data.push({
                          label: uniqueLocations[i],
                          value: dataCount
                        });
                      }
                    }
                  }
                }
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // $scope.dataSource.defaultCenterLabel = "Total : " + count;
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else if (this.empRole == 'DH') {
          // DH Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, this.accountName)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                var graphdata = donutChartResponse.onshoreLocationWiseCount;
                var graphDataLocations = [];
                for (let i in graphdata) {
                  graphDataLocations.push(graphdata[i].location)
                }
                var uniqueLocations = [];
                var count: number = 0;
                this.dataSource.data = [];
                uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
                console.log(uniqueLocations)
                for (let i in uniqueLocations) {
                  var dataCount = 0;
                  for (var key in graphdata) {
                    console.log(graphdata[key])
                    if (uniqueLocations[i] == graphdata[key].location) {
                      dataCount += graphdata[key].count
                    }
                  }
                  this.dataSource.data.push({
                    label: uniqueLocations[i],
                    value: dataCount
                  });
                }
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForDh(this.authToken, this.empNumber)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.onshoreLocationWiseCount;
                var graphDataLocations = [];
                var count = 0;
                for (let i in graphdata) {
                  graphDataLocations.push(graphdata[i].location)
                }
                var uniqueLocations = [];
                this.dataSource.data = [];
                uniqueLocations = graphDataLocations.filter((v, i, a) => a.indexOf(v) === i)
                console.log(uniqueLocations)
                for (let i in uniqueLocations) {
                  var dataCount = 0;
                  for (var key in graphdata) {
                    console.log(graphdata[key])
                    if (uniqueLocations[i] == graphdata[key].location) {
                      dataCount += graphdata[key].count
                    }
                  }
                  this.dataSource.data.push({
                    label: uniqueLocations[i],
                    value: dataCount
                  });
                }
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // $scope.dataSource.defaultCenterLabel = "Total : " + count;
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Below method for In Pool
  inPool(tileName: string, selectedBU: string, data: []) {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 50;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Check for employee role
        if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
          // CEO, SRMGMT & BU Role
          if (selectedBU == 'All') {
            // OrgView

            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                this.plotDonutGraph(donutChartResponse.PoolAssociates);
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          } else {
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, selectedBU)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.PoolAssociates;
                let count: number = 0;
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else if (this.empRole == 'DH') {
          // DH Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, this.accountName)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                var count: number = 0;
                var graphdata = donutChartResponse.PoolAssociates;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForDh(this.authToken, this.empNumber)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.PoolAssociates;
                let count: number = 0;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].pgm,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Below method for EBR
  ebr(tileName: string, selectedBU: string) {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 50;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Check for employee role
        if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
          // CEO, SRMGMT & BU Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                this.plotDonutGraph(donutChartResponse.EBRAssociates);
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          } else {
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, selectedBU)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.EBRAssociates;
                let count: number = 0;
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else if (this.empRole == 'DH') {
          // DH Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, this.accountName)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                var count: number = 0;
                var graphdata = donutChartResponse.EBRAssociates;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForDh(this.authToken, this.empNumber)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.EBRAssociates;
                let count: number = 0;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].pgm,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Below method for In Transit
  inTransit(tileName: string, selectedBU: string) {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 50;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Check for employee role
        if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
          // CEO, SRMGMT & BU Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                this.plotDonutGraph(donutChartResponse.InTransitAssociates);
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          } else {
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, selectedBU)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.InTransitAssociates;
                let count: number = 0;
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else if (this.empRole == 'DH') {
          //DH Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, this.accountName)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                var graphdata = donutChartResponse.InTransitAssociates;
                var count: number = 0;
                this.dataSource.data = [];

                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForDh(this.authToken, this.empNumber)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.InTransitAssociates;
                let count: number = 0;
                this.dataSource.data = [];

                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].pgm,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Below method for Delivery Billable
  nonBillable(tileName: string, selectedBU: string) {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 50;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Check for employee role
        if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
          // CEO, SRMGMT & BU Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                this.plotDonutGraph(donutChartResponse.NonbillableAssociates);
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          } else {
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, selectedBU)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.NonbillableAssociates;
                let count: number = 0;
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else if (this.empRole == 'DH') {
          // DH Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, this.accountName)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var count: number = 0;
                this.dataSource.data = [];
                var graphdata = donutChartResponse.NonbillableAssociates;
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForDh(this.authToken, this.empNumber)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.NonbillableAssociates;
                var count: number = 0;
                this.dataSource.data = [];

                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].pgm,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Below method for Delivery Billable
  deliveryBillable(tileName: string, selectedBU: string) {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 50;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Check for employee role
        if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
          // CEO, SRMGMT & BU Role
          if (selectedBU == 'All') {
            // OrgView

            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                this.plotDonutGraph(donutChartResponse.billableAssociates);
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          } else {
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, selectedBU)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.billableAssociates;
                let count: number = 0;
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                this.dataSource.data = [];
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else if (this.empRole == 'DH') {
          // DH Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardDashDH(this.authToken, this.accountName)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                var graphdata = donutChartResponse.billableAssociates;
                this.dataSource.data = [];
                var count: number = 0;
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].dh,
                    value: graphdata[i].count
                  });
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
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForDh(this.authToken, this.empNumber)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.billableAssociates;
                this.dataSource.data = [];
                var count: number = 0;

                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // this.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].pgm,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Below method for Total Associates
  totalAssociates(tileName: string, selectedBU: string) {

    // Check for platform ready or not
    if (this.platform.is('cordova')) {
      // platform found
      // Get screen width & height from platform and assign platform width value to graph width & height
      // platform width -20 (left & right margins)
      this.chartWidth = this.platform.width() - 30;
      this.chartHeight = this.platform.height() - 50;
      // Check for Internet connection
      if (this.network.checkNetWorkConnection()) {
        // Internet connection available
        // Check for employee role
        if (this.empRole == 'CEO' || this.empRole == 'SRMGMT' || this.empRole == 'BU') {
          // CEO, SRMGMT & BU Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForCeoSrmgmtBu(this.authToken)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                this.plotDonutGraph(donutChartResponse.associates);
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          } else {
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardBuSpecificGraphForCeoSrmgmtBu(this.authToken, selectedBU)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                this.plotBuSpecificDonutGraph(donutChartResponse.barChartData);
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        } else if (this.empRole == 'DH') {
          // DH Role
          if (selectedBU == 'All') {
            // OrgView
            // Start loader
            this.showLoader();
            this.api.dashboardBuSpecificGraphForCeoSrmgmtBu(this.authToken, this.accountName)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)
                this.plotBuSpecificDonutGraph(donutChartResponse.barChartData);
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          } else {
            // BU selection from My Dashboard
            // Start loader
            this.showLoader();
            this.api.dashboardCountsForDh(this.authToken, this.empNumber)
              .then((dataResponse: any) => {
                // Dismiss the loader
                this.dismissLoader();
                let donutChartResponse = JSON.parse(dataResponse.data)
                console.log('Donut chart Response -> ', donutChartResponse)

                var graphdata = donutChartResponse.associates;
                var count: number = 0;
                this.dataSource.data = [];
                console.log('Graph data -> ', graphdata)
                for (let i in graphdata) {
                  count += graphdata[i].count;
                  console.log(count);
                }
                // $scope.dataSource.defaultCenterLabel = "Total : " + count;
                for (let i in graphdata) {
                  this.dataSource.data.push({
                    label: graphdata[i].pgm,
                    value: graphdata[i].count
                  });
                }
              })
              .catch((error) => {
                console.log(error)
                // Dismiss the loader
                this.dismissLoader();
                // Show alert with error message
                this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
              })
          }
        }
      } else {
        // Internet connectino not available
        this.showAlert(Constants.NO_INTERNET_ALERT_TILE,
          Constants.NO_INTERNET_ALERT_SUB_TILE)
      }
    }
  }

  // Below method to plot donut graph for DH
  plotDonutGraphForDh(graphdata: any) {

    let count: number = 0;
    this.dataSource.data = [];
    for (let i in graphdata) {
      count += graphdata[i].count;
    }
    // this.dataSource.defaultCenterLabel = "Total : " + count;
    this.dataSource.data = [];
    for (let i in graphdata) {
      this.dataSource.data.push({
        label: graphdata[i].dh,
        value: graphdata[i].count
      });
    }
  }

  // Below method to plot donut graph
  plotDonutGraph(graphdata: any) {

    let count: number = 0;
    this.dataSource.data = [];
    for (let i in graphdata) {
      count += graphdata[i].count;
    }
    // this.dataSource.defaultCenterLabel = "Total : " + count;
    for (let i in graphdata) {
      this.dataSource.data.push({
        label: graphdata[i].account_name,
        value: graphdata[i].count
      });
    }
  }

  // Below method to plot donut graph pgm
  plotDonutGraphPGM(graphdata: any) {

    let count: number = 0;
    this.dataSource.data = [];
    for (let i in graphdata) {
      count += graphdata[i].count;
    }
    // this.dataSource.defaultCenterLabel = "Total : " + count;
    for (let i in graphdata) {
      this.dataSource.data.push({
        label: graphdata[i].pgm,
        value: graphdata[i].count
      });
    }
  }

  // Below method to plot BU specific donut graph
  plotBuSpecificDonutGraph(graphdata: any) {
    this.dataSource.data = [];
    var count = 0;
    for (let i in graphdata) {
      count += Number(graphdata[i][1]);
      console.log(count);
    }
    // $scope.dataSource.defaultCenterLabel = "Total : " + count;
    const associateNames = [];
    for (let i = 0; i < graphdata.length; i++) {
      associateNames.push(graphdata[i][2])
    }

    const uniqueAssociateNames = associateNames.filter((v, i, a) => a.indexOf(v) === i)

    for (let i in uniqueAssociateNames) {
      var countData = 0;
      for (let j in graphdata) {
        if (graphdata[j][2] == uniqueAssociateNames[i]) {
          countData += graphdata[j][1] << 0;
        }
      }
      if (countData != 0) {
        this.dataSource.data.push({
          label: uniqueAssociateNames[i],
          value: countData
        });
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
