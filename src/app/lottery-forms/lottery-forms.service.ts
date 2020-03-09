import { tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Candidate } from '../model/candidate';

@Injectable({
  providedIn: 'root'
})
export class LotteryFormsService {

  private winnersSubject = new BehaviorSubject<Candidate[]>([]);
  winners$: Observable<Candidate[]> = this.winnersSubject.asObservable();

  constructor() { }

  generateWinners(candidatesRequest) {
    this.postCandidates(candidatesRequest).pipe(
      tap((res) => console.log(res))
    ).subscribe();
  }

  private postCandidates(candidatesRequest): Observable<any> {
    return fromPromise(fetch(`/api/winners`, {
      method: 'POST',
      body: JSON.stringify(candidatesRequest),
      headers: {
        'content-type': 'application/json'
      }
    }));
  }
}
