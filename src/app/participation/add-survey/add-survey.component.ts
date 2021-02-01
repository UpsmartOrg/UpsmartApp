import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/account/services/account.service';
import { ErrorDialogComponent } from 'src/app/shared/dialogs/error-dialog/error-dialog.component';
import { WarningDialogComponent } from 'src/app/shared/dialogs/warning-dialog/warning-dialog.component';
import { MultiplechoiceItemAdd } from 'src/app/shared/models/multiplechoice-item-add.model';
import { MultiplechoiceQuestionAdd } from 'src/app/shared/models/multiplechoice-question-add.model';
import { OpenQuestionAdd } from 'src/app/shared/models/open-question-add.model';
import { SurveyAdd } from 'src/app/shared/models/survey-add.model';
import { User } from 'src/app/shared/models/user.model';
import { ParticipationService } from '../services/participation.service';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {

  user!: User;

  questionCounter: number = 0;
  survey: SurveyAdd;

  allQuestions: any[] = [];

  errorCount: number = 0;
  errorMessages: string[] = [];

  start_date!: string;
  end_date!: string;

  constructor(private participationService: ParticipationService, private dialog: MatDialog, private router: Router, private accountService: AccountService) {
    this.accountService.user.subscribe(result => {
      this.user = result;
    });
    var date: Date = new Date();
    var date2: Date = new Date();
    date.setDate(date.getDate() + 1);
    date2.setDate(date2.getDate() + 31);
    this.survey = new SurveyAdd(this.user.id, '', '', date, date2, [], []);
    this.setupDates();
  }

  ngOnInit(): void {
  }

  setupDates() {
    this.start_date = this.survey.start_date.toISOString().slice(0, 16);
    this.end_date = this.survey.end_date.toISOString().slice(0, 16);
  }

  addQuestion() {
    this.questionCounter++;
    var question = new OpenQuestionAdd(0, '', '', 5, this.questionCounter);
    this.allQuestions.push(question);
  }

  deleteQuestionConfirmation(question: any) {
    if (question.title || question.description || (question.multiplechoice_items && question.multiplechoice_items.length > 0)) {
      var message = "Ben je zeker dat je vraag " + question.question_order + " wil verwijderen?";
      const dialogRef = this.dialog.open(WarningDialogComponent, {
        data: message,
        height: '300',
        width: '500',
      });
      dialogRef.afterClosed().subscribe(
        result => {
          if (result == "confirm") {
            this.deleteQuestion(question);
          }
        });
    } else {
      this.deleteQuestion(question);
    }
  }

  deleteQuestion(question: any) {
    this.allQuestions.splice(this.allQuestions.findIndex(q => q.question_order == question.question_order), 1);

    for (let qNumber = question.question_order + 1; qNumber <= this.questionCounter; qNumber++) {
      var index = this.allQuestions.findIndex(q => q.question_order == qNumber)
      this.allQuestions[index].question_order = qNumber - 1;
    }

    this.questionCounter--;
  }

  isOpenQuestion(question: any): boolean {
    if (question.rows) {
      return true;
    }
    return false;
  }

  makeQuestionOpen(question: any) {
    //Return if question is already an open question
    if (this.isOpenQuestion(question)) {
      return;
    }
    var openQuestion = new OpenQuestionAdd(0, '', '', 5, 0);

    openQuestion.title = question.title;
    openQuestion.description = question.description;
    openQuestion.question_order = question.question_order;

    this.updateList(openQuestion);
  }

  makeQuestionMulti(question: any) {
    //Return if question is already a multi question
    if (!this.isOpenQuestion(question)) {
      return;
    }
    var multiquestion = new MultiplechoiceQuestionAdd(0, '', '', false, 0, []);

    multiquestion.title = question.title;
    multiquestion.description = question.description;
    multiquestion.question_order = question.question_order;

    this.updateList(multiquestion);
  }

  updateList(question: any) {
    this.allQuestions.splice(this.allQuestions.findIndex(q => q.question_order == question.question_order), 1);
    this.allQuestions.push(question);
    this.allQuestions.sort((a, b) => a.question_order - b.question_order);
  }

  addAnswer(question: MultiplechoiceQuestionAdd) {
    var multiItem = new MultiplechoiceItemAdd(0, '');
    question.multiplechoice_items.push(multiItem);
  }

  deleteAnswer(question: MultiplechoiceQuestionAdd, index: number) {
    question.multiplechoice_items.splice(index, 1);
  }

  saveSurvey() {
    if (this.hasErrors()) {
      return;
    }
    this.allQuestions.forEach(question => {
      if (question instanceof MultiplechoiceQuestionAdd) {
        this.survey.multiplechoice_questions.push(question);
      } else if (question instanceof OpenQuestionAdd) {
        this.survey.open_questions.push(question);
      }
    });

    this.participationService.addSurveyComplete(this.survey).subscribe(
      () => this.router.navigate(['/participatie/dashboard'])
    );
  }

  hasErrors(): boolean {
    this.errorCount = 0;
    this.errorMessages = [];

    this.surveyErrorCheck();
    this.questionErrorCheck();

    if (this.errorCount > 0) {
      this.dialog.open(ErrorDialogComponent, {
        data: this.errorMessages,
        height: '300',
        width: '500',
      });
      return true;
    }
    return false;
  }

  surveyErrorCheck() {
    if (!this.survey.name || this.survey.name.length < 6) {
      this.errorCount++;
      this.errorMessages.push("Vul een naam in voor de enquête van minstens 6 karakters\n");
    }
    if (!this.survey.description || this.survey.name.length < 6) {
      this.errorCount++;
      this.errorMessages.push("Vul een beschrijving in voor de enquête van minstens 6 karakters\n");
    }
    if (!this.survey.start_date) {
      this.errorCount++;
      this.errorMessages.push("Vul een begindatum in voor de enquête\n");
    }
    if (!this.survey.end_date) {
      this.errorCount++;
      this.errorMessages.push("Vul een einddatum in voor de enquête\n");
    }
    if (this.survey.start_date >= this.survey.end_date) {
      this.errorCount++;
      this.errorMessages.push("De einddatum moet na de startdatum vallen\n");
    }
  }

  questionErrorCheck() {
    //Make sure there is at least 1 question
    if (this.allQuestions.length < 1) {
      this.errorCount++;
      this.errorMessages.push("Voeg minstens 1 vraag toe aan de enquête\n");
    }
    this.allQuestions.forEach(question => {
      //Make sure each question has a title
      if (!question.title || question.title.length < 6) {
        this.errorCount++;
        this.errorMessages.push("Vul een titel in voor vraag " + question.question_order + " met minstens 6 karakters\n");
      }
      if (!this.isOpenQuestion(question)) {
        //Make sure there are at least 2 answers
        if (question.multiplechoice_items.length < 2) {
          this.errorCount++;
          this.errorMessages.push("Voeg minstens 2 antwoorden toe bij vraag " + question.question_order + "\n");
        }
        //Make sure every answer has a title
        for (let index = 0; index < question.multiplechoice_items.length; index++) {
          if (!question.multiplechoice_items[index].title) {
            this.errorCount++;
            this.errorMessages.push("Vul een tekst in voor antwoord " + (index + 1) + " van vraag " + question.question_order + "\n");
          }
        }
      }
    });
  }

  parseDate(dateString: string): Date {
    return new Date(dateString);
  }

}
