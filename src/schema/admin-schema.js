import { object, string, ref } from 'yup';

export const createAdminSchema = object({
    body: object({
        password: string()
            .required('password is required')
            .min(6, 'Password is too short - Should be min 6 characters'),
        confirmPassword: string().oneOf([ref('password')], 'Password did not match'),
        email: string().email('Must be valid email').required('Email is rquired'),
    })
});

export const loginAdminSchema = object({
    body: object({
        email: string().email('Must be valid email').required('Email is rquired'),
        password: string()
            .required('password is required'),
    })
});