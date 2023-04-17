import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterationComponent } from './registration.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    RegisterationComponent
  ],
  imports: [
  CommonModule,
  TranslateModule,
  RouterModule.forChild([{path:'', component: RegisterationComponent}]),
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
ReactiveFormsModule,
MatSnackBarModule
  ]
})
export class RegistrationModule { }
