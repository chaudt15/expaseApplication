var express = require('express');
var bodyParser = require('body-parser');
var braintree = require("braintree");
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var nodemailer = require('nodemailer');
var http = require('http');
var smtpTransport = require('nodemailer-smtp-transport');
var MongoClient = mongodb.MongoClient;
var moment = require('moment');
var request = require("request");
var app = express();
var stream = require("stream");
var cors = require("cors");
app.set('port', 3300);



var transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: { user: 'tristanc5614@gmail.com',
        pass: 'nealisnumber1' }
  }));

//Configuring Express App to make use of BodyParser's JSON parser to parse
//JSON request body
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "tksyhrb5xvsy2gm5",
  publicKey: "xgrzgvvz9gmgy6hv",
  privateKey: "75c26bac6a291d214768b24cb86e37e1"
});

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(JSON.stringify(response.clientToken));
  });
});


function formatErrors(errors) {
  var formattedErrors = '';

  for (var i in errors) { // eslint-disable-line no-inner-declarations, vars-on-top
    if (errors.hasOwnProperty(i)) {
      formattedErrors += 'Error: ' + errors[i].code + ': ' + errors[i].message + '\n';
    }
  }
  return formattedErrors;
}


//************************************
//************************************
app.post('/getOrder', function(req, res) {

var jsonStr = '{"orders":[]}';
var obj = JSON.parse(jsonStr);

  console.log(JSON.stringify(req.headers));
  var emailHeader = req.body.email; 
  console.log(emailHeader);
  var writableStream = stream.Writable({objectMode: true});
  writableStream._write = function (chunk, enc, next) {
  console.log(chunk);
  console.log('This chunk is finished \n\n\n');
  console.log(chunk.amount);


obj['orders'].push({"aid": chunk.id, "amount": chunk.amount, "billingFirst": chunk.billing.firstName, "billingLast": chunk.billing.lastName });
jsonStr = JSON.stringify(obj);
console.log(jsonStr);
  next();
};



var customerStream = gateway.transaction.search(function (search) {
  search.customerEmail().is(emailHeader);
});
customerStream.pipe(writableStream);
customerStream.on("end", function () {

   function sendOrders(){
    res.send(jsonStr);
  }
  sendOrders();
  console.log('All Done');
});
});
//************************************
//************************************







app.post('/createCustomer', function(req, res) {
 var newCustomerId = req.body.customerId;
 var newCustomerEmail = req.body.email;

  gateway.customer.create({
  id: newCustomerId,
  email: newCustomerEmail
}, function (err, result) {
  result.success;
  // true

  console.log(result.customer.id);
  // e.g. 494019
});
  
});


app.post('/getOrderList', function (req, res){
var customermail = req.body.email;
gateway.transaction.search(function (search) {
  search.customerEmail().is(customermail);
}, function (err, response) {
  response.each(function (err, transaction) {
    console.log('Amount: '+ transaction.amount+'   ID: '+ transaction.id + '   Shipping First Name: ' + transaction.shipping.firstName + '   Payment Instrument Type: ' + transaction.paymentInstrumentType);
  });
});

});






