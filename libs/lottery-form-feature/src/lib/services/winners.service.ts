import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../model/candidate';
import { Error, Status } from '../model/response';
import { WinnersComponent } from '../winners/winners.component';

@Injectable({
  providedIn: 'any',
})
export class WinnersService {
  private formSubmissionStatusSubject = new BehaviorSubject<Status>('INITIAL');
  formSubmissionStatus$: Observable<Status> = this.formSubmissionStatusSubject.asObservable();
  private errorSubject = new BehaviorSubject<Error>({ code: -1, description: '' });
  error$: Observable<Error> = this.errorSubject.asObservable();

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  generateWinners(candidatesFormData: any) {
    this.formSubmissionStatusSubject.next('LOADING');
    this.http
      .post(`/api/winners`, candidatesFormData, {
        observe: 'events',
      })
      .subscribe({
        next: data => {
          if (data.type === HttpEventType.Response && data.status === 200) {
            const winners: string[] = data && data.body ? (data.body as any)['winners'] : [];
            this.openWinnersDialog(winners.map(w => ({ identifier: w })));
            this.formSubmissionStatusSubject.next('SUCCESS');
          }
        },
        error: error => {
          const errorMessage = error.error && error.error.message ? error.error.message : 'Network Issue';
          this.error({ code: error.status, description: error.statusText + ' - ' + errorMessage });
        },
      });
  }

  private openWinnersDialog(winners: Candidate[]): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = winners;
    dialogConfig.panelClass = 'lottery';
    this.dialog.open(WinnersComponent, dialogConfig);
  }

  private error(error: Error) {
    this.formSubmissionStatusSubject.next('ERROR');
    this.errorSubject.next(error);
  }
}
