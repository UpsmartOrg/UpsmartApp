import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';
import { MultiAnswerAdd } from 'src/app/shared/models/multi-answer-add.model';
import { MultiplechoiceItem } from 'src/app/shared/models/multiplechoice-item.model';
import { MultiplechoiceQuestion } from 'src/app/shared/models/multiplechoice-question.model';
import { OpenAnswerAdd } from 'src/app/shared/models/open-answer-add.model';
import { OpenQuestion } from 'src/app/shared/models/open-question.model';
import { Survey } from 'src/app/shared/models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class KioskService {

  constructor(private http: HttpClient) { }

  private url = "http://smartcityapi.seppealaerts.be/api";

  getSurveys(): Observable<Survey[]> {
    return this.http.get<Survey[]>(this.url + '/surveys');
  }

  getSurvey(surveyID: number): Observable<Survey> {
    return this.http.get<Survey>(this.url + '/surveys/' + surveyID);
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.url + '/information');
  }

  getMessage(messageID: number): Observable<Message> {
    return this.http.get<Message>(this.url + '/information/' + messageID);
  }

  getOpenQuestions(surveyID: number): Observable<OpenQuestion[]> {
    return this.http.get<OpenQuestion[]>(this.url + '/open_questions/from-survey/' + surveyID);
  }

  getMultiQuestions(surveyID: number): Observable<MultiplechoiceQuestion[]> {
    return this.http.get<MultiplechoiceQuestion[]>(this.url + '/multi_questions/from-survey/' + surveyID);
  }

  getMultiItems(questionID: number): Observable<MultiplechoiceItem[]> {
    return this.http.get<MultiplechoiceItem[]>(this.url + '/multi_items/from-question/' + questionID);
  }

  postOpenAnswer(answer: OpenAnswerAdd): Observable<OpenAnswerAdd> {
    return this.http.post<OpenAnswerAdd>(this.url + '/answers', answer);
  }

  postMultiAnswer(answer: MultiAnswerAdd): Observable<MultiAnswerAdd> {
    return this.http.post<MultiAnswerAdd>(this.url + '/answers', answer);
  }

}
