import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FusionChartsModule } from 'angular-fusioncharts';
import { HomePage } from './home.page';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// import * as FusionCharts from 'libs/fusioncharts/js/fusioncharts'

// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// import * as Charts from 'libs/fusioncharts/js/fusioncharts.charts';

// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
// import FusionTheme from 'libs/fusioncharts/js/themes/fusioncharts.theme.fint';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FusionChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
