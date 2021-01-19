import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { CommunicationDashboardComponent } from './communication/dashboard/dashboard.component';
import { GarbageDashboardComponent } from './garbage-collection/dashboard/dashboard.component';
import { ParticipationDashboardComponent } from './participation/dashboard/dashboard.component';
import { Error404Component } from './error/error404/error404.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // Home routes
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  // Admin routes
  { path: 'admin/dashboard', component: AdminDashboardComponent },

  // Garbage Collection routes
  { path: 'groendienst/dashboard', component: GarbageDashboardComponent },

  // Participation routes
  { path: 'participatie/dashboard', component: ParticipationDashboardComponent },

  // Communication routes
  { path: 'communicatie/dashboard', component: CommunicationDashboardComponent },

  // Profiel routes
  { path: 'profiel', component: ProfileComponent },
  { path: 'logout', redirectTo: '', component: HomeComponent },

  // Error 404
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
