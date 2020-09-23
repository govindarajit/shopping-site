import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard, UserAuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) , canActivate: [UserAuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) , canActivate: [AdminAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
