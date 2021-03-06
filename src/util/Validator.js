class Validator {
  static checkEmailForm(target) {
    const rgx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return rgx.test(target);
  }

  static checkDateFormYYYYMMDDHHMM(date) {
    var rgx = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9])/;
    return rgx.test(date);
  }

  static isArray(target) {
    return Array.isArray(target);
  }

  static isArrayItemObj(target) {
    return !(target.some(value => !this.isObject(value)));
  }

  static isArrayItemStr(target) {
    return !(target.some((value) => !this.isStr(value)))
  }

  static isBoolean(target) {
    return typeof target === 'boolean';
  }

  static isNum(target) {
    return typeof target === 'number';
  }

  static isObject(target) {
    return target.constructor === Object;
  }

  static isStr(target) {
    return typeof target === 'string';
  }
}

export default Validator;