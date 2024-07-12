const validationMessages = {
  name: "Please specify the name"
};

export const validateRuleGroup = (attribute) => {
  return Object.keys(validationMessages).reduce((error, key) => {
    if (!attribute[key]) {
      error[key] = validationMessages[key];
    }
    return error;
  }, {});
};

export default function createRuleValidations(attribute) {
  return validateRuleGroup(attribute);
}
