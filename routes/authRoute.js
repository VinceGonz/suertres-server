const express = require('express');
const router = express.Router();
const {v1: uuid} = require('uuid');
const {addUser, findUser} = require('../models/usersModel')

const hashUserPassword = require('../helpers/hashPassword')
const {authenticateUser} = require('../helpers/jwtAuth')
const validatePassword = require('../helpers/validatePassword')


router.get('/', (req, res) => {
    res.send('auth route baby')
})


router.post('/register', async(req, res) => {
    
    const {fname,lname,username,password} = req.body;
    try {
        const addUser_Result = await addUser({user_id: uuid(),fname,lname,username,password:hashUserPassword(password)});
        const {rowCount} = addUser_Result
        if(rowCount){
            res.status(200).json({Message: "Successfully Added new User", response: addUser_Result})
        }
    } catch (error) {
        console.log('Error Adding new user', error)
        res.status(500).json({Message: "Failed to add new user", Error: errors})
    }
})


router.post('/login', async(req, res) => {
    
    const {username, password} = req.body;
    

    try {
        const findUser_Result = await findUser(username);
        const {rowCount,rows} = findUser_Result;
        if(rowCount){
            let passwordIsValid = await validatePassword(password, rows[0].password);
            if(passwordIsValid){
                const token = authenticateUser({username});
                res.status(200).json({Message: 'Successfully Login',User: rows[0], token})
            }else{
                res.status(401).json({Message: 'Invalid Username/Password',User: rows[0]})
            }
        }else{
            res.status(401).json({Message: "Invalid Username/Password"})
        }

        
    } catch (error) {
        console.log('Failed to find user', error);
        res.status(500).json({Message: "Failed to find user"});
    }

})




module.exports = router;