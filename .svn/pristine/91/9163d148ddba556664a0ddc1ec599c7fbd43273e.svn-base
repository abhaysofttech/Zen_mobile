import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-overall-associates-drilldown-two',
  templateUrl: './overall-associates-drilldown-two.page.html',
  styleUrls: ['./overall-associates-drilldown-two.page.scss'],
})
export class OverallAssociatesDrilldownTwoPage implements OnInit {

  public staffID: string;
  public staffName: string;
  public reportingManager: string;
  public band: string;

  constructor(public navCtrl: NavService) {

    // bind values
    this.bindAssociateValues();
  }

  ngOnInit() {
  }

  bindAssociateValues() {
    // Get value from nav service
    let data = this.navCtrl.get();

    this.staffID = data.staff_Number;
    this.staffName = data.staff_Name;
    this.reportingManager = data.manager_Id;
    this.band = data.band;
  }
}
