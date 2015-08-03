var express    = require('express');
var bodyParser = require('body-parser');
var swords = require('./routes/swords')
var potions = require('./routes/potions')

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/swords', swords);
app.use('/api/potions', potions);
// app.use('/', routes);

var server = app.listen(8080, function() {
var host = server.address().address;
var port = server.address().port;

console.log('Woot, server started', host, port);
});
