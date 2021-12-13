
const express = require('express');
const { addChannel, allChannels, oneChannel, addMessages, channelMessages, userChannels } = require('../controllers/channelControllers');
const router = express.Router();


router.post('/newChannel', addChannel )

router.get('/', allChannels )

router.get('/:id', oneChannel)

router.post('/newMessage', addMessages)

router.get('/messages/:id', channelMessages)

router.get('/userChannels/:id', userChannels)


module.exports = router