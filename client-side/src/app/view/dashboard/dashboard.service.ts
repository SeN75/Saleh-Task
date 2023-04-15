import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './dashboard.component';
import { LoggerService } from 'src/app/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private logger:LoggerService) { }

  fitler(data: any) {
    this.logger.log('filter', data)
  }
}
