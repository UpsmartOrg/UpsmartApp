import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { UserRole } from 'src/app/shared/models/user-role.model';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userID!: number;
  user!: User;

  loading: boolean = false;

  adminRole = false;
  groendienstRole = false;
  participatieRole = false;
  communicatieRole = false;

  groenID = 1;
  participatieID = 2;
  communicatieID = 3;
  adminID = 4;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private adminService: AdminService, private alertService: AlertService) {
    this.userID = this.activeRoute.snapshot.params['userID'];
    this.loadUser();
  }

  ngOnInit(): void {
  }

  loadUser() {
    this.adminService.getUserWithRoles(this.userID).subscribe(
      result => this.user = result,
      error => this.alertService.error('Er is iets misgelopen...', 'De gebruiker kon niet worden geladen. Probeer het later opnieuw.'),
      () => this.loadUserRoles(this.user)
    )
  }

  loadUserRoles(user: User) {
    user.user_roles?.forEach(userRole => {
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
  }

  updateUser() {
    this.loading = true;
    this.adminService.updateUser(this.user).subscribe(
      error => this.alertService.error('Er is iets misgelopen...', 'De gebruiker kon niet worden gewijzigd. Probeer het later opnieuw.'),
      () => {
        this.router.navigate(['/admin/dashboard']);
        this.alertService.success('Gebruiker gewijzigd', 'De gebruikers werd succesvol gewijzigd.')
      }
    );
  }

  updateRoles(roleid: number) {
    var index = this.user.user_roles?.findIndex(ur => ur.role_id == roleid, 1);

    if (index == -1) {
      this.user.user_roles?.push(new UserRole(this.user.id, roleid, 0));
    }
    else {
      this.user.user_roles?.splice(this.user.user_roles.findIndex(ur => ur.role_id == roleid), 1);
    }
  }

}
