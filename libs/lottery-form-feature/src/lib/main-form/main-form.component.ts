import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Error, Status } from '@jkonst/lottery-form-models';
import { FormValidatorService } from '../services/form-validator.service';
import { WinnersService } from '../services/winners.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent implements OnInit, OnDestroy {
  formStatus$: Observable<Status>;
  formError$: Observable<Error>;
  candidatesForm: FormGroup;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: WinnersService,
    private router: Router,
    private validator: FormValidatorService,
  ) {
    this.formStatus$ = this.service.formSubmissionStatus$;
    this.formError$ = this.service.error$;
    this.candidatesForm = this.initForm();
  }

  ngOnInit() {
    this.formStatus$
      .pipe(
        takeUntil(this.destroy$),
        filter(status => status === 'SUCCESS'),
      )
      .subscribe(_ => (this.candidatesForm = this.initForm()));
  }

  submit() {
    this.service.generateWinners(this.validator.toFormData(this.candidatesForm.value));
  }

  private initForm(): FormGroup {
    return this.fb.group(
      {
        winnersNo: [
          1,
          [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.maxLength(5)],
        ],
        toggleCSV: [true],
        csv: [null, this.validator.isCSVFileType()],
        candidates: [null, [this.validator.isCommaSeparated()]],
      },
      {
        validators: [
          this.validator.noMoreWinnersThanCandidates('winnersNo', 'candidates'),
          this.validator.requiredFields('toggleCSV', 'csv', 'candidates'),
        ],
      },
    );
  }

  toggle(event: MatSlideToggleChange) {
    if (event.checked) {
      this.candidatesForm.get('candidates')?.setValue(null);
    } else {
      this.candidatesForm.get('csv')?.setValue(null);
    }
    this.candidatesForm.get('toggleCSV')?.setValue(event.checked);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
