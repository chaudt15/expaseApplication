import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule}        from '@angular/router';
import { Auth }              from './auth.service';
import { HomeScreenComponent } from './homescreen.component';


const appRoutes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: '#', component: HomeScreenComponent },
  { path: '#', redirectTo: '' },
  { path: '**', redirectTo: '' }


];

export const appRoutingProviders: any[] = [
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
