const express = require('express');
const flash = require('express-flash');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cricket = require('./src/CricketScoreKeeper');
const app = express();
const session = require('express-session');


const cricket_score = cricket();

 app.use(session({
  secret : "12345",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: 'some/path',
  layoutsDir: 'views/layouts',
}));

app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  console.log(cricket_score.whoWhon())
  res.render('index', {
    team1: cricket_score.returnOver().team1,
    team2: cricket_score.returnOver().team2,
    message: cricket_score.errorMessage(),
    alert: cricket_score.whoWhon()
  })
});

app.post('/add/:team', function (req, res){
  let score = req.body.inputB
  let team = req.params.team
  cricket_score.addScore(team,score)
  res.redirect('/')
});

app.post('/set', function(req,res){
  let setOvers = req.body.setOvers
  cricket_score.setOver(setOvers)
  res.redirect('/')
})

let PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});