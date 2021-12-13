
const channelModel = require('../models/channelModel')

const addChannel = async (req, res) => {

    try {

        const infoChannel = req.body

        console.log("infoChannel: ", infoChannel);

        const channel = await channelModel.find({ name: infoChannel.name })

        console.log("channel: ", channel);

        const newChannel = {
            name: infoChannel.name,
            owner: infoChannel.owner,
            users: infoChannel.users,
            creationDate: Date.now()
        }

        if (channel[0] === undefined) {

            await channelModel.create(newChannel)

            res.status(200).json("channel created")

        }

        res.status(400).json('channel already exist')

    } catch (error) {
        res.json(error)
    }
}

const allChannels = async (req, res) => {

    try {

        const allChannels = await channelModel.find()

        res.status(200).json(allChannels)


    } catch (error) {

        console.log(error);

    }

}

const oneChannel = async (req, res) => {


    try {
        const id = req.params.id

        const oneChannel = await channelModel.findById(id)

        if (oneChannel === null) {
            res.json('id not found')
        }

        res.json(oneChannel)

    } catch (error) {

        res.json("id not found")

        console.log(error);

    }
}

const addMessages = async (req, res) => {

    try {

        const messageInfo = req.body

        const messageSend = {
            channel: messageInfo.channel,
            sender: messageInfo.sender,
            senderID: messageInfo.senderID,
            message: messageInfo.message,
            time: new Date
        }

        const findUser = await channelModel.find({ users: messageSend.senderID })

        for (i = 0; i < findUser.length; i++) {

            if (findUser !== [] && findUser[i].name === messageSend.channel) {

                await channelModel.findOneAndUpdate({ name: messageSend.channel }, { $push: { chat: [messageSend] } })

                res.status(200).json("message sended")

            }

        }

    } catch (error) {
        console.log(error);
    }
}

const channelMessages = async (req, res) => {

    try {

        const channelID = req.params.id


        const channel = await channelModel.findById(channelID)

        const infoChat = channel.chat

        const chat = []

        for (i = 0; i < infoChat.length; i++) {

            chat.push({
                sender: infoChat[i].sender,
                message: infoChat[i].message,
                sendTime: infoChat[i].time
            })

        }

        res.json(chat)

    } catch (error) {
        console.log(error);
    }

}

const userChannels = async (req, res) => {

    
    try {
        
        const userID = req.params.id

        const channels = await channelModel.find({users: userID})
        
        if(channels.length > 0){

            res.status(200).json(channels)  
        }else{

            res.status(400).json('user channels not founded 1')
        }
        
        

    } catch (error) {
        res.status(400).json('user channels not founded')
        console.log(error);
    }
}



module.exports = { addChannel, allChannels, oneChannel, addMessages, channelMessages, userChannels }