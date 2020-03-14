import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Candidate } from '../model/candidate';
import { HttpClient, HttpEventType, HttpEvent } from '@angular/common/http';
import { Status } from '../model/status';

@Injectable({
  providedIn: 'root'
})
export class LotteryFormsService {

  private winnersSubject = new BehaviorSubject<Candidate[]>([]);
  winners$: Observable<Candidate[]> = this.winnersSubject.asObservable();
  private formSubmissionStatusSubject = new BehaviorSubject<Status>('INITIAL');
  formSubmissionStatus$: Observable<Status> = this.formSubmissionStatusSubject.asObservable();

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
        console.log(event);
        if (event.type === HttpEventType.Response) {
          if (event.status === 200) {
            // tslint:disable-next-line: no-string-literal
            const winners: string[] = event.body['winners'];
            this.winnersSubject.next(winners.map(w => ({ identifier: w })));
            this.formSubmissionStatusSubject.next('SUCCESS');
          } else {
            this.error();
          }
        }
      }, error => this.error());
  }

  private error() {
    this.formSubmissionStatusSubject.next('ERROR');
    this.winnersSubject.next([]);
  }
}
