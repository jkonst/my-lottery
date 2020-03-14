import { FormGroup } from '@angular/forms';

export function toFormData<T>( formValue: T ) {
    return Object.keys(formValue).reduce((a, c) => {
      a.append(c, formValue[c]);
      return a;
    }, new FormData());
}

export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}