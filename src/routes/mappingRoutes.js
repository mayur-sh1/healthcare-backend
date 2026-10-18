const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { mappingSchema } = require('../validators/schemas');
const {
  createMapping,
  getMappings,
  getDoctorsByPatient,
  deleteMapping,
} = require('../controllers/mappingController');

router.use(auth);

router.post('/', validate(mappingSchema), createMapping);
router.get('/', getMappings);
router.get('/:patientId', getDoctorsByPatient);
router.delete('/:id', deleteMapping);

module.exports = router;
