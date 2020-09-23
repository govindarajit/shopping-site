import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styles: []
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  selectedCategories: Category[];
  category: any;
  submitted: boolean;
  categoryDialog: boolean;


  constructor(
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res;
    });
  }

  openNew() {
    this.category = {};
    this.submitted = false;
    this.categoryDialog = true;
  }

  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  saveProduct(category) {
    this.submitted = true;
    if (category.name.trim()) {
      if (category._id) {
        this.categoryService
          .update(category)
          .subscribe((data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
          });
      } else {
        this.categoryService
          .add(category)
          .subscribe((data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
          });
      }
      this.categories = [...this.categories];
      this.categoryDialog = false;
      this.category = {};
    }
  }

  editCategory(category: Category) {
    this.category = { ...category };
    this.categoryDialog = true;
  }

  deleteCategory(category) {
    const id = category._id;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + category.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categories = this.categories.filter(val => val._id !== id);
        category = {};
        this.categoryService.delete(id).subscribe((res) => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
        });
      }
    });
  }

}
