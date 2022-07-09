var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://ElevatorTester:428jt7MP9475Tkj@cluster0.lncbvjq.mongodb.net/elevator?retryWrites=true&w=majority', options,        
    function(err) {
        if(err){
            console.log(err);
        }else{
            console.log('connection ok');
        }
    }
   );