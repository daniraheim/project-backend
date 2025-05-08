const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./users.js')


app.use(cors({ origin: 'http://localhost:3001'}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/users', userRoutes)

const db = require('./dbUtil.js');




app.listen(3000, () => console.log('Server is running on localhost 3000'));