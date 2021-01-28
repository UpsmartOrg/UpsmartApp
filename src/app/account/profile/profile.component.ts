import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DatePipe, formatDate } from '@angular/common';
import { User } from 'src/app/shared/models/user.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: User;
  created_at!: string;

  oldPw: string = "";
  newPw: string = "";
  newPwRepeat: string = "";

  adminRole = false;
  groendienstRole = false;
  participatieRole = false;
  communicatieRole = false;

  disabled: boolean = true;
  loading: boolean = false;
  loadingPw: boolean = false;

  constructor(private titleService: Title, public accountService: AccountService) {
    this.titleService.setTitle("Profiel - Smart City Herentals");
    this.accountService.user.subscribe(result => {
      this.user = result;

      this.loadUserWithRoles(this.user.id);

      const format = 'dd-MM-yyyy';
      const locale = 'en-US';
      this.created_at = formatDate(this.user.created_at!, format, locale);
    });
  }

  ngOnInit(): void {
  }

  editProfile() {
    this.disabled = false;
  }

  updateProfile() {
    this.loading = true;
    this.accountService.updateUser(this.user).subscribe(
      result => console.log(result),
      error => console.log(error),
      () => {
        this.disabled = true;
        this.loading = false;
      }
    )
  }

  loadUserWithRoles(userID: number) {
    this.accountService.getUserWithRoles(userID).subscribe(
      result => result.user_roles?.forEach(userRole => {
        switch (parseInt(userRole.role_id.toString())) {
          case 1:
            this.groendienstRole = true;
            break;
          case 2:
            this.participatieRole = true;
            break;
          case 3:
            this.communicatieRole = true;
            break;
          case 4:
            this.adminRole = true;
            break;
          default:
            break;
        }
      })
    )
  }

  updatePassword() {
    if (this.newPw === this.newPwRepeat) {
      this.loadingPw = true;
      this.accountService.updatePassword(this.user, this.oldPw, this.newPw).subscribe(
        () => {
          this.loadingPw = false;
        }
      )

    }
  }
}

