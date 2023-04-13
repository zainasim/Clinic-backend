import Patient from "../model/patient-model.js";
import Session from "../model/session-model.js";
import { ObjectId } from 'mongodb';

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

export async function getDoctorInfo(patient_id) {
    try {         
        const response = [];
        const patient = await Patient.aggregate([
            {
              $match: { _id: new ObjectId(patient_id) },
            },
            {
              $lookup: {
                from: 'doctors',
                localField: 'doctorIds',
                foreignField: '_id',
                as: 'doctorInfo',
              },
            },
            {
                $unwind: '$doctorInfo',
            },
            {
                $project: {
                    _id: 0,
                    firstName: '$doctorInfo.firstName',
                    lastName: '$doctorInfo.lastName',
                    specializaion: '$doctorInfo.specializaion',
                    timing: '$doctorInfo.timing',
                },
            },
        ]);
        for(const drInfo of patient) {
            for (let i = 0; i <= drInfo.timing.length - 1; i++) {
                if (drInfo.timing[i].patient_id.toString() !== patient_id) {
                    drInfo.timing.splice(i, 1);
                }
                else {
                    const obj = {
                        firstName: drInfo.firstName,
                        lastName: drInfo.lastName,
                        specializaion: drInfo.specializaion,
                        day: drInfo.timing[i].day,
                        timeslot: drInfo.timing[i].timeSlot,
                        date: drInfo.timing[i].date,
                    }
                    response.push(obj);
                }
            }
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getBookedInfo() {
    try {
        const filter = { "doctorIds": { "$ne": [] } };
        return await Patient.find(filter);
    } catch (error) {
        throw new Error(error.message);
    }
}

