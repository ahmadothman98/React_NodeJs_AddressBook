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
    relation: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    location:{
        coordinates: [Number],
    }
        


});

module.exports = mongoose.model('Contact', contactSchema);