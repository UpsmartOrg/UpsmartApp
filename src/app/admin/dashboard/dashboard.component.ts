import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AccountService } from 'src/app/account/services/account.service';
import { ErrorDialogComponent } from 'src/app/shared/dialogs/error-dialog/error-dialog.component';
import { WarningDialogComponent } from 'src/app/shared/dialogs/warning-dialog/warning-dialog.component';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  loggedInUser!: User;
  users: User[] = [];
  usersCache!: Observable<User[]>;

  searchWord: string = '';
  searchRoleID: number = 0;

  loadingUsers: boolean = true;

  constructor(private titleService: Title, private router: Router, private adminService: AdminService, public dialog: MatDialog, private accountService: AccountService, private alertService: AlertService) {
    this.titleService.setTitle("Admin Dashboard - Smart City Herentals");
    this.accountService.user.subscribe(result => {
      this.loggedInUser = result;
    });
    this.loadUsers();
  }

  ngOnInit() {
  }

  loadUsers() {
    this.loadingUsers = true;
    this.usersCache = this.adminService.getUsersWithRoles();
    this.usersCache.subscribe(
      result => {
        this.users = result;
        this.loadingUsers = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De gebruikers konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingUsers = false;
      }
    )

  }

  filterUsers() {
    this.loadingUsers = true;
    this.users = [];
    this.usersCache.pipe(
      map(array => {
        return array.filter(user => this.searchRoleID == 0 ? true :
          this.checkRoles(user, this.searchRoleID)
        )
      }), map(array => {
        return array.filter(user => this.searchWord == null ? true : (
          user.first_name.toLowerCase().includes(this.searchWord.toLowerCase()) ||
          user.last_name.toLowerCase().includes(this.searchWord.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchWord.toLowerCase())
        ))
      })
    ).subscribe(
      result => {
        this.users = result;
        this.loadingUsers = false;
      },
      error => {
        this.alertService.error('Er is iets misgelopen...', 'De gebruikers konden niet worden geladen. Probeer het later opnieuw.');
        this.loadingUsers = false;
      }
    );
  }

  checkRoles(user: User, searchRoleID: number): boolean {
    let containsRole = false;
    user.user_roles?.forEach(userRole => {
      if (userRole.role?.id == this.searchRoleID) {
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

  deleteDialog(user: User) {
    //Make sure the user doesn't delete himself
    if (user.id == this.loggedInUser.id) {
      var errors = ['Je kan jezelf niet verwijderen'];
      this.dialog.open(ErrorDialogComponent, { data: errors });
      return;
    }
    var message: string = "Ben je zeker dat je de gebruiker "
      + user.first_name.toUpperCase() + " " + user.last_name.toUpperCase() + " wil verwijderen?\n"

    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: message,
      height: '300',
      width: '500',
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == "confirm") {
          this.deleteUser(user.id);
        }
      });
  }

  deleteUser(userID: number) {
    this.adminService.deleteUser(userID).subscribe(
      () => {
        this.removeFromUserList(userID)
        this.alertService.success('Gebruiker verwijderd.', 'De gebruiker werd succesvol verwijderd.')
      },
      error => this.alertService.error('Er is iets misgelopen...', 'De gebruiker kon niet worden verwijderd. Probeer het later opnieuw.')
    );
  }

  removeFromUserList(userID: number) {
    this.usersCache = this.usersCache.pipe(
      map(array => {
        return array.filter(user => user.id != userID)
      })
    );
    this.filterUsers();
  }
}
