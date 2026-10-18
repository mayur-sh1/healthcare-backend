const { Patient } = require('../models');

const findOwnPatient = (id, userId) =>
  Patient.findOne({ where: { id, createdBy: userId } });

const createPatient = async (req, res) => {
  const patient = await Patient.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(patient);
};

const getPatients = async (req, res) => {
  const patients = await Patient.findAll({
    where: { createdBy: req.user.id },
    order: [['id', 'ASC']],
  });
  res.json(patients);
};

const getPatient = async (req, res) => {
  const patient = await findOwnPatient(req.params.id, req.user.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });
  res.json(patient);
};

const updatePatient = async (req, res) => {
  const patient = await findOwnPatient(req.params.id, req.user.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  await patient.update(req.body);
  res.json(patient);
};

const deletePatient = async (req, res) => {
  const patient = await findOwnPatient(req.params.id, req.user.id);
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  await patient.destroy();
  res.json({ message: 'Patient deleted successfully' });
};

module.exports = {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
