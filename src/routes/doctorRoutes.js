const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { doctorSchema } = require('../validators/schemas');
const {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');

router.use(auth);

router.post('/', validate(doctorSchema), createDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctor);
router.put('/:id', validate(doctorSchema), updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;
