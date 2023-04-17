import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from '../../common/validation';
import { LoggerService } from 'src/app/services/logger.service';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-main',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegisterationComponent implements OnInit {
  isLogin = true;
  form: FormGroup;
  Validation = Validation;
  get controls() {
    return this.form.controls;
  }
  constructor(
    private logger: LoggerService,
    private registerSrv: RegistrationService
  ) {
    this.form = new FormGroup({
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {}
  getKeys(obj: any) {
    return Object.keys(obj || {});
  }

  action() {

    const {value} = this.form
    if(this.isLogin) {
      this.registerSrv.login(value, this.controls)
    }
    else {
      this.registerSrv.signup(value, this.controls)
    }
  }
}
