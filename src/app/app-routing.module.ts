import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { EvtolComponent } from './components/evtol/evtol/evtol.component';
import { EvtolsComponent } from './components/evtol/evtols/evtols.component';
import { LoadEvtolComponent } from './components/evtol/load-evtol/load-evtol.component';
import { RegisterEvtolComponent } from './components/evtol/register-evtol/register-evtol.component';
import { AddMedicineComponent } from './components/medicine/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './components/medicine/edit-medicine/edit-medicine.component';
import { MedicineComponent } from './components/medicine/medicine/medicine.component';
import { MedicinesComponent } from './components/medicine/medicines/medicines.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'medicines',
    component: MedicinesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-medicine',
    component: AddMedicineComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-medicine/:id',
    component: EditMedicineComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'medicine/:id',
    component: MedicineComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'evtols',
    component: EvtolsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'evtol/:id',
    component: EvtolComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-evtol',
    component: RegisterEvtolComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'load-evtol',
    component: LoadEvtolComponent,
    canActivate: [AuthGuard]
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
