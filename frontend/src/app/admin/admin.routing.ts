import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './category/category-list.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductCreateComponent } from './product/product-create.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'category', component: CategoryListComponent },
            { path: 'product', component: ProductListComponent },
            { path: 'product/create', component: ProductCreateComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }

export const routedComponents = [LayoutComponent, DashboardComponent, CategoryListComponent, ProductListComponent, ProductCreateComponent];
