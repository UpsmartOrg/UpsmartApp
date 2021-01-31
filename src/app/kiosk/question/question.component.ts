import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpenAnswerAdd } from 'src/app/shared/models/open-answer-add.model';
import { MultiAnswerAdd } from 'src/app/shared/models/multi-answer-add.model';
import { KioskService } from '../services/kiosk.service';

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
  @Output() stopLoading = new EventEmitter<Boolean>();

  answer!: any;
  options: number[] = [];
  itemCounter: number = 0;

  constructor(private kioskService: KioskService) { }

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

  saveAnswer() {
    if (this.question.multiple_answers == 1) {
      this.options.forEach(option => {
        const newAnswer = new MultiAnswerAdd(this.surveyID, option)
        console.log(newAnswer)
        this.kioskService.postMultiAnswer(newAnswer).subscribe(
          result => console.log(result),
          error => console.log(error),
          () => this.stopLoading.emit(true)
        )
      });
    }
    if (this.question.multiple_answers == 0) {
      this.kioskService.postMultiAnswer(this.answer).subscribe(
        result => console.log(result),
        error => console.log(error),
        () => this.stopLoading.emit(true)
      )
    }
    if (this.question.rows) {
      this.kioskService.postOpenAnswer(this.answer).subscribe(
        result => console.log(result),
        error => console.log(error),
        () => this.stopLoading.emit(true)
      )
    }
  }

}
