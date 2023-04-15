import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataField, TableAcion } from './components/table.component';

@Component({
  selector: 'app-main',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.setTable()
  }
  dataSource = new MatTableDataSource<Company>();
  dataTabelFiels: TableDataField[] = [];
  dataTabelColumns: string[] = [];
  dataTableActions: TableAcion[] = [];


  setTable() {
    this.dataTabelFiels = [
      { title: '#', type: 'text', label: 'pos', value: 'pos' },
      { title: 'image', type: 'pic', label: 'image', value: 'image' },
      { title: 'name ar', type: 'text', label: 'name_ar', value: 'name_ar' },
      { title: 'name en', type: 'text', label: 'name_en', value: 'name_en' },
      { title: 'budget', type: 'text', label: 'budget', value: 'budget' },
      { title: '', type: 'actions', label: 'actions', value: 'actions' },
    ];
    this.dataTabelColumns = this.dataTabelFiels.map((e) => e.label);

    this.dataTableActions = [
      {
        icon: 'edit',
        label: 'edit branch',
        action: (index: number) => {
          // edit action
        }
      },
      {
        icon: 'delete',
        'label': 'delete branch',
        action: (index: number) => {
          // delete action
        }
      }
    ]
  }
}

export interface Company {
  name_ar: string,
  name_en: string,
  image: string,
  budget: number
}
