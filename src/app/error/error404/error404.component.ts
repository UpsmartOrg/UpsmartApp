import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor(private titleService: Title, private router: Router, private location: Location) {
    this.titleService.setTitle("404 - Smart City Herentals");
  }

  ngOnInit(): void {
  }

  redirectTo() {
    this.location.back();
  }

}
