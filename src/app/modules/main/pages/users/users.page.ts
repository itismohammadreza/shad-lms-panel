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

  openUserDialog(value?: UserItem) {
    return this.overlayService.showDialogForm([
        {
          component: 'hidden',
          key: 'id',
          value: value?.id,
        },
        {
          component: 'input-text',
          key: 'username',
          label: 'نام کاربری',
          value: value?.username,
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'password',
          label: 'رمز عبور',
          value: value?.password,
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'dropdown',
          key: 'permission',
          options: [{label: 'ادمین', value: 'Admin'}, {label: 'کاربر', value: 'User'}],
          value: value?.permission || 'User',
          label: 'سطح دسترسی',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'phone_number',
          label: 'شماره همراه',
          value: value?.phone_number,
          maxlength: 11,
          keyFilter: 'num',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'email',
          label: 'ایمیل',
          value: value?.email,
          validations: [
            {type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'},
            {type: 'email', validator: Validators.email, message: 'ایمیل نامعتبر است'}
          ],
        },
      ],
      {
        header: value ? 'ویرایش کاربر' : 'افزودن کاربر',
        showHeader: true,
        buttonFull: true,
        buttonSize: 'lg',
        acceptColor: 'success',
        acceptLabel: value ? 'ویرایش' : 'افزودن',
        acceptIcon: 'pi pi-plus'
      })
  }

  onAddUser() {
    this.openUserDialog().subscribe(async (res) => {
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

  editUser(user: UserItem, index: number) {
    this.openUserDialog(user).subscribe(async (res) => {
      try {
        await this.dataService.editProfile(res.formValue);
        this.users[index] = res.formValue
        res.changeDialogVisibilityTo(false);
      } catch (e) {
        res.changeDialogVisibilityTo(true)
      }
    })
  }
}