app.post('/checkouts/:date', function (req, res) {
  let nonceFromTheClient = req.body.nonce;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let customerId = req.body.customerId;
  let shippingStreet = req.body.shippingStreet;
  let shippingZip = req.body.shippingZip;
  let shippingState = req.body.shippingState;
  let shippingCity = req.body.shippingCity;
  let billingCity = req.body.billingCity;
  let billingZip = req.body.billingZip;
  let billingState = req.body.billingState;
  let billingStreet = req.body.billingStreet;
  let quantity = req.body.quantity;
  let unitPrice = req.body.unitPrice;
  let email = req.body.email;
  let date = req.body.date;
  let amount = req.body.amount;


   gateway.transaction.sale({
   customerId: customerId, 
    amount: amount,
  paymentMethodNonce: nonceFromTheClient,
  customer: {
    firstName: firstName,
    lastName: lastName,
    email: email
  },
  billing: {
    firstName: firstName,
    lastName: lastName,
    streetAddress: billingStreet,
    extendedAddress: "",
    locality: billingCity,
    region: billingState,
    postalCode: billingZip,
    countryCodeAlpha2: "US"
  },
  shipping: {
    firstName: firstName,
    lastName: lastName,
    streetAddress: shippingStreet,
    extendedAddress: "",
    locality: shippingCity,
    region: shippingState,
    postalCode: shippingZip,
    countryCodeAlpha2: "US"
  },
  options: {
    submitForSettlement: true,
    storeInVaultOnSuccess: true,
    storeShippingAddressInVault: true
  }
}, function (err, result) {
      console.log(result);
      if (result.success || result.transaction) {
        console.log("This completely works functionally");
       console.log(date);
       MongoClient.connect(dbHost, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', dbHost);
    var orders = db.collection('orders');
    var products = db.collection('products');
    products.update(
      { date: date },
      { $inc: { remaining: -quantity } }
          );

    var order1 = {
    date: date,
    firstName: firstName,
    lastName: lastName,
    amount: amount,
    shippingStreet: shippingStreet,
    shippingCity: shippingCity,
    shippingState: shippingState,
    shippingZip: shippingZip,
    quantity: quantity,
    unitPrice: unitPrice,
    transactionid: result.transaction.id
    };

    orders.insert(order1, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted the order perfectly!');
      }
    });
    //Close connection
    db.close();
    
  }
});       
    } else {
      transactionErrors = result.errors.deepErrors();
      console.log(transactionErrors);
    }
    res.send(JSON.stringify({
      transactionId: result.transaction.id,
      amount: result.transaction.amount,
      quantity: quantity,
      unitPrice: unitPrice,
      orderId: result.transaction.id,
      shippingFirstName: result.transaction.shipping.firstName,
      shippingLastName: result.transaction.shipping.lastName,
      shippingStreet: result.transaction.shipping.streetAddress,
      shippingState: result.transaction.shipping.region,
      shippingZip: result.transaction.shipping.postalCode,
      shippingCity: result.transaction.shipping.locality,
      billingFirstName: result.transaction.billing.firstName,
      billingLastName: result.transaction.billing.lastName,
      billingStreet: result.transaction.billing.streetAddress,
      billingZip: result.transaction.billing.postalCode,
      billingState: result.transaction.billing.region,
      billingCity: result.transaction.billing.locality,
      cardType: result.transaction.creditCard.cardType,
      cardImage: result.transaction.creditCard.imageUrl,
      cardLastFour: result.transaction.creditCard.last4
    }));
  });

    transporter.sendMail({
    from: 'Order Confirmation <no-reply@expase.com>',
    to: email,
    subject: 'Expase Order Receipt',
    text: "test text",
    html: "<b>Amount:</b>"+amount+"",
  }, function (error, response) {
    //Email not sent
    if (error) {
      console.log(error);
    }
    //email send sucessfully
    else {
      console.log(response);
    }
  });
});


var dbHost = 'mongodb://localhost:27017/expase';
mongoose.connect(dbHost);
//Create a schema for Product
var productSchema = mongoose.Schema({
  name: String,
  //Also creating index on field date
  date: {type: String, index: true},
  author: String,
  quantity: Number,
  remaining: Number,
  description: String,
  price: Number,
  condition: String,
  shipping: String,
  scroller: String,
  imageOne: String,
  imageTwo: String,
  imageThree: String,
  imageFour: String,
  imageFive: String,
  rate: Number,
  feature1: String,
  feature2: String,
  feature3: String,
  feature4: String,
  feature5: String,
  //Object 2
  name2: String,
  quantity2: Number,
  remaining2: Number,
  description2: String,
  price2: Number,
  condition2: String,
  shipping2: String,
  scroller2: String,
  imageOne2: String,
  imageTwo2: String,
  imageThree2: String,
  imageFour2: String,
  imageFive2: String,
  rate2: Number,
  sfeature1: String,
  sfeature2: String,
  sfeature3: String,
  sfeature4: String,
  sfeature5: String
});

var orderSchema = mongoose.Schema({
    date: String,
    firstName: String,
    lastName: String,
    amount: Number,
    shippingStreet: String,
    shippingCity: String,
    shippingState: String,
    shippingZip: String
});

//Create a Model by using the schema defined above
//Optionally one can provide the name of collection where the instances
//of this model get stored. In this case it is "mongoose_demo". Skipping
//this value defaults the name of the collection to plural of model name i.e products.
var Product = mongoose.model('Product', productSchema);
var Order = mongoose.model('Order', orderSchema);
//Connecting to Mongod instance.
mongoose.connection;

