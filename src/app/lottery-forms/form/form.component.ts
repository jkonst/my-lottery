import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/shared/requiredFileType';
import { isCommaSeparated } from 'src/app/shared/isCommaSeparated';
import { toFormData } from 'src/app/shared/formUtils';
import { Status } from 'src/app/model/status';
import { LotteryFormsService } from '../lottery-forms.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  formStatus$: Observable<Status>;
  candidatesForm: FormGroup;
  private readonly destroy$ = new Subject();

  constructor(private fb: FormBuilder, private service: LotteryFormsService, private router: Router) { }

  ngOnInit() {
    this.service.initialize();
    this.candidatesForm = this.fb.group({
      winnersNo: new FormControl(1, [Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(1),
      Validators.maxLength(5)]),
      candidates: new FormControl(null, [Validators.required, isCommaSeparated('candidates')]),
      csv: new FormControl(null, [Validators.required, requiredFileType('csv')])
    });
    this.formStatus$ = this.service.formSubmissionStatus$;
    this.formStatus$.pipe(takeUntil(this.destroy$))
                    .subscribe(status => {
                      if (status === 'SUCCESS') {
                        this.router.navigateByUrl('/winners');
                      } else if (status === 'ERROR') {
                        this.candidatesForm.reset();
                        // TODO: show error message
                      }
                    });
  }

  submit() {
    this.service.generateWinners(toFormData(this.candidatesForm.value));
  }

  ngOnDestroy() {

  }

}
