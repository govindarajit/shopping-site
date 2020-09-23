var mongoose = require('mongoose');
// var constants = require('../config/url');
// console.log("constants se db", constants.dbUrl)
// var dbUrl = constants.dbUrl

const dbUrl = 'mongodb://localhost:27017/mean_5pm';


mongoose.connect(`${dbUrl}`, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false}, (err) => {
    if (err)
        console.log(err)
    else
        console.log("Database Connected")
});