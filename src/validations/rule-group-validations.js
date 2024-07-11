const validationMessages = {
  name: "Please specify the name",
  executionMethod: "Please select the execution method"
};

export const validateRuleGroup = (attribute) => {
  return Object.keys(validationMessages).reduce((error, key) => {
    if (!attribute[key]) {
      error[key] = validationMessages[key];
    }
    return error;
  }, {});
};

export default function ruleGroupValidations(attribute) {
  return validateRuleGroup(attribute);
}
