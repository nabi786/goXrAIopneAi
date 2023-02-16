
const express = require('express');
const openai = require('../middlewares/openai');

let app = express.Router()

app.post('/business/productdesc', async (req, res, next) => {
	try {
		let { prod_name, prod_char} = req.body
		console.log(req.body)
	// let prompt = `Suggest three names for a business.

    // Business: Breakfast Cafe
    // Names: Morning Diner, Waffle Spot, Good Day Breakfast Cafe
    // Business: Pet yoys 
    // Names: Bestfriend toys , Canine paradise, Bark-a-Lot
    // Business: ${content1}
    // Names:`;
    
    let prompt = `Create a concise and compeling product description: Product/Service Name: ${prod_name}\nProduct/Service Characteristics: ${prod_char}\nLanguage: English`
	let inputRaw = ` ${prod_name}`
	prompt 
console.log('PROMPT ' + prompt)
	const gptResponse = await openai.complete({
		engine: 'text-davinci-003',
		prompt: prompt,
		maxTokens: 300,
		temperature: 0.7,
		topP: 1,
		frequencyPenalty: 1,
		presencePenalty: 0,
		bestOf: 1,
		n: 1,
		user: req.user._id,
		stream: false,
		stop: ["###", "<|endoftext|>", ],
	});
	console.log(prod_name)
	let outputs = []
    
	let output = `${gptResponse.data.choices[0].text}`
    console.log("RAW output" + output)
		// remove the first character from output
		output = output.substring(1, output.length)

		// If the output string ends with one or more hashtags, remove all of them
		if (output.endsWith('"')) {
			output = output.substring(0, output.length - 1)
		}

		// If the output string ends with one or more hashtags, remove all of them
		if (output.endsWith('"')) {
			output = output.substring(0, output.length - 1)
		}

		// remove a single new line at the end of output if there is one
		if (output.endsWith('\n')) {
			output = output.substring(0, output.length - 1)
		}
	
		req.locals.input = prompt
		req.locals.inputRaw = inputRaw
		req.locals.output = output

    console.log("Final output" + output)
	next()

	} catch (err){
		console.log(err.response)
		console.log(err.data)
		console.log(err.message)
	}
	
  })

module.exports = app