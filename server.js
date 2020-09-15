require('dotenv').config() // this is going to load all of our enviroment variables from our .env 

const cors = require('cors');
const express = require('express'); // express libary 
const app = express(); // app variable to configure our server
const mongoose = require('mongoose')// mongoose to connect to our mongoDB database 

app.use(express.json()) // this essentially just lets our server accept JSON as a body instead of a post element or whatever 

/*
app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header (
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   if (req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Headers', 'PUT, POST, PATCH, DELETE , GET' )
       return res.status(200).json({});
   }
   next()
});

//or

//app.use(cors());
*/

app.use(cors());
mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection;

// listening to these events 
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database '));


// routes // do this route and move on as in .next()
const subscribersRouter = require('./routes/subscribers'); // localhost:5003/subscribers
app.use('/subscribers', subscribersRouter);
// or 
// app.use('/subscribers', require('./routes/subscribers') );

app.listen(5003, () => console.log('Server started on 5003'));

// now we have a database completely done our server is completely hooked up and listening 
// now to create routes for our server and also set up our server to accept JSON  
// middleware = code that runs when the server gets a request but before it gets passed to your routes 
