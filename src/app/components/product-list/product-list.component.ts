import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneratorBase } from 'src/app/service/generator-sale.service';
import { Observable, Subject, from } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';
import { map, find, switchMap, pairwise, startWith } from 'rxjs/operators';
import { SaleStore } from 'src/app/store/sale.store';
import { ISale } from 'src/app/models/sale.model';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  title: string = "";
  sale$: Observable<ISale>;
  id: number;
  form: FormGroup;
  loading$: Observable<boolean>

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private saleStore: SaleStore,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.id = +this.activeRoute.snapshot.params['id'];
    this.title = "Продажа " + this.id;
    this.sale$ = this.saleStore.selectSaleList().pipe(map(sales => sales && sales.find(s => s.id === this.id)));
    this.loading$ = this.saleStore.selectIsLoading();


    this.form = this.fb.group({
      discount: ["0", [Validators.required]],
      productList: this.fb.array([])
    })
    // this.sale$.subscribe(sale => {
    //   sale.productList.forEach(p => {
    //     this.arrayProduct.push(this.fb.group({
    //       name: [p.name, [Validators.required]],
    //       count: [p.count, [Validators.required]],
    //       price: [p.price, [Validators.required]]
    //     }))

    //   })
    // })

  }
  ngAfterViewInit() {
    // this.saleStore.getSaleList();
  }
  goBack() {
    this.router.navigate(['sale-list'])
  }
  setValue(fc: FormControl, value: number) {
    fc.setValue(+fc.value + value);
  }

  clearValue(fc: FormControl) {
    fc.setValue(0);
  }
  get arrayProduct(): FormArray {
    return this.form.get("productList") as FormArray;
  }

}
