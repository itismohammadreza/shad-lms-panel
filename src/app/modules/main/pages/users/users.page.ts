import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  onSort(event: any) {
    console.log(event)
  }
}
