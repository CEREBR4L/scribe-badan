var express = require("express"),
        app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var stories = require('./routes/stories.js')
       
/* config */
var connect = mongoose.connect('mongodb://127.0.0.1:27017/scribe-badan');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }))


/* PUBLIC LINKS */
app.get('/api/get/stories', stories.getStories);
app.get('/api/get/random', stories.getRandom);

app.post('/api/new', stories.add);


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
