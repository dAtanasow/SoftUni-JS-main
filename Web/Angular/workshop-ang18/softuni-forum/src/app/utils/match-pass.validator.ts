import { ValidatorFn } from '@angular/forms';

export function matchPassValidator(
  password: string,
  rePassword: string
): ValidatorFn {
  return (control) => {
    const pass = control.get(password);
    const rePass = control.get(rePassword);
    const areMatching = pass === rePass;
    return areMatching ? null : { matchPassValidator: true };
  };
}
