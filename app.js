const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
extended:true
}));
mongoose.connect("mongodb://localhost:27017/wikiDB",{ useNewUrlParser: true , useUnifiedTopology: true  });
app.use(express.static("public"));
const articleSchema = {
    title:String,
    content:String
}
const Article = mongoose.model("Article",articleSchema);
//////////////////////////////resquests targeting all articles////////////////////////////////////
app.route("/articles")
.get(function(req,res){
    Article.find(function(err,foundArticles){
        if(!err){
     res.send(foundArticles);
        }else{
            res.send(err);
        }
    });
 })
 .post(function(req,res){
    const newArticle = new Article({
        title:req.body.title,
        content:req.body.content
    });
    newArticle.save(function(err){
        if(!err){
            res.send("successfully added");
        }else{
            res.send(err);
        }
    });
})
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted");
        }else{
            res.send(err);
        }
    })
});
//////////////////////////////resquests targeting specific articles////////////////////////////////////
app.route("/articles/:articleTitle")
.get(function(req,res){
    Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("no articles found");
        }
    })
})
app.listen(3000,function(){
    console.log("server running on port 3000");
})
    