import {Component, OnDestroy, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";
import {Validators} from "@angular/forms";
import {User} from "@core/models";
import {DataService} from "@core/http";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'ng-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit, OnDestroy {
  users: User[] = [];
  destroy$ = new Subject();
  currentSort: string;
  currentFilter: string;

  constructor(private overlayService: OverlayService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.users = await this.dataService.getUsers();
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
      }).pipe(takeUntil(this.destroy$)).subscribe(async (res) => {
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

  onEditUser(user: User, index: number) {
    this.overlayService.showDialogForm([
        {
          component: 'hidden',
          key: 'id',
          value: user.id,
        },
        {
          component: 'hidden',
          key: 'status',
          value: user.status,
        },
        {
          component: 'hidden',
          key: 'last_visit',
          value: user.last_visit,
        },
        {
          component: 'input-text',
          key: 'username',
          label: 'نام کاربری',
          value: user.username,
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'password',
          label: 'رمز عبور',
          value: user.password,
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'dropdown',
          key: 'permission',
          options: [{label: 'ادمین', value: 'Admin'}, {label: 'کاربر', value: 'User'}],
          value: user.permission,
          label: 'سطح دسترسی',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'phone_number',
          label: 'شماره همراه',
          value: user.phone_number,
          maxlength: 11,
          keyFilter: 'num',
          validations: [{type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'}],
        },
        {
          component: 'input-text',
          key: 'email',
          label: 'ایمیل',
          value: user.email,
          validations: [
            {type: 'required', validator: Validators.required, message: 'این فیلد الزامیست'},
            {type: 'email', validator: Validators.email, message: 'ایمیل نامعتبر است'}
          ],
        },
      ],
      {
        header: 'ویرایش کاربر',
        showHeader: true,
        buttonFull: true,
        buttonSize: 'lg',
        acceptColor: 'success',
        acceptLabel: 'ویرایش',
        acceptIcon: 'pi pi-plus'
      }).pipe(takeUntil(this.destroy$)).subscribe(async (res) => {
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

  async onSort(event) {
    this.currentSort = `${event.order == 1 ? '' : '-'}${event.field}`;
    const users = await this.dataService.getUsers({sort: this.currentSort, search_text: this.currentFilter});
    event.data.length = 0;
    event.data.push(...users);
  }

  async changeUserStatus(user: User, event: any) {
    const {value, loadingCallback} = event;
    try {
      await this.dataService.editProfile({id: user.id, status: value} as User);
      loadingCallback()
    } catch (e) {
      loadingCallback(false)
    }
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete()
  }

  async onSearchUsers(event: any) {
    this.currentFilter = event.target.value;
    const users = await this.dataService.getUsers({sort: this.currentSort, search_text: this.currentFilter});
    this.users = [...users]
  }
}
