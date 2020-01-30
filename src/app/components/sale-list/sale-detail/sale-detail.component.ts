import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, of, iif, Observable } from 'rxjs';
import { map, find, switchMap, pairwise, startWith, tap, filter, take, debounceTime, distinctUntilChanged, delay, timeout, catchError, share, publish, refCount, switchAll, pluck, publishReplay, takeWhile, shareReplay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { Sale } from 'src/app/models/sale.model';
import { ChangeSale, DeleteSale, GetSales, UploadSales, NewSale, SaveSale, GetSale } from 'src/app/store/actions/sale.actions';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('formRef', { static: false }) formRef: FormGroupDirective;

  title$: Observable<string>;
  sale$: Observable<Sale>;
  date$: Observable<Date>;

  formSale: FormGroup;
  formNewProduct: FormGroup;
  subscription: Subscription = new Subscription();

  get discount() {
    return this.formSale.get('discount').value
  }
  set discount(v) {
    this.formSale.get('discount').setValue(+v);
  }
  get arrayProductControl(): FormArray {
    return this.formSale.get("productList") as FormArray;
  }

  constructor(private router: Router, private fb: FormBuilder, private store: Store, private activeRoute: ActivatedRoute) { }
  ngOnInit() {
    this.title$ = this.activeRoute.paramMap.pipe(
      pluck("params", "id"),
      map(id => isNaN(+id) ? "Новая продажа" : "Продажа N " + id)
    );

    this.sale$ = this.store.select(SaleState.select).pipe(
      takeWhile(s => !s, true),
      share(),
    );
    this.date$ = this.sale$.pipe(
      map(s => new Date(s.timestamp)),
      tap(console.log),
    )

    let id = this.activeRoute.snapshot.queryParams["id"];
    if (isNaN(+id))
      this.store.dispatch(new NewSale());
    else
      this.store.dispatch(new GetSale(id))


    this.formSale = this.fb.group({
      discount: ["0"],
      productList: this.fb.array([])
    }, {
      validators: this.formValidator,
      // asyncValidators: this.asuncFormValidator
    });

    this.formNewProduct = this.createFormProduct()

    this.subscription.add(
      this.formSale.valueChanges.pipe(
        filter(_ => this.formSale.valid),
        debounceTime(300),
        distinctUntilChanged(((v1, v2) => JSON.stringify(v1) === JSON.stringify(v2))),
      )
        .subscribe((value) => {
          this.store.dispatch(new ChangeSale(this.discount, this.arrayProductControl.value));
        })
    );

    // this.subscription.add(
    //   this.formNewProduct.valueChanges.subscribe(()=>{
    //     this.arrayProduct.push(this.formNewProduct);
    //   })
    // ) 

  }

  createForm() {

  }

  formValidator(control: FormControl) {
    let diff = (control.value as Sale).productList.reduce((s, p) => s += p.price * p.count, 0) - (control.value as Sale).discount
    if (diff <= 0) return { "invalidDiscount": true };
    return null
  }
  asyncFormValidator(control: FormControl) {
    return of({ "AsyncInvalidForm": true }).pipe(delay(1000))
  }

  createFormProduct(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      count: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
    }, {
      validators: Validators.required
    })
  }
  ngAfterViewInit() {
    this.formSale.statusChanges.subscribe(v => {
      console.log(v, this.formSale.errors)
    });
  }
  goBack() {
    this.router.navigate(['sale-list'])
  }


  submit() {
    // let sale = new Sale(this.discount, this.arrayProductControl.value, this.sale.timestamp, this.sale.id);
    // this.store.dispatch(new ChangeSale(sale.id, sale));
    // this.form.untouched
  }

  save() {
    this.store.dispatch(new SaveSale());
    //this.formRef.ngSubmit.next(undefined);
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
    console.log("delete product", i);

    this.arrayProductControl.removeAt(i);
    // if (!this.arrayProduct.length)
    //   this.store.dispatch(new DeleteSale(this.sale.id));
  }
  test(el: MatExpansionPanel) {
    let nativEl: HTMLElement = document.querySelector(`[aria-controls=${el.id}]`);
    let bottom = nativEl.getBoundingClientRect().bottom
    console.log("[test SALE DETAIL]", Math.min(0, bottom) * -1);

    // nativEl.scrollBy(0, Math.min(0, bottom) * -1);
    // nativEl.scrollIntoView();
    // window.scrollBy(0, 20);
  }



}


