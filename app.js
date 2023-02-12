const express = require("express");

const https = require("https");
const qs = require("querystring");

const checksum_lib = require("./Paytm/checksum");
const config = require("./Paytm/config");

const app = express();

const parseUrl = express.urlencoded({ extended: false });
const parseJson = express.json({ extended: false });

const PORT = process.env.PORT || 4000;

var  today = new Date();

// static files
app.use(express.static('util'))
app.use('/css', express.static(__dirname + 'util/css'))
app.use('/js', express.static(__dirname + 'util/js'))
app.use('/img', express.static(__dirname + 'util/img'))
app.use('/positivae', express.static(__dirname + 'util/positivae'))
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

app.get('/',(req, res) =>{
    res.sendFile(__dirname + ' /home.html')
})
app.get(' /blog',(req, res) =>{
    res.sendFile(__dirname + ' /blog.html')
})
app.get(' /anomainpage',(req, res) =>{
    res.sendFile(__dirname + ' /anomainpage.html')
})
app.get(' /login',(req, res) =>{
    res.sendFile(__dirname + ' /login.html')
})
app.get(' /signup',(req, res) =>{
    res.sendFile(__dirname + ' /signup.html')
})
app.get(' /food',(req, res) =>{
    res.sendFile(__dirname + ' /blogfood.html')
})
app.get(' /travel',(req, res) =>{
    res.sendFile(__dirname + ' /blogTravel.html')
})
app.get(' /tech',(req, res) =>{
    res.sendFile(__dirname + ' /blogtech.html')
})
app.get(' /humour',(req, res) =>{
    res.sendFile(__dirname + ' /bloghumour.html')
})
app.get(' /food/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /blogfoodmain.html')
})

app.get(' /tech/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /blogtechmain.html')
})
app.get(' /humour/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /bloghumourmain.html')
})
app.get(' /travel/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /blogtravelmain.html')
})
app.get(' /other',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /blogother.html')
})
app.get(' /other/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /blogothermain.html')
})
app.get(' /doctorscategory',(req, res) =>{
    res.sendFile(__dirname + ' /Departments.html')
})
app.get(' /doctorlist',(req, res) =>{
    res.sendFile(__dirname + ' /doctorlist.html')
})

app.get(' /doctorabout',(req, res) =>{
    res.sendFile(__dirname + ' /doctorabout.html')
})
app.get(' /reviewform',(req, res) =>{
    res.sendFile(__dirname + ' /reviewform.html')
})
app.get(' /drappointmentform',(req, res) =>{
    res.sendFile(__dirname + ' /drappointmentform.html')
})
app.get(' /blogform',(req, res) =>{
    res.sendFile(__dirname + ' /blogform.html')
})
app.get(' /t&co',(req, res) =>{
    res.sendFile(__dirname + ' /t&co.html')
})
app.get(' /donateus',(req, res) =>{
    res.sendFile(__dirname + ' /donateus.html')
})
app.get(' /docform',(req, res) =>{
    res.sendFile(__dirname + ' /doctorform.html')
})
app.get(' /meditation-cat', (req, res) => {
    res.sendFile(__dirname + ' /meditation-cat.html')
})
app.get(' /meditation', (req, res) => {
    res.sendFile(__dirname + ' /meditation.html')
})
app.get(' /meditation-profile', (req, res) => {
    res.sendFile(__dirname + ' /meditation-profile.html')
})
app.get(' /influencerapplication',(req, res) =>{
    res.sendFile(__dirname + ' /influencerapplication.html')
})

app.get(' /docdashboard',(req, res) =>{
    res.sendFile(__dirname + ' /docdash.html')
})
app.get(' /docprofileupdate/:postName',(req, res) =>{
    
    res.sendFile(__dirname + ' /docprofileupdate.html')
})

