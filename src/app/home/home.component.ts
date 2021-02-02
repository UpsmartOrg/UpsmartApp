import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AccountService } from '../account/services/account.service';
import { AlertService } from '../shared/alert/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, private router: Router, private accountService: AccountService, private alertService: AlertService) {
    this.titleService.setTitle("Home - Smart City Herentals");
  }

  ngOnInit(): void {
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
