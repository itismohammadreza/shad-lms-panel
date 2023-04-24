import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataService} from "@core/http";
import {FormGroup} from "@angular/forms";
import {District, Province} from "@core/models";

@Component({
  selector: '[ng-provinces]',
  templateUrl: './provinces.component.html',
  styleUrls: ['./provinces.component.scss']
})
export class ProvincesComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() layout: 'responsive' | 'fluid' = 'responsive';
  @Output() onProvinceChange = new EventEmitter();
  @Output() onDistrictChange = new EventEmitter();
  districtsLoading: boolean = false;
  provinces: Province[] = [];
  districts: District[] = [];

  constructor(private dataService: DataService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadData()
  }

  async loadData() {
    this.provinces = await this.dataService.getProvinces();
  }

  async _onProvinceChange(event: any) {
    if (!event.value) {
      this.form.get('district_id').setValue(null);
      this.districts = [];
      return
    }
    try {
      this.districtsLoading = true;
      this.form.get('district_id').setValue(null);
      this.districts = await this.dataService.getDistricts(event.value);
      this.districtsLoading = false;
      this.onProvinceChange.emit(event.value)
      this.cd.detectChanges();
    } catch {
      this.districtsLoading = false;
    }
  }

  async _onDistrictChange(event: any) {
    this.onDistrictChange.emit(event.value)
  }
}
