import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.login(this.form.username.value, this.form.password.value).subscribe({
      next: () => {
        this.router.navigate(["home"]);
        this.alertService.success('Welkom!', 'U bent succesvol ingelogd.');
      },
      error: error => {
        this.loading = false;
        this.alertService.error('Er is iets misgelopen...', 'Check of u het juiste wachtwoord of emailadres hebt ingevoerd.');
      }
    }

    )
  }

}
