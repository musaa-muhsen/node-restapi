const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber'); // this is a JSON api 

// Getting all
router.get('/', async (req,res) => {
    try {
        const subscribers = await Subscriber.find(); // this is a mongoose function and this is going to get all the different subscribers that are models 
        res.json(subscribers)
    } catch (err) {
       res.status(500).json({message: err.message}) // status() is added to let the user know it's a failure 
    }
});

// getting one 
// :id this means its a parameter so the ? in the url of ?colour=blue 
router.get('/:id', getSubScriber ,(req,res) => {
    // res.send(res.subscriber.name); for testing purposes
    res.json(res.subscriber);     
});

// this is going to be asynchronous function because we're going to be to save that model which is an asynchronous operation 
// creating one // they are going to be creating it on the general route so no need for /:id
router.post('/', async (req, res) => {
    // new instance of Subscriber
 const subscriber = new Subscriber({
     name: req.body.name,  /*body is whatever the user sends to us which going to be JSON */
     subscribedToChannel: req.body.subscribedToChannel
 })
   
 try {
    const newSubscriber = await subscriber.save() // persistanting to the database will take some time so it's a asynchronous situation
    res.status(201).json(newSubscriber) // 201 means successfully created an object 
 } catch (err) {
     res.status(400).json(err.message) // send 400 error as there is something wrong with the user input not something with your server 
 }
});

// The HTTP methods PATCH can be used to update partial resources.
// updating one // patch instead of put for our update because we only want to update based on what the user passes us the name of the subscriber we only want to update the name and none of the other information about the subscriber because if we used put it would update all the information to describe it all at once instead of just the information that gets passed     
router.patch('/:id', getSubScriber, async (req,res) => {
    // if there is name and subscribedToChannel do these statements 
    console.log(req.body.name)
    if (req.body.name != null) {
       res.subscriber.name = req.body.name
    }

    if (req.body.subscribedToChannel != null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try {
        const updatedSubscriber = await res.subscriber.save(); // once the promise has been fulfilled and the data is saved to the database 

        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({message: err.message})
    }

});

// Deleting one 
router.delete('/:id', getSubScriber, async (req,res) => {
    try {
        await res.subscriber.remove();
        res.json({message: 'Deleted Subscriber'})

    } catch (err) {
        res.status(500).json({message : err.message})
    }
})

// 500 status code means that there's an error on your server it means that the actual server in our case our database had some kind of error which caused the actual transaction not to work and it had nothing to do with the actual user or client using the API it was entirely our fault that's what 500 means and any error code that's in the 500 range means that 

// middleware for what?
async function getSubScriber(req, res, next) {
    let subscriber;
    try {
      subscriber = await Subscriber.findById(req.params.id);
       if (subscriber == null) {
             return res.status(404).json({message: 'Cannot find subscriber from middleware function getSubScriber'}) // reason for return here is because if there is no subscriber we want to immediately leave this function and no longer go any further   // 404 means that you could not find something 
           }
        } 
    catch (err) {
       return res.status(500).json({message: err.message}) // if our server is causing the problem 
    }
    // if the try is successful 
    res.subscriber = subscriber
    next(); // next function because we successfully completed this entire getSubScriber function so next will allow us to move on the next piece of middleware or the actual request itself  
}


module.exports = router;

