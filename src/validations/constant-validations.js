const validationMessages = {
  name: "Please specify the name",
  dataType: "Please select the DataType",
  value: "Please specify the value"
};

export const validateRuleGroup = (attribute) => {
  return Object.keys(validationMessages).reduce((error, key) => {
    if (!attribute[key]) {
      error[key] = validationMessages[key];
    }
    return error;
  }, {});
};

export default function constantValidations(attribute) {
  return validateRuleGroup(attribute);
}