//Starting up the server on the port: 3300
app.listen(app.get('port'), function(){
  console.log('Server up: http://localhost:' + app.get('port'));
});

//Get all the products
app.get('/product', function(req, res, next){
  //Find all the products in the system.
  Product.find({}, function(err, result){
    if ( err ) throw err;
    //Save the result into the response object.
    res.json(result);
  });
});

//Get all the orders
app.get('/order/:date', function(req, res, next){
  //Find all the products in the system.
  Order.find({date: req.params.date}, function(err, result){
    if ( err ) throw err;
    //Save the result into the response object.
    res.json(result);
  });
});


//Get the details of the product with the given date
app.get('/product/:date', function(req, res){
  //The parameter in the route is accessed via request.params object.
  Product.findOne({date: req.params.date}, function(err, result){
    if ( err ) throw err;
    res.json(result);
  });
});

//**************************************************************************************
//**************************************************************************************
//---------------------------------TIME COMPONENT---------------------------------------
//**************************************************************************************
//**************************************************************************************
var topMinutes = 1;
var topSeconds = 30;
var minutes = 1;
var seconds = 1;
var dollars = 0
var cents = 0;
var total;
var name;
var isActive;
var hoursLeft;
var momentHour;
var rateFinal;


setInterval(()=>tick(),1000);
setInterval(()=>getMoment(),5000);
setInterval(()=>setActiveTime(),10000);


function resetTimer(){
        minutes = topMinutes;
        seconds = topSeconds;
}



 function getMoment(){
  let dayOfMonth = moment().utcOffset("-04:00").date();
  if (dayOfMonth >= 1 && dayOfMonth <=9){
    dayOfMonth = "0" + dayOfMonth;
  }
  let monthOfYear = moment().utcOffset("-04:00").month() + 1;
  let yearOfYear = moment().utcOffset("-04:00").year();
  
  request("http://expase.com:3300/currentdeal/", function(error, response, body) {
  var firstObject = body;
  var secondObject = JSON.parse(firstObject);
  rateFinal = secondObject.rate;
  });
}   

