import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar.component';
import { FilterComponent } from './components/filter.component';
import { TableComponent } from './components/table.component';

import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SideContainerComponent } from './components/side-container.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { DashboarRoutes } from './dashboard.routing';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    FilterComponent,
    TableComponent,
    SideContainerComponent,
    MessageDialogComponent

  ],
  imports: [
  CommonModule,
  TranslateModule,
  RouterModule.forChild(DashboarRoutes),
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  ReactiveFormsModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatDialogModule,
  MatSnackBarModule
  ]
})
export class DashboardModule { }
