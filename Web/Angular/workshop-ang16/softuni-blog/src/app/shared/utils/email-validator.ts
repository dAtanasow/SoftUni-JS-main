import { ValidatorFn } from '@angular/forms';

export function emailValidator(domains: string[]): ValidatorFn {
  const domainStrings = domains.join('|');
  const regexp = new RegExp('[A-z0-9]+gmail.(${domainStrings})');
  return (control) => {
    const isEmailInvalid = control.value === '' || regexp.test(control.value);
    return isEmailInvalid ? null : { emailValidator: true };
  };
}
