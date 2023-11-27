const express = require('express');
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const viewPath =  path.resolve(__dirname, '../templates/views/');
const partialsPath = path.resolve(__dirname, '../templates/partials');

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });
    console.log(partialsPath);
    transporter.use('compile', hbs({
        viewEngine: {
          extName: '.handlebars',
          layoutsDir: viewPath,
          defaultLayout: false,
          partialsDir: partialsPath,
          express
        },
        viewPath: viewPath,
        extName: '.handlebars',
      }))
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        template: 'index',
        attachments: [
            { filename: 'em.png', path: path.resolve(__dirname, '../public/images/em.png'), cid: 'em'},
            { filename: 'fb.png', path: path.resolve(__dirname, '../public/images/fb.png'), cid: 'fb'},
            { filename: 'ig.png', path: path.resolve(__dirname, '../public/images/ig.png'), cid: 'ig'},
            { filename: 'wapp.png', path: path.resolve(__dirname, '../public/images/wapp.png'), cid: 'wapp'},
            { filename: 'marlov.png', path: path.resolve(__dirname, '../public/images/marlov.png'), cid: 'marlov'}
        ],
        context: {
            // Additional variables you want to pass to the template
            tittle: options.tittle,
            name: options.name,
            message: options.message,
        },
    };
    await transporter.sendMail(mailOptions, (error) => {
       if(error) {
        console.log(error);
       }else {
        console.log('Email has been sent successfully');
       }
    });
};

module.exports = sendMail;