function setActiveTime(){
   momentObject = moment().toObject();
   momentHour = momentObject.hours;
   console.log('Hours' + momentHour);
   hoursLeft = 0; 
   momentMin = momentObject.minutes;
   roundNumber = 1;

    if (momentHour == 1){
      hoursLeft = 3;
      isActive = true;
      roundNumber = 2;
      setDealSwitch(2);
      updateGetActive(3, true);
    }

    if (momentHour == 2){
      hoursLeft = 2;
      isActive = true;
      roundNumber = 2;
      setDealSwitch(2);
      updateGetActive(2, true);
    }


    if (momentHour == 3){
      hoursLeft = 1;
      isActive = true;
      roundNumber = 2;
      setDealSwitch(2);
      updateGetActive(1, true);
    }

    if (momentHour == 4){
      hoursLeft = 0;
      isActive = true;
      roundNumber = 2;
      setDealSwitch(2);
      updateGetActive(0, true);
    }

    if (momentHour == 5){
      hoursLeft = 11;
      isActive = false;
      roundNumber = 3;
      updateGetActive(11, false);
      setDealSwitch(3);
    }

    if (momentHour == 6){
      hoursLeft = 10;
      isActive = false;
      roundNumber = 3;
      updateGetActive(10, false);
      setDealSwitch(3);
      
    }

    if (momentHour == 7){
      hoursLeft = 9;
      isActive = false;
      roundNumber = 3;
      updateGetActive(9, false);
      setDealSwitch(3);
    }

    if (momentHour == 8){
      hoursLeft = 8;
      isActive = false;
      roundNumber = 3;
      updateGetActive(8, false);
      setDealSwitch(3);
    }

    if (momentHour == 9){
      hoursLeft = 7;
      isActive = false;
      roundNumber = 3;
      updateGetActive(7, false);
      setDealSwitch(3);
    }

    if (momentHour == 10){
      hoursLeft = 6;
      isActive = false;
      roundNumber = 3;
      updateGetActive(6, false);
      setDealSwitch(3);
    }

    if (momentHour == 11){
      hoursLeft = 5;
      isActive = false;
      roundNumber = 3;
      updateGetActive(5, false);
      setDealSwitch(3);
    }

    if (momentHour == 12){
      hoursLeft = 4;
      isActive = false;
      roundNumber = 3;
      updateGetActive(4, false);
      setDealSwitch(3);
    }

    if (momentHour == 13){
      hoursLeft = 3;
      isActive = false;
      roundNumber = 3;
      updateGetActive(3, false);
      setDealSwitch(3);
    }

    if (momentHour == 14){
      hoursLeft = 2;
      isActive = false;
      roundNumber = 3;
      updateGetActive(2, false);
      setDealSwitch(3);
    }

    if (momentHour == 15){
      hoursLeft = 1;
      isActive = false;
      roundNumber = 3;
      updateGetActive(1, false);
      setDealSwitch(3);
    }

    if (momentHour == 16){
      hoursLeft = 0;
      isActive = false;
      roundNumber = 3;
      updateGetActive(0, false);
      setDealSwitch(3);
    }

    if (momentHour == 17){
      var d = new Date();
      var n = d.getMinutes();
     resetProductPrice(n);
      hoursLeft = 11;
      isActive = true;
      roundNumber = 1;
      setDealSwitch(1);
      updateGetActive(11, true);

    }

    if (momentHour == 18){
      hoursLeft = 10;
      isActive = true;
      roundNumber = 1;
      setDealSwitch(1);
      updateGetActive(10, true);
    }

    if (momentHour == 19){
      hoursLeft = 9;
      isActive = true;
      roundNumber = 1;
      setDealSwitch(1);
      updateGetActive(9, true);
    }

    if (momentHour == 20){
      hoursLeft = 8;
      isActive = true;
      roundNumber = 1;
      setDealSwitch(1);
      updateGetActive(8, true);
    }


    if (momentHour == 21){
      hoursLeft = 7;
      isActive = true;
      roundNumber = 1;
      setDealSwitch(1);
      updateGetActive(7, true);
    }


    if (momentHour == 22){
      hoursLeft = 6;
      isActive = true;
      roundNumber = 1;
      setDealSwitch(1);
      updateGetActive(6, true);
    }


    if (momentHour == 23){
      var d = new Date();
      var n = d.getMinutes();
      hoursLeft = 5;
      isActive = true;
      roundNumber = 2;
      resetProductPrice(n);
      setDealSwitch(2);
      updateGetActive(5, true);
    }


    if (momentHour == 24 || momentHour == 0){
      hoursLeft = 4;
      isActive = true;
      roundNumber = 2;
      setDealSwitch(2);
      updateGetActive(4, true);
    }
}




function updateGetActive(hours1, active1){

 app.get('/active', function(req, res){
  res.json({
    isActive: isActive,
    hoursLeft: hoursLeft,
    currentHour: momentHour,
    currentMin: momentMin,
    momentObject: momentObject,
    round: roundNumber
  });
});
}



function tick(){
        if(cents>99){
            dollars++;
            cents=0;
        }
        if (--seconds < 0){
            seconds =59;
            if(--minutes < 0){
                minutes =1;
                seconds =59;
                cents = cents + rateFinal;
                total = total + rateFinal;
                console.log('Price is going up by '+rateFinal);
}}}

function resetProductPrice(number){
if(number<2){
  dollars = 0;
  cents = 0;
}
}


  

app.get('/time', function(req, res){
  dayOfMonth = moment().date();
  monthOfYear = moment().month() + 1;
  yearOfYear = moment().year();
  res.json({
    minutes: minutes,
    seconds: seconds,
    dayOfMonth: dayOfMonth,
    monthOfYear: monthOfYear,
    year: yearOfYear
  });
});

app.get('/price', function(req, res){
  res.json({
    dollars: dollars,
    cents: cents,
    total: (dollars*100)+cents,
    rate: rateFinal
  });
});

app.on('listening', function () {
});
//**************************************************************************************
//**************************************************************************************
//**************************************************************************************
//**************************************************************************************

