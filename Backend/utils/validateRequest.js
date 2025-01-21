const validateRequest = (schema, data) => {
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => ({
      field: err.context.key,
      message: err.message,
    }));
    return { errors };
  }

  return { value };
};

module.exports = validateRequest;
