import {Injectable} from '@angular/core';
import {ApiService} from "@core/http/api.service";
import {Router} from "@angular/router";
import {OverlayService} from "@ng/services";

@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService {
  constructor(private router: Router,
              private overlayService: OverlayService) {
    super()
  }

}
