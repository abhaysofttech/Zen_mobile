import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Constants } from 'src/app/constants/Constants';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-accolades-modal',
  templateUrl: './accolades-modal.page.html',
  styleUrls: ['./accolades-modal.page.scss'],
})
export class AccoladesModalPage implements OnInit {

  authToken: any;
  empNumber: any;
  private loaderActive: boolean = false;
  private loader: any;
  domainsData: any;
  showGroup1: any;
  selectedAccolade: any;
  selectedIntExt: any;
  selectedDate: any;
  selectedDescription: any;
  accoladesArr: any = [];
  public objArr = ["Operational Excellence", "Project Manager", "Team Leader", "Customer Centricity", "Innovation", "Collaboration", "Cultural Analyst", "CSR"];
  @Input() accolades: any;

  constructor(private modalController: ModalController, private api: ApiService, private storage: Storage, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.storage.get("encryptedToken").then(data => {
      this.authToken = data;
    });

    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
      console.log(this.accolades);
    });
  }

  ngOnInit() {
  }


  toggleItem(group) {
    if (group == 1) {
      this.showGroup1 = !this.showGroup1;
    }
  }


  selectAccolade(accolade) {
    console.log(accolade);
    this.selectedAccolade = accolade;
  }

  selectIntExt(IntExt) {
    console.log(IntExt);
    this.selectedIntExt = IntExt;
  }

  selectDate(date) {
    console.log(date);
    this.selectedDate = date;
  }

  selectDescription(description) {
    this.selectedDescription = description;
  }

  addAccolade() {
    let accObj = {
      "category": this.selectedAccolade,
      "internal_external": this.selectedIntExt,
      "date_acc_received": this.selectedDate,
      "acc_details": this.selectedDescription
    }
    this.accoladesArr.push(accObj);
    this.clearFields();
  }

  clearFields(){
    console.log(this.accoladesArr);
    this.selectedAccolade = null;
    this.selectedIntExt = null;
    this.selectedDate = null;
    this.selectedDescription = null;
  }

  submitAccoladeDetails(){
     // this.showLoader();
     this.api.submitAccoladeDetails(this.accoladesArr, this.authToken, this.empNumber).then(response => {
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
