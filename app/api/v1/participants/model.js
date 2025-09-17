const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const participantSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name must be filled in'],
            minlength: 3,
            maxlength: 50,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email must be filled in'],
        },
        password: {
            type: String,
            required: [true, 'Password must be filled in'],
            minlength: 6,
        },
        role: {
            type: String,
            default: '-',
        },
        status: {
            type: String,
            enum: ['aktif', 'tidak aktif'],
            default: 'tidak aktif',
        },
        otp: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

participantSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

participantSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('Participant', participantSchema);