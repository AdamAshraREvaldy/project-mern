const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let imageSchema = Schema(
    {
        urlImage: {
            type: String,
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Images', imageSchema);