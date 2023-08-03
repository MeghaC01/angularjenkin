import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewRequestComponent } from './new-request/new-request.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { IssuedAadharComponent } from './issued-aadhar/issued-aadhar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ViewRequestComponent } from './view-request/view-request.component';
import { ViewAadharComponent } from './view-aadhar/view-aadhar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'adminHome',
    component: AdmindashboardComponent,
    children: [
      { path: 'viewReqt', component: ViewRequestComponent },
      { path: 'viewall', component: IssuedAadharComponent },
    ],
  },
  {
    path: 'userHome',
    component: UserdashboardComponent,
    children: [
      { path: 'storeReq', component: NewRequestComponent },
      { path: 'view', component: ViewAadharComponent },
    ],
  },
  { path: 'signup', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
