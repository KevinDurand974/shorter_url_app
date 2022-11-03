import { createUrl, deleteUrl } from '@models';
import { getDataSource } from '@libs/typeorm';
import { Router } from 'express';

const router = Router();

// NOTE: POST /api/v1/url - Create Short URL
/* router.post('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const newShortUrl = await createShortUrl(datasource, req.body);
    res.status(201).json({ status: 201, data: newShortUrl });
  } catch (err) {
    next(err);
  }
}); */

// NOTE: DELETE /api/v1/url - Delete Short URL
router.delete('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    await deleteUrl(datasource, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// NOTE: PUT /api/v1/url/active - Update url active
router.put('/active', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    // await updateUserUrlActive(datasource, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// NOTE: PUT /api/v1/url/name - Update url name
router.put('/name', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    // await updateUserUrlName(datasource, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
