import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'dash-table',
  template: `
    <section class="">
      <table mat-table [dataSource]="dataSource" matSort>
        <!-- Symbol Column -->
        <ng-container [matColumnDef]="d.label" *ngFor="let d of data">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>
            <span>{{ d.title }}</span>
          </th>

          <td mat-cell *matCellDef="let element; index as i">
            <span [ngSwitch]="d.type">
              <span *ngSwitchCase="'text'">
                {{ element[d.value] }}
              </span>
              <span *ngSwitchCase="'pic'">
                <picture>
                  <img [src]="element[d.value]" />
                </picture>
              </span>
              <span *ngSwitchCase="'array'">
                <span *ngFor="let item of element[d.value]">{{
                  item.name
                }}</span>
              </span>

              <span *ngSwitchCase="'actions'">
                <button
                  mat-icon-button
                  *ngFor="let action of tabelActions"
                  (click)="action.action(i)"
                >
                  <mat-icon>{{ action.icon }}</mat-icon>
                </button>
              </span>
            </span>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="coulmus"></tr>
        <tr mat-row *matRowDef="let row; columns: coulmus"></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[1,2,3,4,5]"
        aria-label="Select page of periodic elements"
      >
      </mat-paginator>
    </section>
  `,
  styles: [
    `
      table {
        @apply w-full;

        & th {
          @apply text-[16px] ;
        }
        & td {
          @apply text-[18px];
        }
      }
      picture {
        @apply w-[50px] h-[50px] block;
        & img {
          @apply w-full h-full  object-cover;
        }
      }

      section {
        @apply max-h-[60vh] w-full min-h-[30vh] overflow-y-auto flex flex-col bg-white;
        @apply border-solid border-[1px] ;
        & mat-paginator {
          @apply mt-auto;
        }
        border-radius: 4px;
        box-shadow: 3px 1px 7px rgb(87 113 116 / 12%), -5px 1px 19px -7px rgb(108 133 145 / 32%);
      }
    `,
  ],
})
export class TableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() coulmus!: string[];
  @Input() data: TableDataField[] = [];
  @Input() tabelActions: TableAcion[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(v => console.log(v))
    console.log('data ==>', this.dataSource.data);
  }
}
export interface TableDataField {
  label: string;
  title: string;
  value: string;
  type: 'text' | 'actions' | 'pic' | 'array';
}

export interface TableAcion {
  label: string;
  icon: string;
  action: Function;
}
