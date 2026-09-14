import express from 'express';
import * as controller from '../controllers/views.controller.js';

const router = express.Router();

router.get('/services', controller.renderServices);
router.get('/availability', controller.renderAvailability);

export default router;
