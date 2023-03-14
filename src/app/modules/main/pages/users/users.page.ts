import {Component, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";
import {Validators} from "@angular/forms";
import {UserItem} from "@core/models";
import {DataService} from "@core/http";

@Component({
  selector: 'ng-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  users: UserItem[] = [];

  constructor(private overlayService: OverlayService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.users = await this.dataService.getUsers()
  }

  onAddUser() {
    this.overlayService.showDialogForm([
        {
          component: 'input-text',
          key: 'username',
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
          options: [{label: 'ادمین', value: 'Admin'}, {label: 'کاربر', value: 'User'}],
          value: 'User',
          label: 'سطح دسترسی',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'phone_number',
          label: 'شماره همراه',
          maxlength: 11,
          keyFilter: 'num',
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
      }).subscribe(async (res) => {
      try {
        const {user} = await this.dataService.addUser(res.formValue);
        this.users.push(user)
        res.changeDialogVisibilityTo(false);
      } catch (e) {
        res.changeDialogVisibilityTo(true)
      }
    })
  }

  onSort(event: any) {
    console.log(event)
  }

  changeUserStatus(event: any) {
    const {value, loadingCallback} = event;
    loadingCallback()
  }
}
