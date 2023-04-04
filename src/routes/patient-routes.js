import express from 'express';
import { createPatient, getPatientById, patientLogIn, getAllPatientHandler, deletePatientHandler } from '../controller/patient-controller.js';
import { authorizeUser } from '../middleware/authorization.js';
import validateRequest from '../middleware/validateRequest.js';
import { createPatientSchema, getById, loginPatientSchema } from '../schema/patient-schema.js'

const router = express.Router();

//To Rrgister patient
router.post('/create', validateRequest(createPatientSchema), createPatient);

//To LogIn patient
router.post('/login', validateRequest(loginPatientSchema), patientLogIn);

router.get('/getById/:id', authorizeUser, getPatientById);

router.get('/getAll', getAllPatientHandler);

router.delete('/logout/:id', deletePatientHandler);

export default router;