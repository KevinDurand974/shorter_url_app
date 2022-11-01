import { Router } from 'express';
import userRoute from './user.route';
import urlRoute from './url.route';
import urlRedirect from './redirect.route';

const router = Router();

// NOTE: User route
router.use('/user', userRoute);

// NOTE: Short URL route
router.use('/url', urlRoute);

// NOTE: Redirect route
router.use('/redirect', urlRedirect);

export default router;
