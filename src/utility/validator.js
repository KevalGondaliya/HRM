export default Validator = {
  validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  validatePassword(pwd) {
    var re = /(?=^.{8,20}$)/;
    return re.test(pwd);
  },
  validateNumber(num) {
    var re = /^-?(0|[1-9]\d*)(\.\d+)?$/;
    return re.test(num);
  },
  validateTextInput(input) {
    var re = /^[A-Za-z0-9 !@#%^&*$()_+-=[\\\]{}|;':\",.<>?~\\\/ `]+$/;
    return re.test(input);
  },
  validateGSTNumber(input) {
    var re = /^[A-Z0-9]+$/;
    return re.test(input);
  },
  validatePostalCode(value) {
    const regex = /^(?!000000|999999|-,)\d{6}$/; // regex that matches any 6-digit number except 000000 and 999999
    return regex.test(value);
  },
  validateAmount(num) {
    var re = /^[0-9.]+$/;
    return re.test(num);
  },
  validateOnlyNumber(num) {
    var re = /^[0-9]+$/;
    return re.test(num);
  },
  validateOnlyPhoneNumber(num) {
    var re = /^[0-9+]+$/;
    return re.test(num);
  },
  validateAlphabate(val) {
    var re = /^[A-z0-9]+$/;
    return re.test(val);
  },
  validateOnlyAlphabate(val) {
    var re = /^[A-z]+$/;
    return re.test(val);
  },

  validateIDNumber(num) {
    var re = /^[^\n]*[A-z0-9]+$/;
    ///^[^\n]*[BPJ]$
    return re.test(num);
  },
  validateOtherPattern(val) {
    var re = /^(?!999)\d{3}$/;
    return re.test(val);
  },
  validateSingaporePattern(val) {
    var re = /^(?!301)\d{3}$/;
    return re.test(val);
  },
  validateIDNumber(num) {
    var re = /^[^\n]*[A-z0-9]+$/;
    ///^[^\n]*[BPJ]$
    return re.test(num);
  },
};

export function padNumber(num) {
  if (!num) return "000000000";
  let s = String(num);
  let number = s.replace('.', '');
  while (number.length < 9) {
    number = "0" + number;
  }
  return number;
}
