const validationMessages = {
  fact: "Please specify the fact",
  constant: "Please select the constant",
  operator: "Please specify the operator",
  action: "Please specify the action valye"
};

export const validateCondition = (attribute) => {
  return Object.keys(validationMessages).reduce((error, key) => {
    if (!attribute[key]) {
      error[key] = validationMessages[key];
    }
    return error;
  }, {});
};

export default function conditionValidations(attribute) {
  return validateCondition(attribute);
}
