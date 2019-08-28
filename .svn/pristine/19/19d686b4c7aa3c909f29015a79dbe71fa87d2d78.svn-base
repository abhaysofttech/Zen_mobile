import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { NetworkService } from "src/app/services/network.service";
import { Constants } from "src/app/constants/Constants";
import { NavService } from "src/app/services/nav.service";
import { DomSanitizer } from "@angular/platform-browser";
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import {
  MenuController,
  LoadingController,
  AlertController,
  Platform,
} from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { AccoladesModalPage } from "src/app/profileModals/accolades-modal/accolades-modal.page";
import { DomainModalPage } from "src/app/profileModals/domain-modal/domain-modal.page";
import { VisaDetailsModalPage } from "src/app/profileModals/visa-details-modal/visa-details-modal.page";
import { AddSrfAdditionalDetailsPageModule } from "../../rwf/add-srf-additional-details/add-srf-additional-details.module";
import { CertificateModalPage } from "src/app/profileModals/certificate-modal/certificate-modal.page";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.page.html",
  styleUrls: ["./profile-update.page.scss"]
})
export class ProfileUpdatePage implements OnInit {
  authToken: any;
  profilePicPath: any;
  private loaderActive: boolean = false;
  private loader: any;

  public profileDetailsSubMenu: boolean = false;
  editable: boolean = false;
  empNumber: any;
  profileData: any;
  yearsOfExp: any;
  technicalSkills: any;
  accoladeDetails: any;
  domainDetails: any;
  visaDetails: any;
  certificateDetails: any;
  onsiteexp: any;
  passport: any;
  qualification: any;
  emergencycontact: any;
  contactNumber: any;
  profileInfo: { "pdContactNumber": any; "pdEmergencyContactNumber": any; "pdPassportNumber": any; "pdOnsiteExperience": any; };
  contactNumberDidChange: boolean = false;
  emergencycontactDidChange: boolean = false;
  qualificationDidChange: boolean = false;
  passportDidChange: boolean = false;
  onsiteexpDidChange: boolean = false;


  constructor(
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService,
    private sanitizer: DomSanitizer,
    public modalController: ModalController,
    private camera: Camera
  ) {
    // Get local DB values
    this.storage.get("encryptedToken").then(data => {
      this.authToken = data;
    });

    this.storage.get('empNumber').then((data) => {
      this.empNumber = data;
      this.getProfileInfo();
    });
  }

  ngOnInit() { }
  currentImage: any;
  captureImg(){
  const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log("Camera issue:" + err);
    });
  }

  getProfileInfo() {
    // this.showLoader();
    this.profileData = this.api.getProfileDetails(this.authToken, this.empNumber).subscribe((response: any) => {
      // this.dismissLoader();
      console.log(response);
      this.profileData = JSON.parse(response[0].data);
      this.technicalSkills = JSON.parse(response[1].data);
      this.certificateDetails = JSON.parse(response[2].data);
      this.accoladeDetails = JSON.parse(response[3].data);
      this.domainDetails = JSON.parse(response[4].data);
      this.visaDetails = JSON.parse(response[5].data);
      this.getyearsofexp();
    }, error => {
      console.log(error)
      // Dismiss the loader
      // this.dismissLoader();
      // Show alert with error message
      this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
    });
  }

  public getyearsofexp() {
    let dt: any = new Date(this.profileData.joinDate);
    var timeDiff = Math.abs(Date.now() - dt);
    this.yearsOfExp = (timeDiff / (1000 * 3600 * 24)) / 365;
  }


profileInfoUpdate(field, value){
  if(field == 'contactNumber'){
    console.log(value);
    this.contactNumberDidChange = true;
    this.contactNumber = value;
  }else if(field == 'emergencycontact'){
    console.log(value);
    this.emergencycontactDidChange = true;
    this.emergencycontact = value;
  }else if(field == 'qualification'){
    console.log(value);
    this.qualificationDidChange = true;
    this.qualification = value;
  }else if(field == 'passport'){
    console.log(value);
    this.passportDidChange = true;
    this.passport = value;
  }else if(field == 'onsiteexp'){
    console.log(value);
    this.onsiteexpDidChange = true;
    this.onsiteexp = value;
  }
}

submitProfileInfo(){

  this.profileInfo = {
    "pdContactNumber": this.contactNumber,
    "pdEmergencyContactNumber": this.emergencycontact,
    "pdPassportNumber": this.passport,
    "pdOnsiteExperience": this.onsiteexp,
  }
  // this.showLoader();
   this.api.submitProfileDetails(this.profileInfo, this.authToken, this.empNumber).then(response => {
    console.log(response)
    this.editable = false;
  }, error => {
    console.log(error)
    // Dismiss the loader
    // this.dismissLoader();
    // Show alert with error message
    this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
    this.editable = false;

  });
}

