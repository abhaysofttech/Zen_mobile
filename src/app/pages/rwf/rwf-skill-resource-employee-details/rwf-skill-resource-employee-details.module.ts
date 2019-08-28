import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RwfSkillResourceEmployeeDetailsPage } from './rwf-skill-resource-employee-details.page';

const routes: Routes = [
  {
    path: '',
    component: RwfSkillResourceEmployeeDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RwfSkillResourceEmployeeDetailsPage]
})
export class RwfSkillResourceEmployeeDetailsPageModule {}
