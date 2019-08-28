import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GenericSearchResultsPage } from './generic-search-results.page';
import { SearchFilterPipe } from './search-filter.pipe';
import { SortPopoverComponent } from './sort-popover/sort-popover.component';

const routes: Routes = [
  {
    path: '',
    component: GenericSearchResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [SortPopoverComponent],
  declarations: [GenericSearchResultsPage, SearchFilterPipe, SortPopoverComponent]
})
export class GenericSearchResultsPageModule {}
