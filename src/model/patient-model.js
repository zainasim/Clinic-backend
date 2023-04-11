import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config.js';

const PatientSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        dateOfBirth: { type: Date, required: true},
        password: { type: String, required: true },
        doctorIds: {
            type: [],
            required: false,
            default: [],
        },
    },
    {
        timestamps: true
    }
);

// For Login
PatientSchema.methods.comparepassword = async function (candidatepassword) {
    const patient = this;
    return bcrypt.compare(candidatepassword, patient.password).catch(() => false);
};

PatientSchema.pre('save', async function (next) {
    const patient = this;

    //only hash the password if it's new or being modified
    if (!patient.isModified('password')) {
        return next();
    }
    //add Random additonal date
    const salt = await bcrypt.genSalt(config.salt.number);
    const hash = bcrypt.hashSync(patient.password, salt);
    //Replace the password with hash
    patient.password = hash;

    return next();
});

const Patient = mongoose.model('Patient', PatientSchema);

export default Patient;