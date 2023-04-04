import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        specializaion: { type: String, required: true},
        timing: {
            type: [{}],
            required: false,
            default: [],
        },
    },
    {
        timestamps: true
    }
);

const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;