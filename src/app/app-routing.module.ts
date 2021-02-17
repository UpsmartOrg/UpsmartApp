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
import { Error403Component } from './error/error403/error403.component';
import { AdminAuthGuard } from './account/guards/admin-auth.guard';
import { GroendienstAuthGuard } from './account/guards/groendienst-auth.guard';
import { ParticipatieAuthGuard } from './account/guards/participatie-auth.guard';
import { CommunicatieAuthGuard } from './account/guards/communicatie-auth.guard';
import { LogoutComponent } from './account/logout/logout.component';
import { ZonesListComponent } from './garbage-collection/zones-list/zones-list.component';
import { EditBinInfoComponent } from './garbage-collection/edit-bin-info/edit-bin-info.component';
import { AddZoneComponent } from './garbage-collection/add-zone/add-zone.component';
import { EditZoneComponent } from './garbage-collection/edit-zone/edit-zone.component';

const routes: Routes = [
  // Login routes
  { path: 'login', component: LoginComponent },

  // Home routes
  { path: '', redirectTo: 'admin/dashboard', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  // Admin routes
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full', canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/gebruiker-toevoegen', component: AddUserComponent, canActivate: [AdminAuthGuard, AuthGuard] },
  { path: 'admin/gebruiker-wijzigen/:userID', component: EditUserComponent, canActivate: [AdminAuthGuard, AuthGuard] },

  // Garbage Collection routes
  { path: 'groendienst', redirectTo: 'groendienst/dashboard', pathMatch: 'full', canActivate: [GroendienstAuthGuard, AuthGuard] },
  { path: 'groendienst/dashboard', component: GarbageDashboardComponent, canActivate: [GroendienstAuthGuard, AuthGuard] },
  { path: 'groendienst/bininfo-wijzigen/:binInfoID', component: EditBinInfoComponent, canActivate: [GroendienstAuthGuard, AuthGuard] },
  { path: 'groendienst/zones', redirectTo: 'groendienst/zones/overzicht', pathMatch: 'full', canActivate: [GroendienstAuthGuard, AuthGuard] },
  { path: 'groendienst/zones/overzicht', component: ZonesListComponent, canActivate: [GroendienstAuthGuard, AuthGuard] },
  { path: 'groendienst/zones/zone-toevoegen', component: AddZoneComponent, canActivate: [GroendienstAuthGuard, AuthGuard] },
  { path: 'groendienst/zones/zone-wijzigen/:zoneID', component: EditZoneComponent, canActivate: [GroendienstAuthGuard, AuthGuard] },

  // Participation routes
  { path: 'participatie', redirectTo: 'participatie/dashboard', pathMatch: 'full', canActivate: [ParticipatieAuthGuard, AuthGuard] },
  { path: 'participatie/dashboard', component: ParticipationDashboardComponent, canActivate: [ParticipatieAuthGuard, AuthGuard] },
  { path: 'participatie/enquete-toevoegen', component: AddSurveyComponent, canActivate: [ParticipatieAuthGuard, AuthGuard] },
  { path: 'participatie/enquete-wijzigen/:surveyID', component: EditSurveyComponent, canActivate: [ParticipatieAuthGuard, AuthGuard] },

  // Communication routes
  { path: 'communicatie', redirectTo: '/communicatie/dashboard', pathMatch: 'full', canActivate: [CommunicatieAuthGuard, AuthGuard] },
  { path: 'communicatie/dashboard', component: CommunicationDashboardComponent, canActivate: [CommunicatieAuthGuard, AuthGuard] },
  { path: 'communicatie/bericht-toevoegen', component: AddMessageComponent, canActivate: [CommunicatieAuthGuard, AuthGuard] },
  { path: 'communicatie/bericht-wijzigen/:messageID', component: EditMessageComponent, canActivate: [CommunicatieAuthGuard, AuthGuard] },

  // Profiel routes
  { path: 'profiel', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },

  // Kiosk routes
  { path: 'kiosk', redirectTo: '/kiosk/home', pathMatch: 'full' },
  { path: 'kiosk/home', component: KioskHomeComponent },
  { path: 'kiosk/stadsnieuws', component: CommunicationComponent },
  { path: 'kiosk/stadsnieuws/:messageID', component: MessageDetailsComponent },
  { path: 'kiosk/bevragingen', component: SurveyListComponent },
  { path: 'kiosk/bevraging/:surveyID', component: SurveyComponent },

  // Error 403
  { path: '403', component: Error403Component },

  // Error 404
  { path: '**', redirectTo: '404', pathMatch: 'full' },
  { path: '404', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
