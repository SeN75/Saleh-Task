import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private logger: LoggerService,
    private router: Router,
    private http: HttpClient
  ) { }

  logout() {
    this.logger.log('user loggedout');
    this.router.navigate(['register'])

  }
  login(data: Register) {
    this.logger.log('login action')
    this.router.navigate(['dashboard'])

  }
  signup(data: Register) {
    this.logger.log('signup action')
    this.router.navigate(['dashboard'])

  }
}
export interface Register {
  password: string,
  email: string
}
