import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    SharedModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports: [FormComponent]
})
export class LotteryFormsModule { }
