import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneratorBase } from 'src/app/service/generator-sale.service';
import { Observable, Subject, from, Subscription, of } from 'rxjs';
import { map, find, switchMap, pairwise, startWith, tap, filter, take, debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { Sale } from 'src/app/models/sale.model';
import { ChangeSale, DeleteSale } from 'src/app/store/actions/sale.actions';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  sale$: Observable<Sale>;
  sale: Sale;
  // id: number = 0;
  subscription: Subscription = new Subscription();


  @ViewChild('formRef', { static: false }) formRef: FormGroupDirective;
  title: string = "";
  form: FormGroup;
  formNewProduct: FormGroup;



  // @Output() onSave = new EventEmitter<ISale>();
  // @Output() onArrowBack = new EventEmitter<never>();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private activeRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.title = "Продажа ";
    this.form = this.fb.group({
      discount: ["0"],
      productList: this.fb.array([])
    }, {
      validators: this.formValidator,
      // asyncValidators: this.asuncFormValidator
    });


    this.formNewProduct = this.createFormProduct()
    // this.subscription.add(
    this.sale$ = this.activeRoute.paramMap.pipe(
      switchMap(param => this.store.selectOnce(SaleState.getSaleById(+param.get("id")))
        .pipe(
          filter(s => !!s),
          tap(s => {
            this.title = "Продажа " + s.id;
            this.sale = s;
          }))
      ),
      take(1)
    )
    // .subscribe( s => this.sale = s)
    // )

    this.subscription.add(
      this.form.valueChanges.pipe(
        filter(_ => this.form.valid),
        debounceTime(300),
        distinctUntilChanged(((v1, v2) => JSON.stringify(v1) === JSON.stringify(v2))),
      )
        .subscribe(form => {
          let s: Sale = new Sale((form as Sale).discount, (form as Sale).productList, this.sale.timestamp, this.sale.id);
          this.store.dispatch(new ChangeSale(this.sale.id, s));
        })
    );

    // this.subscription.add(
    //   this.formNewProduct.valueChanges.subscribe(()=>{
    //     this.arrayProduct.push(this.formNewProduct);
    //   })
    // ) 

  }

  formValidator(control: FormControl) {
    let diff = (control.value as Sale).productList.reduce((s, p) => s += p.price * p.count, 0) - (control.value as Sale).discount
    if (diff <= 0) return { "invalidDiscount": true };
    return null
  }
  asuncFormValidator(control: FormControl) {
    return of({ "AsyncInvalidForm": true }).pipe(delay(1000))
  }

  createFormProduct(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      count: ['', [Validators.required]],
      price: ['', [Validators.required]],
    }, {
      validators: Validators.required
    })
  }
  ngAfterViewInit() {
    this.form.statusChanges.subscribe(v => {
      console.log(v, this.form.errors)
    });
  }
  goBack() {
    this.router.navigate(['sale-list'])
  }

  get arrayProductControl(): FormArray {
    return this.form.get("productList") as FormArray;
  }
  submit() {
    this.store.dispatch(new ChangeSale(this.sale.id, this.form.value));
  }

  save() {
    this.formRef.ngSubmit.next(undefined);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  add() {
    let newForm = this.createFormProduct();
    newForm.patchValue(this.formNewProduct.value);
    this.arrayProductControl.push(newForm);
    this.formNewProduct.reset();
  }
  delete(i: number) {
    this.arrayProductControl.removeAt(i);
    // if (!this.arrayProduct.length)
    //   this.store.dispatch(new DeleteSale(this.sale.id));
  }
}


