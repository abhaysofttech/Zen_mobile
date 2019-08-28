import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OverallAssociatesDrilldownOnePage } from './overall-associates-drilldown-one.page';

const routes: Routes = [
  {
    path: '',
    component: OverallAssociatesDrilldownOnePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OverallAssociatesDrilldownOnePage]
})
export class OverallAssociatesDrilldownOnePageModule {}
