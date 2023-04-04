import express from 'express';
import { adminLogIn, getAllAdmin, createAdmin } from '../controller/admin-controller.js';
// import { authorizeUser } from '../middleware/authorization.js';
import validateRequest from '../middleware/validateRequest.js';
import { createAdminSchema, loginAdminSchema } from '../schema/admin-schema.js';

const router = express.Router();

//To Rrgister admin
// router.post('/create', validateRequest(createAdminSchema), createAdmin);

//To LogIn patient
router.post('/login', validateRequest(loginAdminSchema), adminLogIn);

// router.get('/getAll', getAllAdmin);

// router.get('/getById/:id', authorizeUser, getPatientById);

export default router;