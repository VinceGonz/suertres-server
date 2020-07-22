const express = require('express');
const router = express.Router();
const {Users} = require('../db/models')

const hashUserPassword = require('../helpers/hashPassword')
const {authenticateUser} = require('../helpers/jwtAuth')
const validatePassword = require('../helpers/validatePassword')

module.exports = router;


router.get('/', (req, res) => {
    res.send('auth route baby')
})


router.post('/register', async(req, res) => {
    
    const {fname,lname,username,password} = req.body;

    try {
        const createdUser = await Users.create({fname,lname,username,password:hashUserPassword(password)})
        if(createdUser){
            res.status(200).json({Message: "Successfully Added new User", response: createdUser})
        }
    } catch (error) {
        console.log('Error Adding new user', error)
        res.status(500).json({Message: "Failed to add new user", Error: error})
    }
})


router.post('/login', async(req, res) => {
    
    const {username, password} = req.body;

    try {
        const User = await Users.findOne({where: {username: username}});
        if(User){
            let passwordIsValid = await validatePassword(password, User.password);
            if(passwordIsValid){
                const token = authenticateUser({username});
                res.status(200).json({Message: 'Successfully Login', User, token})
            }else{
                res.status(401).json({Message: 'Invalid Username/Password', User})
            }
        }else{
            res.status(401).json({Message: "Invalid Username/Password"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: "Failed to find user", Error: error});
    }
    
})



