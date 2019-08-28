import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-demand-details',
  templateUrl: './demand-details.page.html',
  styleUrls: ['./demand-details.page.scss'],
})
export class DemandDetailsPage implements OnInit {

  public data: any;
  private loader: any;
  private loaderActive: boolean = false;
  public authToken: string;
  public empNumber: string;
  public empRole: string;
  public dhListData: any;
  public pgmListData: any;
  public probability: number;
  public dhStaffID: string;
  public pgmStaffID: string;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService) {

    // Hide the side menu for donut page
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
      // Get data from Nav Service and bind 
      this.bindDemandDetailsData();
    })
  }

  ngOnInit() {
  }


  // Bind response into html
  bindDemandDetailsData() {
    // Get data from Nav Servcie
    var dataFromDemandList = this.navCtrl.get();
    var index = dataFromDemandList.selectedIndex;
    this.data = dataFromDemandList.demandData.matrixEmpDetails[index];
    this.dhStaffID = this.data.dhstaffid;
    this.pgmStaffID = this.data.pgmstaffid;
    this.dhListData = dataFromDemandList.demandData.data[4];
    this.pgmListData = dataFromDemandList.demandData.data[2];
    this.probability = dataFromDemandList.demandData.matrixEmpDetails[index].probability;
  }

  // Update button click event
  updateBtnClick() {

  }

  // Add Srf button click event
  addSrfBtnClick(){
    // Redirect to Add Srf Details page
    var demand_Id: string;
    demand_Id = this.data.demfcastid;
    this.navCtrl.push('add-srf-additional-details', demand_Id);
  }

  // Dh drop down change event
  onDhChange(value: any) {
    this.data.dhstaffid = value;
  }

  // PM drop dwon change event
  onPmChange(value: any) {
    this.data.pgmstaffid = value;
  }

  // Demand drop down change event
  onDeamandChange(value: any) {
    this.data.demandstatus = value;
  }

  // Oppertunity Description change listener
  opportunityDescChangeEvent(event: any) {
    this.data.opportunitydesc = event.detail.value;
  }

  // Remarks change event
  remartsChangeEvent(event: any) {
    this.data.remarks = event.detail.value;
  }

  // Probability Change Event
  probabilityChangeEvent(event: any) {
    this.data.probability = event.detail.value;
  }

  // No of positions change event
  numberOfPositionsChangeEvent(event: any) {
    this.data.numberofpositions = event.detail.value;
  }

  // Billing rate change event
  billingRateChangeEvent(event: any) {
    this.data.billingrate = event.detail.value;
  }

  // No of postionts filled change event
  numberOfPositionsFilledChangeEvent(event: any) {
    this.data.numberofpositionsfilled = event.detail.value;
  }

  // Billing Start Date change event
  billingStartDateChangeEvent(event: any) {
    this.data.billingstartdate = event.detail.value;
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
