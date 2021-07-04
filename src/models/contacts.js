const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String
    },
    topic: {
        type: String
    },
    comment: {
        type: String
    }
})

const Contactuser = new mongoose.model("contact", contactSchema);

module.exports = Contactuser;