import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
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

  isConnected: boolean = true;

  constructor(private titleService: Title, private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, private alertService: AlertService, private connectionService: ConnectionService) {
    this.titleService.setTitle("Smart City Herentals");
    this.alertService.info('Kiosk app:', "<a href=\"http://smartcity.seppealaerts.be/kiosk\" class=\"text-body\" target=\"_blank\">smartcity.seppealaerts.be/kiosk</a>")
    this.alertService.info('Demo account:', 'Username: dirk.d<br>Email: dirkd@herentals.be<br>Wachtwoord: testtest')

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    })
  }

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
      this.alertService.warn('Inloggen mislukt.', 'Email en wachtwoord zijn verplichte velden.');
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
