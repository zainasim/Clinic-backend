import { date, object, string, ref } from 'yup';
import mongoose from 'mongoose';

export const createPatientSchema = object({
    body: object({
        password: string()
            .required('password is required')
            .min(6, 'Password is too short - Should be min 6 characters'),
        confirmPassword: string().oneOf([ref('password')], 'Password did not match'),
        email: string().email('Must be valid email').required('Email is rquired'),
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        gender: string().required('Gender is required'),
        dateOfBirth: date().required('Date of Birth is required'),
    })
});

export const loginPatientSchema = object({
    body: object({
        email: string().email('Must be valid email').required('Email is rquired'),
        password: string()
            .required('password is required'),
    })
});

export const getById = object({
    params: object({
        id: mongoose.Types.ObjectId,
    })
});