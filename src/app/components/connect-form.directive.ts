import { Directive, ElementRef, Input } from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';

@Directive({
  selector: '[appConnectFormControl]'
})
export class ConnectFormControlDirective {

  @Input("appConnectFormControl")
  set data(value) {
    this.formControl.form.patchValue(value);
    this.formControl.form.markAsPristine();

  }
  constructor(private readonly formControl: FormControlDirective) { }

}
