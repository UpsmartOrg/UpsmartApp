import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Message } from 'src/app/shared/models/message.model';
import { QuestionComponent } from '../question/question.component';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class KioskHomeComponent implements OnInit {

  @ViewChild(QuestionComponent) component!: QuestionComponent;

  messages: Message[] = [];

  questions: any[] = [];
  multiItems: any[] = [];

  question: any;

  loadingOQ: boolean = true;
  loadingMQ: boolean = true;
  loadingMQI: boolean = true;
  loadingPost: boolean = false;

  constructor(private titleService: Title, private kioskService: KioskService, private router: Router, private alertService: AlertService) {
    this.titleService.setTitle("Kiosk Homepage - Smart City Herentals");
    this.loadMessages();
    this.loadQuestions();
  }

  ngOnInit(): void {
  }

  loadMessages() {
    this.kioskService.getMessages().subscribe(
      result => this.messages = result,
      error => this.alertService.error('Er is iets misgelopen...', 'Berichten konden niet worden geladen. Probeer het later opnieuw.')
    )
  }

  goToMessage(messageID: number) {
    this.router.navigate(['kiosk/stadsnieuws/' + messageID]);
  }

  loadQuestions() {
    this.kioskService.getMultiQuestionsQuickSurvey().subscribe(
      result => {
        result.forEach(question => {
          this.questions.push(question);
          this.kioskService.getMultiItems(question.id).subscribe(
            result2 => {
              result2.forEach(item => {
                this.multiItems.push(item);
              });
              this.loadingMQI = false;
            },
            error => this.alertService.error('Er is iets misgelopen...', 'Bevraging kon niet worden opgehaald. Probeer het later opnieuw.')
          )
        });
        this.loadingMQ = false;
        this.question = this.questions[Math.floor(Math.random() * Math.floor(this.questions.length))];
      },
      error => this.alertService.error('Er is iets misgelopen...', 'Bevraging kon niet worden opgehaald. Probeer het later opnieuw.')
    );
    this.kioskService.getOpenQuestionsQuickSurvey().subscribe(
      result => {
        result.forEach(question => {
          this.questions.push(question);
        });
        this.loadingOQ = false;
        this.question = this.questions[Math.floor(Math.random() * Math.floor(this.questions.length))];
      },
      error => this.alertService.error('Er is iets misgelopen...', 'Bevraging kon niet worden opgehaald. Probeer het later opnieuw.')
    );
  }

  redirectTo(route: string) {
    this.router.navigateByUrl(route);
  }

  saveAnswers() {
    this.loadingPost = true;
    this.component.saveAnswer();
  }

  onStopLoading() {
    this.loadingPost = false;
    this.alertService.success('Antwoord opgeslagen', 'Bedankt voor uw bijdrage.')
    this.loadingMQ = this.loadingMQI = this.loadingOQ = true
    this.question = undefined;
    this.questions = this.multiItems = [];
    this.loadQuestions();
  }

}
