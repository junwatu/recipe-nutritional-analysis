import OpenAI from 'openai'

const messages = [
	{
		role: "system",
		content: "You are a helpful assistant. Only use the functions you have been provided with.",
	},
];

const tools = [{
	type: "function",
	function: {
		name: "analyzeIngredients",
		description: "Analyze a list of ingredients using the Wolfram Cloud API",
		parameters: {
			type: "object",
			properties: {
				ingredients: {
					type: "array",
					items: {
						type: "string",
					},
					description: "An array of ingredient strings to be analyzed"
				},
			},
			required: ["ingredients"],
		},
	}
}]

const openai = new OpenAI({
	// eslint-disable-next-line no-undef
	apiKey: process.env.OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

export async function agent(userInput) {
	messages.push({
		role: "user",
		content: `Analyze a list of ingredients: \n${userInput}`,
	});
	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: messages,
		tools: tools,
	});
	console.log(response);
}

export default openai;