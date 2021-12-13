
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config')
const usersRoutes = require('./routes/usersRoutes')
const channelsRoutes = require('./routes/channelsRoutes')


mongoose.connect(config.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("I'm connected to the database");
    }
})

const port = config.port

const app = express()

app.use(express.json())
app.use(cors())


app.listen(port, () => {
    console.log("The server is listening to the port: ", port);
})

app.use('/users', usersRoutes )
app.use('/channels', channelsRoutes)



// process.on("unhandledRejection", (err, promise) => {
//     console.log(`Logged Error: ${err.message}`);
//     server.close(() => process.exit(1));
// });
