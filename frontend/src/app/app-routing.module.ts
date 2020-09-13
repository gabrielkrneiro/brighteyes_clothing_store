import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { LoginGuard } from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'employee',
    loadChildren: './employee/employee.module#EmployeeModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'sales',
    loadChildren: './sales/sales.module#SalesModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'cashier',
    loadChildren: './cashier/cashier.module#CashierModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'client',
    loadChildren: './client/client.module#ClientModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'clothes',
    loadChildren: './clothes/clothes.module#ClothesModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'shopping-cart',
    loadChildren: './shopping-cart/shopping-cart.module#ShoppingCartModule',
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
