import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ParticipationDashboardComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle("Participatie Dashboard - Smart City Herentals");
  }

  ngOnInit(): void {
  }

}
