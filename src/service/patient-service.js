import Patient from "../model/patient-model.js";
import Session from "../model/session-model.js";


export async function create(input) {
    try {
        return await Patient.create(input);
    } catch (error) {
        throw new Error(error.message);
    }
}

//For Login
export async function validatePassword({ email, password }) {
    try {
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return false;
        }

        const isValid = await patient.comparepassword(password);
        if (!isValid) {
            return false;
        }

        return patient;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getById(id) {
    try {
        return await Patient.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getAllPatient() {
    try {
        return await Patient.find();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function logout(id) {
    try {
        return await Session.deleteOne({ _id: id });
    } catch (error) {
        throw new Error(error.message);
    }
}
