import { Router } from 'express';
import { getDataSource } from '@libs/typeorm';
import { getShortUrl } from '@models';

const router = Router();

// NOTE: GET /api/v1/redirect - Get Short URL
router.get('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const url = await getShortUrl(datasource, req.body);
    res.status(200).json({ status: 200, data: url });
  } catch (err) {
    next(err);
  }
});

export default router;
