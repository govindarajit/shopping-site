import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Product } from '../../models/product';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {
  products: Product[];
  selectedProducts: Product[];
  product: Product;

  constructor(private storeService: StoreService, public cart: Cart) { }

  ngOnInit() {
    this.storeService.GetProducts().subscribe((res) => {
      this.products = res;
    });
  }

}
