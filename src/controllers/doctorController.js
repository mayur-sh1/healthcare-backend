const { Doctor } = require('../models');

const createDoctor = async (req, res) => {
  const doctor = await Doctor.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(doctor);
};

const getDoctors = async (req, res) => {
  const doctors = await Doctor.findAll({ order: [['id', 'ASC']] });
  res.json(doctors);
};

const getDoctor = async (req, res) => {
  const doctor = await Doctor.findByPk(req.params.id);
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.json(doctor);
};

const updateDoctor = async (req, res) => {
  const doctor = await Doctor.findOne({
    where: { id: req.params.id, createdBy: req.user.id },
  });
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

  await doctor.update(req.body);
  res.json(doctor);
};

const deleteDoctor = async (req, res) => {
  const doctor = await Doctor.findOne({
    where: { id: req.params.id, createdBy: req.user.id },
  });
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

  await doctor.destroy();
  res.json({ message: 'Doctor deleted successfully' });
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
