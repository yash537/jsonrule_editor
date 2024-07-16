const validationMessages = {
  name: "Please specify the name",
  dataType: "Please select the DataType"
};

export const validateKey = (attribute) => {
  return Object.keys(validationMessages).reduce((error, key) => {
    if (!attribute[key]) {
      error[key] = validationMessages[key];
    }
    return error;
  }, {});
};

export default function keyValidations(attribute) {
  return validateKey(attribute);
}
