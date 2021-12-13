
const express = require('express');
const router = express.Router();

const {addUser, login, oneUser, oneUserByNumber, manyUserByNumber} = require('../controllers/UserControllers')


router.post('/addUser', addUser, (req, res) => {
    res.json('/addUser router post ok ')
})

router.post('/login', login)

router.get('/:id', oneUser)

router.get('/number/:number', oneUserByNumber )

router.get('/numbers', manyUserByNumber )


module.exports = router
