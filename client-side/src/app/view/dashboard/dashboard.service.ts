import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './dashboard.component';
import { LoggerService } from 'src/app/services/logger.service';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { API } from 'src/app/common/api.config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private companies$ = new BehaviorSubject<Company[]>([]);
  private paginator = new BehaviorSubject<{
    currentRecord: number;
    page: number;
    limit: number;
    totalRecord: number;
  }>({
    currentRecord: 0,
    limit: 5,
    page: 0,
    totalRecord: 0,
  });
  private records: Company[] = [];
  get companies() {
    return this.companies$.asObservable();
  }
  get paginator$() {
    return this.paginator.asObservable();
  }
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private toaster: MatSnackBar
  ) {}

  fitler(data: any, { page, limit } = { limit: 5, page: 0 }) {
    this.records = [];
    this.http
      .get<{ totalRecord: number; companies: Company[] }>(
        `${API}/companies?filter=${JSON.stringify({
          ...data,
        })}&page=${page}&limit=${limit}`
      )
      .subscribe((res) => {
        this.records = res.companies;
        this.companies$.next(this.records);
        this.paginator.next({
          page,
          limit,
          currentRecord: this.records?.length || 0,
          totalRecord: res.totalRecord,
        });
      });
  }

  loadData({ page, limit } = { limit: 5, page: 0 }) {
    this.getCompaniesData({ page, limit }).subscribe((data) => {
        if (this.records.length == 0) {
          this.records = data.companies;
        } else {
          this.records = this.records.concat(data.companies)
        }
        this.paginator.next({
          page,
          limit,
          currentRecord: this.records.length,
          totalRecord: data.totalRecord,
        });
        this.logger.log('records =+> ', this.records);

        this.companies$.next(this.records);
      });
  }
  getCompaniesData({ page, limit } = { limit: 5, page: 0 }) {
    return this.http.get<{ totalRecord: number; companies: Company[] }>(
      `${API}/companies?page=${page}&limit=${limit}`
    );
  }

  async createNewCompany(
    data: Company,
    pageSettings?: { limit: number; page: number }
  ) {
    try {
      const res = await this.http
        .post<Company>(`${API}/companies`, data)
        .toPromise();
      this.toaster.open('Create new company successfully', undefined, {
        panelClass: 'success-message',
      });
      this.loadData();
      this.toaster.open('an error happend when create ', undefined, {
        panelClass: 'error-message',
        duration: 5000,
      });
      return true;
    } catch (error) {
      this.logger.error('create new Company ==> ', error);
      this.toaster.open('an error happend when create ', undefined, {
        panelClass: 'error-message',
        duration: 5000,
      });
      return false;
    }
  }
  async updateCompany(data: Company, id: string) {
    try {
      const res = await this.http
        .patch<Company>(`${API}/companies/${id}`, data)
        .toPromise();
      this.loadData();
      this.toaster.open('update company successfully', undefined, {
        panelClass: 'success-message',
        duration: 5000,
      });
      return true;
    } catch (error) {
      this.logger.error('update Company ==> ', error);
      this.toaster.open('an error happend when update ', undefined, {
        panelClass: 'error-message',
        duration: 5000,
      });
      return false;
    }
  }
  async deleteCompany(id: string) {
    try {
      const res = await this.http
        .delete<Company>(`${API}/companies/${id}`)
        .toPromise();
      this.loadData();
      this.toaster.open('delete company successfully', undefined, {
        panelClass: 'success-message',
        duration: 5000,
      });
      return true;
    } catch (error) {
      this.logger.error('delete Company ==> ', error);
      this.toaster.open('an error happend when deleted ', undefined, {
        panelClass: 'error-message',
        duration: 5000,
      });
      return false;
    }
  }
}
