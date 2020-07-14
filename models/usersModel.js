const db = require('../config/database');





const addUser = async (user) => {
    const {user_id,fname, lname, username, password} = user;
    console.log(user)
    const addUserQuery = {
        text: `INSERT INTO tbl_users VALUES ($1,$2,$3,$4,$5,DEFAULT, DEFAULT, DEFAULT, DEFAULT)`,
        values:[user_id,fname,lname,username,password]
    }

    return new Promise(async(resolve, reject) => {
        try {
            const addUserQuery_Result = await db.query(addUserQuery);
            resolve(addUserQuery_Result)
        } catch (error) {
            console.log('Failed query for adding new User');
            reject(error)
        }
    })
}

const findUser = async (username) => {
    const findUserQuery = {
        text: `SELECT * FROM tbl_users WHERE username = $1`,
        values: [username]
    }

    return new Promise(async(resolve,reject) => {
        try {
            const findUserQuery_Result = await db.query(findUserQuery);
            resolve(findUserQuery_Result)
        } catch (error) {
            console.log('Failed query for finding a user');
            reject(error);
        }
    })
}




module.exports = {addUser, findUser}