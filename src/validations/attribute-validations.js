const validationMessages = {
  name: "Please specify the attribute name",
  type: "Please specify the attribute type"
};

const validationMessagesForRule = {
  name: "Please specify the attribute name"
};

const validateAttribute = (attribute, messages) => {
  return Object.keys(messages).reduce((errors, key) => {
    if (!attribute[key]) {
      errors[key] = messages[key];
    }
    return errors;
  }, {});
};

export const attributeValidations = (attribute) => {
  return validateAttribute(attribute, validationMessages);
};

export const attributeValidationsForRules = (attribute) => {
  return validateAttribute(attribute, validationMessagesForRule);
};
