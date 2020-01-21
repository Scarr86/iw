import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneratorBase } from 'src/app/service/generator-sale.service';
import { Observable, Subject, from } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { map, find, switchMap, pairwise, startWith } from 'rxjs/operators';
import { SaleStore } from 'src/app/store/old-sale.store';
import { ISale } from 'src/app/models/old-sale.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @ViewChild('formRef',{static:false}) formRef:FormGroupDirective;
  title: string = "";
  form: FormGroup;
  _sale: ISale;
  @Input() set sale(s: ISale) {
    if (!!s) {
      this._sale = s;
    }
    else {
      this._sale = {
        id: 0,
        date: new Date(),
        discount: 0,
        productList: []
      };
    }
  }


  // @Output() onSave = new EventEmitter<ISale>();
  // @Output() onArrowBack = new EventEmitter<never>();
  constructor(
    private router: Router,
    private saleStore: SaleStore,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.title = "Продажа " + this._sale.id;
    this.form = this.fb.group({
      discount: ["0", [Validators.required]],
      productList: this.fb.array([])
    })
  }
  goBack() {
    // this.onArrowBack.emit();
    this.router.navigate(['sale-list'])
  }
  setValue(value: number) {
    this.form.get('discount').setValue(+this.form.get('discount').value + value);
  }

  clearValue() {
    this.form.get('discount').setValue(0);
  }
  get arrayProduct(): FormArray {
    return this.form.get("productList") as FormArray;
  }
  submit() {
    // this.onSave.emit(this.form.value);
    // this.form.reset();
    this.formRef.ngSubmit.next(undefined);
  }

  save(){
    console.log("onsave!");
    
  }

}
