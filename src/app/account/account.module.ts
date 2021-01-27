import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent, ProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AccountModule { }
