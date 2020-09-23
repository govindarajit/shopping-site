import { CommonModule } from '@angular/common';
import { NgModule, } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PublicRoutingModule, routedComponents } from './public.routing';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';
import { StoreService } from './services/store.service';
import { Cart } from './models/cart';
import { CartComponent } from './cart/cart.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [routedComponents, UnauthorizeComponent, CartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    PublicRoutingModule,
    ButtonModule,
    TableModule
  ],
  providers: [StoreService, Cart]
})
export class PublicModule { }
