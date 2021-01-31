import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MultiplechoiceItemAdd } from 'src/app/shared/models/multiplechoice-item-add.model';
import { MultiplechoiceQuestionAdd } from 'src/app/shared/models/multiplechoice-question-add.model';
import { OpenQuestionAdd } from 'src/app/shared/models/open-question-add.model';
import { SurveyAdd } from 'src/app/shared/models/survey-add.model';
import { ParticipationService } from '../services/participation.service';

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {

  questionCounter: number = 0;
  survey!: SurveyAdd;
  surveyID: number;
  allQuestions: any[] = [];


  constructor(private participationService: ParticipationService, private dialog: MatDialog, private router: Router, private activeRoute: ActivatedRoute) {
    this.surveyID = this.activeRoute.snapshot.params['surveyID'];
    this.participationService.getSurveyComplete(this.surveyID).subscribe(
      result => this.survey = result,
      error => console.log('error'),
      () => this.setupQuestions()
    );
  }

  ngOnInit(): void {
  }

  setupQuestions() {
    this.questionCounter = this.survey.multiplechoice_questions.length + this.survey.open_questions.length;

    this.survey.multiplechoice_questions.forEach(question => this.allQuestions.push(question));
    this.survey.multiplechoice_questions = []

    this.survey.open_questions.forEach(question => this.allQuestions.push(question));
    this.survey.open_questions = [];

    this.allQuestions.sort((a, b) => a.question_order - b.question_order);
  }

  addQuestion() {
    this.questionCounter++;
    var question = new OpenQuestionAdd(this.surveyID, '', '', 5, this.questionCounter);
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
    var openQuestion = new OpenQuestionAdd(this.surveyID, '', '', 5, 0);

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
    var multiquestion = new MultiplechoiceQuestionAdd(this.surveyID, '', '', false, 0, []);

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
      if (!this.isOpenQuestion(question)) {
        this.survey.multiplechoice_questions.push(question);
      } else if (this.isOpenQuestion(question)) {
        this.survey.open_questions.push(question);
      }
    });

    this.participationService.updateSurveyComplete(this.survey).subscribe(
      () => this.router.navigate(['/participatie/dashboard'])
    );
  }

}
