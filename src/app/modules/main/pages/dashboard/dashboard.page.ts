import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DataService} from "@core/http";
import {FormControl, FormGroup} from "@angular/forms";
import {MomentService, UtilsService} from "@ng/services";
import {CountBar, ExamCount, Item, School, SchoolFilter, TutorialCount, Usage} from "@core/models";
import {ProvincesComponent} from "@modules/main/components/provinces/provinces.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'ng-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy {
  @ViewChildren(ProvincesComponent) provincesCmps: QueryList<ProvincesComponent>;
  countBarForm = new FormGroup({
    field: new FormControl(),
    grade: new FormControl(),
    gender_id: new FormControl(),
    province_id: new FormControl(),
    district_id: new FormControl(),
    start_time: new FormControl(),
    end_time: new FormControl(),
  }, this.bothDatesValidator);
  usageForm = new FormGroup({
    school_gender: new FormControl(),
    province_id: new FormControl(),
    district_id: new FormControl(),
    school_type: new FormControl(),
    grade: new FormControl(),
    school_id: new FormControl(),
  });
  countBar: CountBar = {};
  usage: Usage = {};
  fields: Item[] = [];
  grades: Item[] = [];
  schools: any[] = [];
  examCount: ExamCount = {};
  homeworkCount: ExamCount = {};
  tutorialCount: TutorialCount = {};
  countBarFilterEnabled: boolean = false;
  usageFilterEnabled: boolean = false;
  schoolTypes = this.dataService.schoolTypes;
  genders = this.dataService.genders;
  schoolGenders = this.dataService.schoolGenders;
  mapValue: string;
  destroy$ = new Subject()

  constructor(private dataService: DataService,
              private momentService: MomentService,
              private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.loadData();
    this.usageForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
      const {grade, school_id, ...others} = res;
      this.mapValue = others.province_id;
      // this.loadSchools({
      //   ...others,
      //   gender_id: others.school_gender,
      //   type_id: others.school_type
      // })
    })
  }

  searchSchools(event) {
    this.schools = [...Array(10).keys()].map(item => event.query + '-' + item);
  }

  onShowSchoolDropdown(e) {
    e.element.querySelector(".p-dropdown-items-wrapper").addEventListener('scroll', (ev) => {
      const target = ev.target;
      const ulEl = ev.target.querySelector('ul');
      const reachEnd = ((target.scrollHeight - target.offsetHeight) - target.scrollTop) <= 100;
      const loadMoreEl = `<li class="p-element p-dropdown-item-group p-disabled">لطفا صبر کنید...</li>`;
      if (reachEnd) {
        ulEl.insertAdjacentHTML('beforeend', loadMoreEl)
      }
    })
  }

  async loadSchools(filter: SchoolFilter) {
    const {gender_id, province_id, district_id, type_id} = filter;
    filter = {gender_id, province_id, district_id, type_id};
    Object.entries(filter).forEach(([key, value]) => {
      if (value == null) {
        delete filter[key]
      }
    })
    this.schools = await this.dataService.getSchools(filter);
  }

  async loadData() {
    this.countBar = await this.dataService.getCountBar();
    this.usage = await this.dataService.getUsage();
    this.examCount = await this.dataService.getExamCount();
    this.homeworkCount = await this.dataService.getHomeworkCount();
    this.tutorialCount = await this.dataService.getTutorialCount();
    this.fields = await this.dataService.getFields();
    this.grades = await this.dataService.getGrades();
  }

  async onSubmitCountBarFilter() {
    const filters: any = this.utilsService.getDirtyControls(this.countBarForm);
    if (!filters) {
      return;
    }
    let {start_time, end_time} = filters;
    if (start_time && end_time) {
      filters.start_time = this.momentService.getIsoDateWithoutTimeZone(start_time.toDate()).split('.')[0];
      filters.end_time = this.momentService.getIsoDateWithoutTimeZone(end_time.toDate()).split('.')[0];
    }
    this.countBar = await this.dataService.getCountBar(filters)
    this.countBarFilterEnabled = true;
  }

  async clearCountBarFilter() {
    this.countBar = await this.dataService.getCountBar();
    this.countBarForm.reset();
    this.countBarFilterEnabled = false;
  }

  async onSubmitUsageFilter() {
    const filters = this.utilsService.getDirtyControls(this.usageForm);
    if (!filters) {
      return;
    }
    this.usage = await this.dataService.getUsage(filters)
    this.usageFilterEnabled = true;
  }

  async clearUsageFilter() {
    this.usage = await this.dataService.getUsage()
    this.usageForm.reset();
    this.usageFilterEnabled = false;
    this.mapValue = null;
  }

  bothDatesValidator(group: FormGroup) {
    const start_time = group.get('start_time').value;
    const end_time = group.get('end_time').value;
    const bothFilled = !!start_time && !!end_time;
    const bothEmpty = !start_time && !end_time;
    return (bothFilled || bothEmpty) ? null : {invalidDate: true};
  }

  async onMapClick(event: any) {
    const {value, loadingCallback} = event;
    this.usageForm.get('province_id').setValue(value.toString());
    this.usageForm.get('province_id').markAsDirty();
    try {
      await this.provincesCmps.toArray()[1]._onProvinceChange({value: value.toString()});
      await this.onSubmitUsageFilter();
      loadingCallback()
    } catch {
      loadingCallback()
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
