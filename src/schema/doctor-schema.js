import { object, string, date } from 'yup';

export const createDoctorSchema = object({
    body: object({
        email: string().email('Must be valid email').required('Email is rquired'),
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        gender: string().required('Gender is required'),
        specializaion: string().required('Specialization is required'),
    })
});

export const doctorTimingSchema = object({
    body: object({
        timing: object().shape({
            timeSlot: string().required('time slot is required'),
            patient_id: string().required('Patient Id is required'),
            day: string().required('Day is required').min(1),
            date: date().required('Date is required'),
        })
    })
});



// export const getByType = object({
//     body: object({
//         type: string().required('Doctor Type is required is rquired')
//     })
// });

export const getByType = object().shape({
    type: string().required(),
});