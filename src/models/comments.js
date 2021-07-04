const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom")
const dompurify = createDomPurify(new JSDOM().window)

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postslug: {
        type: String,
        required: true
    },
    user: {
        type: String
    },
    usermail: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema);