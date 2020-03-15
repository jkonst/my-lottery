import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Candidate } from '../model/candidate';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Status, Error } from '../model/response';

@Injectable({
  providedIn: 'root'
})
export class LotteryFormsService {

  private winnersSubject = new BehaviorSubject<Candidate[]>([]);
  winners$: Observable<Candidate[]> = this.winnersSubject.asObservable();
  private formSubmissionStatusSubject = new BehaviorSubject<Status>('INITIAL');
  formSubmissionStatus$: Observable<Status> = this.formSubmissionStatusSubject.asObservable();
  private errorSubject = new BehaviorSubject<Error>({code: -1, description: ''});
  error$: Observable<Error> = this.errorSubject.asObservable();

  constructor(private http: HttpClient) { }

  initialize() {
    this.formSubmissionStatusSubject.next('INITIAL');
    this.winnersSubject.next([]);
  }

  generateWinners(candidatesFormData) {
    this.formSubmissionStatusSubject.next('LOADING');
    this.http.post(`/api/winners`, candidatesFormData, {
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          if (event.status === 200) {
            // tslint:disable-next-line: no-string-literal
            const winners: string[] = event.body['winners'];
            this.winnersSubject.next(winners.map(w => ({ identifier: w })));
            this.formSubmissionStatusSubject.next('SUCCESS');
          } else { // error response
            // tslint:disable-next-line: no-string-literal
            this.error({code: event.status, description: event.body['message']});
          }
        }
      }, error => { // general error e.g. network etc.
        this.error({code: error.status, description: error.statusText});
      });
  }

  private error(error: Error) {
    this.formSubmissionStatusSubject.next('ERROR');
    this.winnersSubject.next([]);
    this.errorSubject.next(error);
  }
}
