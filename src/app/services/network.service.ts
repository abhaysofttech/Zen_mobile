import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var Connection: any;
declare var navigator: any;

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(
    private platform: Platform
  ) {

  }

  checkNetWorkConnection(): boolean {
    if (!this.platform.is('cordova')) {
      return true;
    }
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    if (states[networkState] == "No network connection") {
      console.log(states[networkState]);
      return false;
      // this.showAlertToCloseApp("Unable to reach Back To Basics server, please check your data connection!");
    } else {
      console.log(states[networkState]);
      return true;
    }
  }
}
