import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneratorBase } from 'src/app/service/generator-sale.service';
import { Observable, Subject, from, Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { map, find, switchMap, pairwise, startWith, tap, filter, take, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SaleStore } from 'src/app/store/old-sale.store';
import { ISale } from 'src/app/models/old-sale.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SaleState } from 'src/app/store/state/sale.state';
import { Sale } from 'src/app/models/sale.model';
import { ChangeSale } from 'src/app/store/actions/sale.actions';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  sale$: Observable<Sale>;
  id: number = 0;
  subscription: Subscription;


  @ViewChild('formRef', { static: false }) formRef: FormGroupDirective;
  title: string = "";
  form: FormGroup;



  // @Output() onSave = new EventEmitter<ISale>();
  // @Output() onArrowBack = new EventEmitter<never>();
  constructor(
    private router: Router,
    private saleStore: SaleStore,
    private fb: FormBuilder,
    private store: Store,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title = "Продажа ";
    this.form = this.fb.group({
      id: [],
      date: Date,
      discount: ["0"],
      productList: this.fb.array([])
    });

    this.sale$ = this.activeRoute.paramMap.pipe(
      switchMap(
        param => this.store.select(SaleState.getSaleById(+param.get("id")))
          .pipe(
            filter(s => !!s),
            tap(s => this.title = "Продажа " + s.id)
          )
      ),
      take(1)
    );


    this.subscription = this.form.valueChanges
      .pipe(
        filter(_ => this.form.valid),
        debounceTime(300),
        distinctUntilChanged(((v1, v2) => JSON.stringify(v1) === JSON.stringify(v2))),
      )
      .subscribe(v => this.store.dispatch(new ChangeSale(v.id, v)))

  }
  ngAfterViewInit() {


  }
  goBack() {
    this.router.navigate(['sale-list'])
  }


  get arrayProduct(): FormArray {
    return this.form.get("productList") as FormArray;
  }
  submit() {
    this.store.dispatch(new ChangeSale(this.id, this.form.value));
  }

  save() {
    this.formRef.ngSubmit.next(undefined);

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}



