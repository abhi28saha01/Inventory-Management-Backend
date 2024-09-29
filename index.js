const express = require('express');
const app = express();
require('dotenv').config();
const cookieparser = require('cookie-parser');

const port = process.env.PORT || 7000;
app.listen(port,() => {
    console.log('App is Started at Port : ',port);
});

const router = require('./routes/route');
app.use(cookieparser());
app.use(express.json());
app.use('/api/v1/inventory/managment',router);

require('./config/database').connect();