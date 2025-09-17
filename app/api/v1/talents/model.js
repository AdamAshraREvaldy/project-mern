const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama harus diisi'],
        },
        role: {
            type: String,
            default: '-',
        },
        // cara relasi mongodb collection talent dengan image
        image: {
            type: mongoose.Types.ObjectId,
            ref: 'Images',
            required: true,
        },
        // cara relasi mongodb collection talent dengan organizer
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Talent', talentSchema);