const express = require('express');
const app = express();
const path=require('path');
var url = require('url');
var nodemailer = require('nodemailer');
require('dotenv').config()



// app.use(app.router);



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});


app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname,'home.html'));

});

app.get('/about',(req,res)=>{
	res.sendFile(path.join(__dirname,'about.html'));

});

app.get('/contact-us',(req,res)=>{
	res.sendFile(path.join(__dirname,'contact-us.html'));
	var q = url.parse(req.url, true);
    var qdata = q.query;
    var mailOptions = {
		  from:  process.env.EMAIL,
		  to: qdata.email,
		  subject:qdata.subject,
		  text: qdata.body
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
	


});

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
   res.sendFile(path.join(__dirname,'error.html'));
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.sendFile(path.join(__dirname,'error.html'));
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
})

app.listen(5000);
