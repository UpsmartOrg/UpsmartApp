import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    AlertComponent,
  ],
})

export class SharedModule { }
