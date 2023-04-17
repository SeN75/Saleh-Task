import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataField, TableAcion } from './components/table.component';
import { DashboardService } from './dashboard.service';
import { first, map } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from 'src/app/common/validation';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from 'src/app/services/logger.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  isOpen = false;
  settings = { isOpen: false, title: 'Add new Company', action: 'add' };
  slectedId = '';
  isAdmin = false;
  form = new FormGroup({
    name_ar: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F0-9 ]+$/),
    ]),
    name_en: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]+$/),
    ]),
    image: new FormControl<string>(''),
    budget: new FormControl<number>(0),
  });
  dataSource = new MatTableDataSource<Company>();
  dataTabelFiels: TableDataField[] = [];
  dataTabelColumns: string[] = [];
  dataTableActions: TableAcion[] = [];
  Validation = Validation;
  get controls() {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.router.events.subscribe((eve) => {
      if (eve instanceof NavigationEnd) {
        this.isAdmin = eve.url.includes('admin');
      }
    });
    this.isAdmin = this.router.url.includes('admin');
    this.setTable();
  }

  constructor(
    private dashboardSrv: DashboardService,
    private dialog: MatDialog,
    private logger: LoggerService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.dashboardSrv.loadData();
    this.dashboardSrv.companies.pipe(map((data) => data.map((d,i) => ({...d, pos: i+1})) )).subscribe(
      (data) => (this.dataSource.data = data)
    );
  }
  setTable() {
    this.dataTabelFiels = [
      { title: '#', type: 'text', label: 'pos', value: 'pos' },
      { title: 'image', type: 'pic', label: 'image', value: 'image' },
      { title: 'name ar', type: 'text', label: 'name_ar', value: 'name_ar' },
      { title: 'name en', type: 'text', label: 'name_en', value: 'name_en' },
      { title: 'budget', type: 'text', label: 'budget', value: 'budget' },
      {
        title: 'created at',
        type: 'date',
        label: 'created_at',
        value: 'created_at',
      },
      { title: '', type: 'actions', label: 'actions', value: 'actions' },
    ];
    // set header of table
    this.dataTabelColumns = this.dataTabelFiels.map((e) => e.label);
    // set edit and delete buttons action
    this.dataTableActions = this.isAdmin
      ? [
          {
            icon: 'edit',
            label: 'edit branch',
            color: 'light',
            action: (index: number) => {
              // edit action
              this.openSideContainer('edit', this.dataSource.data[index]);
            },
          },
          {
            icon: 'delete',
            color: 'warn',
            label: 'delete branch',
            action: (index: number) => {
              const callback = () =>
                this.dashboardSrv.deleteCompany(
                  this.dataSource.data[index]._id
                );
              this.message(
                'alert message',
                'are you sure wants delete this company?',
                callback,
                'delete',
                'delete'
              );
              // delete action
            },
          },
        ]
      : [];
  }
  // open side-container component
  openSideContainer(type = 'add', data?: Company) {
    this.settings.isOpen = true;
    if (type == 'add') {
      this.settings.title = 'Add new Company';
      this.form.reset();
      this.settings.action = 'add';
    } else {
      this.settings.title = 'Edit Company';
      this.slectedId = data?._id!;
      this.form.patchValue(data || {});
      this.settings.action = 'edit';
    }
  }

  keys(obj: any) {
    return Object.keys(obj || {});
  }
  // add and edit
  action() {
    const { value } = this.form;
    if (this.settings.action == 'add') {
      this.dashboardSrv.createNewCompany(value as Company).then(() => {
        this.settings.isOpen = false;
      });
    } else if (this.settings.action == 'edit') {
      this.dashboardSrv
        .updateCompany(value as Company, this.slectedId)
        .then(() => {
          this.settings.isOpen = false;
        });
    }
  }

  //
  message(
    title: string,
    message: string,
    callback?: Function,
    state?: string,
    text?: string
  ) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      maxHeight: '98%',
      maxWidth: '98%',
      minWidth: '360px',
      data: { title, message, callback, state, text },
    });

    return dialogRef;
  }

  pageChange(pageData: any) {
    this.logger.log('page change ==> ', pageData);
    this.dashboardSrv.paginator$.pipe(first()).subscribe(page => {
      if(page.currentRecord < page.totalRecord)
        this.dashboardSrv.loadData({page: pageData.pageIndex, limit: pageData.pageSize })
    })
  }
}

export interface Company {
  name_ar: string;
  name_en: string;
  image: string;
  budget: number;
  created_at: Date;
  _id: string;
}
