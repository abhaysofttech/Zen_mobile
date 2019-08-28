import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-twenty-five-window-without-weightage-more-details-drilldown',
  templateUrl: './twenty-five-window-without-weightage-more-details-drilldown.page.html',
  styleUrls: ['./twenty-five-window-without-weightage-more-details-drilldown.page.scss'],
})
export class TwentyFiveWindowWithoutWeightageMoreDetailsDrilldownPage implements OnInit {

  public moreDetailsData: any;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService) {

    // Hide the side menu for more details page
    this.menuCtrl.enable(false);

    // Get data from previous page
    this.getMoreDetailsData();
  }

  ngOnInit() {
  }

  // Get more details data from previous screen
  getMoreDetailsData() {
    // Get selected value from Nav Service
    var data = this.navCtrl.get();
    this.moreDetailsData = data.moreDetailsData;
  }
}
