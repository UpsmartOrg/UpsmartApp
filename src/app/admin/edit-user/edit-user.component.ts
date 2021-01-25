import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private router: Router, private aRoute: ActivatedRoute, private adminService: AdminService) { 
    this.userID = this.aRoute.snapshot.params['userID'];
    this.loadUser();
  }

  ngOnInit(): void {
  }

  loadUser() {
    this.adminService.getUser(this.userID).subscribe(
      result => this.user = result
    )
  }

  updateUser() {
    this.adminService.updateUser(this.user);
    //this.router.navigate(['/admin/dashboard']);
  }

}
