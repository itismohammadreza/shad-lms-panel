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
  districtsLoading: boolean = false;
  provinces: Province[] = [];
  districts: District[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadData()
  }

  async loadData() {
    this.provinces = await this.dataService.getProvinces();
  }

  async _onProvinceChange(event: any) {
    if (!event.value) {
      this.form?.get('district_id').setValue(null);
      return
    }
    try {
      this.districtsLoading = true;
      this.form.get('district_id').setValue(null);
      this.districts = await this.dataService.getDistricts(event.value);
      this.districtsLoading = false;
      this.onProvinceChange.emit(event.value)
    } catch {
      this.districtsLoading = false;
    }
  }
}
