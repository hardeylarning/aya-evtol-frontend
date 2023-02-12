import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { AddMedicineComponent } from './components/medicine/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './components/medicine/edit-medicine/edit-medicine.component';
import { MedicinesComponent } from './components/medicine/medicines/medicines.component';
import { RegisterEvtolComponent } from './components/evtol/register-evtol/register-evtol.component';
import { LoadEvtolComponent } from './components/evtol/load-evtol/load-evtol.component';
import { EvtolComponent } from './components/evtol/evtol/evtol.component';
import { EvtolsComponent } from './components/evtol/evtols/evtols.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ErrorComponent,
    AddMedicineComponent,
    EditMedicineComponent,
    MedicinesComponent,
    RegisterEvtolComponent,
    LoadEvtolComponent,
    EvtolComponent,
    EvtolsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
