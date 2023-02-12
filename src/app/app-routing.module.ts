import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AddMedicineComponent } from './components/medicine/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './components/medicine/edit-medicine/edit-medicine.component';
import { MedicinesComponent } from './components/medicine/medicines/medicines.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '/',
    component: LoginComponent
  },
  {
    path: 'medicines',
    component: MedicinesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-medicine/:id',
    component: AddMedicineComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-medicine/:id',
    component: EditMedicineComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: '/medicines',
    pathMatch: 'full'
  },
  {
    path: '**', component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
