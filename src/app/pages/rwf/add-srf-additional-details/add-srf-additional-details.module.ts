import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddSrfAdditionalDetailsPage } from './add-srf-additional-details.page';

const routes: Routes = [
  {
    path: '',
    component: AddSrfAdditionalDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddSrfAdditionalDetailsPage]
})
export class AddSrfAdditionalDetailsPageModule {}