//Add a new product
app.post("/product", function(req, res, next){
  console.log("Adding new Product: " + req.body.name);
  var product = new Product({
    name:req.body.name,
    date: req.body.date,
    quantity: req.body.quantity,
    remaining: req.body.remaining,
    description: req.body.description,
    price: req.body.price,
    condition: req.body.condition,
    shipping: req.body.shipping,
    scroller: req.body.scroller,
    imageOne: req.body.imageOne,
    imageTwo: req.body.imageTwo,
    imageThree: req.body.imageThree,
    imageFour: req.body.imageFour,
    imageFive: req.body.imageFive,
    rate: req.body.rate,
    feature1: req.body.feature1,
    feature2: req.body.feature2,
    feature3: req.body.feature3,
    feature4: req.body.feature4,
    feature5: req.body.feature5,
    //Object 2
    name2:req.body.name2,
    date2: req.body.date2,
    quantity2: req.body.quantity2,
    remaining2: req.body.remaining2,
    description2: req.body.description2,
    price2: req.body.price2,
    condition2: req.body.condition2,
    shipping2: req.body.shipping2,
    imageOne2: req.body.imageOne2,
    imageTwo2: req.body.imageTwo2,
    imageThree2: req.body.imageThree2,
    imageFour2: req.body.imageFour2,
    imageFive2: req.body.imageFive2,
    rate2: req.body.rate2,
    sfeature1: req.body.sfeature1,
    sfeature2: req.body.sfeature2,
    sfeature3: req.body.sfeature3,
    sfeature4: req.body.sfeature4,
    sfeature5: req.body.sfeature5,
  });

  //Saving the model instance to the DB
  product.save(function(err, result){
    if ( err ) throw err;
    //After successfully saving the product we generate a JSON response with the
    //message and the inserted product information.
    res.json({
      message:"Successfully added product",
      product:result
    });
  });
});

//Update an existing product
app.put("/product/:date", function(req, res){
  Product.findOne({date: req.params.date}, function(err, result){
    if ( err ) throw err;

    if(!result){
      res.json({
        message:"Product with date: " + req.params.date+" not found.",
      });
    }

    result.name   = req.body.name;
    result.date   = req.body.date;
    result.quantity  = req.body.quantity;
    result.remaining = req.body.remaining;
    result.descripton = req.body.description;
    result.price = req.body.price;
    result.condition = req.body.condition;
    result.shipping = req.body.shipping;
    result.scroller = req.body.scroller;
    result.imageOne = req.body.imageOne;
    result.imageTwo = req.body.imageTwo;
    result.imageThree = req.body.imageThree;
    result.imageFour = req.body.imageFour;
    result.imageFive = req.body.imageFive;
    result.rate = req.body.rate;

    result.feature1 = req.body.feature1;
    result.feature2 = req.body.feature2;
    result.feature3 = req.body.feature3;
    result.feature4 = req.body.feature4;
    result.feature5 = req.body.feature5;
    //Object 2
    result.name2   = req.body.name2;
    result.date2   = req.body.date2;
    result.quantity2  = req.body.quantity2;
    result.remaining2 = req.body.remaining2;
    result.descripton2 = req.body.description2;
    result.price2 = req.body.price2;
    result.condition2 = req.body.condition2;
    result.shipping2 = req.body.shipping2;
    result.imageOne2 = req.body.imageOne2;
    result.imageTwo2 = req.body.imageTwo2;
    result.imageThree2 = req.body.imageThree2;
    result.imageFour2 = req.body.imageFour2;
    result.imageFive2 = req.body.imageFive2;
    result.rate2 = req.body.rate2;

    result.sfeature1 = req.body.sfeature1;
    result.sfeature2 = req.body.sfeature2;
    result.sfeature3 = req.body.sfeature3;
    result.sfeature4 = req.body.sfeature4;
    result.sfeature5 = req.body.sfeature5;


    result.save(function(err, result){
      if ( err ) throw err;
      res.json({
        message:"Successfully updated the product",
        product: result
      });
    });
  });
});

//Delete an existing product
app.delete("/product/:date", function(req, res){
  Product.findOneAndRemove({date: req.params.date}, function(err, result){
      res.json({
        message: "Successfully deleted the product",
        product: result
      });
  });
});



productNameDatabase='a';
productQuantityDatabase=1;
productRemainingDatabase=1;
productDescriptionDatabase='a';
productPriceDatabase=1;
productConditionDatabase='a';
productShippingDatabase='a';
productScrollerDatabase='a';
productImage1Database='a';
productImage2Database='a';
productImage3Database='a';
productImage4Database='a';
productImage5Database='a';
productFeature1 = 'a';
productFeature2 = 'a';
productFeature3 = 'a';
productFeature4 = 'a';
productFeature5 = 'a';
productRate = 1;


