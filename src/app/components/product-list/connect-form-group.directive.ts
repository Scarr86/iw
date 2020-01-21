import { Directive, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormControlDirective, FormGroupDirective, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ISale } from 'src/app/models/old-sale.model';
@Directive({
  selector: '[appConnectFormGroup]'
})
export class ConnectFormGroupDirective {



  @Input("appConnectFormGroup")
  set data(value: ISale) {

    if (!value) return;
    this.arrayProduct.clear();
    value.productList.forEach(_ => {
      this.arrayProduct.push(this.fb.group({
        name: ["", [Validators.required]],
        count: ["", [Validators.required]],
        price: ["", [Validators.required]]
      }))
    });
    this.formGroup.form.patchValue(value);
    this.formGroup.form.markAsPristine();
    this.formGroup.form.markAsUntouched();
  }
  constructor(private readonly formGroup: FormGroupDirective, private fb: FormBuilder) {
  }

  get arrayProduct(): FormArray {
    return this.formGroup.form.get("productList") as FormArray;
  }

}
