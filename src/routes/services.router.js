import express from 'express';
import * as controller from '../controllers/services.controller.js';
import { validateBody, serviceSchema } from '../middlewares/validate.js';

const router = express.Router();

router.get('/', controller.getServices);
router.get('/:sid', controller.getServiceById);
router.post('/', validateBody(serviceSchema), controller.createService);
router.put('/:sid', validateBody(serviceSchema), controller.updateService);
router.delete('/:sid', controller.deleteService);

export default router;
