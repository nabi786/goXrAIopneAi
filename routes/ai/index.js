
const express = require('express');
const openai = require('../middlewares/openai');
const { 
	initMiddleware,
	creditCheck,
	contentFilterCheck,
	sendResponse,
	creditPayment,
	saveToHistory,
}  = require('./middleware');

let app = express.Router()

app.use('/', initMiddleware, creditCheck); 

app.use('/', require('./businessname'));
app.use('/', require('./businessidea'));
app.use('/', require('./leancanvas'));
app.use('/', require('./freestyle'));
app.use('/', require('./summarize'));
app.use('/', require('./productdesc'));
app.use('/', require('./rephrase'));
app.use('/', require('./expand'));
app.use('/', require('./emailgen'));
app.use('/', require('./code/interpret'));
app.use('/', require('./writing/intro'));
app.use('/', require('./jobad'));
app.use('/', require('./helloworld'));
app.use('/', require('./example'));
app.use('/', require('./explain'));

app.use('/', contentFilterCheck); 
app.use('/', creditPayment); 
app.use('/', saveToHistory); 

app.use('/', sendResponse); 

module.exports = app