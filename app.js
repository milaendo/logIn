const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const session = require('express-session')
const bodyParser = require('body-parser')

let userName = 'foo'
let password = 'bar'

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get("/", function(req, res, next){
	if (req.session.isloggedIn === true){
		res.render("index")
	}else{
  	res.redirect("/login")
  }
})
app.get("/login",function(req,res,next){
	res.render("login")
})
app.post('/login', function(req,res,next){
	if (req.body.userName === userName && req.body.pWord === password){
		req.session.isloggedIn=true
		res.redirect("/")
	}else {
		res.redirect("/login")
	}
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})