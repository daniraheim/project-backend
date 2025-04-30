const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./users.js')


app.use(cors({ orgin: 'http://localhost:3001'}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', userRoutes)

const db = require('./dbUtil.js');

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Login route hit')
  
    const query = 'SELECT * FROM users WHERE username = ?';
  
    db.query(query, [username], async (error, results) => {
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


app.listen(3000, () => console.log('Server is running on localhost 3000'));