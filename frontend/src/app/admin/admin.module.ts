import { CommonModule } from '@angular/common';
import { NgModule, } from '@angular/core';
import { HttpClientModule, } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule, routedComponents } from './admin.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { FileUploadModule } from 'primeng/fileupload';

import { TableModule } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [routedComponents, DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    AdminRoutingModule,
    TableModule,
    ConfirmDialogModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    DialogModule
  ],
  providers: [ProductService, CategoryService, MessageService, ConfirmationService]
})
export class AdminModule { }
