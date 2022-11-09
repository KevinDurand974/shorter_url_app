import { Router } from 'express';
import { getDataSource } from '@libs/typeorm';

const router = Router();

// NOTE: GET /api/v1/redirect - Get Short URL
router.get('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    // const url = await getShortUrl(datasource, req.body);
    res.status(200).json({ status: 200 });
  } catch (err) {
    next(err);
  }
});

export default router;
