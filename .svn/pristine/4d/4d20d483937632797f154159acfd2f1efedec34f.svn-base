import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController, LoadingController, AlertController, Platform } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { NetworkService } from 'src/app/services/network.service';
import { Constants } from 'src/app/constants/Constants';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-rwf-dashboard-more-details',
  templateUrl: './rwf-dashboard-more-details.page.html',
  styleUrls: ['./rwf-dashboard-more-details.page.scss'],
})
export class RwfDashboardMoreDetailsPage implements OnInit {

  public pageTitle: string;
  public listData: [];
  byBusinessUnitDivFlag: boolean = false;
  byPracticetDivFlag: boolean = false;
  byBandDivFlag: boolean = false;
  bySkillSetDivFlag: boolean = false;
  byPoolAgeDivFlag: boolean = false;
  byVisaDivFlag: boolean = false;
  byPoolManagerDivFlag: boolean = false;
  byRwfPipelineSkillSetDivFlag: boolean = false;

  constructor(
    public menuCtrl: MenuController,
    private storage: Storage,
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform,
    private network: NetworkService,
    private navCtrl: NavService) {

    // Hide the side menu for current page
    this.menuCtrl.enable(false);

    // Display Data
    this.displayMoreData();
  }

  ngOnInit() {
  }

  displayMoreData() {
    // Get data from Nav service
    let data = this.navCtrl.get();

    // Set page title
    this.pageTitle = data.pageTitle

    // Set list data
    this.listData = data.data;

    // Set value based on page title condition 
    if (this.pageTitle == "Associates Business Details") {
      this.byBusinessUnitDivFlag = true;
    }
    if (this.pageTitle == "Associate Practice Details") {
      this.byPracticetDivFlag = true;
    }
    if (this.pageTitle == "Associate Band Details") {
      this.byBandDivFlag = true;
    }
    if (this.pageTitle == "Associate Skill Details") {
      if (data.sourcePage == "RWF Dashboard") {
        this.bySkillSetDivFlag = true;
      } else if (data.sourcePage == "RWF Pipeline") {
        this.byRwfPipelineSkillSetDivFlag = true;
      }
    }
    if (this.pageTitle == "Associate Pool Age Details") {
      this.byPoolAgeDivFlag = true;
    }
    if (this.pageTitle == "Associate Visa Details") {
      this.byVisaDivFlag = true;
    }
    if (this.pageTitle == "Associate Manager Details") {
      this.byPoolManagerDivFlag = true;
    }
  }
}
