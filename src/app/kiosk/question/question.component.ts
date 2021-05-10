import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpenAnswerAdd } from 'src/app/shared/models/open-answer-add.model';
import { MultiAnswerAdd } from 'src/app/shared/models/multi-answer-add.model';
import { KioskService } from '../services/kiosk.service';
import { AlertService } from 'src/app/shared/alert/services/alert.service';

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
  @Output() stopLoading = new EventEmitter<boolean>();

  answer!: any;
  options: number[] = [];
  itemCounter: number = 0;

  constructor(private kioskService: KioskService, private alertService: AlertService) { }

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
        this.kioskService.postMultiAnswer(newAnswer).subscribe({
          next: () => this.stopLoading.emit(true),
          error: () => this.alertService.error('Er is iets misgelopen...', 'Antwoord kon niet worden geregistreerd. Probeer het later opnieuw.')
        }
        )
      });
    }
    if (this.question.multiple_answers == 0) {
      this.kioskService.postMultiAnswer(this.answer).subscribe({
        next: () => this.stopLoading.emit(true),
        error: () => this.alertService.error('Er is iets misgelopen...', 'Antwoord kon niet worden geregistreerd. Probeer het later opnieuw.')
      }
      )
    }
    if (this.question.rows) {
      this.kioskService.postOpenAnswer(this.answer).subscribe({
        next: () => this.stopLoading.emit(true),
        error: () => this.alertService.error('Er is iets misgelopen...', 'Antwoord kon niet worden geregistreerd. Probeer het later opnieuw.')
      }
      )
    }
  }

}
