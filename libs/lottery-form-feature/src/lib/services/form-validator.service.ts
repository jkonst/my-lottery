import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'any',
})
export class FormValidatorService {
  private MIN_COMMA_SEP_LENGTH = 1;
  private MAX_COMMA_SEP_LENGTH = 99999;

  toFormData<T>(formValue: T): FormData {
    return Object.keys(formValue).reduce((a, c) => {
      a.append(c, (formValue as any)[c]);
      return a;
    }, new FormData());
  }

  isCommaSeparated(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control?.value;
      if (value) {
        const commaSeparatedValues = value?.split(',');
        const validValues = this.validateEmptyStrings(commaSeparatedValues);
        if (commaSeparatedValues?.length > this.MIN_COMMA_SEP_LENGTH && validValues) {
          // valid
          if (commaSeparatedValues?.length > this.MAX_COMMA_SEP_LENGTH) {
            // max entries violation
            return {
              maxCandidatesViolation: true,
            };
          }
          return null;
        } else {
          return {
            noCommaSeparated: true,
          };
        }
      }
      return null;
    };
  }

  isCSVFileType(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control?.value;
      if (value) {
        const extension = value.name.split('.')[1].toLowerCase();
        if (extension.toLowerCase() !== 'csv') {
          return {
            noCSVExtension: true,
          };
        } else {
          // valid
          return null;
        }
      }
      return null;
    };
  }

  noMoreWinnersThanCandidates(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const winnersNo = formGroup?.get(controlName1)?.value;
      const candidates = formGroup?.get(controlName2)?.value;
      if (winnersNo && candidates) {
        const candidatesNo = candidates.split(',')?.length;
        if (winnersNo > candidatesNo) {
          return {
            winnersExceedCandidates: true,
          };
        }
        return null;
      }
      return null;
    };
  }

  requiredFields(controlName1: string, controlName2: string, controlName3: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const csvSelected = formGroup?.get(controlName1)?.value;
      const csv = formGroup?.get(controlName2)?.value;
      const candidates = formGroup?.get(controlName3)?.value;
      if (csvSelected) {
        if (!csv) {
          return {
            noCSV: true,
          };
        }
        return null;
      } else {
        if (!candidates) {
          return {
            noCandidates: true,
          };
        }
        return null;
      }
    };
  }

  private validateEmptyStrings(commaSeparatedValues: string[]): boolean {
    return commaSeparatedValues.map(v => v.trim()).filter(v => v.length === 0).length === 0;
  }
}
