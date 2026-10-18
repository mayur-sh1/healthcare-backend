const { Mapping, Patient, Doctor } = require('../models');

const createMapping = async (req, res) => {
  const { patientId, doctorId } = req.body;

  const patient = await Patient.findOne({
    where: { id: patientId, createdBy: req.user.id },
  });
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  const doctor = await Doctor.findByPk(doctorId);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

  const existing = await Mapping.findOne({
    where: { PatientId: patientId, DoctorId: doctorId },
  });
  if (existing) {
    return res
      .status(409)
      .json({ message: 'Doctor is already assigned to this patient' });
  }

  const mapping = await Mapping.create({
    PatientId: patientId,
    DoctorId: doctorId,
  });
  res.status(201).json(mapping);
};

const getMappings = async (req, res) => {
  const mappings = await Mapping.findAll({
    include: [
      { model: Patient, where: { createdBy: req.user.id } },
      { model: Doctor },
    ],
    order: [['id', 'ASC']],
  });
  res.json(mappings);
};

const getDoctorsByPatient = async (req, res) => {
  const patient = await Patient.findOne({
    where: { id: req.params.patientId, createdBy: req.user.id },
  });
  if (!patient) return res.status(404).json({ message: 'Patient not found' });

  const mappings = await Mapping.findAll({
    where: { PatientId: patient.id },
    include: [Doctor],
  });
  res.json(mappings.map((m) => m.Doctor));
};

const deleteMapping = async (req, res) => {
  const mapping = await Mapping.findOne({
    where: { id: req.params.id },
    include: [{ model: Patient, where: { createdBy: req.user.id } }],
  });
  if (!mapping) return res.status(404).json({ message: 'Mapping not found' });

  await mapping.destroy();
  res.json({ message: 'Doctor removed from patient' });
};

module.exports = {
  createMapping,
  getMappings,
  getDoctorsByPatient,
  deleteMapping,
};
