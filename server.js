var express = require("express"),
        app = express();
        
/*
var db = require("mongodb").MongoClient;
var db_name = "scribe-badan";
var db_url = 'mongodb://' + process.env.IP + ':27017/' + db_name;
*/
app.post('/', function(req,res){
    console.log('got post shit there mate, yo', req.url);
    app.use(express.static('public'));
});

app.get('/story', function(req,res){
    
    res.send("it's a meme kids");
    
    console.log('got get shit there mate, yo', req.url);
});

app.use(express.static('public'));



/*
db.connect(db_url, function(err, data){
  
  if(err){
    console.log("Error in db: " + err );
  }
  
  console.log('Connection established to', db_url);
  
  var collection = data.collection('stories');
  
  data.close();

});
*/
    
app.listen(process.env.PORT, function(){
    console.log("App running on: " + process.env.PORT);
});