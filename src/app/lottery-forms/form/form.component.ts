import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/shared/requiredFileType';
import { isCommaSeparated } from 'src/app/shared/isCommaSeparated';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  progress = 0;
  candidatesForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.candidatesForm = this.fb.group({
      winnersNo: new FormControl(0, [Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(5)]),
      candidates: new FormControl(null, [Validators.required, isCommaSeparated('candidates')]),
      csv: new FormControl(null, [Validators.required, requiredFileType('csv')])
    });
  }

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  submit() {
    console.log('candidates form submitted');
    if (!this.candidatesForm.valid) {
      console.log('Something went wrong');
    }
  }

}
