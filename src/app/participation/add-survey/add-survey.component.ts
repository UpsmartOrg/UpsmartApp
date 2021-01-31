import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WarningDialogComponent } from 'src/app/shared/dialogs/warning-dialog/warning-dialog.component';
import { MultiplechoiceItemAdd } from 'src/app/shared/models/multiplechoice-item-add.model';
import { MultiplechoiceQuestionAdd } from 'src/app/shared/models/multiplechoice-question-add.model';
import { OpenQuestionAdd } from 'src/app/shared/models/open-question-add.model';
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

  allQuestions: any[] = [];

  constructor(private participationService: ParticipationService, private dialog: MatDialog, private router: Router) {
    this.survey = new SurveyAdd(1, '', '', new Date(), new Date(), [], []);
  }

  ngOnInit(): void {
  }

  addQuestion() {
    this.questionCounter++;
    var question = new OpenQuestionAdd(0, '', '', 5, this.questionCounter);
    this.allQuestions.push(question);
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
    this.allQuestions.forEach(question => {
      if(question instanceof MultiplechoiceQuestionAdd) {
        this.survey.multiplechoice_questions.push(question);
      }else if (question instanceof OpenQuestionAdd) {
        this.survey.open_questions.push(question);
      }
    });

    this.participationService.addSurveyComplete(this.survey).subscribe(
      () => this.router.navigate(['/participatie/dashboard'])
    );
  }

  questionErrorCheck(): boolean {
    var errorCount = 0;
    var errorMessages = "";
    this.allQuestions.forEach(question => {
      if(!question.title) {
        errorCount++;
        errorMessages += "Vul een naam in voor vraag " + question.question_order;
      }
    });

    return true;
  }
}
