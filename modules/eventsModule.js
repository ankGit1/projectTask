const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    type: { type: String, required: true },
    uid: { type: String, required: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    schedule: { type: String, required: true },
    description: { type: String, required: true },
    files: { type: String, default:'' },
    moderator: { type: String, required: true },
    category: { type: String, required: true },
    sub_category: { type: String },
    rigor_rank: { type: Number },
    attendees: {type:Array }
},
    { timestamps: true }
)

module.exports = mongoose.model('event', eventSchema)