import {Component, OnDestroy, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";
import {Validators} from "@angular/forms";
import {User} from "@core/models";
import {AuthService, DataService} from "@core/http";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'ng-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit, OnDestroy {
  currentUser: User;
  users: User[] = [];
  destroy$ = new Subject()

  constructor(private overlayService: OverlayService,
              private dataService: DataService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.currentUser = this.authService.user;
    this.users = await this.dataService.getUsers();
  }

  openUserDialog(value?: User) {
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
    this.openUserDialog().pipe(takeUntil(this.destroy$)).subscribe(async (res) => {
      if (!res) {
        return
      }
      try {
        const {user} = await this.dataService.addUser(res.formValue);
        this.users.push(user)
        res.changeDialogVisibilityTo(false);
      } catch (e) {
        res.changeDialogVisibilityTo(true)
      }
    })
  }

  async onSort(event) {
    const sort = `${event.order == 1 ? '' : '-'}${event.field}`;
    const users = await this.dataService.getUsers([sort]);
    event.data.length = 0;
    event.data.push(...users);
  }

  async changeUserStatus(user: User, event: any) {
    const {value, loadingCallback} = event;
    try {
      await this.dataService.editProfile({...user, status: value} as User);
      loadingCallback()
    } catch (e) {
      loadingCallback(false)
    }
  }

  editUser(user: User, index: number) {
    this.openUserDialog(user).pipe(takeUntil(this.destroy$)).subscribe(async (res) => {
      if (!res) {
        return
      }
      try {
        await this.dataService.editProfile(res.formValue);
        this.users[index] = res.formValue
        res.changeDialogVisibilityTo(false);
      } catch (e) {
        res.changeDialogVisibilityTo(true)
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete()
  }
}
