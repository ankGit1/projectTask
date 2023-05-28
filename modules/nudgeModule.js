const mongoose = require('mongoose');

const nudgeSchema = new mongoose.Schema({
    event_id: { type: String, required: true },
    creator: {type:String, required: true},
    title: { type: String, required: true },
    image: { type: String, default: '' },
    schedule: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: '' },
    oneLiner: { type: String, required: true },
},
    { timestamps: true }
)

module.exports = mongoose.model('nudgeEvent',nudgeSchema)