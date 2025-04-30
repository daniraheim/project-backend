const express = require('express');
const router = express.Router();
const userModel = require('./userModel.js');

router.get('/login', async (request, response) => {
    const [rows] = await userModel.getAllUsers();
    response.json(rows);
})

router.post('/register', async (request, response) => {

    const {username, password, password1} = request.body
    console.log(username);
    let result = await userModel.createUser(username, password, password1);
    console.log(result);
    if(result.insertuserID) {
        const newUser = {id: result.insertuserID, username, password, password1}
        return response.json({message: "User Added"});
    }
})



module.exports = router;