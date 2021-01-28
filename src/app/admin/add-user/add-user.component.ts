import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/shared/models/user-role.model';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

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

  constructor(private router: Router, private adminService: AdminService) {
    this.user = new User(0, '', '', '', '', false);
    this.user.user_roles = [];
  }

  ngOnInit(): void {
  }

  addUser() {
    this.loading = true;
    this.adminService.addUserWithRoles(this.user).subscribe(
      result => console.log(result),
      error => console.log(error),
      () => this.router.navigate(['/admin/dashboard'])
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
