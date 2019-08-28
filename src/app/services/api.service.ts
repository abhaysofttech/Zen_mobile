import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';
import { forkJoin, Observable, of } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { UserProfile } from '../pages/directory/user-profile.model'
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { HttpResponse } from '@angular/common/http';
import { AssociateObject } from '../pages/rwf/my-rwf-transaction/associateObject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public httpPlugin: HTTP) {

  }

  // Local
  // url: string = "http://localhost:8080/ZenForteWebServices/api/";
  // directoryUrl: string = "http://10.76.176.156:8080/DirectoryService"

  // Dev
  // url: string = "http://10.76.176.160:8080/ZenForteWebServices/api/";
  // directoryUrl: string = "http://10.76.176.123:8282/DirectoryService";

  // Stage

  // Prod
  // url: string = "https://zenforte.zensar.com/ZenForteWebServices/api/";
  // url: string = "https://zenforte.zensar.com/ZenForteWebServices_demo/api/";
  url: string = "https://zenforte.zensar.com/ZenForteWebServices_PreRelease/api/";
  // directoryUrl: string = "https://zenforte.zensar.com/DirectoryService";
  directoryUrl: string = "https://zenforte.zensar.com/DirectoryService_PreRelease";


  // Set limit for API call
  apiRequestTimeOut: number = 300;

  // Webservice methods
  // Login with Token
  loginServiceWithEncryptedToken: string = "authentication/greetCopyNew";

  // Login without token & password will be by pass with user enters "$Zen2017
  loginSerivce: string = "authentication/greetBody";

  // Dashboard graph for CEO, SRMGMT & BU
  dashboardGraphForCeoSrmgmtBuService: string = "managementDashboard/graphNew?role=BU";

  // Dashboard BU specific graph for CEO, SRMGMT & BU
  dashboardBuSpecificGraphForCeoSrmgmtBuService: string = "managementDashboard/graphNew?account_name="

  // Dashboard BU specific graph for DH
  dashboardBuSpecificGraphForDhService: string = "managementDashboard/graphNew?role=";

  // Dashboard counts for CEO, SRMGMT & BU
  dashboardCountsForCeoSrmgmtBuService: string = "managementDashboard/dashboard";

  // Dashboard counts for DH
  dashboardCountsForDhService: string = "managementDashboard/toggleDH?dh_id="

  // Dashboard counts for DH
  dashboardDashDhService: string = "managementDashboard/dashDH?account_name=";

  // 25 Window 
  twentyFiveWindowService: string = "dashboard/allDashboard?staff_no=";

  // OverAll Associates
  overallAssociatesService: string = "charts/pieChart/";

  // PGM Distribution
  pgmDistributionService: string = "charts/barChart/"

  // 25 Window tile click for without weightage
  withoutWeightageListService: string = "getMatrixDetailsWS/getMoreDetails?parameter=celldetailnowtg&rowColNo="

  // 25 Window tile click for with weightage
  withWeightageListService: string = "getMatrixDetailsWS/getMoreDetails?parameter=weightdetail&rowColNo="

  // Fetch employee profile picture
  fetchUserProfilePicService: string = "searchEngine/getImage/";

  // without weightage associate more information with charts
  withouWeightageMoreInfoWithChartsService: string = "viewDetails?staffNo=";

  // OVerAll associates pie chart drilldown
  overAllAssociatesChartLabelDrillDownService = "charts/pieChart/";

  // Search Similar Associate
  searchSimilarAssociateService = "searchEngine/listSimilarAssociates/";

  // Search Associate
  searchAssociateService = "searchAssociateMatrix/byAny?staff_name_auto=";

  // RWF Ageing
  rwfAgeingService = "rwf/ageing/";

  // RWF Skill Count
  rwfSkillCountService = "rwf/skillCount/"

  // RWF Skill pie chart drill down
  resorceListForSkillService = "rwf/resourceListForSkill/"

  // RWF get rating data
  rwfResourceGetRatingDataService = "rwf/getRatingData/"

  // RWF Select
  rwfSelectService = "rwftrans/pipelineEmpDetailsreal?parameter=insertMapping&staff_no="

  // RWF Delete
  rwfDeleteService = "rwftrans/pipelineEmpDetailsreal?parameter=deleteMapping&staff_no="

  // Deamnd List
  demandListService = "demand/demandForecasting?staff_no="

  // Demand Additional Details
  demandAdditionalDetailsService = "demand/demandForecasting?staff_no="

  // Save SRF Details
  saveSrfSerice = "srfaction?staff_no="

  // PGM Bar Graph Drill Down
  pgmDrillDownService = "charts/barChartDetail/"

  // RWF Dashboard dropdown values
  rwfDashboardDropDownDataService = "rwfDashboard/dropdownDataRwf"

  // RWF Dashboard top strip data
  rwfDashboardTopStripDataService = "rwfDashboard/topStripRwf?buList=";

  // RWF Dashboard graph 
  rwfDashboardGraphDataServie = "rwfDashboard/graphsRwf?buList=";

  // RWF Dashboard resource 
  rwfDashboardResourceDataService = "rwfDashboard/resourceListRwf?buList=";

  // RWF Pipeline dropdown values
  rwfPiplelineDropDownDataService = "rwfDashboard/dropdownDataPipeline"

  // RWF Pipleline resource list pipeline
  rwfPipelineResourceListDataService = "rwfDashboard/resourceListPipeline?buList=";

  // RWF Pipeline graphs
  rwfPipelineGraphDataService = "rwfDashboard/graphsPipeline?buList=";

  // RWF Pipeline top strip
  rwfPipelineTopStripDataService = "rwfDashboard/topStripPipeline?buList=";

  // Get Account list
  getAccountList = "managementDashboard/dashboard/account";

  // Get Total Associates count
  getTotalAssociatesCount = "managementDashboard/dashboard/associates";

  // Get Billable Associates count
  getBillableAssociatesCount = "managementDashboard/dashboard/billable";

  // Get Non Billable Associates count
  getNonBillableAssociatesCount = "managementDashboard/dashboard/nonbillable";

  // Get Intransit count
  getInTransitCount = "managementDashboard/dashboard/intransit";

  // Get Pool count
  getPoolCount = "managementDashboard/dashboard/pool";

  // Get EBR Count
  getEbrCount = "managementDashboard/dashboard/ebr";

  // Get OnShore Location wise count
  getOnShoreLocationWiseCount = "managementDashboard/dashboard/onshoreLocationWiseCount";

  // Get OffShore Loaction wise count
  getOffShoreLocationWiserCount = "managementDashboard/dashboard/offshoreLocationWiseCount";

  // Get Open positions count
  getOpenPositionsCount = "managementDashboard/dashboard/OpenPositions";

  // Get Billing loss count
  getBillingLossCount = "managementDashboard/dashboard/BillingLoss";

  // Get Niche skills count
  getNicheSkillsCount = "managementDashboard/dashboard/NicheSkills";

  // Get SME count
  getSmeCount = "managementDashboard/dashboard/sme";

  // Get Release Pipeline count
  getReleasePipelineCount = "managementDashboard/dashboard/releasePiplepline";

  // Get Visa count
  getVisaCount = "managementDashboard/dashboard/visa";

  // Get Rated count
  getRatedCount = "managementDashboard/dashboard/rated";

  // Get Total Associates count for DH
  getTotalAssociatesCountForDh = "managementDashboard/toggleDH/associates?dh_id=";

  // Get Billable Associates count for DH
  getBillableAssociatesCountForDh = "managementDashboard/toggleDH/billable?dh_id=";

  // Get Non Billable Associates count for DH
  getNonBillableAssociatesCountForDh = "managementDashboard/toggleDH/nonbillable?dh_id=";

  // Get Intransit count for DH
  getInTransitCountForDh = "managementDashboard/toggleDH/intransit?dh_id=";

  // Get Pool count for DH
  getPoolCountForDh = "managementDashboard/toggleDH/pool?dh_id=";

  // Get EBR Count for DH
  getEbrCountForDh = "managementDashboard/toggleDH/ebr?dh_id=";

  // Get OnShore Location wise count for DH
  getOnShoreLocationWiseCountForDh = "managementDashboard/toggleDH/onshoreLocationWiseCount?dh_id=";

  // Get OffShore Loaction wise count for DH
  getOffShoreLocationWiserCountForDh = "managementDashboard/toggleDH/offshoreLocationWiseCount?dh_id=";

  // Get Open positions count for DH
  getOpenPositionsCountForDh = "managementDashboard/toggleDH/OpenPositions?dh_id=";

  // Get Billing loss count for DH
  getBillingLossCountForDh = "managementDashboard/toggleDH/BillingLoss?dh_id=";

  // Get Niche skills count for DH
  getNicheSkillsCountForDh = "managementDashboard/toggleDH/NicheSkills?dh_id=";

  // Get SME count for DH
  getSmeCountForDh = "managementDashboard/toggleDH/sme?dh_id=";

  // Get Release Pipeline count for DH
  getReleasePipelineCountForDh = "managementDashboard/toggleDH/releasePiplepline?dh_id=";

  // Get Visa count for DH
  getVisaCountForDh = "managementDashboard/toggleDH/visa?dh_id=";

  // Get Rated count for DH
  getRatedCountForDh = "managementDashboard/toggleDH/rated?dh_id=";

  // Get Billable Associates dash dh count
  getDashDhBillableAssociatesCount = "managementDashboard/dashDH/billable?account_name=";

  // Get Non Billable Associates dash dh count
  getDashDhNonBillableAssociatesCount = "managementDashboard/dashDH/nonbillable?account_name=";

  // Get Intransit dash dh count
  getDashDhInTransitCount = "managementDashboard/dashDH/intransit?account_name=";

  // Get EBR dash dh Count
  getDashDhEbrCount = "managementDashboard/dashDH/ebr?account_name=";

  // Get Pool dash dh count
  getDashDhPoolCount = "managementDashboard/dashDH/pool?account_name=";

  // Gender chart for PGM 
  getGenderChartForPGM = "charts/genderChart/";

  // Happiness index API
  happinessIndexService = "happiness/save";

  // Get Profile Info
  getProfileInfo = 'profile/getProfile?staff_no=';

  // Get technical skills for associate in profile info
  getTechnicalSkills = 'profile/getTechnicalSkills?staff_no=';

  // Get certificate details for associate in profile info
  getCertificateDetails = 'profile/getExistingCertificateDetails?staff_no=';

  // Get Domain details for associate in profile info
  getDomainDetails = 'profile/getExistingDomainData?staff_no=';

  // Get accolade details for associate in profile info
  getAccoladeDetails = 'profile/getExistingAccoladeData?staff_no=';

  // Get Visa Details for associate in profile info
  getVisaDetails = 'visa/getVisaFormDetails';

  // Get the list of Certificate names
  getCertificateDataURL = 'profile/getNewCertificateDetails?staff_no=';

  // Get Domain dropdown data for associate in profile info
  getDomainDataURL = 'profile/getNewDomainData?staff_no=';

  // Post to submit profile update certificate details
  postCertificateDetailsURL = 'profile/updateCertificateDetails?staff_no=';

  // Delete certificate from profile update
  deleteCertificateURL = 'profile/deleteCertificateDetails?staff_no=';

  // Sumbit accolade details
  submitAccoladeDetailsURL = 'profile/updateAccoladeDetails?staff_no=';

  // Delete accolade details
  deleteAccoladeURL = 'profile/deleteAccoladeDetails?staff_no=';

  // submit domain details
  submitDomainDetailsURL = 'profile/updateDomainDetails?staff_no=';

  // Delete domain details
  deleteDomainURL = 'profile/deleteDomainDetails?staff_no=';

  // Submit profile Info details
  submitProfileDetailsURL = 'profile/updatePersonalDetails?staff_no=';

  //
  uploadProfilePicURL = 'profile/saveImage?staff_no=';

  // Twenty five window with weightage more details API methos
  getTwentyFiveWindowWithWeightageMoreDetails = "viewMatrixDetails/WithWeightageMoreDetails?mgrId="

  // Twenty five window without weightage more details API methos
  getTwentyFiveWindowWithoutWeightageMoreDetails = "viewMatrixDetails/WithoutWeightageMoreDetails?mgrId="

  // Leadwise distribution more details API
  getLeadWiseDistributionMoreDetails = "viewMatrixDetails/LeadwiseDistributionMoreDetails?mgrId=";

  // Overall associates more details API
  getOverallAssociatesMoreDetails = "viewMatrixDetails/OverallAssociatesMoreDetails?mgrId=";

  // 25 window with weightage history ratings API
  getWithWeightageHistoryRating = "getHistoryRatings/all?staffNo=";

  // 25 window with weightage history ratings drilldown API
  getWithWeightageHistoryRatingDrilldown = "getHistoryRatings/rating?staffName=";

  // Generic Search with search parameters API
  genericSearchWithSearchParametersService = "genericSearch/searchDetails?account=";

  // Fetch My RWF Transactions data
  getMyRwfTransactionsData = "rwf/myRwfTransaction?mgrId=";

  // Submit My RWF Transactions data
  submitRwfTransactionsData = "rwf/submitRwfTransaction?mgr_id=";

  // Cancel My RWF Transactions data
  cancelRwfTransactionsData = "rwf/cancelShortlisted?mgr_id=";

  // Generic search location dropdown data
  genericSearchLocationDropdownData = "/genericSearch/getLocationList";

  // Generic search account dropdown data 
  genericSearchAccountDropdownData = "/genericSearch/getUserSpecificAccounts?mgr_id="

  // Generic search All skills autocomplete data
  genericSearchAllSkillsData = "/genericSearch/allSkills";


  /**
   * Login method to validate user credentials
   * this method is used for without token
   * this method will be bypass if user enters "$Zen2017" as password, 
   * so that we can check different roles.
   */
  login(userName: string, password: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {
        "strUsername": userName,
        "strPassword": password
      }

      // Prepare headers
      let headers: {
        "Content-Type": "application/json"
      }

      // Http post method 
      // this.httpPlugin.post(this.url + this.loginServiceWithEncryptedToken, body, headers)
      this.httpPlugin.post(this.url + this.loginSerivce, body, headers)
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
   * Below post method is used to save user happiness
   * 
   * @param authToken 
   * @param staff_no
   * @param gps_location
   * @param type_device
   * @param happiness_flag
   * @param dateTime
   */


  saveHappinessIndex(authToken: string, staffNumber: string, gpsLocation: string, deviceType: string,
    happinessValue: number, dateTime: string): Promise<any> {
    
    return new Promise((resolve, reject) => {
    
   // Set request time
   this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
   this.httpPlugin.setDataSerializer('json');

   // Prepare body
   let body = {
     "staff_no": staffNumber,
     "gps_location": gpsLocation,
     "type_device": deviceType,
     "happiness_value": happinessValue,
     "dateTime": dateTime
   }

   // Prepare headers
   this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
   this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

   // Http post method 
   this.httpPlugin.post(this.url + this.happinessIndexService, body, {})
     .then((success) => {
       resolve(success)
     })
     .catch((error) => {
       reject(error)
     })
 });
}

  /**
    * Below Post method used to Submit shortlist associates on My RWF Transactions page
    * @param authToken
    * @param empNumber
    * @param empRole
    * @param data
    */
   submitShortlistMyRwfTransactionsData(authToken: string, empNumber: string, empRole: string,
    data: any[]): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {
      }

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.submitRwfTransactionsData +
        empNumber + "&role=" + empRole, data, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }
    


  // saveHappinessIndex(authToken: string, staffNumber: string, gpsLocation: string, deviceType: string,
  //   happinessFlag: string, dateTime: string): Promise<any> {

  //   return new Promise((resolve, reject) => {

  //     // Set request time
  //     this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
  //     this.httpPlugin.setDataSerializer('json');

  //     // Prepare body
  //     let body = {
  //       "staff_no": staffNumber,
  //       "gps_location": gpsLocation,
  //       "type_device": deviceType,
  //       "happiness_flag": happinessFlag,
  //       "dateTime": dateTime
  //     }

  //     // Prepare headers
  //     this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
  //     this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

  //     // Http post method 
  //     this.httpPlugin.post(this.url + this.happinessIndexService, body, {})
  //       .then((success) => {
  //         resolve(success)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   });
  // }

  /**
   * Below Post method used to get 25 window data
   */
  twentyFiveWindow(authToken: string, empNumber: string, empRole: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {
      }

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.twentyFiveWindowService +
        empNumber + "&role=" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
    * Below Post method used to Cancel shortlist associates on My RWF Transactions page
    * @param authToken
    * @param empNumber
    * @param empRole
    * @param associateData
    */
  cancelShortlistMyRwfTransactionsData(authToken: string, empNumber: string, empRole: string,
    associateData: AssociateObject[]): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {
      }

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.cancelRwfTransactionsData +
        empNumber + "&role=" + empRole, associateData, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
   * Below method used to get UserProfile with heirarchie data
   * @param authToken 
   * @param empNumber 
   */

  public getUserProfileWithHierarchie(authToken: string, empNumber: string): Promise<UserProfile> {

    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare body
    let body = {
    };

    // Prepare headers
    // this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
    this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

    let headers = new Headers();
    headers.append('Accept', 'application/json')

    // Http get method
    return this.httpPlugin.get(this.directoryUrl + "/rest/directoryservice/getemployee/" + empNumber,
      body, {}).then(this.extractProfileData).catch(this.handleError);
  }

  /**
   * Below method used to get User reportee heirarchie data
   * @param authToken 
   * @param empNumber 
   */
  public getReporteeHierarchie(authToken: string, empNumber: string): Promise<TreeNode[]> {

    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare body
    let body = {
    };

    // Prepare headers
    // this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
    this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

    let headers = new Headers();
    headers.append('Accept', 'application/json')

    // Http get method
    return this.httpPlugin.get(this.directoryUrl + "/rest/directoryservice/getemployee/" + empNumber,
      body, {}).then(this.extractReporteeData).catch(this.handleError);
  }

  // Process Reportee data
  private extractReporteeData(resp: Response): Promise<TreeNode[]> {
    let body = JSON.parse(resp['data']);
    let reporteeNodes: TreeNode[] = [];

    for (let child of body.reportees) {
      reporteeNodes.push(
        {
          "data": {
            "middle": false,
            "lazyLoading": true,
            "name": child.name,
            "id": child.id,
            "designation": child.role,
            "reporteeCount": child.reporteeCount,
            "band": child.band,
            "image": child.image
          },
          "leaf": child.reporteeCount == 0,
          "expandedIcon": "fa-arrow-up",
          "collapsedIcon": "fa-arrow-up",
          "children": []
        });
    }
    var promise: Promise<TreeNode[]> = new Promise((resolve, reject) => {
      resolve(reporteeNodes);
    });
    return promise;
  }

  // Process Profile data
  private extractProfileData(resp: Response) {
    let body = JSON.parse(resp['data']);
    let userProfile: any = {};
    let treeNodes: TreeNode[] = [];
    //let middleNode : TreeNode = new TreeNode();
    let middleNode: TreeNode = {
      "data": {
        "middle": true,
        "lazyLoading": true,
        "name": body['staff_name'],
        "id": body.staff_no,
        "designation": body.role,
        "phone": body.contact_number,
        "e_phone": body.emergency_contact_number,
        "desk": body.desk_loc,
        "location": body.location,
        "project_name": body.gbp + ' - ' + body.subGbp,
        "band": body.band,
        "join_date": body.joinDate,
        "primary_skills": body.primary_skills,
        "secondary_skills": body.secondary_skills,
        "technical_skills": body.technical_skills,
        "user_id": body.userID,
        "total_exp": body.totalExp,
        "image": "http://10.76.176.153:8282/DirectoryService" + body.image,
        "reporteeCount": body.reporteeCount,
        "peers": body.peers,
        "image_context": "http://10.76.176.153:8282/DirectoryService"
      },
      "children": [],
      "leaf": body.reporteeCount == 0,
      "expandedIcon": "fa-arrow-up",
      "collapsedIcon": "fa-arrow-up"
    };

    if (body.manager != undefined && body.manager != null) {

      middleNode.data.manager = {
        "name": body.manager.name,
        "id": body.manager.id,
        "reporteeCount": body.manager.reporteeCount,
        "band": body.manager.band,
      }
    }

    userProfile.currentUser = middleNode;
		/*for (let child of body.reportees) {
			middleNode.children.push(
			{
			  "data" : {
			   "middle" : false,
				"name" : child.name,
				"id" : child.id,
				"designation" : child.role,
				"image" : environment.context_ui + "/assets/icons/profile1.png"
				},
			  "leaf": true,
			  "children" : []
			});
		}*/

    let currentManager = body.manager;

    for (; currentManager != undefined;) {

      let managerNode: TreeNode = {
        "data": {
          "middle": false,
          "name": currentManager.name,
          "id": currentManager.id,
          "designation": currentManager.role,
          "reporteeCount": currentManager.reporteeCount,
          "band": currentManager.band,
          "image": "http://10.76.176.153:8282/DirectoryService" + currentManager.image

        },
        "children": [middleNode],
        "expandedIcon": "fa-arrow-up",
        "collapsedIcon": "fa-arrow-up",
        "expanded": true
      };
      middleNode = managerNode;
      currentManager = currentManager.manager;
    }
    middleNode.expandedIcon = "fa-arrow-right";
    middleNode.collapsedIcon = "fa-arrow-right";
    treeNodes.push(middleNode);
    userProfile.hierarchy = treeNodes;
    return userProfile || {};
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }


  /**
    * Below method is used to get data for My RWF Transactions
    * @param authToken
    * @param empNumber
    * @param empRole
    */
  getMyRwfTransactions(authToken: string, empNumber: string, empRole: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.getMyRwfTransactionsData + empNumber + "&role=" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
    * Below method is used to get data for with weightage history ratings drilldown
    * @param authToken
    * @param staffName
    * @param empNumber
    * @param projectID
    * @param trackID
    * @param iteration
    */
  withWeitageHistoryRatingsDrilldown(authToken: string, staffName: string, empNumber: string,
    projectID: string, trackID: string, iteration: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.getWithWeightageHistoryRatingDrilldown + staffName + "&staffNo=" +
        empNumber + "&projectId=" + projectID + "&trackId=" + trackID + "&iteration=" + iteration, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
    * Below method is used to get data for with weightage history ratings
    * @param authToken
    * @param empNumber
    * @param projectID
    * @param trackID
    */
  withWeitageHistoryRatings(authToken: string, empNumber: string, projectID: string,
    trackID: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.getWithWeightageHistoryRating +
        empNumber + "&projectId=" + projectID + "&trackId=" + trackID, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
    * Below method is used to get data for Overall associates more details
    * @param authToken
    * @param role
    * @param managerId
    */
  overallAssociatesMoreDetails(authToken: string, managerId: string, role: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.getOverallAssociatesMoreDetails + managerId
        + "&role=" + role, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
    * Below method is used to get data for Leadwise distribution more details
    * @param authToken
    * @param role
    * @param managerId
    */
  leadwiseDistributionMoreDetails(authToken: string, managerId: string, role: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.getLeadWiseDistributionMoreDetails + managerId
        + "&role=" + role, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
    * Below method is used to get data for Twentyfive window with weightage more details
    * @param authToken
    * @param role
    * @param managerId
    */
  twentyFiveWindowWithoutWeightageMoreDetails(authToken: string, managerId: string, role: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.getTwentyFiveWindowWithoutWeightageMoreDetails + managerId
        + "&role=" + role, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
  * Below method is used to get data for Twentyfive window with weightage more details
  * @param authToken
  * @param role
  * @param managerId
  */
  twentyFiveWindowWithWeightageMoreDetails(authToken: string, managerId: string, role: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.getTwentyFiveWindowWithWeightageMoreDetails + managerId
        + "&role=" + role, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to plot the graph for CEO, SRMGMT & BU
   */
  dashboardGraphForCeoSrmgmtBu(authToken: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.dashboardGraphForCeoSrmgmtBuService, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
    * Below method is used to get Generic Search dropdown values
    * @param authToken 
    * @param empNumber
    * @param empRole
    */
  getGenericSearchDropdownsData(authToken: string, empNumber: string, empRole: string): Observable<any> {
    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for Generic Search Locations dropdown data
    let genericSearchLocationsData = this.httpPlugin.get(this.url + this.genericSearchLocationDropdownData, {}, {});

    // Http get method for Generic Search Accounts dropdown data
    let genericSearchAccountsData = this.httpPlugin.get(this.url + this.genericSearchAccountDropdownData + empNumber +
      "&role=" + empRole, {}, {});

    // Http get method for Generic Search All skills data
    let allSkillsData = this.httpPlugin.get(this.url + this.genericSearchAllSkillsData, {}, {});

    return forkJoin([genericSearchLocationsData, genericSearchAccountsData, allSkillsData])
  }

  /**
   * Below method is used to get RWF Dashboad data
   * @param authToken 
   * @param buList
   * @param practiceList
   * @param skillList
   * @param bandList
   * @param poolAgeList
   */
  getRwfDashboardData(authToken: string, buList: string, practiceList: string, skillList: string,
    bandList: string, poolAgeList: string): Observable<any> {
    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for RWF dashboard top strip data
    let rwfTopStripData = this.httpPlugin.get(this.url + this.rwfDashboardTopStripDataService + buList +
      "&practiceList=" + practiceList + "&skillList=" + skillList + "&bandList=" + bandList +
      "&poolAgeList=" + poolAgeList, {}, {});

    // Http get method for RWF dashboard graph
    let rwfGraphData = this.httpPlugin.get(this.url + this.rwfDashboardGraphDataServie + buList +
      "&practiceList=" + practiceList + "&skillList=" + skillList + "&bandList=" + bandList +
      "&poolAgeList=" + poolAgeList, {}, {});

    // Http get method for RWF dashboard resource list
    let rwfResourceListData = this.httpPlugin.get(this.url + this.rwfDashboardResourceDataService + buList +
      "&practiceList=" + practiceList + "&skillList=" + skillList + "&bandList=" + bandList +
      "&poolAgeList=" + poolAgeList, {}, {});

    // Http get method for management dashboard
    let managementDashboardData = this.httpPlugin.get(this.url + this.dashboardCountsForCeoSrmgmtBuService, {}, {});

    return forkJoin([rwfTopStripData, rwfGraphData, rwfResourceListData, managementDashboardData])
  }

  /**
   * Below method is used to get RWF Pipeline data
   * @param authToken 
   * @param buList
   * @param practiceList
   * @param skillList
   * @param bandList
   * @param poolAgeList
   */
  getRwfPipeLineData(authToken: string, buList: string, practiceList: string, skillList: string,
    bandList: string, poolAgeList: string): Observable<any> {
    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for RWF dashboard top strip data
    let rwfTopStripData = this.httpPlugin.get(this.url + this.rwfPipelineTopStripDataService + buList +
      "&practiceList=" + practiceList + "&skillList=" + skillList + "&bandList=" + bandList +
      "&poolAgeList=" + poolAgeList, {}, {});

    // Http get method for RWF dashboard graph
    let rwfGraphData = this.httpPlugin.get(this.url + this.rwfPipelineGraphDataService + buList +
      "&practiceList=" + practiceList + "&skillList=" + skillList + "&bandList=" + bandList +
      "&poolAgeList=" + poolAgeList, {}, {});

    // Http get method for RWF dashboard resource list
    let rwfResourceListData = this.httpPlugin.get(this.url + this.rwfPipelineResourceListDataService + buList +
      "&practiceList=" + practiceList + "&skillList=" + skillList + "&bandList=" + bandList +
      "&poolAgeList=" + poolAgeList, {}, {});

    // Http get method for management dashboard
    let managementDashboardData = this.httpPlugin.get(this.url + this.dashboardCountsForCeoSrmgmtBuService, {}, {});

    return forkJoin([rwfTopStripData, rwfGraphData, rwfResourceListData, managementDashboardData])
  }

  /**
   * Below method is used to get footer dashboard counts for CEO, SRMGMT & BU
   * @param authToken 
   */
  getFooterDashboardForCeoSrmgmtBu(authToken: string): Observable<any> {
    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for Rated count
    let totalRatedCount = this.httpPlugin.get(this.url + this.getRatedCount, {}, {});

    // Http get method for Niche skills count
    let totalNicheSkillsCount = this.httpPlugin.get(this.url + this.getNicheSkillsCount, {}, {});

    // Http get method for SME count
    let totalSmeCount = this.httpPlugin.get(this.url + this.getSmeCount, {}, {});

    // Http get method for Release pipeline count
    let totalReleasePipelineCount = this.httpPlugin.get(this.url + this.getReleasePipelineCount, {}, {});

    // Http get method for Open positions count
    let totalOpenPositionsCount = this.httpPlugin.get(this.url + this.getOpenPositionsCount, {}, {});

    // Http get method for Billing loss count
    let totalBillingLossCount = this.httpPlugin.get(this.url + this.getBillingLossCount, {}, {});

    return forkJoin([totalRatedCount, totalNicheSkillsCount, totalSmeCount, totalReleasePipelineCount,
      totalOpenPositionsCount, totalBillingLossCount])
  }

  /**
   * Below method is used to get footer dashboard counts for DH
   * @param authToken 
   */
  getFooterDashboardForDh(authToken: string, empNumber: string): Observable<any> {
    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for Rated count
    let totalRatedCount = this.httpPlugin.get(this.url + this.getRatedCountForDh + empNumber, {}, {});

    // Http get method for Niche skills count
    let totalNicheSkillsCount = this.httpPlugin.get(this.url + this.getNicheSkillsCountForDh + empNumber, {}, {});

    // Http get method for SME count
    let totalSmeCount = this.httpPlugin.get(this.url + this.getSmeCountForDh + empNumber, {}, {});

    // Http get method for Release pipeline count
    let totalReleasePipelineCount = this.httpPlugin.get(this.url + this.getReleasePipelineCountForDh + empNumber, {}, {});

    // Http get method for Open positions count
    let totalOpenPositionsCount = this.httpPlugin.get(this.url + this.getOpenPositionsCountForDh + empNumber, {}, {});

    // Http get method for Billing loss count
    let totalBillingLossCount = this.httpPlugin.get(this.url + this.getBillingLossCountForDh + empNumber, {}, {});

    return forkJoin([totalRatedCount, totalNicheSkillsCount, totalSmeCount, totalReleasePipelineCount,
      totalOpenPositionsCount, totalBillingLossCount])
  }

  /**
   * Below method is used to get dashboard data for CEO, SRMGMT & BU 
   */
  getDashboardDataForCeoSrmgmtBu(authToken: string): Observable<any> {

    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for Graph
    let graphResponse = this.httpPlugin.get(this.url + this.dashboardGraphForCeoSrmgmtBuService, {}, {});

    // Http get method for Account list
    let accountList = this.httpPlugin.get(this.url + this.getAccountList, {}, {});

    // Http get method for Total Associates count
    let totalAssociatesCount = this.httpPlugin.get(this.url + this.getTotalAssociatesCount, {}, {});

    // Http get method for Total Billable count
    let totalBillableAssociatesCount = this.httpPlugin.get(this.url + this.getBillableAssociatesCount, {}, {});

    // Http get method for Non Billable count
    let totalNonBillableAssociatesCount = this.httpPlugin.get(this.url + this.getNonBillableAssociatesCount, {}, {});

    // Http get method for InTransit count
    let totalInTransitCount = this.httpPlugin.get(this.url + this.getInTransitCount, {}, {});

    // Http get method for Pool count
    let totalPoolCount = this.httpPlugin.get(this.url + this.getPoolCount, {}, {});

    // Http get method for EBR count
    let totalEbrCount = this.httpPlugin.get(this.url + this.getEbrCount, {}, {});

    // Http get method for OnShore location wise count
    let totalOnShoreLocationWiseCount = this.httpPlugin.get(this.url + this.getOnShoreLocationWiseCount, {}, {});

    // Http get method for OffShore location wise count
    let totalOffShoreLocationWiseCount = this.httpPlugin.get(this.url + this.getOffShoreLocationWiserCount, {}, {});

    // Http get method for Visa count
    let totalVisaCount = this.httpPlugin.get(this.url + this.getVisaCount, {}, {});

    return forkJoin([graphResponse, accountList, totalAssociatesCount, totalBillableAssociatesCount,
      totalNonBillableAssociatesCount, totalInTransitCount, totalEbrCount, totalPoolCount, totalOnShoreLocationWiseCount,
      totalOffShoreLocationWiseCount, totalVisaCount])
  }

  /**
   * Below method is used to get dashboard data for DH 
   */
  getDashboardDataForDh(authToken: string, empRole: string, accountName: string): Observable<any> {

    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for Graph
    let graphResponse = this.httpPlugin.get(this.url + this.dashboardBuSpecificGraphForCeoSrmgmtBuService +
      accountName + "&role=" + empRole, {}, {});

    // Http get method for Account list
    let accountList = this.httpPlugin.get(this.url + this.getAccountList, {}, {});

    // Http get method for Total Associates count
    let totalAssociatesCount = this.httpPlugin.get(this.url + this.getTotalAssociatesCount, {}, {});

    // Http get method for Total Billable count
    let totalBillableAssociatesCount = this.httpPlugin.get(this.url + this.getBillableAssociatesCount, {}, {});

    // Http get method for Total dash dh billable count 
    let totalDashDhBillableAssociates = this.httpPlugin.get(this.url + this.getDashDhBillableAssociatesCount + accountName, {}, {});

    // Http get method for Non Billable count
    let totalNonBillableAssociatesCount = this.httpPlugin.get(this.url + this.getNonBillableAssociatesCount, {}, {});

    // Http get method for Total dash dh non billable count 
    let totalDashDhNonBillableAssociates = this.httpPlugin.get(this.url + this.getDashDhNonBillableAssociatesCount + accountName, {}, {});

    // Http get method for InTransit count
    let totalInTransitCount = this.httpPlugin.get(this.url + this.getInTransitCount, {}, {});

    // Http get method for Total dash dh in transit count 
    let totalDashDhInTransit = this.httpPlugin.get(this.url + this.getDashDhInTransitCount + accountName, {}, {});

    // Http get method for Pool count
    let totalPoolCount = this.httpPlugin.get(this.url + this.getPoolCount, {}, {});

    // Http get method for Total dash dh pool count 
    let totalDashDhPool = this.httpPlugin.get(this.url + this.getDashDhPoolCount + accountName, {}, {});

    // Http get method for EBR count
    let totalEbrCount = this.httpPlugin.get(this.url + this.getEbrCount, {}, {});

    // Http get method for Total dash ebr count 
    let totalDashDhEbr = this.httpPlugin.get(this.url + this.getDashDhEbrCount + accountName, {}, {});

    // Http get method for OnShore location wise count
    let totalOnShoreLocationWiseCount = this.httpPlugin.get(this.url + this.getOnShoreLocationWiseCount, {}, {});

    // Http get method for Total dash dh onshore location count 
    let totalDashDhOnShoreLocation = this.httpPlugin.get(this.url + this.dashboardDashDhService + accountName, {}, {});

    // Http get method for OffShore location wise count
    let totalOffShoreLocationWiseCount = this.httpPlugin.get(this.url + this.getOffShoreLocationWiserCount, {}, {});

    // Http get method for Visa count
    let totalVisaCount = this.httpPlugin.get(this.url + this.getVisaCount, {}, {});

    let donutGraphData = this.httpPlugin.get(this.url + this.dashboardBuSpecificGraphForCeoSrmgmtBuService +
      accountName + "&role=BU", {}, {})

    return forkJoin([graphResponse, accountList, totalAssociatesCount, totalBillableAssociatesCount,
      totalNonBillableAssociatesCount, totalInTransitCount, totalEbrCount, totalPoolCount,
      totalOnShoreLocationWiseCount, totalOffShoreLocationWiseCount, totalVisaCount, donutGraphData,
      totalDashDhBillableAssociates, totalDashDhNonBillableAssociates, totalDashDhInTransit,
      totalDashDhPool, totalDashDhEbr, totalDashDhOnShoreLocation])
  }

  /**
   * Below method is used to get BU specific dashboard data for CEO, SRMGMT & BU 
   */
  getDashboardBuSpecificDataForCeoSrmgmtBu(authToken: string, selectedBu: string): Observable<any> {

    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for Graph
    let graphResponse = this.httpPlugin.get(this.url + this.dashboardBuSpecificGraphForCeoSrmgmtBuService +
      selectedBu + "&role=BU", {}, {});

    // Http get method for Account list
    let accountList = this.httpPlugin.get(this.url + this.getAccountList, {}, {});

    // Http get method for Dash dh billable associates count
    let billableAssociatesCount = this.httpPlugin.get(this.url + this.getDashDhBillableAssociatesCount + selectedBu, {}, {});

    // Http get method for Dash dh non billable associates count
    let nonBillableAssociatesCount = this.httpPlugin.get(this.url + this.getDashDhNonBillableAssociatesCount + selectedBu, {}, {});

    // Http get method for Dash dh In Transit associates count
    let inTransitAssociatesCount = this.httpPlugin.get(this.url + this.getDashDhInTransitCount + selectedBu, {}, {});

    // Http get method for Dash dh EBR associates count
    let ebrAssociatesCount = this.httpPlugin.get(this.url + this.getDashDhEbrCount + selectedBu, {}, {});

    // Http get method for Dash dh pool count
    let poolCount = this.httpPlugin.get(this.url + this.getDashDhPoolCount + selectedBu, {}, {});

    return forkJoin([graphResponse, accountList, billableAssociatesCount, nonBillableAssociatesCount,
      inTransitAssociatesCount, ebrAssociatesCount, poolCount])
  }

  /**
   * Below method is used to get BU specific dashboard data for DH 
   */
  getDashboardBuSpecificDataForDh(authToken: string, empRole: string, empNumber: string): Observable<any> {

    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

    // Http get method for Graph
    let graphResponse = this.httpPlugin.get(this.url + this.dashboardBuSpecificGraphForDhService +
      empRole + "&dh_id=" + empNumber, {}, {});

    // Http get method for Dashboard counts
    // let dashboardResponse = this.httpPlugin.get(this.url + this.dashboardCountsForCeoSrmgmtBuService, {}, {});

    // Http get method for Account list
    let accountList = this.httpPlugin.get(this.url + this.getAccountList, {}, {});

    // Http get method for Total Associates count
    let totalAssociatesCount = this.httpPlugin.get(this.url + this.getTotalAssociatesCountForDh + empNumber, {}, {});

    // Http get method for Total Billable count
    let totalBillableAssociatesCount = this.httpPlugin.get(this.url + this.getBillableAssociatesCountForDh + empNumber, {}, {});

    // Http get method for Non Billable count
    let totalNonBillableAssociatesCount = this.httpPlugin.get(this.url + this.getNonBillableAssociatesCountForDh + empNumber, {}, {});

    // Http get method for InTransit count
    let totalInTransitCount = this.httpPlugin.get(this.url + this.getInTransitCountForDh + empNumber, {}, {});

    // Http get method for Pool count
    let totalPoolCount = this.httpPlugin.get(this.url + this.getPoolCountForDh + empNumber, {}, {});

    // Http get method for EBR count
    let totalEbrCount = this.httpPlugin.get(this.url + this.getEbrCountForDh + empNumber, {}, {});

    // Http get method for OnShore location wise count
    let totalOnShoreLocationWiseCount = this.httpPlugin.get(this.url + this.getOnShoreLocationWiseCountForDh + empNumber, {}, {});

    // Http get method for OffShore location wise count
    let totalOffShoreLocationWiseCount = this.httpPlugin.get(this.url + this.getOffShoreLocationWiserCountForDh + empNumber, {}, {});

    // Http get method for Visa count
    let totalVisaCount = this.httpPlugin.get(this.url + this.getVisaCountForDh + empNumber, {}, {});

    let donutGraphData = this.httpPlugin.get(this.url + this.dashboardCountsForDhService + empNumber, {}, {})

    return forkJoin([graphResponse, accountList, totalAssociatesCount, totalBillableAssociatesCount,
      totalNonBillableAssociatesCount, totalInTransitCount, totalPoolCount, totalEbrCount,
      totalOnShoreLocationWiseCount, totalOffShoreLocationWiseCount, totalVisaCount, donutGraphData])
  }

  /**
   * Below method is used to get Dashboard data for PGM
   */
  getDashboardDataForPGM(authToken: string, empRole: string, empNumber: string): Observable<any> {

    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
    this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

    // Http post method for Graph
    let twentyFiveWindowResponse = this.httpPlugin.post(this.url + this.twentyFiveWindowService +
      empNumber + "&role=" + empRole, {}, {})

    // Http get method for dashboard data
    let dashboardResponse = this.httpPlugin.get(this.url + this.dashboardCountsForCeoSrmgmtBuService,
      {}, {});

    // Http get method for gender chart
    let genderChartResponse = this.httpPlugin.get(this.url + this.getGenderChartForPGM + empNumber +
      "/" + empRole, {}, {});

    // Http get method for bar chart
    let barChartResponse = this.httpPlugin.get(this.url + this.pgmDistributionService + empNumber +
      "/" + empRole, {}, {});

    // Http get method for overall associates chart
    let overAllAssociatesChartResponse = this.httpPlugin.get(this.url + this.overallAssociatesService +
      empNumber + "/" + empRole, {}, {});

    return forkJoin([twentyFiveWindowResponse, dashboardResponse, genderChartResponse,
      barChartResponse, overAllAssociatesChartResponse])
  }

  /**
   * Below GET method is used to get Directory data & profile pic
   */
  getDirectoryData(authToken: string, empNumber: string): Observable<any> {

    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare headers
    this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
    // this.httpPlugin.setHeader('*', 'Accept', 'application/json');

    // Http get method for Directroy data
    let directoryData = this.httpPlugin.get(this.directoryUrl + "/rest/directoryservice/getemployee/" + empNumber, {}, {})

    // Http get method for profile pic
    let profilePicture = this.httpPlugin.get(this.url + this.fetchUserProfilePicService + empNumber, {}, {})

    return forkJoin([directoryData, profilePicture])
  }

  // Return image path
  getDirectoryImagesPath(): string {
    return this.directoryUrl
  }

  /**
   * Below GET method is used to get the RWF Dashboard dropdown values data
   */
  getRwfDropDownData(authToken: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.rwfDashboardDropDownDataService, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below GET method is used to get the RWF Pipeline dropdown values data
   */
  getRwfPipelineDropDownData(authToken: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.rwfPiplelineDropDownDataService, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to plot the BU Specific graph for CEO, SRMGMT & BU
   */
  dashboardBuSpecificGraphForCeoSrmgmtBu(authToken: string, selectedBu: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.dashboardBuSpecificGraphForCeoSrmgmtBuService +
        selectedBu + "&role=BU", {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to plot the BU Specific graph for DH
   */
  dashboardBuSpecificGraphForDh(authToken: string, empRole: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.dashboardBuSpecificGraphForDhService +
        empRole + "&dh_id=" + empNumber, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to plot the Dashboard graph for DH
   */
  dashboardGraphForDh(authToken: string, empRole: string, accountName: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.dashboardBuSpecificGraphForCeoSrmgmtBuService +
        accountName + "&role=" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to update dashboard counts on dashboard for CEO, SRMGMT & BU
   */
  dashboardCountsForCeoSrmgmtBu(authToken: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.dashboardCountsForCeoSrmgmtBuService, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to update dashboard counts on dashboard for CEO, SRMGMT & BU
   */
  dashboardCountsForDh(authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.dashboardCountsForDhService + empNumber, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to update dashboard counts on dashboard for DH
   */
  dashboardDashDH(authToken: string, bu: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.dashboardDashDhService + bu, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get OverAll Associates data
   */
  overAllAssociates(authToken: string, empNumber: string, empRole: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.overallAssociatesService +
        empNumber + "/" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get PGM distribution data
   */
  pgmDistribution(authToken: string, empNumber: string, empRole: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.pgmDistributionService +
        empNumber + "/" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get data for 25 Window tile click without weightage list
   */
  withoutWeightageList(authToken: string, column: string, row: string, empNumber: string, empRole: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.withoutWeightageListService + column + "-" + row + "&staff_no=" +
        empNumber + "&role=" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get data for 25 Window tile click with weightage list
   */
  withWeightageList(authToken: string, column: string, row: string, empNumber: string, empRole: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.withWeightageListService + column + "-" + row + "&staff_no=" +
        empNumber + "&role=" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get employee profile picture
   */
  fetchUserProfilePicture(authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.fetchUserProfilePicService + empNumber, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get employee more details with charts
   */
  withoutWeightageMoreInfoWithCharts(authToken: string, empNumber: string, projectID: string, trackID: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.withouWeightageMoreInfoWithChartsService + empNumber +
        "&projectId=" + projectID + "&businessTrackId=" + trackID + "&from=withoutweightage", {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to drilldown for OverAll Associates
   */
  overAllAssociatesChartLabelDrillDown(authToken: string, empNumber: string, label: string, empRole: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.overAllAssociatesChartLabelDrillDownService + empNumber +
        "/" + label + "/" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to Search similar associates
   */
  searchSimilarAssociates(authToken: string, keyword: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.searchSimilarAssociateService + keyword, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to Search similar associates for Directory
   */
  searchSimilarAssociatesForDirectory(authToken: string, keyword: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Accept', 'application/json');

      // Http get method
      this.httpPlugin.get(this.directoryUrl + "/rest/directoryservice/searchemployee/" + keyword, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to Search associate
   */
  searchAssociate(authToken: string, keyword: string, empRole: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.searchAssociateService + keyword + "&role=" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get the RWF Ageing data
   */
  rwfAgeing(authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.rwfAgeingService + "/" + empNumber, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get the RWF Skill Count
   */
  rwfSkillCount(authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.rwfSkillCountService + "/" + empNumber, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below Post method used to get Resource list for skill
   */
  resorceListForSkill(authToken: string, skill: string, empNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {
        "staffNo": empNumber,
        "skillRequired": skill
      }

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.resorceListForSkillService, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
   * Below Post method used to Save RWF
   */
  rwfSelect(authToken: string, data: any, empNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = data;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.rwfSelectService + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
   * Below Post method used to Delete RWF
   */
  rwfDelete(authToken: string, data: any, empNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = data;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.rwfDeleteService + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
   * Below method is used to get the RWF Resource Rating data
   */
  rwfResourceGetRatingData(authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.rwfResourceGetRatingDataService + "/" + empNumber, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to get the PGM Bar graph drill down data
   */
  pgmBarGraphDrillDown(authToken: string, empNumber: string, dataSetName: string, label: string,
    empRole: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.pgmDrillDownService + empNumber + "/" + dataSetName +
        "/" + label + "/" + empRole, {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below method is used to fetch data for Generci search with parameters
   * @param authToken   
   * @param account
   * @param skill
   * @param location
   * @param frmband
   * @param toband
   * @param isBillable
   * @param skilltype
   * @param pool
   * @param isRated
   */
  getGenericSearchData(authToken: string, account: string, skill: string, location: string, frmband: string,
    toband: string, isBillable: string, skilltype: string, pool: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);

      // Http get method
      this.httpPlugin.get(this.url + this.genericSearchWithSearchParametersService + account + "&skill=" +
      skill + "&location=" + location + "&frmband=" + frmband + "&toband=" + toband + "&isBillable=" +
      isBillable + "&skilltype=" + skilltype + "&pool=" + pool + "&isRated=NA", {}, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Below Post method used to get Demand List data
   */
  demandList(authToken: string, empNumber: string, empRole: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {

      };

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.demandListService + empNumber + "&role=" + empRole, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
   * Below Post method used to Add SRF
   */
  demandAdditionalDetails(authToken: string, empNumber: string, empRole: string, demandId: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {

      };

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.demandAdditionalDetailsService + empNumber + "&role=" + empRole +
        "&dmdid=" + demandId + "&parameter=details", body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
   * Below Post method used to Add SRF
   */
  saveSrf(authToken: string, empNumber: string, data: any, demandId: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {

      };

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method
      this.httpPlugin.post(this.url + this.saveSrfSerice + empNumber + "&param=save&data=" + demandId +
        + "-" + data.SRFNumber + "-" + data.srfstatus + "-" + data.name +
        "-" + data.candidatestatus + "-" + data.sourcedby + "-" + data.comments + "-" + data.offeredon +
        "-" + data.expecteddoj +
        "-" + data.actualdoj + "-NA&dmdid=" + demandId, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  /**
  * Below Get method used to Get Profile Info
  */
  getProfileDetails(authToken: string, empNumber: string) {
    // Set request time
    this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
    this.httpPlugin.setDataSerializer('json');

    // Prepare body
    let body = {};

    let profileInfo = this.httpPlugin.get(this.url + this.getProfileInfo + empNumber, body, {});
    let accoladeDetails = this.httpPlugin.get(this.url + this.getAccoladeDetails + empNumber, body, {});
    let certificateDetails = this.httpPlugin.get(this.url + this.getCertificateDetails + empNumber, body, {});
    let skillDetails = this.httpPlugin.get(this.url + this.getTechnicalSkills + empNumber, body, {});
    let domainDetails = this.httpPlugin.get(this.url + this.getDomainDetails + empNumber, body, {});
    let visaDetails = this.httpPlugin.get(this.url + this.getVisaDetails, body, {});

    return forkJoin([profileInfo, skillDetails, certificateDetails, accoladeDetails, domainDetails, visaDetails]);
  }

  getCertificateData(authToken: string, empNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {}

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      this.httpPlugin.get(this.url + this.getCertificateDataURL + empNumber, body, {})
        .then((success) => {
          resolve(success);
        })
        .catch((error) => {
          reject(error);
        })

    });
  }

  getDomainData(authToken: string, empNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = {}

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      this.httpPlugin.get(this.url + this.getDomainDataURL + empNumber, body, {})
        .then((success) => {
          resolve(success);
        })
        .catch((error) => {
          reject(error);
        })

    });
  }

  postCertificateDetails(submitCertificate: any, authToken: string, empNumber: string): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log(submitCertificate);

      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = submitCertificate;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method 
      this.httpPlugin.post(this.url + this.postCertificateDetailsURL + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  deleteCertificateAPI(certID: any, authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {
      console.log(certID);
      let certIDArr = [certID];
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = certIDArr;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method 
      this.httpPlugin.post(this.url + this.deleteCertificateURL + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  submitAccoladeDetails(accoladesArr: any, authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {
      console.log(accoladesArr);
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = accoladesArr;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method 
      this.httpPlugin.post(this.url + this.submitAccoladeDetailsURL + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  deleteAccoladeAPI(accoID: any, authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {
      console.log(accoID);
      let accoIDArr = [accoID];
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = accoIDArr;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method 
      this.httpPlugin.post(this.url + this.deleteAccoladeURL + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  submitDomainDetails(domainArr: any, authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {
      console.log(domainArr);
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let domainNewArr = []

      for (let i = 0; i < domainArr.length; i++) {
        domainNewArr.push({ "domain": domainArr[i].domainname, "experience": domainArr[i].domainexp.toString() })
      }

      console.log(domainNewArr);


      let body = domainNewArr;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method 
      this.httpPlugin.post(this.url + this.submitDomainDetailsURL + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  deleteDomainAPI(domainID: any, authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {
      console.log(domainID);
      let domainIDArr = [domainID];
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      // Prepare body
      let body = domainIDArr;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method 
      this.httpPlugin.post(this.url + this.deleteDomainURL + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  submitProfileDetails(profileInfo: any, authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      console.log(profileInfo);
      
      let body = profileInfo;

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method 
      this.httpPlugin.post(this.url + this.submitProfileDetailsURL + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

  uploadProfilePic(profileImg: any, authToken: string, empNumber: string): Promise<any> {

    return new Promise((resolve, reject) => {
      // Set request time
      this.httpPlugin.setRequestTimeout(this.apiRequestTimeOut);
      this.httpPlugin.setDataSerializer('json');

      let body = { 'file' : profileImg };

      // Prepare headers
      this.httpPlugin.setHeader('*', 'encryptedToken', "" + authToken);
      this.httpPlugin.setHeader('*', 'Content-Type', "application/json");

      // Http post method 
      this.httpPlugin.post(this.url + this.submitProfileDetailsURL + empNumber, body, {})
        .then((success) => {
          resolve(success)
        })
        .catch((error) => {
          reject(error)
        })
    });
  }

}
