var http = require('http');
var fs = require('fs');
var url = require('url');
var nodemailer = require('nodemailer');
require('dotenv').config()

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
http.createServer(function (req, res) {
  //Open a file on the server and return its content:
  var q = url.parse(req.url, true);
  var path=q.pathname;
  if(path==='/'){
  fs.readFile('home.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}
else if(path==='/about'){
	fs.readFile('about.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}
else if(path==='/contact-us'){
	var qdata = q.query; 
	fs.readFile('contact-us.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    // console.log(qdata.email);
    // console.log(qdata.name);

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

    return res.end();
  });
}

else{
	fs.readFile('404.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}
}).listen(8080);
