import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreComponent } from './store/store.component';
import { LoginComponent } from './account/login.component';
import { LayoutComponent } from './layout.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: StoreComponent },
            { path: 'login', component: LoginComponent },
            { path: 'cart', component: CartComponent },
            { path: 'unauthorize', component: UnauthorizeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule { }

export const routedComponents = [LayoutComponent, StoreComponent, LoginComponent];
