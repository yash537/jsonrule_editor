const validationMessages = {
  fact: "Please specify the fact",
  value: "Please specify the value",
  type: "Please specify the type",
  operator: "Please specify the operator",
  valueref: "Please specify the valueref",
  action: "Please specify the action"
};

export const validateDecision = (attribute) => {
  return Object.keys(validationMessages).reduce((error, key) => {
    if (!attribute[key]) {
      error[key] = validationMessages[key];
    }
    return error;
  }, {});
};

export default function decisionValidations(attribute) {
  return validateDecision(attribute);
}
