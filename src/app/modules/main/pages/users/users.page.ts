import {Component, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";
import {Validators} from "@angular/forms";

@Component({
  selector: 'ng-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  users: any[] = [
    {
      username: 'user1',
      phone: '09391886467',
      email: 'asdtest@fif.com',
      permission: 'admin',
      lastVisit: '1401/11/20',
    },
    {
      username: 'user1',
      phone: '09391886467',
      email: 'asdtest@fif.com',
      permission: 'admin',
      lastVisit: '1401/11/20',
    },
    {
      username: 'user1',
      phone: '09391886467',
      email: 'asdtest@fif.com',
      permission: 'admin',
      lastVisit: '1401/11/20',
    },
    {
      username: 'user1',
      phone: '09391886467',
      email: 'asdtest@fif.com',
      permission: 'admin',
      lastVisit: '1401/11/20',
    },
    {
      username: 'user1',
      phone: '09391886467',
      email: 'asdtest@fif.com',
      permission: 'admin',
      lastVisit: '1401/11/20',
    },
    {
      username: 'user1',
      phone: '09391886467',
      email: 'asdtest@fif.com',
      permission: 'admin',
      lastVisit: '1401/11/20',
    },
  ];

  constructor(private overlayService: OverlayService) {
  }

  ngOnInit(): void {
  }

  onAddUser() {
    this.overlayService.showDialogForm([
        {
          component: 'input-text',
          key: 'firstName',
          label: 'نام',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'lastName',
          label: 'نام خانوادگی',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'userName',
          label: 'نام کاربری',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'password',
          label: 'رمز عبور',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'dropdown',
          key: 'permission',
          options: [],
          label: 'سطح دسترسی',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'phone',
          label: 'شماره همراه',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'email',
          label: 'ایمیل',
          validations: [
            {type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'},
            {type: 'email', validator: Validators.email, message: 'ایمیل نامعتبر است'}
          ],
        },
      ],
      {
        header: 'افزودن کاربر',
        showHeader: true,
        buttonFull: true,
        buttonSize: 'lg',
        acceptColor: 'success',
        acceptLabel: 'افزودن',
        acceptIcon: 'pi pi-plus'
      })
  }

  onSort(event: any) {
    console.log(event)
  }

  changeUserStatus(event: any) {

  }
}