app.get('/currentdeal', function(req, res){

  currentDateUTC = moment().utcOffset("-05:00").format('DDMMY');    
  res.json({
    "name": productNameDatabase,
    "date": currentDateUTC, 
    "quantity": productQuantityDatabase,
    "remaining": productRemainingDatabase,
    "description": productDescriptionDatabase,
    "price": productPriceDatabase,
    "condition": productConditionDatabase,
    "shipping": productShippingDatabase,
    "scroller": productScrollerDatabase,
    "imageOne": productImage1Database,
    "imageTwo": productImage2Database,
    "imageThree": productImage3Database,
    "imageFour": productImage4Database,
    "imageFive": productImage5Database,
    "rate": productRate,
    "feature1": productFeature1,
    "feature2": productFeature2,
    "feature3": productFeature3,
    "feature4": productFeature4,
    "feature5": productFeature5

      });

});











app.get('/testit', function(req, res){
  setDealSwitch();
  datez = moment().utcOffset("-05:00").format('DDMMY');    
  res.json({"message": productNameDatabase, "moment": datez, "name": productNameDatabase  });
});



productNameDatabase = 'hello';
testDBName = 'This is a test demo title';





function setDealSwitch(rate){
  datez = moment().utcOffset("-05:00").format('DDMMY');    
  var options = {
      url: 'http://expase.com:3300/product/'+datez,
      method: 'GET',
      json:true
  }


  if (rate==1){
  request(options, function(error, response, body){
      if(error) {
        console.log(error);
      }
      else {
        productNameDatabase = body.name;
        productQuantityDatabase = body.quantity;
        productRemainingDatabase = body.remaining;
        productDescriptionDatabase = body.description;
        productPriceDatabase = body.price;
        productConditionDatabase = body.condition;
        productShippingDatabase = body.shipping;
        productScrollerDatabase = body.scroller;
        productImage1Database = body.imageOne;
        productImage2Database = body.imageTwo;
        productImage3Database = body.imageThree;
        productImage4Database = body.imageFour;
        productImage5Database = body.imageFive;
        productRate = body.rate;
        productFeature1 = body.feature1;
        productFeature2 = body.feature2;
        productFeature3 = body.feature3;
        productFeature4 = body.feature4;
        productFeature5 = body.feature5;
        if (productRemainingDatabase <=0){
          console.log('SOLD OUT');
        }
        if(productRemainingDatabase >0){
          console.log('IN STOCK');
        }
      }
  });
}
if(rate==2){
  request(options, function(error, response, body){
      if(error) {
        console.log(error);
      }
      else {
        productNameDatabase = body.name2;
        productQuantityDatabase = body.quantity2;
        productRemainingDatabase = body.remaining2;
        productDescriptionDatabase = body.description2;
        productPriceDatabase = body.price2;
        productConditionDatabase = body.condition2;
        productShippingDatabase = body.shipping2;
        productScrollerDatabase = body.scroller2;
        productImage1Database = body.imageOne2;
        productImage2Database = body.imageTwo2;
        productImage3Database = body.imageThree2;
        productImage4Database = body.imageFour2;
        productImage5Database = body.imageFive2;
        productRate = body.rate2;
        productFeature1 = body.sfeature1;
        productFeature2 = body.sfeature2;
        productFeature3 = body.sfeature3;
        productFeature4 = body.sfeature4;
        productFeature5 = body.sfeature5;
        if (productRemainingDatabase <=0){
          console.log('SOLD OUT');
        }
        if(productRemainingDatabase >0){
          console.log('IN STOCK');
        }
      }
  });
}
 if (rate==3){
  request(options, function(error, response, body){
      if(error) {
        console.log(error);
      }
      else {
        productNameDatabase = 'Intermission';
        productQuantityDatabase = 0;
        productRemainingDatabase = 0;
        productDescriptionDatabase = 'Intermission';
        productPriceDatabase = 0;
        productConditionDatabase = 'Intermission';
        productShippingDatabase = 'Intermission';
        productScrollerDatabase = 'Intermission';
        productImage1Database = 'Intermission';
        productImage2Database = 'Intermission';
        productImage3Database = 'Intermission';
        productImage4Database = 'Intermission';
        productImage5Database = 'Intermission';
        productFeature1 = 'Intermission';
        productFeature2 = 'Intermission';
        productFeature3 = 'Intermission';
        productFeature4 = 'Intermission';
        productFeature5 = 'Intermission';
        productRate = 0;
       
      }
  });
}

}
