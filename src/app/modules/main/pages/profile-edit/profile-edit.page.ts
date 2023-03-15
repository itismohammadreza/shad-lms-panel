import {Component, OnInit} from '@angular/core';
import {AuthService, DataService} from "@core/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "@core/models";

@Component({
  selector: 'ng-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss']
})
export class ProfileEditPage implements OnInit {
  form = new FormGroup({
    id: new FormControl(null),
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null),
    phone_number: new FormControl(null, [Validators.required]),
  })

  constructor(private authService: AuthService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    const user = this.authService.user;
    this.form.patchValue(user)
  }

  onSelectImage(event: any) {

  }

  async onSubmit() {
    if (this.form.invalid) {
      return
    }
    if (!this.form.value.password) {
      delete this.form.value.password
    }
    await this.dataService.editProfile(this.form.value as User)
  }
}
