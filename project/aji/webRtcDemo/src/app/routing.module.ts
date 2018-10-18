import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component'
import {AdminComponent} from './admin/admin.component'
// import { PagenotfoundComponent } from '../core/components/pagenotfound/pagenotfound.component'

const appRoutes: Routes = [
  { path : '', component:MainComponent},
  { path : 'admin', component:AdminComponent},
  
//   { path: 'login', component: PagenotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{useHash: true})
  ],
  exports:[RouterModule],
  declarations: []
})
export class RoutingModule { }
