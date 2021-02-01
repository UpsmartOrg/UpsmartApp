import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { WarningDialogComponent } from 'src/app/shared/dialogs/warning-dialog/warning-dialog.component';
import { MultiplechoiceItem } from 'src/app/shared/models/multiplechoice-item.model';
import { MultiplechoiceQuestion } from 'src/app/shared/models/multiplechoice-question.model';
import { OpenQuestion } from 'src/app/shared/models/open-question.model';
import { SurveyAdd } from 'src/app/shared/models/survey-add.model';
import { ParticipationService } from '../services/participation.service';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {

  questionCounter: number = 0;
  survey: SurveyAdd;

  openQuestions: OpenQuestion[] = [];
  multiplechoiceQuestions: MultiplechoiceQuestion[] = [];

  allQuestions: any[] = [];

  constructor(private participationService: ParticipationService, private dialog: MatDialog, private router: Router, private alertService: AlertService) {
    this.survey = new SurveyAdd(1, '', '', new Date(), new Date(), [], []);
  }

  ngOnInit(): void {
  }

  addQuestion() {
    this.questionCounter++;
    var question = new OpenQuestion(0, 0, '', '', 5, this.questionCounter);
    this.allQuestions.push(question);
  }

  deleteQuestion(question: any) {
    this.allQuestions.splice(this.allQuestions.findIndex(q => q.question_number == question.question_number), 1);

    for (let qNumber = question.question_number + 1; qNumber <= this.questionCounter; qNumber++) {
      var index = this.allQuestions.findIndex(q => q.question_number == qNumber)
      this.allQuestions[index].question_number = qNumber - 1;
    }

    this.questionCounter--;
  }

  isMultiplechoice(question: any): boolean {
    if (question instanceof MultiplechoiceQuestion) {
      return true;
    }
    return false;
  }

  makeQuestionOpen(multiQuestion: MultiplechoiceQuestion) {
    var openQuestion = new OpenQuestion(0, 0, '', '', 5, 0);

    openQuestion.title = multiQuestion.title;
    openQuestion.description = multiQuestion.description;
    openQuestion.question_number = multiQuestion.question_number;

    this.updateList(openQuestion);
  }

  makeQuestionMulti(openQuestion: OpenQuestion) {
    var multiItems: MultiplechoiceItem[] = [];
    var multiquestion = new MultiplechoiceQuestion(0, 0, '', '', false, 0, multiItems);

    multiquestion.title = openQuestion.title;
    multiquestion.description = openQuestion.description;
    multiquestion.question_number = openQuestion.question_number;

    this.updateList(multiquestion);
  }

  updateList(question: any) {
    this.allQuestions.splice(this.allQuestions.findIndex(q => q.question_number == question.question_number), 1);
    this.allQuestions.push(question);
    this.allQuestions.sort((a, b) => (a.question_number > b.question_number) ? 1 : -1);
  }

  addAnswer(question: MultiplechoiceQuestion) {
    var multiItem = new MultiplechoiceItem(0, 0, '');
    question.multiplechoice_items.push(multiItem);
  }

  deleteAnswer(question: MultiplechoiceQuestion, index: number) {
    question.multiplechoice_items.splice(index, 1);
  }

  saveSurvey() {
    this.allQuestions.forEach(question => {
      if (question instanceof MultiplechoiceQuestion) {
        this.survey.multiplechoice_questions.push(question);
      } else if (question instanceof OpenQuestion) {
        this.survey.open_questions.push(question);
      }
    });

    this.participationService.addSurveyComplete(this.survey).subscribe({
      next: () => {
        this.router.navigate(['/participatie/dashboard'])
        this.alertService.success('Enquête toegevoegd.', 'Enquête succesvol aangemaakt.')
      },
      error: () => this.alertService.error('Er is iets misgelopen...', 'Enquête kon niet worden aangemaakt. Probeer het later opnieuw.')
    }
    );
  }
}
