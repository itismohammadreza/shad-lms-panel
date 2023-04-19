import {Component, Input, OnInit} from '@angular/core';
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

  async onProvinceChange(event: any) {
    try {
      this.districtsLoading = true;
      this.form.get('district_id').setValue(null);
      this.districts = await this.dataService.getDistricts(event.value);
      this.districtsLoading = false;
    } catch {
      this.districtsLoading = false;
    }
  }
}
