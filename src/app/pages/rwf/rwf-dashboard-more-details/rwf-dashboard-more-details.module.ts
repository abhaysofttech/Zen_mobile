import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RwfDashboardMoreDetailsPage } from './rwf-dashboard-more-details.page';

const routes: Routes = [
  {
    path: '',
    component: RwfDashboardMoreDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RwfDashboardMoreDetailsPage]
})
export class RwfDashboardMoreDetailsPageModule {}
