import { Directive, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormControlDirective, FormGroupDirective } from '@angular/forms';
@Directive({
  selector: '[appConnectFormControl]'
})
export class ConnectFormControlDirective {

  

  @Input("appConnectFormControl")
  set data(value:File) {
    if(!value) return;
    this.formControl.form.patchValue(value);
    this.formControl.form.markAsPristine();
    this.formControl.form.markAsUntouched();
    
      // this.cdr.detectChanges();
    
  }
  // constructor(private readonly formControl: FormControlDirective, private cdr:ChangeDetectorRef) { }
  constructor(private readonly formControl: FormGroupDirective) { }

}
