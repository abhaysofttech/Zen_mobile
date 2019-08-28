import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LeadwiseDistributionMoreDetailsPage } from './leadwise-distribution-more-details.page';

const routes: Routes = [
  {
    path: '',
    component: LeadwiseDistributionMoreDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LeadwiseDistributionMoreDetailsPage]
})
export class LeadwiseDistributionMoreDetailsPageModule {}
