import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';


@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    AlertComponent,
  ],
})

export class SharedModule { }
