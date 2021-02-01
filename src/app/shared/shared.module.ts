import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { MaterialModule } from './material.module';
import { WarningDialogComponent } from './dialogs/warning-dialog/warning-dialog.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    AlertComponent,
    WarningDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    AlertComponent,
    FormsModule
  ],
})

export class SharedModule { }
