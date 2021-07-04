const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom")
const dompurify = createDomPurify(new JSDOM().window)


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    emailId: {
        type: String
    },
    name: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }

});

blogSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { strict: true })
    }
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
    next();
})
module.exports = mongoose.model('Blogtweet', blogSchema);