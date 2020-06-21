const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
extended:true
}));
mongoose.connect("mongodb://localhost:27017/wikiDB");
app.use(express.static("public"));
app.listen(3000,function(){
    console.log("server running on port 3000");
})
    