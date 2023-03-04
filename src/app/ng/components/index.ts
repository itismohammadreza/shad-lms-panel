import {Type} from '@angular/core';
/***************************** FORM *****************************/
import {CheckboxComponent} from "@ng/components/checkbox/checkbox.component";
import {DropdownComponent} from "@ng/components/dropdown/dropdown.component";
import {SwitchComponent} from "@ng/components/switch/switch.component";
import {InputTextComponent} from "@ng/components/input-text/input-text.component";
import {InputTextareaComponent} from "@ng/components/input-textarea/input-textarea.component";
import {RadioComponent} from "@ng/components/radio/radio.component";
import {JalaliDatepickerComponent} from "@ng/components/jalali-datepicker/jalali-datepicker.component";
import {
  JalaliPickerBaseComponent
} from "@ng/components/jalali-datepicker/jalali-picker-base/jalali-picker-base.component";

/***************************** BUTTONS *****************************/
import {ButtonComponent} from "@ng/components/button/button.component";

/***************************** DATA *****************************/
import {InfiniteScrollComponent} from "@ng/components/infinite-scroll/infinite-scroll.component";

/***************************** OVERLAY *****************************/
import {BottomSheetComponent} from "@ng/components/bottom-sheet/bottom-sheet.component";
import {DialogComponent} from "@ng/components/dialog/dialog.component";
import {DialogFormComponent} from "@ng/components/dialog-form/dialog-form.component";

/***************************** UPLOAD *****************************/
import {FilePicker2Component} from "@ng/components/file-picker2/file-picker2.component";

/***************************** MENU *****************************/
/***************************** MENU *****************************/

/***************************** MEDIA *****************************/
import {ImageComponent} from "@ng/components/image/image.component";

/***************************** MISC *****************************/
import {EmptyComponent} from "@ng/components/empty/empty.component";
import {LoadingComponent} from "@ng/components/loading/loading.component";
import {StatusComponent} from "@ng/components/status/status.component";
import {LoadingContainerComponent} from "@ng/components/loading-container/loading-container.component";
import {IranMapComponent} from "@ng/components/iran-map/iran-map.component";
import {InputPasswordComponent} from "@ng/components/input-password/input-password.component";

export const COMPONENTS: Type<any>[] = [
  /***************************** FORM *************************/
  CheckboxComponent,
  DropdownComponent,
  JalaliPickerBaseComponent,
  SwitchComponent,
  InputTextComponent,
  InputTextareaComponent,
  InputPasswordComponent,
  JalaliDatepickerComponent,
  RadioComponent,
  /***************************** BUTTONS *************************/
  ButtonComponent,
  /***************************** DATA *************************/
  InfiniteScrollComponent,
  /***************************** OVERLAY *************************/
  BottomSheetComponent,
  DialogComponent,
  DialogFormComponent,
  /***************************** UPLOAD *************************/
  FilePicker2Component,
  /***************************** MENU *************************/
  /***************************** MESSAGES *************************/
  /***************************** MEDIA *************************/
  ImageComponent,
  /***************************** MISC *************************/
  EmptyComponent,
  StatusComponent,
  LoadingComponent,
  LoadingContainerComponent,
  IranMapComponent
];
