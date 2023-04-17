import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { API } from 'src/app/common/api.config';
import { LoggerService } from 'src/app/services/logger.service';
import { MessageService } from 'src/app/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private logger: LoggerService,
    private router: Router,
    private http: HttpClient,
    private toaster: MatSnackBar,
    private messageSrv: MessageService
  ) { }

  logout() {
    this.logger.log('user loggedout');
    this.router.navigate(['register'])
    localStorage.removeItem('user')
  }
  login(data: Register, controls: any) {
    this.logger.log('login action')
    this.http.post<Register>(`${API}/auth/login`, data).pipe(first()).subscribe((user) => {
      localStorage['user'] = JSON.stringify(user);
      const root = user.role == 'ADMIN' ? 'admin' : 'user';
      this.logger.log('user role  ==> ', user)
      this.router.navigate(['dashboard', root])
    }, (error) => {
      this.toaster.open( error?.error?.message || 'an error happend when login', undefined, {panelClass: 'error-message', duration: 5000})
      if(error.error.errors)
      this.messageSrv.setErrorToControls(error.error.errors, controls)
      this.logger.error('login error ==> ', error)
    })
  }
  signup(data: Register, controls: any) {
    this.http.post<Register>(`${API}/auth/sign-up`, data).pipe(first()).subscribe((user) => {
      localStorage['user'] = JSON.stringify(user);
      const root = user.role == 'ADMIN' ? 'admin' : 'user'
      this.router.navigate(['dashboard', root])
    }, (error) => {
      this.toaster.open( error?.error?.message || 'an error happend when sign up', undefined, {panelClass: 'error-message', duration: 5000})
      if(error.error.errors)
        this.messageSrv.setErrorToControls(error.error.errors, controls)
      this.logger.error('login error ==> ', error)
    })

  }
}
export interface Register {
  password: string,
  email: string,
  role?:string
}
