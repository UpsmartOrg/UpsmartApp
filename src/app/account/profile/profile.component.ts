import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from 'src/app/shared/models/user.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;

  constructor(private titleService: Title, public accountService: AccountService,) {
    this.titleService.setTitle("Profiel - Smart City Herentals");
    this.accountService.user.subscribe(result => {
      this.user = result;
    });
  }

  ngOnInit(): void {
  }

}
