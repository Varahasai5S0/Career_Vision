require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_KEY, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db succesful");
}).catch((e) => {
    console.log("error");
})