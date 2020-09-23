import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProducts: Product[];
  product: Product;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
    });
  }

  deleteProduct(product) {
    const id = product._id;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val._id !== id);
        product = {};
        this.productService.delete(id).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        });
      }
    });
  }

}
