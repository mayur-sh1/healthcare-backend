const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const patientSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  age: Joi.number().integer().min(0).max(120).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  phone: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
});

const doctorSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  specialization: Joi.string().required(),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().allow('', null),
});

const mappingSchema = Joi.object({
  patientId: Joi.number().integer().required(),
  doctorId: Joi.number().integer().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  patientSchema,
  doctorSchema,
  mappingSchema,
};
