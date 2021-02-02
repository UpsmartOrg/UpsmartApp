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
import { SurveyListComponent } from './kiosk/survey-list/survey-list.component';
import { CommunicationComponent } from './kiosk/communication/communication.component';
import { MessageDetailsComponent } from './kiosk/message-details/message-details.component';
import { AuthGuard } from './account/guards/auth.guard';

const routes: Routes = [
  // Login routes
  { path: 'login', component: LoginComponent },

  // Home routes
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  // Admin routes
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/gebruiker-toevoegen', component: AddUserComponent, canActivate: [AuthGuard] },
  { path: 'admin/gebruiker-wijzigen/:userID', component: EditUserComponent, canActivate: [AuthGuard] },

  // Garbage Collection routes
  { path: 'groendienst', redirectTo: 'groendienst/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'groendienst/dashboard', component: GarbageDashboardComponent, canActivate: [AuthGuard] },

  // Participation routes
  { path: 'participatie', redirectTo: 'participatie/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'participatie/dashboard', component: ParticipationDashboardComponent, canActivate: [AuthGuard] },
  { path: 'participatie/enquete-toevoegen', component: AddSurveyComponent, canActivate: [AuthGuard] },
  { path: 'participatie/enquete-wijzigen/:surveyID', component: EditSurveyComponent, canActivate: [AuthGuard] },

  // Communication routes
  { path: 'communicatie', redirectTo: '/communicatie/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'communicatie/dashboard', component: CommunicationDashboardComponent, canActivate: [AuthGuard] },
  { path: 'communicatie/bericht-toevoegen', component: AddMessageComponent, canActivate: [AuthGuard] },
  { path: 'communicatie/bericht-wijzigen/:messageID', component: EditMessageComponent, canActivate: [AuthGuard] },

  // Profiel routes
  { path: 'profiel', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'logout', redirectTo: '', canActivate: [AuthGuard] },

  // Kiosk routes
  { path: 'kiosk', redirectTo: '/kiosk/home', pathMatch: 'full' },
  { path: 'kiosk/home', component: KioskHomeComponent },
  { path: 'kiosk/stadsnieuws', component: CommunicationComponent },
  { path: 'kiosk/stadsnieuws/:messageID', component: MessageDetailsComponent },
  { path: 'kiosk/bevragingen', component: SurveyListComponent },
  { path: 'kiosk/bevraging/:surveyID', component: SurveyComponent },

  // Error 404
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
