const express = require("express")
const blogdata = require("./../models/blog");
const router = express.Router()
const Register = require("./../models/user");
const commentdata = require("./../models/comments");
const poss = require("./../middleware/poss");

router.get('/new', async(req, res) => {
    res.render('newarticle')
})


router.post('/new', poss, async(req, res) => {
    try {
        const newblog = new blogdata({
            title: req.body.title,
            description: req.body.description,
            markdown: req.body.markdown,
            emailId: req.user.email,
            name: req.user.firstname
        })
        const inserted = await newblog.save();
        res.status(201).redirect('/blog/article/my')
    } catch (e) {
        res.status(400).redirect('/blog');
    }
})


router.post('/edit/:id', async(req, res) => {
    const article = await blogdata.findByIdAndUpdate({ _id: req.params.id });
    article.description = req.body.description;
    article.markdown = req.body.markdown
    article.save();
    const acts = await commentdata.find({ postslug: article.slug });
    res.render('showblog', { post: article, comments: acts });
})

router.get('/edit/:id', async(req, res) => {
    const article = await blogdata.findById({ _id: req.params.id });
    res.render('editblog', { post: article });
})

router.get('/:slug', async(req, res) => {
    const act = await blogdata.findOne({ slug: req.params.slug });
    const articles = await commentdata.find({ postslug: req.params.slug });
    res.render("showblog", { post: act, comments: articles });
})

router.post('/comment/:slug', poss, async(req, res) => {
    try {
        const article = new commentdata({
            comment: req.body.comm,
            postslug: req.params.slug,
            user: req.user.firstname,
            usermail: req.user.email
        });
        await article.save();
        const act = await blogdata.findOne({ slug: req.params.slug });
        const articles = await commentdata.find({ postslug: req.params.slug });
        res.render("showblog", { post: act, comments: articles })
    } catch (e) {
        res.redirect('/blog');
    }
})

router.get('/article/my', poss, async(req, res) => {
    try {
        const act = await blogdata.find({ emailId: req.user.email }).sort({ createdAt: 'desc' });
        res.render("myarticle", { post: act });
    } catch (e) {
        res.status(400).redirect('/404error');
    }
})

router.delete('/delete/:id', async(req, res) => {
    await blogdata.findByIdAndDelete(req.params.id)
    res.redirect('/blog/article/my')
})

router.delete('/comments/delete/:id', poss, async(req, res) => {
    const article = await commentdata.findById({ _id: req.params.id });
    var postslug = article.postslug;
    var userId = article.usermail;
    if (req.user.email == userId) {
        const article1 = await commentdata.findByIdAndDelete({ _id: req.params.id })
        const act = await blogdata.findOne({ slug: postslug });
        const comments = await commentdata.find({ postslug: postslug })
        res.render("showblog", { post: act, comments: comments, message: "comment deleted succesfully" });
    } else {
        const act = await blogdata.findOne({ slug: postslug });
        const comments = await commentdata.find({ postslug: postslug })
        res.render("showblog", { post: act, comments: comments, message: "Dont have access to delete it" });
    }

})

module.exports = router;