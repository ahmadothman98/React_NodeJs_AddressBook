const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255.
    },
    number: {
        type: String,
        required: true,
        min: 3, 
        max:13,
    },
    email: {
        default: "null",
        type: String,
    },
    relation: {
        type: String,
    },
    location:{
        coordinates: [Number],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'User'
    }
    


});

module.exports = mongoose.model('Contact', contactSchema);