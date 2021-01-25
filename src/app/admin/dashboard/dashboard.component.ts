import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  users: User[] = [];
  usersCache!: Observable<User[]>;

  searchWord: string = '';
  searchRoleID: number = 0;

  constructor(private titleService: Title, private router: Router, private adminService: AdminService) {

    this.titleService.setTitle("Admin Dashboard - Smart City Herentals");
    this.loadUsers();
  }

  ngOnInit() {
  }

  loadUsers() {
    this.usersCache = this.adminService.getUsersWithRole();
    //Als dit niet werkt online, gebruik de versie in commentaar (dubbele HTTP request)
    this.usersCache.subscribe(
      result => this.users = result
    )
    // this.adminService.getUsersWithRole().subscribe(
    //   result => this.users = result,
    // )
  }

  filterUsers() {
    this.usersCache.pipe(
      map(array => {
        return array.filter(user => this.searchRoleID == 0 ? true : 
          //user.user_roles?.toString().includes(this.searchRoleID.toString())
          //user.user_roles?.forEach(userRole => userRole.role.id == this.searchRoleID)
          this.checkRoles(user, this.searchRoleID)
        )
      }),map(array => {
        return array.filter(user => this.searchWord == null ? true : (
            user.first_name.toLowerCase().includes(this.searchWord.toLowerCase()) ||
            user.last_name.toLowerCase().includes(this.searchWord.toLowerCase()) ||
            user.email.toLowerCase().includes(this.searchWord.toLowerCase())
        ))
      })
    ).subscribe(
      result => this.users = result
    );
  }

  checkRoles(user: User, searchRoleID: number): boolean {
    let containsRole = false;
    user.user_roles?.forEach(userRole => {
      if (userRole.role.id == this.searchRoleID) {
        containsRole = true;
      }
    })

    return containsRole;
  }
  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  newUser() {
    this.router.navigate(['admin/gebruiker-toevoegen']);
  }

  editUser(userID: number) {
    this.router.navigate(['admin/gebruiker-wijzigen/' + userID]);
  }

  deleteUser(userID: number) {

  }

}
