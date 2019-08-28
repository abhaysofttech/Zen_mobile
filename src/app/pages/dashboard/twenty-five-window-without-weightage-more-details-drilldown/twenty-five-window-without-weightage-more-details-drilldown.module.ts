import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TwentyFiveWindowWithoutWeightageMoreDetailsDrilldownPage } from './twenty-five-window-without-weightage-more-details-drilldown.page';

const routes: Routes = [
  {
    path: '',
    component: TwentyFiveWindowWithoutWeightageMoreDetailsDrilldownPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TwentyFiveWindowWithoutWeightageMoreDetailsDrilldownPage]
})
export class TwentyFiveWindowWithoutWeightageMoreDetailsDrilldownPageModule {}
