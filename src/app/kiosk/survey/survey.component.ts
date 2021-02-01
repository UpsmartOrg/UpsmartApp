import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { Survey } from 'src/app/shared/models/survey.model';
import { QuestionComponent } from '../question/question.component';
import { KioskService } from '../services/kiosk.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  @ViewChildren('question') components!: QueryList<QuestionComponent>;

  surveyID!: number;
  survey!: Survey;

  questions: any[] = [];
  multiItems: any[] = [];

  loadingOQ: boolean = true;
  loadingMQ: boolean = true;
  loadingMQI: boolean = true;
  loadingPost: boolean = false;

  constructor(private titleService: Title, private route: ActivatedRoute, private kioskService: KioskService, private router: Router, private alertService: AlertService) {
    this.titleService.setTitle("Bevraging invullen - Smart City Herentals");
    this.surveyID = this.route.snapshot.params['surveyID'];
    this.loadSurvey(this.surveyID)
  }

  ngOnInit(): void {
  }

  loadSurvey(surveyID: number) {
    this.kioskService.getSurvey(surveyID).subscribe(
      result => {
        this.survey = result;
        this.loadQuestions(surveyID)
      },
      error => this.alertService.error('Er is iets misgelopen...', 'Bevraging kon niet worden opgehaald. Probeer het later opnieuw.')
    )
  }

  loadQuestions(surveyID: number) {
    this.kioskService.getMultiQuestions(surveyID).subscribe(
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
        this.questions.sort((a, b) => a.question_order - b.question_order)
      },
      error => this.alertService.error('Er is iets misgelopen...', 'Bevraging kon niet worden opgehaald. Probeer het later opnieuw.')
    );
    this.kioskService.getOpenQuestions(surveyID).subscribe(
      result => {
        result.forEach(question => {
          this.questions.push(question);
        });
        this.loadingOQ = false;
        this.questions.sort((a, b) => a.question_order - b.question_order)
      },
      error => this.alertService.error('Er is iets misgelopen...', 'Bevraging kon niet worden opgehaald. Probeer het later opnieuw.')
    );
  }

  saveAnswers() {
    this.loadingPost = true;
    this.components.forEach(component => {
      component.saveAnswer();
    });
  }

  onStopLoading() {
    this.loadingPost = false;
    this.router.navigate(['kiosk/bevragingen']);
  }

  redirectTo() {
    this.router.navigate(['kiosk/bevragingen']);
  }
}
