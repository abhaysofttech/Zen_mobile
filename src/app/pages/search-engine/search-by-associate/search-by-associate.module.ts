import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchByAssociatePage } from './search-by-associate.page';

const routes: Routes = [
  {
    path: '',
    component: SearchByAssociatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchByAssociatePage]
})
export class SearchByAssociatePageModule {}
