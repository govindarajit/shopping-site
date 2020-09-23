const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    path = require('path'),
    expressSession = require('express-session'),
    connection = require('./config/dbconfig'),
    auth = require('./routes/auth'),
    roles = require('./routes/roles'),
    category = require('./routes/category'),
    product = require('./routes/product'),
    store = require('./routes/store'),
    file = require('./routes/file');

const app = express();

//application/json
app.use(bodyParser.json());

//cors
app.use(cors());

//session
app.use(expressSession({
    secret: 'mytoken',
    saveUninitialized: true,
    resave: true
}));
app.use(express.static(path.join(__dirname, 'frontend')));

//routes
app.use('/', auth);
app.use('/roles', roles);
app.use('/category', category);
app.use('/product', product);
app.use('/store', store);
app.use('/file', file);

const port = process.env.PORT || 3000;

app.listen(port, function() {
console.log(`App listening on port ${port}!`);
});
