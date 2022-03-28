const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser')
const adminRoute = require('./route/admin')
const userRoute = require('./route/user')
const publicRoute = require('./route/public')
const fileupload = require('express-fileupload')

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyparser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload())
app.use('/',publicRoute);
app.use('/admin',adminRoute);
app.use('/user',userRoute);

app.listen(3000);