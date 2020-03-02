import { FormControl } from '@angular/forms';

export function isCommaSeparated(name: string) {
    return (control: FormControl): {[key: string]: any} | null  => {
        const value: string = control.value;
        if (value.split(',') && value.split(',').length > 0) {
            return {
                [name]: {value: control.value}
            };
        }
        return null;
    };
}