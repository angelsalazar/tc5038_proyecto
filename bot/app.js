require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')

const api = require('./api');

const server = express();               // create instance of express
       

// adding middlewares
server.use(express.static(path.join(__dirname, 'frontend', 'dist')));
server.use(express.json())
server.use(cors());
server.use(morgan('tiny'));
server.use('/api', api(express));       // attaches the chatbot RESTFUL API

server.get('/', (req, res) => {
    res.json({
        message: 'hello world'
    })
})

// start server
server.listen(process.env.PORT, () => {
    console.log(`server up and running on port ${process.env.PORT}`);
})