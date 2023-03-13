const mongoose = require('mongoose');

const subjectsSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    topics: [],



})

const Subject = mongoose.model('Subject', subjectsSchema);

module.exports = Subject;