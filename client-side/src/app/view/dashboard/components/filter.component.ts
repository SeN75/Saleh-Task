import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from 'src/app/common/validation';
import { LoggerService } from 'src/app/services/logger.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'dash-filter',
  template: `
    <section [formGroup]="form">
      <mat-form-field>
        <mat-label>name</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>budget</mat-label>
        <input matInput formControlName="budget" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Date</mat-label>
        <mat-date-range-input
          [formGroup]="controls['date']"
          [rangePicker]="picker"
        >
          <input
            matStartDate
            formControlName="startDate"
            placeholder="Start date"
          />
          <input matEndDate formControlName="endDate" placeholder="End date" />
        </mat-date-range-input>
        <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>

      <button mat-raised-button color="primary" (click)="action()">search</button>
    </section>
  `,
  styles: [
    `
      section {
        @apply flex gap-4 bg-white rounded-md items-baseline py-6 px-4;
        box-shadow: 3px 1px 7px rgb(87 113 116 / 12%),
          -5px 1px 19px -7px rgb(108 133 145 / 32%);
      }
    `,
  ],
})
export class FilterComponent {
  form = new FormGroup({
    date: new FormGroup({
      startDate: new FormControl<Date | null>(null, [Validators.required]),
      endDate: new FormControl<Date | null>(null, [Validators.required]),
    }),
    budget: new FormControl<number>(0),
    name: new FormControl<string>('', []),
  });
  get controls() {
    return this.form.controls;
  }
  get dateControls() {
    return this.form.controls.date.controls;
  }
  constructor(private logger: LoggerService, private dashboardSrv: DashboardService) {
  }
  action(){
    const {value} = this.form
    this.dashboardSrv.fitler(value)
  }
}
