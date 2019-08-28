import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisaDetailsModalPage } from './visa-details-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VisaDetailsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VisaDetailsModalPage]
})
export class VisaDetailsModalPageModule {}
