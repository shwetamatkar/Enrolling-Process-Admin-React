import moment from "moment";
import { checkResolution } from "../util/fileService";
import constants from "../constants/constants";
import errorText from "../constants/errorText";

function isEmpty(val) {
  return val === undefined || val == null || val.length <= 0 || val === " "
    ? true
    : false;
}

function isNotEmpty(val) {
  return val === undefined || val == null || val.length <= 0 || val === " "
    ? false
    : true;
}

function validateMobile(number) {
  let valid = false;
  if (!isEmpty(number) && number.length === 10) {
    valid = true;
  }
  return valid;
}

function validateEmail(email) {
  let valid = false;
  const emailPatern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (emailPatern.test(email)) {
    valid = true;
  }
  return valid;
}

function validatePAN(panVal) {
  let valid = false;
  if (!isEmpty(panVal)) {
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regpan.test(panVal)) {
      valid = true;
    }
  }
  return valid;
}

function validateAadhar(aadhar) {
  let valid = false;
  if (aadhar.length === 12) {
    valid = true;
  }
  return valid;
}

function isFileEmpty(files) {
  let valid = false;
  if (files === null) {
    valid = true;
  }
  return valid;
}

function validateFile(files) {
  var valid = false;
  var resolution = checkResolution(files);

  if (
    resolution.width > constants.width &&
    resolution.height > constants.height
  ) {
    valid = true;
  }
  return valid;
}

function checkValidity(value, rules, referValue) {
  let isValid = true;
  let message = "";

  if (rules.required) {
    isValid = isNotEmpty(value) && isValid;
    if (!isValid) message = errorText.ERROR_EMPTY_FIELD;
  }

  if (rules.dateOfBirthCheck) {
    var years = moment().diff(value, "years", false);
    isValid =
      years >= constants.age.minAge && years < constants.age.maxAge && isValid;
    if (!isValid) message = errorText.INVALID_DATE_OF_BIRTH;
  }

  if (rules.doubleVerification) {
    isValid = value.toUpperCase() === referValue.toUpperCase() && isValid;
    if (!isValid && value.length === referValue.length) {
      message = errorText.INVALID_DOUBLE_VERIFICATION;
    }
  }

  if (rules.ifsc) {
    isValid = value.length === 11 && isValid;
  }

  if (rules.emailAddress) {
    isValid = validateEmail(value) && isValid;
  }

  if (rules.mobileNumber) {
    isValid = validateMobile(value) && isValid;
  }

  if (rules.aadharCard) {
    isValid = validateAadhar(value) && isValid;
  }

  if (rules.panCard) {
    isValid = validatePAN(value) && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return [isValid, message];
}

function checkFormValid(formRules) {
  let isValid = true;
  for (let key in formRules) {
    isValid = formRules[key].valid && isValid;
  }
  return isValid;
}

function checkFormValidForRequired(formRules, formData) {
  let isValid = true;
  for (let key in formRules) {
    if (formRules[key].validations.required) {
      isValid = formRules[key].valid && isNotEmpty(formData[key]) && isValid;
    }
  }
  return isValid;
}

export {
  isEmpty,
  validateMobile,
  isNotEmpty,
  validateEmail,
  validatePAN,
  validateAadhar,
  isFileEmpty,
  validateFile,
  checkValidity,
  checkFormValid,
  checkFormValidForRequired
};
