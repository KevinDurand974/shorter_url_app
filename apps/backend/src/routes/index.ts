import { Router } from 'express';
import userRoute from './user.route';
import urlRoute from './url.route';

const router = Router();

// NOTE: User route
router.use('/user', userRoute);

// NOTE: Short URL route
router.use('/url', urlRoute);

export default router;
