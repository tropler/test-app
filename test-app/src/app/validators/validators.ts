import {
  FormGroup,
  ValidatorFn,
  AbstractControl,
  Validators,
} from '@angular/forms';

export function addressEqualityValidator(form: FormGroup): ValidatorFn | null {
  return (control: AbstractControl) => {
    const postAddress = form.get('postAddress').value;
    const factAddress = form.get('factAddress').value;

    if (postAddress === '' && factAddress === '')
      return { other: 'Адреса не заполнены!' };

    const isAddressesEqual = postAddress === factAddress;

    return (control.value && isAddressesEqual) ||
      (!control.value && !isAddressesEqual)
      ? null
      : { other: 'Чекбокс выбран неверно!' };
  };
}

export function innValidator(field: AbstractControl): Validators | null {
  const inn = field.value;

  if (/^\d+$/.test(inn) === false) {
    return { other: 'Неверное значение ИНН!' };
  }

  if (inn.length === 10) {
    if (
      inn.charAt(9) ==
      ((2 * inn.charAt(0) +
        4 * inn.charAt(1) +
        10 * inn.charAt(2) +
        3 * inn.charAt(3) +
        5 * inn.charAt(4) +
        9 * inn.charAt(5) +
        4 * inn.charAt(6) +
        6 * inn.charAt(7) +
        8 * inn.charAt(8)) %
        11) %
        10
    ) {
      return null;
    } else {
      return { other: 'Неверное значение ИНН!' };
    }
  } else if (inn.length === 12) {
    if (
      inn.charAt(10) ==
        ((7 * inn.charAt(0) +
          2 * inn.charAt(1) +
          4 * inn.charAt(2) +
          10 * inn.charAt(3) +
          3 * inn.charAt(4) +
          5 * inn.charAt(5) +
          9 * inn.charAt(6) +
          4 * inn.charAt(7) +
          6 * inn.charAt(8) +
          8 * inn.charAt(9)) %
          11) %
          10 &&
      inn.charAt(11) ==
        ((3 * inn.charAt(0) +
          7 * inn.charAt(1) +
          2 * inn.charAt(2) +
          4 * inn.charAt(3) +
          10 * inn.charAt(4) +
          3 * inn.charAt(5) +
          5 * inn.charAt(6) +
          9 * inn.charAt(7) +
          4 * inn.charAt(8) +
          6 * inn.charAt(9) +
          8 * inn.charAt(10)) %
          11) %
          10
    ) {
      return null;
    } else {
      return { other: 'Неверное значение ИНН!' };
    }
  }

  return { other: 'Неверное значение ИНН!' };
}

export function kppValidator(field: AbstractControl): Validators | null {
  const kpp: string = field.value;
  const regExpKppCode = /^\d{4}\w{2}\d{3}$/;
  const regExpZeroStr = /^0*$/;

  return regExpKppCode.test(kpp) === true && regExpZeroStr.test(kpp) === false
    ? null
    : { other: 'Неверное значение КПП!' };
}
