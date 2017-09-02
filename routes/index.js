var express = require('express');
var request = require('request');
var router = express.Router();

var indexTitle = 'Rajnikanth Joke Generator by an unfunny person.';
var jokeSourceURL = 'http://api.icndb.com/jokes/random';
var queryParams = {
    firstName: 'Rajnikanth',
    lastName: ''
};
/* GET home page. */
router.get('/', function(req, res, next) {
    request.get({ url: jokeSourceURL, qs: queryParams}, function(error, response, body) {
        if (error) {
            console.log(error);
           renderError(res, { error: error});
        } else {
            var data = JSON.parse(body);
            if (data.type === 'success') {
                res.render('index', { title: indexTitle, joke: data.value.joke});
            } else {
                renderError(res, { error : 'Something happened. Rajnikanth is not on it.'})
            }
        }
    });
});

var renderError = function(res, data) {
    res.render('error', data);
}
module.exports = router;
