const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    imageurl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course: [{
        classname: {
            type: String,
            required: true
        },
        classdescription: {
            type: String,
            required: true
        },
        jobs: [{
            jobtitle: {
                type: String,
                required: true
            },
            jobdescription: {
                type: String,
                required: true
            }
        }]


    }],

    subject: [{
        type: String,
        required: true
    }]

});

const Datasai = new mongoose.model("courselist", courseSchema);

module.exports = Datasai;