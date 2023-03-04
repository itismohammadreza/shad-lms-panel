import {Component, OnInit} from '@angular/core';
import {OverlayService} from "@ng/services";
import {AuthService} from "@core/http";
import {Router} from "@angular/router";

@Component({
  selector: 'ng-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {

  constructor(private overlayService: OverlayService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  async logout() {
    const dialogRes = await this.overlayService.showConfirmDialog({
      header: 'هشدار',
      message: 'آیا از خروج سایت اطمینان دارید؟',
      closable: false
    })
    if (dialogRes) {
      this.authService.logout();
      this.router.navigateByUrl('/auth/login')
    }
  }
}
