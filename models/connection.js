var mongoose = require('mongoose');
let MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect(MONGODB_CONNECTION, options,        
    function(err) {
        if(err){
            console.log(err);
        }else{
            console.log('connection ok');
        }
    }
   );