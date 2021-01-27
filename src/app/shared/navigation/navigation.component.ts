import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account/services/account.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user!: User;

  constructor(public accountService: AccountService,) {
    this.accountService.user.subscribe(result => {
      this.user = result;
    });
  }

  ngOnInit(): void {
  }

}
