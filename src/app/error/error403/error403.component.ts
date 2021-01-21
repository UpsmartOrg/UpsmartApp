import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss']
})
export class Error403Component implements OnInit {

  constructor(private titleService: Title, private router: Router) {
    this.titleService.setTitle("Geen Toegang - Smart City Herentals");
  }

  ngOnInit(): void {
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

}
