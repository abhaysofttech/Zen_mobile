import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DirectoryPage } from './directory.page';
import { TreeModule } from 'primeng/tree';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: DirectoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    IonicModule,
    MatIconModule,
    MatTreeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DirectoryPage]
})
export class DirectoryPageModule {}
