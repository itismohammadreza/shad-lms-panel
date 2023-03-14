import {Component, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";
import {AuthService, DataService} from "@core/http";
import {UserProfile} from "@core/models";

@Component({
  selector: 'ng-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  profile: UserProfile;

  constructor(private overlayService: OverlayService,
              private dataService: DataService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  async loadData() {
    this.profile = await this.authService.getProfile();
  }

  async logout() {
    const dialogRes = await this.overlayService.showConfirmDialog({
      header: 'هشدار',
      message: 'آیا از خروج سایت اطمینان دارید؟',
      closable: false
    })
    if (dialogRes) {
      await this.authService.logout();
    }
  }
}
