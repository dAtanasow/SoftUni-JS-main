import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControl: string,
  rePasswordControl: string
): ValidatorFn {
  return (control) => {
    const pass1 = control.get(passwordControl);
    const pass2 = control.get(rePasswordControl);
    const areMatching = pass1?.value === pass2?.value;
    return areMatching ? null : { matchPasswordsValidator: true };
  };
}
