
const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: String,
    owner: [String],
    users: [{type: mongoose.Types.ObjectId, ref:"User"}],
    creationDate: {type: Date},
    chat: []
})  

const channelModel = mongoose.model('Channel', channelSchema)

module.exports = channelModel