import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'employee',
    loadChildren: './employee/employee.module#EmployeeModule',
  },
  {
    path: 'sales',
    loadChildren: './sales/sales.module#SalesModule',
  },
  {
    path: 'cashier',
    loadChildren: './cashier/cashier.module#CashierModule',
  },
  {
    path: 'client',
    loadChildren: './client/client.module#ClientModule',
  },
  {
    path: 'clothes',
    loadChildren: './clothes/clothes.module#ClothesModule',
  },
  {
    path: 'shopping-cart',
    loadChildren: './shopping-cart/shopping-cart.module#ShoppingCartModule',
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
