const express = require('express');
const router = express.Router();
const userModel = require('./userModel.js');
const db = require('./dbUtil.js');


router.post('/login', (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

  console.log('a')
    const query = 'SELECT * FROM users WHERE username = ? and password = ?';
  
    db.query(query, [username, password], (error, results) => {
      console.log(error)
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
      if (results.length === 0) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }
      const user = results[0];
  
      const passwordsMatch = user.password === password;
  
      if (!passwordsMatch) {
        return res.status(400).json({ success: false, message: 'Incorrect password' });
      }
      return res.status(200).json({ success: true, message: 'Login successful', user: { username: user.username } });
    });
  });

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