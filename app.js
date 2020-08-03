const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public")); //allows you to use the public folder on your local machine

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email; 

    //creating an object to hold body of request
    var data = {
        //members comes from the API Docs
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    // change js object into json
    var jsonData = JSON.stringify(data);


//options object for the request fxn
var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/516cc78698",
    mehtod: "POST",  
    headers: { //authentication using basic request
        "Authorization": "Awuah10 9b97c44ec5adde1606d7be206ede5425-us17"
    },
    body: jsonData 
    
};

request(options, function(error, response, body){
    if(error){
        res.sendFile(__dirname + "/failure.html");
    }else{
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
    }
})

});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000, function(req, res){
    console.log("server running on port 3000");

})  

//API key 
//9b97c44ec5adde1606d7be206ede5425-us17   api key for mailchimp

//list id.
// 516cc78698 