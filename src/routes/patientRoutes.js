const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { patientSchema } = require('../validators/schemas');
const {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

router.use(auth);

router.post('/', validate(patientSchema), createPatient);
router.get('/', getPatients);
router.get('/:id', getPatient);
router.put('/:id', validate(patientSchema), updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
