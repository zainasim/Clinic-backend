import Doctor from "../model/doctor-model.js";
import { ObjectId } from 'mongodb';
import config from '../config/config.js';
import transporter from "../config/emailConfig.js";
import Patient from "../model/patient-model.js";

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
        const patient = await Patient.findById(body.timing.patient_id);
        if(!patient) {
            throw new Error('Patient with this id does not exist');
        }
        // const timeslotInfo = await Doctor.findOne({
        //     _id: id,
        //     timing: {
        //         $elemMatch: {
        //             patient_id: new ObjectId(body.timing.patient_id)
        //         }
        //     }
        // });
        const timeSlotObject = {
            timeSlot: body.timing.timeSlot,
            patient_id: new ObjectId(body.timing.patient_id),
            day: body.timing.day,
            date: body.timing.date,
        }
        var updatedDoctor; 
        const options = { new: true };
        const updateDoctor = { $push: { timing: timeSlotObject } };
        const updatePatient = { $push: { doctorIds: new ObjectId(id) } };
        if (doctor.timing.length !== 0) {
            const filter = {
                timing: { $elemMatch: { timeSlot: body.timing.timeSlot, date: body.timing.date, day: body.timing.day } }
            };
            updatedDoctor = await Doctor.findOne(filter);
            if(updatedDoctor) {
                throw new Error('This slot is already filled');
            }
        }
        updatedDoctor = await Doctor.findOneAndUpdate({ _id: new ObjectId(id) }, updateDoctor, options);
        await Patient.findOneAndUpdate({ _id: new ObjectId(body.timing.patient_id) }, updatePatient, options);
        await sendEmailToPatient(body, updatedDoctor);
        return updatedDoctor;
        // if(!timeslotInfo) {
        // }
        // throw new Error('You have already booked a slot');

    } catch (error) {
        throw new Error(error.message);
    }
}

async function sendEmailToPatient(body, doctor) {
    const mailOptions = {
        from: config.user.GMAIL_USER,
        to: 'kojet68001@jthoven.com',
        subject: 'subject',
        html: 'Hi,<br> your appointment has been booked wth Dr,' + doctor.firstName + ' ' + doctor.lastName + ' for time slot ' + body.timing.timeSlot,
    };
    transporter.sendMail(mailOptions, (err) => {
        if(err) {
            console.error(err);
        } else {
            console.log("email sent successfully");
        }
    });
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
