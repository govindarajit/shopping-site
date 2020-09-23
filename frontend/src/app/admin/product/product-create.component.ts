import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styles: []
})
export class ProductCreateComponent implements OnInit {
  categories: any[] = [];
  uploadUrl: string;
  productForm: FormGroup;
  productService: ProductService;
  categoryService: CategoryService;

  constructor(formbuilder: FormBuilder, private router: Router, productService: ProductService, categoryService: CategoryService) {
    this.uploadUrl = env.apiAddress + '/file';
    this.productService = productService;
    this.categoryService = categoryService;

    this.productForm = formbuilder.group({
      name: [null, [Validators.required]],
      unitPrice: [null, [Validators.required]],
      file: [null, [Validators.required]],
      categoryId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.categoryService
      .getAll()
      .subscribe((data: any) => {
        this.categories = data;
      });
  }
  onSelect(event, pfuReference) {
    const file = event.files[0];
    console.log('onSelect', event);
    console.log('pfuReference', pfuReference);
    if (file) {
      const image = new Image();
      image.src = file.objectURL.changingThisBreaksApplicationSecurity;
      // disabling auto to prevent the file to upload
      pfuReference.auto = false;
      image.addEventListener('load', () => {
        pfuReference.auto = true;
        pfuReference.upload();
      });
    }
  }
  onUpload(event) {
    console.log('onUpload', event);
    const filepath = event.originalEvent.body.filePath;
    this.productForm.controls.file.setValue(filepath);
  }

  saveData(form: any) {
    console.log('form', form.value);
    if (form.valid) {
      this.productService
        .add(form.value)
        .subscribe((data: any) => {
          this.router.navigate(['/admin/product']);
        });
    }
  }

}
