const express = require('express');
const app = express();
require('dotenv').config({  path: "config/.env" });
const path = require('path');
const morgan = require('morgan')
const sendMail = require('./utils/sendMail');


//configure port number
const port = process.env.PORT || 5001

app.use('/static',express.static(path.join(__dirname, 'public')));
app.use("/test", (req, res) => {
    res.send("Hello world from index!");
  });

  app.use(express.json());
  app.use(morgan('dev'));

  app.post('/send-mail', async(req, res, next) => {
    const { name, email, subject, message, tittle } = req.body;
    await sendMail({
        name,
        email,
        subject,
        message,
        tittle,
      });
      res.status(201).json({
        success: true,
        message: `please check your email to activate your account!`,
      });
  })  
  
//create a server
const server = app.listen(process.env.PORT, () => {
    console.log( `Server is running on http://localhost:${process.env.port}`);
  });