import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Survey } from 'src/app/shared/models/survey.model';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class KioskHomeComponent implements OnInit {

  constructor(private titleService: Title, private kioskService: KioskService, private router: Router) {
    this.titleService.setTitle("Kiosk Homepage - Smart City Herentals");
  }

  ngOnInit(): void {
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
