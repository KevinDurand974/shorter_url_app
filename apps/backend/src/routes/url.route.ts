import { createShortUrl, deleteShortUrl, getShortUrl, updateUserUrlActive, updateUserUrlName } from '@models';
import { getDataSource } from 'datasource';
import { Router } from 'express';

const router = Router();

// NOTE: POST /api/v1/url - Create Short URL
router.post('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const newShortUrl = await createShortUrl(datasource, req.body);
    res.status(201).json({ status: 201, data: newShortUrl });
  } catch (err) {
    next(err);
  }
});

// NOTE: DELETE /api/v1/url - Delete Short URL
router.delete('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    await deleteShortUrl(datasource, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// NOTE: GET /api/v1/url - Get Short URL
router.get('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const url = await getShortUrl(datasource, req.body);
    res.status(200).json({ status: 200, data: url });
  } catch (err) {
    next(err);
  }
});

// NOTE: PUT /api/v1/url/active - Update url active
router.put('/active', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    await updateUserUrlActive(datasource, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// NOTE: PUT /api/v1/url/name - Update url name
router.put('/name', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    await updateUserUrlName(datasource, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
