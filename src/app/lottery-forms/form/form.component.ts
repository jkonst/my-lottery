import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/shared/requiredFileType';
import { isCommaSeparated } from 'src/app/shared/isCommaSeparated';
import { toFormData } from 'src/app/shared/formUtils';
import { Status, Error } from 'src/app/model/response';
import { LotteryFormsService } from '../lottery-forms.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  formStatus$: Observable<Status>;
  formError$: Observable<Error>;
  candidatesForm: FormGroup;
  useFileInsteadOfText = true;
  private readonly destroy$ = new Subject();

  constructor(private fb: FormBuilder, private service: LotteryFormsService, private router: Router) { }

  ngOnInit() {
    this.service.initialize();
    this.setForm();
    this.formError$ = this.service.error$;
    this.formStatus$ = this.service.formSubmissionStatus$;
    this.formStatus$.pipe(takeUntil(this.destroy$), filter(s => s === 'SUCCESS'))
      .subscribe(_ => this.router.navigateByUrl('/winners'));
  }

  submit() {
    this.service.generateWinners(toFormData(this.candidatesForm.value));
  }

  private setForm() {
    this.candidatesForm = this.fb.group({
      winnersNo: new FormControl(1, [Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(1),
      Validators.maxLength(5)]),
      toggleCSV: new FormControl(this.useFileInsteadOfText),
      csv: new FormControl(null, [Validators.required, requiredFileType('csv')])
    });
  }

  private updateForm() {
    if (this.useFileInsteadOfText) {
      this.candidatesForm.removeControl('candidates');
      this.candidatesForm.addControl('csv', new FormControl(null, [Validators.required, requiredFileType('csv')]));
    } else {
      this.candidatesForm.addControl('candidates', new FormControl(null, [Validators.required, isCommaSeparated('candidates')]));
      this.candidatesForm.removeControl('csv');
    }
  }

  toggle(event) {
    this.useFileInsteadOfText = event.checked;
    this.updateForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
