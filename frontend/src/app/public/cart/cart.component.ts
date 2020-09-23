import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

  constructor(public cart: Cart, private authService: AuthService, private storeService: StoreService, private router: Router) { }

  ngOnInit() {
  }
  checkout() {
    if (this.authService.user !== undefined) {
      this.cart.userId = this.authService.user.userId;

      this.storeService.SaveCart(this.cart).subscribe((res: any) => {
        console.log(res);
        if (res !== undefined) {
          this.cart.checkoutPayUmoney(res, this.authService.user);
        }
      });
    } else {
      this.router.navigate(['login'], { queryParams: { ref: 'cart' } });
    }
  }
}
