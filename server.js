var express = require("express"),
        app = express();
var mongoose = require('mongoose');

var stories = require('./routes/stories.js')
       
/* config */
var connect = mongoose.connect('mongodb://127.0.0.1:27017/scribe');
var port = process.env.PORT || 8080;

/* PUBLIC LINKS */
app.get('/api/get/stories', stories.getStories);


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
