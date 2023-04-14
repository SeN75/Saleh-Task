import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Validation } from '../../common/validation';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-main',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegisterationComponent implements OnInit {
  isLogin = false;
  form: FormGroup;
  Validation = Validation;
  get controls() {
    return this.form.controls;
  }
  constructor(
    private logger: LoggerService
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
    if(this.isLogin) {
      this.logger.log('login action')
    }
    else {
      this.logger.log('signup action')

    }
  }
}
