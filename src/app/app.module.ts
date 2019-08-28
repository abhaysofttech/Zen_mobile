import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { FusionChartsModule } from 'angular-fusioncharts';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HTTP } from '@ionic-native/http/ngx';
import { SecureStorage } from '@ionic-native/secure-storage/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { ModalPagePage } from './profileModals/modal-page/modal-page.page';
import { AccoladesModalPage } from './profileModals/accolades-modal/accolades-modal.page';
import { DomainModalPage } from './profileModals/domain-modal/domain-modal.page';
import { VisaDetailsModalPage } from './profileModals/visa-details-modal/visa-details-modal.page';
import { CertificateModalPage } from './profileModals/certificate-modal/certificate-modal.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';


@NgModule({

declarations: [AppComponent, CertificateModalPage, AccoladesModalPage, DomainModalPage, VisaDetailsModalPage],
  entryComponents: [
    AccoladesModalPage,
    DomainModalPage,
    VisaDetailsModalPage,
    CertificateModalPage,
  ],
  imports: [ 
    MbscModule, 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FusionChartsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__zenfortedb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    HTTP,
    Geolocation,
    Diagnostic,
    SecureStorage,
    CallNumber,
    EmailComposer,
    OpenNativeSettings,
    Camera,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
