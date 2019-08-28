import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RwfResourceListForSkillPage } from './rwf-resource-list-for-skill.page';

const routes: Routes = [
  {
    path: '',
    component: RwfResourceListForSkillPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RwfResourceListForSkillPage]
})
export class RwfResourceListForSkillPageModule {}
