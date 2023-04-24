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
  avatar: any;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    const user = this.dataService.user;
    this.form.patchValue(user);
    this.avatar = user.avatar;
  }

  async onSelectImage(event: any) {
    try {
      const file = event.target.files[0];
      await this.dataService.uploadAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatar = e.target.result;
        this.dataService.profileUpdated$.next({avatar: this.avatar})
      }
      reader.readAsDataURL(file);
    } catch {
      this.avatar = this.dataService.user.avatar;
    }
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
