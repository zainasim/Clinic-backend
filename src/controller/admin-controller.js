import { create, validatePassword, getAll } from "../service/admin-service.js";
import { createAccessToken, createSession } from "../service/session-service.js";

export async function createAdmin(req, res) {
    try {
        const admin = await create(req.body);
        // return res.send(omit(patient.toJSON(), 'password'));
        return res.send(admin);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}

export async function adminLogIn(req, res) {
    //validate email and password
    const admin = await validatePassword(req.body);
    if (!admin) {
        return res.status(401).send('Invalid Credentials');
    }
    //create session
    const session = await createSession(admin._id, req.get('user-agent') || '');
    
    // //create Access Token
    const accessToken = createAccessToken(admin, session);

    return res.send({ accessToken });
}

export async function getAllAdmin(req, res) {
    try {
        const doctors = await getAll();
        return res.send(doctors);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}
