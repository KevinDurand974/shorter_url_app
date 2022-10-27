import {
  createUser,
  getUserByUuid,
  removeUserByUuid,
  updateUserEmail,
  updateUserPassword,
  updateUserPseudo,
  updateUserVip,
} from '@models';
import { getDataSource } from 'datasource';
import { Router } from 'express';

const router = Router();

// NOTE: POST /api/v1/user - Create User
router.post('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const newUser = await createUser(datasource, req.body);
    res.status(201).json({ status: 201, data: newUser });
  } catch (err) {
    next(err);
  }
});

// NOTE: DELETE /api/v1/user - Delete User with UUID
router.post('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    await removeUserByUuid(datasource, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// NOTE: GET /api/v1/user - Get User with UUID
router.get('/', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const user = await getUserByUuid(datasource, req.body);
    res.status(200).json({ status: 200, data: user });
  } catch (err) {
    next(err);
  }
});

// NOTE: PUT /api/v1/user/email - Update User Email
router.put('/email', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const updatedUser = await updateUserEmail(datasource, req.body);
    res.status(200).json({ status: 200, data: updatedUser });
  } catch (err) {
    next(err);
  }
});

// NOTE: PUT /api/v1/user/password - Update User Password
router.put('/password', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const updatedUser = await updateUserPassword(datasource, req.body);
    res.status(200).json({ status: 200, data: updatedUser });
  } catch (err) {
    next(err);
  }
});

// NOTE: PUT /api/v1/user/pseudo - Update User Pseudo
router.put('/pseudo', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    const user = await updateUserPseudo(datasource, req.body);
    res.status(200).json({ status: 200, data: user });
  } catch (err) {
    next(err);
  }
});

// NOTE: PUT /api/v1/user/vip - Update User VIP
router.put('/vip', async (req, res, next) => {
  try {
    const datasource = await getDataSource();
    await updateUserVip(datasource, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
