import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { CommunicationDashboardComponent } from './communication/dashboard/dashboard.component';
import { GarbageDashboardComponent } from './garbage-collection/dashboard/dashboard.component';
import { ParticipationDashboardComponent } from './participation/dashboard/dashboard.component';
import { Error404Component } from './error/error404/error404.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AddSurveyComponent } from './participation/add-survey/add-survey.component';
import { LoginComponent } from './account/login/login.component';
import { AddUserComponent } from './admin/add-user/add-user.component';
import { EditUserComponent } from './admin/edit-user/edit-user.component';
import { EditSurveyComponent } from './participation/edit-survey/edit-survey.component';
import { EditMessageComponent } from './communication/edit-message/edit-message.component';
import { AddMessageComponent } from './communication/add-message/add-message.component';
import { KioskHomeComponent } from './kiosk/home/home.component';
import { SurveyComponent } from './kiosk/survey/survey.component';

const routes: Routes = [
  // Login routes
  { path: 'login', component: LoginComponent },

  // Home routes
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  // Admin routes
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'admin/gebruiker-toevoegen', component: AddUserComponent },
  { path: 'admin/gebruiker-wijzigen/:userID', component: EditUserComponent },

  // Garbage Collection routes
  { path: 'groendienst', redirectTo: 'groendienst/dashboard', pathMatch: 'full' },
  { path: 'groendienst/dashboard', component: GarbageDashboardComponent },

  // Participation routes
  { path: 'participatie', redirectTo: 'participatie/dashboard', pathMatch: 'full' },
  { path: 'participatie/dashboard', component: ParticipationDashboardComponent },
  { path: 'participatie/enquete-toevoegen', component: AddSurveyComponent },
  { path: 'participatie/enquete-wijzigen/:surveyID', component: EditSurveyComponent },

  // Communication routes
  { path: 'communicatie', redirectTo: '/communicatie/dashboard', pathMatch: 'full' },
  { path: 'communicatie/dashboard', component: CommunicationDashboardComponent },
  { path: 'communicatie/bericht-toevoegen', component: AddMessageComponent },
  { path: 'communicatie/bericht-wijzigen/:messageID', component: EditMessageComponent },

  // Profiel routes
  { path: 'profiel', component: ProfileComponent },
  { path: 'logout', redirectTo: '' },

  // Kiosk routes
  { path: 'kiosk', component: KioskHomeComponent },
  { path: 'kiosk/bevraging/:surveyID', component: SurveyComponent },

  // Error 404
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
