import Doctor from "../model/doctor-model.js";
import { ObjectId } from 'mongodb';

export async function createDoctor(input) {
    try {
        return await Doctor.create(input);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateDoctorTimeSlot(body, id) {
    try {
        const doctor = await Doctor.findById(id);
        if(!doctor) {
            throw new Error('Doctor with this id does not exist');
        }
        const timeSlotObject = {
            timeSlot: body.timing.timeSlot,
            patient_id: new ObjectId(body.timing.patient_id),
            day: body.timing.day,
            date: body.timing.date,
        }
        var updatedDoctor; 
        const options = { new: true };
        const update = { $push: { timing: timeSlotObject } };
        if (doctor.timing.length !== 0) {
            const filter = {
                timing: { $elemMatch: { timeSlot: body.timing.timeSlot, date: body.timing.date, day: body.timing.day } }
            };
            updatedDoctor = await Doctor.findOne(filter);
            if(updatedDoctor) {
                throw new Error('This slot is already filled');
            }
        }
        updatedDoctor = await Doctor.findOneAndUpdate({ _id: new ObjectId(id) }, update, options);
        return updatedDoctor;

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getDoctorById(id) {
    try {
        return await Doctor.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getAllDoctor() {
    try {
        return await Doctor.find();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getDoctorByType(type) {
    try {
        return await Doctor.find({ specializaion: type});
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getTimeSlotData(id) {
    try {
        return await Doctor.findById({ _id: id}, { timing: 1, _id: 0});
    } catch (error) {
        throw new Error(error.message);
    }
}
