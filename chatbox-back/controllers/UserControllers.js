const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userModel = require('../models/userModel')

const addUser = async (req, res) => {

    try {

        const userInfo = req.body

        const pswcrypt = bcrypt.hashSync(req.body.password)

        const infoToSave = {

            firstName: userInfo.firstName.toLowerCase(),
            lastName: userInfo.lastName.toLowerCase(),
            birthday: userInfo.birthday.toLowerCase(),
            state: userInfo.state.toLowerCase(),
            telNumber: userInfo.telNumber.toLowerCase(),
            email: userInfo.email.toLowerCase(),
            password: pswcrypt

        }

        const findUser = await userModel.find({ email: infoToSave.email })

        console.log("finduser: ", findUser[0]);

        if (findUser[0] === undefined) {

            await userModel.create(infoToSave)

            res.status(200).json("user added")
        }

        res.json("user already exist")

    } catch (error) {

        res.status(400).json(error)


    }

}

const login = async (req, res) => {

    try {

        const email = req.body.email.toLowerCase()

        const password = req.body.password


        const findUser = await userModel.findOne({ email })

        console.log(findUser);

        if (findUser === null) {
            res.status(400).json('user not found')
        }

        const checkPassowrd = bcrypt.compareSync(password, findUser.password)

        if (checkPassowrd) {

            const assignToken = await jwt.sign({ _id: findUser._id }, config.key, { expiresIn: 3600000 })

            res.status(200).json({ userID: findUser._id, userName: findUser.firstName, userLastname: findUser.lastName, token: assignToken })
            // res.status(200).json(`userID: ${findUser._id}, user : ${findUser.firstName} ${findUser.lastName}, token: ${assignToken}`)

        }

        res.status(400).json("passord incorrect")

    } catch (error) {

        res.status(400).json(error)


    }
}

const oneUser = async (req, res) => {

    try {

        const userID = req.params.id

        const findUser = await userModel.findById(userID)

        if (findUser !== null) {

            res.status(200).json(findUser)
        } else {

            res.status(400).json("user not found")
        }


    } catch (error) {
        res.status(400).json("user not found")
        console.log(error);
    }
}

const oneUserByNumber = async (req, res) => {

    try {

        const userNumb = req.params.number

        const findUser = await userModel.findOne({ telNumber: userNumb })

        if (findUser !== null) {

            res.json(findUser)

        } else {
            res.json("User not found")
        }




        console.log("userNumb: ", userNumb);

    } catch (error) {

        res.status(400).json("user number not found")
        console.log(error);

    }

}

const manyUserByNumber = async (req, res) => {

    try {

        const ownerNumb = req.body

        const usersNumb = req.body.numbers.users

        // const findUser = await userModel.findOne({telNumber: userNumb})

        // for( userNumb.numbers)

        // if( findUser !== null){


        // }else {
        //     res.json("User not found")
        // }

        res.json("ownerNumb")



        console.log("userNumb: ", ownerNumb);

    } catch (error) {

        res.status(400).json("user number not found")
        console.log(error);

    }

}

module.exports = { addUser, login, oneUser, oneUserByNumber, manyUserByNumber }