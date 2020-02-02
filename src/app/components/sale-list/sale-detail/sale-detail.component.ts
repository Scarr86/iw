import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectionStrategy, HostListener, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, of, iif, Observable, fromEvent } from 'rxjs';
import { map, find, switchMap, pairwise, startWith, tap, filter, take, debounceTime, distinctUntilChanged, delay, timeout, catchError, share, publish, refCount, switchAll, pluck, publishReplay, takeWhile, shareReplay, mergeMap, distinct } from 'rxjs/operators';
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
  @Select(SaleState.loading) loading$: Observable<boolean>;

  title$: Observable<string>;
  sale$: Observable<Sale>;
  date$: Observable<Date | number>;

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
  // @HostListener('scroll',["$event"])
  // onScroll(e,){
  //   console.log((this.el.nativeElement as HTMLElement ).scrollTop, e );

  // }
  isShodow$: Observable<boolean>

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private activeRoute: ActivatedRoute,
    private el: ElementRef
  ) { }

  ngOnInit() {

    this.isShodow$ = fromEvent(this.el.nativeElement, "scroll")
      .pipe(
        map((ev: Event) => (ev.target as HTMLElement).scrollTop),
        map(top => top > 10 ? true : false),
        distinctUntilChanged(),
        tap(console.log)
      )
    // .subscribe(v => console.log(v))

    this.title$ = this.activeRoute.paramMap.pipe(
      pluck("params", "id"),
      map(id => isNaN(+id) ? "Новая продажа" : "Продажа N " + id)
    );

    this.sale$ = this.activeRoute.queryParamMap
      .pipe(
        pluck("params", "id"),
        mergeMap(id => isNaN(+id) ? this.store.dispatch(new NewSale()) : this.store.dispatch(new GetSale(id))),
        mergeMap(() => this.store.selectOnce(SaleState.select)),
        publishReplay(1),
        refCount()
      );
    this.date$ = this.sale$.pipe(pluck('timestamp'))

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

  save() {
    this.store.dispatch(new SaveSale());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  add() {
    let form = this.createFormProduct();
    form.patchValue(this.formNewProduct.value);
    this.arrayProductControl.push(form);
    this.formNewProduct.reset();
  }
  delete(i: number) {
    this.arrayProductControl.removeAt(i);
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


