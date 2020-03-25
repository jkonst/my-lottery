import { FormControl, ValidationErrors } from '@angular/forms';

export function isCommaSeparated(name: string) {
    return (control: FormControl) => {
        const value = control.value;
        if (value) {
            if (value.split(',') && value.split(',').length > 1) {
                if (value.split(',').length > 99999) {
                    return {
                        [name]: false
                    };
                }
                // valid
                return null;
            }
            return {
                [name]: false
            };
        }
        return {
            [name]: false
        };
    };
}
