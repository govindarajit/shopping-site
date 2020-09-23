import { CommonModule } from '@angular/common';
import { NgModule, } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserRoutingModule, routedComponents } from './user.routing';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [routedComponents, DashboardComponent],
  imports: [
    CommonModule, RouterModule, UserRoutingModule
  ],
  providers: []
})
export class UserModule { }
