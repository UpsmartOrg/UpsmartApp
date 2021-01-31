import { Component, Input, OnInit } from '@angular/core';
import { OpenAnswerAdd } from 'src/app/shared/models/open-answer-add.model';
import { MultiAnswerAdd } from 'src/app/shared/models/multi-answer-add.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question: any;
  @Input() multiItems: any;
  @Input() index!: number;

  answer!: any;

  constructor() { }

  ngOnInit(): void {
    if (this.question.rows) {
      this.answer = new OpenAnswerAdd(1, this.question.id, '')
    } else {
      this.answer = new MultiAnswerAdd(1)
    }
    console.log(this.answer)
  }

}
