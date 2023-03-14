import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@core/http';
import {Router} from '@angular/router';
import {LoginCredentials} from "@core/models";

@Component({
  selector: 'ng-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {
  }

  async onSubmit(callback: VoidFunction) {
    if (this.form.invalid) {
      callback()
      return;
    }
    try {
      await this.authService.login(this.form.value as LoginCredentials);
      callback();
      this.router.navigate(['/dashboard']);
    } catch (e) {
      callback();
    }
  }
}