uploadProfilepic(){
  // this.showLoader();
   this.api.uploadProfilePic(this.currentImage, this.authToken, this.empNumber).then(response => {
    console.log(response)
    this.editable = false;
  }, error => {
    console.log(error)
    // Dismiss the loader
    // this.dismissLoader();
    // Show alert with error message
    this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
    this.editable = false;
  });
}

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

  async presentModal(modalNo) {

    if (modalNo == 1) {
      const modal = await this.modalController.create({
        component: CertificateModalPage,
        componentProps: { certificateDetails: this.certificateDetails }
      });
      return await modal.present();
    } else if (modalNo == 2) {
      const modal = await this.modalController.create({
        component: AccoladesModalPage,
        componentProps: { accolades: this.accoladeDetails }
      });
      return await modal.present();
    } else if (modalNo == 3) {
      const modal = await this.modalController.create({
        component: DomainModalPage,
        componentProps: { domains: this.domainDetails }
      });
      return await modal.present();
    } else if (modalNo == 4) {
      const modal = await this.modalController.create({
        component: VisaDetailsModalPage,
        componentProps: { value: 123 }
      });
      return await modal.present();
    }
  }

  toggleeditmode() {
    this.editable = !this.editable;
  }

  cert: any;
  async presentAlertConfirm(cert) {
    this.cert = cert;
    console.log(cert);

    const alert = await this.alertCtrl.create({
      header: this.cert.certification_name,
      message: '<div><strong>Completion Date: </strong>' + this.cert.completion_date + '</div><div><strong>Category: </strong>' + this.cert.category + '</div>',
      buttons: [
        {
          text: 'Delete Certificate',
          cssClass: 'secondary',
          handler: () => {
            this.confirmDelete(this.cert);
            console.log('Confirm Cancel: ' + this.cert);
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  deleteCertificate(certID, authToken, empNumber) {
    // this.showLoader();
     this.api.deleteCertificateAPI(certID, authToken, empNumber).then(response => {
      // this.dismissLoader();
    }, error => {
      console.log(error)

      // Dismiss the loader
      // this.dismissLoader();
      // Show alert with error message
      this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
    });
  }


  async confirmDelete(cert) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this certificate?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: ' + this.cert);
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteAlert(this.cert.certification_name);
            console.log('Confirm Okay');
            this.deleteCertificate(this.cert.certificateid , this.authToken, this.empNumber);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteAlert(cert) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: cert + ' certificate deleted.',
      buttons: [ {
        text: 'OK',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }


  // Viewing accolades details and delete it.
  accolade: any;
  async viewAccoladeDetails(accolade) {
    this.accolade = accolade;
    console.log(this.accolade);

    const alert = await this.alertCtrl.create({
      header: this.accolade.category,
      // tslint:disable-next-line:max-line-length
      message: '<div><strong>Completion Date: </strong>' + this.accolade.daterecieved + '</div><div><strong>Type: </strong>'+this.accolade.type+'</div><div><strong>Description: </strong>' + this.accolade.accdetails,
      buttons: [
        {
          text: 'Delete Accolade',
          cssClass: 'secondary',
          handler: () => {
            this.confirmDeleteAccolade(this.accolade);
            console.log('Confirm Cancel: ' + this.accolade.category);
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  deleteAccolade(accoladeID, authToken, empNumber) {
    // this.showLoader();
     this.api.deleteAccoladeAPI(accoladeID, authToken, empNumber).then(response => {
      // this.dismissLoader();
    }, error => {
      console.log(error)

      // Dismiss the loader
      // this.dismissLoader();
      // Show alert with error message
      this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
    });
  }


  async confirmDeleteAccolade(accolade) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this accolade?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: ' + this.accolade.category);
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteAlert(this.accolade.category);
            console.log('Confirm Okay');
            this.deleteAccolade(this.accolade.accoid , this.authToken, this.empNumber);
          }
        }
      ]
    });
    await alert.present();
  }

  async deletedAccoladeAlert(accolade) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: accolade + ' accolade deleted.',
      buttons: [ {
        text: 'OK',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }


  // Viewing domains details and deleting it.
  domain: any;
  async viewDomainDetails(domain) {
    this.domain = domain;
    console.log(this.domain);

    const alert = await this.alertCtrl.create({
      header: this.domain.domainname,
      // tslint:disable-next-line:max-line-length
      message: '<strong>Exp in Months : </strong>' + this.domain.domainexp,
      buttons: [
        {
          text: 'Delete domain',
          cssClass: 'secondary',
          handler: () => {
            this.confirmDeleteDomain(this.domain);
            console.log('Confirm Cancel: ' + this.domain.domainname);
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  deleteDomain(domainID, authToken, empNumber) {
    // this.showLoader();
     this.api.deleteDomainAPI(domainID, authToken, empNumber).then(response => {
      // this.dismissLoader();
    }, error => {
      console.log(error)

      // Dismiss the loader
      // this.dismissLoader();
      // Show alert with error message
      this.showAlert(Constants.ERROR_TITLE, Constants.ERROR_MESSAGE);
    });
  }


  async confirmDeleteDomain(domain) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this domain?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: ' + this.domain.domainname);
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteDomainAlert(this.domain.domainname);
            console.log('Confirm Okay');
            this.deleteDomain(this.domain.domainid , this.authToken, this.empNumber);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteDomainAlert(domain) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: domain + ' domain deleted.',
      buttons: [ {
        text: 'OK',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }




}
