import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { submitContact } from '../controllers/contact.controller.js';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many messages sent from this IP. Please try again after 15 minutes.' }
});

router.post('/', contactLimiter, submitContact);

export default router;
