// import { omit } from 'lodash';
import { create, getById, getAllPatient, logout } from '../service/patient-service.js';
import { validatePassword } from '../service/patient-service.js';
import { createSession, createAccessToken } from '../service/session-service.js';
import { sign } from '../utils/jwt-utils.js';
import config from '../config/config.js';

export async function createPatient(req, res) {
    try {
        const patient = await create(req.body);
        // return res.send(omit(patient.toJSON(), 'password'));
        return res.send(patient);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}

//Patient Login
export async function patientLogIn(req, res) {
    //validate email and password
    const patient = await validatePassword(req.body);
    if (!patient) {
        return res.status(401).send('Invalid Credentials');
    }

    //create session
    const session = await createSession(patient._id, req.get('user-agent') || '');

    // //create Access Token
    const accessToken = createAccessToken(patient, session);

    // console.log(accessToken);

    //Refresh Token
    // const sessionObj = {
    //     _id: session._id,
    //     userId: session.user,
    //     valid: session.valid,
    //     userAgent: session.userAgent,
    //     email: patient.email
    // };
    // const refreshToken = sign(sessionObj, {
    //     expiresIn: config.token.refreashTokenTtl
    // });

    return res.send({ accessToken });
}

export async function getPatientById(req, res) {
    try {
        const patient = await getById(req.params.id);
        return res.send(patient);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}

export async function getAllPatientHandler(req, res) {
    try {
        const doctors = await getAllPatient();
        return res.send(doctors);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}

export async function deletePatientHandler(req, res) {
    try {
        const user = await logout(req.params.id);
        return res.send(user);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}
