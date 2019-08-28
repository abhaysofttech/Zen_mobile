
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Constants } from 'src/app/constants/Constants';
import { Storage } from '@ionic/storage';
import { MbscFormOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-certificate-modal',
  templateUrl: './certificate-modal.page.html',
  styleUrls: ['./certificate-modal.page.scss'],
})

export class CertificateModalPage implements OnInit {
  objectKeys = Object.keys;
  authToken: any;
  empNumber: any;
  private loaderActive: boolean = false;
  private loader: any;
  certificateData: any;
  @Input() certificateDetails: any;
  selectedCategory = null;
  shortlistedCerts: any = null;
  selectedsubCategory: any = null;
  selectedDate: any = null;
  submitCertificate: any = [];
  showGroup1:any;
  showGroup2:any;
  showGroup3:any;


  constructor(private modalController: ModalController, private api: ApiService, private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.storage.get("encryptedToken").then(data => {
      this.authToken = data;
    });

    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
      console.log(this.certificateDetails);
    });
  }

toggleItem(group){
  if(group==1){
    this.showGroup1 = !this.showGroup1;
  }else if(group==2){
    if(this.shortlistedCerts == null){
      this.showAlert("Alert", "Please select category first.");
    }
    this.showGroup2 = !this.showGroup2;
  }else if(group==3){
    this.showGroup3 = !this.showGroup3;
  }
}

  ngOnInit() {
    // this.showLoader();
    this.certificateData = this.api.getCertificateData(this.authToken, this.empNumber).then(response => {
      // this.dismissLoader();
      this.certificateData = JSON.parse(response.data);
      console.log(this.certificateData);
    }, error => {
      console.log(error)

      // Dismiss the loader
      // this.dismissLoader();
      // Show alert with error message
      this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
    });
  }

  clearshortlistedCerts() {
    this.shortlistedCerts = null;
  }

  selectCategory(category) {
    console.log(category);
    this.selectedCategory = category;
    this.shortlistedCerts = this.certificateData[category];
    console.log(this.shortlistedCerts);
  }

  selectsubCategory(subcategory) {
    this.selectedsubCategory = subcategory;
    console.log(this.selectedsubCategory);
  }

  selectDate(date) {
    this.selectedDate = date;
  }

  addCertificate() {
    let certDetails = {
      "category": this.selectedCategory,
      "certification_name": this.selectedsubCategory,
      "completion_date": this.selectedDate,
    }
    console.log(certDetails);
    this.certificateDetails.push(certDetails);
    this.submitCertificate.push(certDetails);
    console.log(this.submitCertificate);
  }

  submitCertificateDetails() {
    // this.showLoader();
    this.api.postCertificateDetails(this.submitCertificate, this.authToken, this.empNumber).then(response => {
      console.log(response)
      this.dismisModal();
    }, error => {
      console.log(error)
      // Dismiss the loader
      // this.dismissLoader();
      // Show alert with error message
      this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
      this.dismisModal();
    });
  }

  async dismisModal() {
    this.modalController.dismiss();
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

  async showAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['Ok']
    });
    await alert.present();
  }

}
