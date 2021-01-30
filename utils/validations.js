const Joi = require("joi");

const joiValidate = (joiSchema, bodyData) => {
  const schema = Joi.object(joiSchema);
  return schema.validate(bodyData);
};

const projectSchemaValidation = (body) =>
  joiValidate(
    {
      projectName: Joi.string().min(3).required(),
      imgUrl: Joi.string().min(3),
      tagline: Joi.string().min(3).required(),
      description: Joi.string().min(3).required(),
      technologies: Joi.array().items(Joi.string()).min(1).required(),
      liveLink: Joi.string().min(3).required(),
      githubLink: Joi.string().min(3).required(),
    },
    body
  );

const userSchemaValidation = (body) =>
  joiValidate(
    {
      username: Joi.string().min(3).required(),
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
    body
  );

const userLoginSchemaValidation = (body) =>
  joiValidate(
    {
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    },
    body
  );

module.exports.projectSchemaValidation = projectSchemaValidation;
module.exports.userSchemaValidation = userSchemaValidation;
module.exports.userLoginSchemaValidation = userLoginSchemaValidation;
