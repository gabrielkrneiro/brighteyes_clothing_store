import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { EmployeeModule } from './employee/employee.module';
import { SalesModule } from './sales/sales.module';
import { CashierModule } from './cashier/cashier.module';
import { ClothesModule } from './clothes/clothes.module';
import { ClientModule } from './client/client.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    EmployeeModule,
    SalesModule,
    CashierModule,
    ClothesModule,
    ClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
