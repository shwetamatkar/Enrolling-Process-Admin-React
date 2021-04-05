function disableFieldCheck(status) {
  let result = true;
  if (["PENDING", "REJECTED", null].includes(status)) {
    result = false;
  }
  return result;
}

function submitCheck(status) {
  return ["PENDING", "APPROVED"].includes(status);
}

export { disableFieldCheck, submitCheck };
