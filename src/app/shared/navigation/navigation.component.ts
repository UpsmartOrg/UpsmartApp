import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/services/account.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user!: User;

  adminRole = false;
  groendienstRole = false;
  participatieRole = false;
  communicatieRole = false;

  hideNav: boolean = false;
  kiosk: boolean = false;

  constructor(public accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe({
      next: result => this.user = result
    });

    this.accountService.userRoles.subscribe({
      next: () => this.checkRoles()
    })

    this.router.events.subscribe({
      next: () => {
        if (this.router.url === '/login' || this.router.url.includes('/kiosk')) {
          this.hideNav = true;
        } else {
          this.hideNav = false;
        }

        if (this.router.url.includes('/kiosk')) {
          this.kiosk = true;
        } else {
          this.kiosk = false;
        }
      }
    })
  }

  ngOnInit(): void {
  }

  checkRoles() {
    this.adminRole = this.accountService.isAdmin();
    this.participatieRole = this.accountService.isParticipatie();
    this.groendienstRole = this.accountService.isGroendienst();
    this.communicatieRole = this.accountService.isCommunicatie();
  }

}
