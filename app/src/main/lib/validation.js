
exports.schemaValidationWrapper = (schema, value, options) => {
  const valid = schema.validate(value, options);
  if (valid.error) throw valid.error;
  return valid;
}