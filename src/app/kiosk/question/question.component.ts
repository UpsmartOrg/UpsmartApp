import { Component, Input, OnInit } from '@angular/core';
import { OpenAnswerAdd } from 'src/app/shared/models/open-answer-add.model';
import { MultiAnswerAdd } from 'src/app/shared/models/multi-answer-add.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() surveyID: any;
  @Input() question: any;
  @Input() multiItems: any;
  @Input() index!: number;

  answer!: any;
  options: number[] = [];
  itemCounter: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (this.question.rows) {
      this.answer = new OpenAnswerAdd(this.surveyID, this.question.id, '')
    }
    if (this.question.multiple_answers == 0) {
      this.answer = new MultiAnswerAdd(this.surveyID)
    }
  }

  addCheck(itemID: number) {
    if (this.options.includes(itemID)) {
      this.options.splice(this.options.indexOf(itemID), 1);
    } else {
      this.options.push(itemID)
    }
  }

}
