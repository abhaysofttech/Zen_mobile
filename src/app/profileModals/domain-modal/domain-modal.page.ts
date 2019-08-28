import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Constants } from 'src/app/constants/Constants';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-domain-modal',
  templateUrl: './domain-modal.page.html',
  styleUrls: ['./domain-modal.page.scss'],
})
export class DomainModalPage implements OnInit {

  authToken: any;
  empNumber: any;
  private loaderActive: boolean = false;
  private loader: any;
  domainsData: any;
  showGroup1:any;
  selectedDomain:any;
  @Input() domains: any;
  expMonths: any;
  domainArr:any=[];

  constructor(private modalController: ModalController, private api: ApiService, private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) { 
    this.storage.get("encryptedToken").then(data => {
      this.authToken = data;
    });

    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
      console.log(this.domains);
    });
  }

  ngOnInit() {
    // this.showLoader();
    this.domainsData = this.api.getDomainData(this.authToken, this.empNumber).then(response => {
      // this.dismissLoader();
      this.domainsData = JSON.parse(response.data);
      console.log(this.domainsData);
    }, error => {
      console.log(error)
      // Dismiss the loader
      // this.dismissLoader();
      // Show alert with error message
      this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
    });
  }

  toggleItem(group) {
    if (group == 1) {
      this.showGroup1 = !this.showGroup1;
    }
  }

  selectedDate(date){
    this.expMonths = date;
    console.log(this.expMonths);
    this.selectedDomain.domainexp = this.expMonths;
  }

  addDomain(){
    console.log(this.selectedDomain);
    this.domainArr.push(this.selectedDomain);
    console.log(this.domainArr);
    
  }

  submitDomainDetails(){
    // this.showLoader();
    this.api.submitDomainDetails(this.domainArr, this.authToken, this.empNumber).then(response => {
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

  selectDomain(domain){
    this.selectedDomain = domain;
    console.log(this.selectedDomain);
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
