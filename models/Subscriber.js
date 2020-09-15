const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subscribedToChannel: {
        type: String,
        required: true
    }, 
    subscribeDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    productImage: {
        type: String,
        required: true
    }

})

// 'Subscriber' is the name of the model in our database and the next parameter is the schema that corresponds to that model which in our case is 'subscriberschema' 
// the reason for this model method is because when we export this and import it in a different file this model allows us to interact directly with the database using this schema  
module.exports = mongoose.model('Subscriber', subscriberSchema)

