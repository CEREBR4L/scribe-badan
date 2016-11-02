var express = require("express"),
        app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var env = require('node-env-file');

var stories = require('./routes/stories.js');
var users = require('./routes/users.js');
       
/* config */
var connect = mongoose.connect('mongodb://127.0.0.1:27017/scribe-badan');
var port = process.env.PORT || 8080;

env(__dirname + '/.env');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

/* PUBLIC LINKS */
app.get('/api/get/stories', stories.getStories);
app.get('/api/get/story/:id', stories.getStoryById);
app.get('/api/get/random', stories.getRandom);

app.post('/api/new', stories.add);

app.put('/api/update/:id', stories.updateStory);
app.put('/api/addPos/:id', stories.addPositive);
app.put('/api/addNeg/:id', stories.addNegative);
app.put('/api/addView/:id', stories.addView);
app.put('/api/markComplete/:id', stories.markComplete);


var authRoutes = express.Router();

authRoutes.post('/authenticate', users.authenticate);
authRoutes.use(users.verify);
authRoutes.get('/user', users.findUser);

app.use('/api/auth', authRoutes);

/*
 ANGULAR FRONT END
 */

app.use('/css/', express.static(__dirname + '/public/css/'));
app.use('/js/', express.static(__dirname + '/public/js/'));
app.use('/templates/', express.static(__dirname + '/public/templates/'));

app.use('*', function(req, res){
  res.sendFile(__dirname + '/public/');
});
    
app.listen(port, function(){
    console.log("App running on: " + port);
});
