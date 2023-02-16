
const express = require('express');
const openai = require('../middlewares/openai');

let app = express.Router()

app.post('/productivity/leancanvas', async (req, res, next) => {
	try {
		let { b_desc, b_name} = req.body
		console.log(req.body)
    
        let prompt = `Create a full and consise lean canvas for the following business: 

        Business Name: ${b_name}
        Business Decription: ${b_desc}`

	const gptResponse = await openai.complete({
		engine: 'text-davinci-003',
		prompt: prompt,
		maxTokens: 1000,
		temperature: 0.3,
		topP: 1,
		frequencyPenalty: 1,
		presencePenalty: 0,
		bestOf: 1,
		n: 1,
		user: req.user._id,
		stream: false,
		stop: ["###", "<|endoftext|>", ],
	});
	// console.log(prod_name)
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
		// req.locals.inputRaw = inputRaw
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