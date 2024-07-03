const validationMessages = {
  name: "Please specify the attribute name",
  type: "Please specify the attribute type"
};

export const validateAttribute = (attribute) => {
  console.log(attribute);
  return Object.keys(validationMessages).reduce((error, key) => {
    if (!attribute[key]) {
      error[key] = validationMessages[key];
    }
    return error;
  }, {});
};

export default function attributeValidations(attribute) {
  return validateAttribute(attribute);
}