app.get(' /docappointments/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /docappoint.html')
})
app.get(' /docreviews/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /docreviews.html')
})
app.get(' /docprescriptions/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /docpresc.html')
})
app.get(' /docprofile/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /docprofile.html')
})
app.get(' /userdashboard',(req, res) =>{
    res.sendFile(__dirname + ' /userdash.html')
})
app.get(' /userprofileupdate/:postName',(req, res) =>{
    
    res.sendFile(__dirname + ' /profileupdate.html')
})

app.get(' /userappointments/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /userappoint.html')
})
app.get(' /usertransactions/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /usertransc.html')
})
app.get(' /userprescriptions/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /userpresc.html')
})
app.get(' /userprofile/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + ' /userprofile.html')
})

//payment

app.get(" /payment", (req, res) => {
    res.sendFile(__dirname + " /pay.html");
  });
  
  app.post("/paynow", [parseUrl, parseJson], (req, res) => {
    // Route for making payment
  
    var paymentDetails = {
      amount: req.body.amount,
      customerId: req.body.name,
      customerEmail: req.body.email,
      customerPhone: req.body.phone
  }
  if(!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
      res.status(400).send('Payment failed')
  } else {
      var params = {};
      params['MID'] = config.PaytmConfig.mid;
      params['WEBSITE'] = config.PaytmConfig.website;
      params['CHANNEL_ID'] = 'WEB';
      params['INDUSTRY_TYPE_ID'] = 'Retail';
      params['ORDER_ID'] =  "ORD"+today.getDate()+today.getHours()+today.getMinutes();
      params['CUST_ID'] =  "ORD"+today.getDate()+today.getHours()+today.getMinutes();
      params['TXN_AMOUNT'] = paymentDetails.amount;
      params['CALLBACK_URL'] = 'http://localhost:'+PORT+'/callback';
      params['EMAIL'] = paymentDetails.customerEmail;
      params['MOBILE_NO'] = paymentDetails.customerPhone;
  
  
      checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
          var txn_url = "https://securegw-stage.paytm.in/order/process"; // for staging
          // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
  
          var form_fields = "";
          for (var x in params) {
              form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
          }
          form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
  
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
          res.end();
      });
  }
  });
  app.post("/callback", (req, res) => {
    // Route for verifiying payment
  
    var body = '';
  
    req.on('data', function (data) {
       body += data;
    });
  
     req.on('end', function () {
       var html = "";
       var post_data = qs.parse(body);
  
       // received params in callback
       console.log('Callback Response: ', post_data, "\n");
  
  
       // verify the checksum
       var checksumhash = post_data.CHECKSUMHASH;
       // delete post_data.CHECKSUMHASH;
       var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
       console.log("Checksum Result => ", result, "\n");
  
  
       // Send Server-to-Server request to verify Order Status
       var params = {"MID": config.PaytmConfig.mid, "ORDERID": post_data.ORDERID};
  
       checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
  
         params.CHECKSUMHASH = checksum;
         post_data = 'JsonData='+JSON.stringify(params);
  
         var options = {
           hostname: 'securegw-stage.paytm.in', // for staging
           // hostname: 'securegw.paytm.in', // for production
           port: 443,
           path: '/merchant-status/getTxnStatus',
           method: 'POST',
           headers: {
             'Content-Type': 'application/x-www-form-urlencoded',
             'Content-Length': post_data.length
           }
         };
  
  
         // Set up the request
         var response = "";
         var post_req = https.request(options, function(post_res) {
           post_res.on('data', function (chunk) {
             response += chunk;
           });
  
           post_res.on('end', function(){
             console.log('S2S Response: ', response, "\n");
  
             var _result = JSON.parse(response);
               if(_result.STATUS == 'TXN_SUCCESS') {
                   //res.send("Payment Success")
                   res.sendFile(__dirname + ' /home.html')
               }else {
                   res.send('payment failed')
               }
             });
         });
  
         // post the data
         post_req.write(post_data);
         post_req.end();
        });
       });
  });
  
//listen on port 3000
app.listen(PORT, () => console.info(`listening to port ${PORT}` ))
