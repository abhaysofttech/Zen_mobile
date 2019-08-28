import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RwfDashboardTabsPage } from './rwf-dashboard-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: RwfDashboardTabsPage,
    children: [
      {
        path: 'rwf-dashboard',
        children: [
          {
            path: '',
            loadChildren: '../rwf-dashboard/rwf-dashboard.module#RwfDashboardPageModule'
          }
        ]
      },
      {
        path: 'rwf-pipeline',
        children: [
          {
            path: '',
            loadChildren: '../rwf-pipeline/rwf-pipeline.module#RwfPipelinePageModule'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RwfDashboardTabsPage]
})
export class RwfDashboardTabsPageModule { }
