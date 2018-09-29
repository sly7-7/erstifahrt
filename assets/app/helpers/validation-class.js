import { helper } from '@ember/component/helper';

export function validationClass([validationType]/*, hash*/) {
  switch (validationType) {
    case 'error':
      return 'is-invalid';
    case 'success':
      return 'is-valid';
    case 'warning':
      return 'is-warning'; // not officially supported in BS4 :(
  }

  return '';
}

export default helper(validationClass);
