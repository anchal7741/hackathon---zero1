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
    res.sendFile(__dirname + '/view/home.html')
})
app.get('/view/blog',(req, res) =>{
    res.sendFile(__dirname + '/view/blog.html')
})
app.get('/view/anomainpage',(req, res) =>{
    res.sendFile(__dirname + '/view/anomainpage.html')
})
app.get('/view/login',(req, res) =>{
    res.sendFile(__dirname + '/view/login.html')
})
app.get('/view/signup',(req, res) =>{
    res.sendFile(__dirname + '/view/signup.html')
})
app.get('/view/food',(req, res) =>{
    res.sendFile(__dirname + '/view/blogfood.html')
})
app.get('/view/travel',(req, res) =>{
    res.sendFile(__dirname + '/view/blogTravel.html')
})
app.get('/view/tech',(req, res) =>{
    res.sendFile(__dirname + '/view/blogtech.html')
})
app.get('/view/humour',(req, res) =>{
    res.sendFile(__dirname + '/view/bloghumour.html')
})
app.get('/view/food/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/blogfoodmain.html')
})

app.get('/view/tech/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/blogtechmain.html')
})
app.get('/view/humour/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/bloghumourmain.html')
})
app.get('/view/travel/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/blogtravelmain.html')
})
app.get('/view/other',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/blogother.html')
})
app.get('/view/other/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/blogothermain.html')
})
app.get('/view/doctorscategory',(req, res) =>{
    res.sendFile(__dirname + '/view/Departments.html')
})
app.get('/view/doctorlist',(req, res) =>{
    res.sendFile(__dirname + '/view/doctorlist.html')
})

app.get('/view/doctorabout',(req, res) =>{
    res.sendFile(__dirname + '/view/doctorabout.html')
})
app.get('/view/reviewform',(req, res) =>{
    res.sendFile(__dirname + '/view/reviewform.html')
})
app.get('/view/drappointmentform',(req, res) =>{
    res.sendFile(__dirname + '/view/drappointmentform.html')
})
app.get('/view/blogform',(req, res) =>{
    res.sendFile(__dirname + '/view/blogform.html')
})
app.get('/view/t&co',(req, res) =>{
    res.sendFile(__dirname + '/view/t&co.html')
})
app.get('/view/donateus',(req, res) =>{
    res.sendFile(__dirname + '/view/donateus.html')
})
app.get('/view/docform',(req, res) =>{
    res.sendFile(__dirname + '/view/doctorform.html')
})
app.get('/view/meditation-cat', (req, res) => {
    res.sendFile(__dirname + '/view/meditation-cat.html')
})
app.get('/view/meditation', (req, res) => {
    res.sendFile(__dirname + '/view/meditation.html')
})
app.get('/view/meditation-profile', (req, res) => {
    res.sendFile(__dirname + '/view/meditation-profile.html')
})
app.get('/view/influencerapplication',(req, res) =>{
    res.sendFile(__dirname + '/view/influencerapplication.html')
})

app.get('/view/docdashboard',(req, res) =>{
    res.sendFile(__dirname + '/view/docdash.html')
})
app.get('/view/docprofileupdate/:postName',(req, res) =>{
    
    res.sendFile(__dirname + '/view/docprofileupdate.html')
})

app.get('/view/docappointments/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/docappoint.html')
})
app.get('/view/docreviews/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/docreviews.html')
})
app.get('/view/docprescriptions/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/docpresc.html')
})
app.get('/view/docprofile/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/docprofile.html')
})
app.get('/view/userdashboard',(req, res) =>{
    res.sendFile(__dirname + '/view/userdash.html')
})
app.get('/view/userprofileupdate/:postName',(req, res) =>{
    
    res.sendFile(__dirname + '/view/profileupdate.html')
})

app.get('/view/userappointments/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/userappoint.html')
})
app.get('/view/usertransactions/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/usertransc.html')
})
app.get('/view/userprescriptions/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/userpresc.html')
})
app.get('/view/userprofile/:postName',(req, res) =>{
    
    
    res.sendFile(__dirname + '/view/userprofile.html')
})

//payment

app.get("/view/payment", (req, res) => {
    res.sendFile(__dirname + "/view/pay.html");
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
                   res.sendFile(__dirname + '/view/home.html')
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
