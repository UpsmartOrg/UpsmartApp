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

  disabled: boolean = true;
  loading: boolean = false;

  constructor(private titleService: Title, public accountService: AccountService) {
    this.titleService.setTitle("Profiel - Smart City Herentals");
    this.accountService.user.subscribe(result => {
      this.user = result;
      const format = 'dd/MM/yyyy';
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
  }

}
