import OpenAI from 'openai'
import { analyzeIngredients } from './wolfram.js';

const messages = [
	{
		role: "system",
		content: "You are a helpful assistant. Only use the functions you have been provided with.",
	},
];

const availableTools = {
	analyzeIngredients
};

const tools = [{
	type: "function",
	function: {
		name: "analyzeIngredients",
		description: "Analyze the nutrition for a list of ingredients using the Wolfram Cloud API",
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

export async function agent(foodRecipe) {
	messages.push({
		role: "user",
		content: `Cleanup this recipe so the ingredients are arranged line by line.remove any how- to.Shorten any long ingredient description separated by a comma.Answer with the recipe list only.

			Example:

	600 g chicken drumsticks
	2 cloves garlic, (minced)
	1 tsp ginger, (minced)
	1 shallot, finely chopped
	4 tbsp soy sauce
	4 tbsp oyster sauce
	2 tbsp black pepper
	1 tbsp white pepper

	Recipe >\n
	
	${foodRecipe}

	\nchange the ingredient name to match with Wolfram database and use the list of ingredient results for nutrition analysis. 
	`,
	});

	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: messages,
		tools: tools,
	});

	console.log(response.choices[0].message?.tool_calls[0].function);
	const { finish_reason, message } = response.choices[0];

	if (finish_reason === "tool_calls" && message.tool_calls) {
		const functionName = message.tool_calls[0].function.name;
		const functionToCall = availableTools[functionName];
		const functionArgs = JSON.parse(message.tool_calls[0].function.arguments);
		const functionArgsArr = Object.values(functionArgs);
		const functionResponse = await functionToCall.apply(null, functionArgsArr);

		const readDataByAI = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [{ role: 'user', content: `Fill the empty data if possible. Create a clean markdown table from this nutrition data. Answer table data only:\n ${functionResponse}\n` }]
		})

		console.log(readDataByAI.choices[0].message);
		return readDataByAI.choices[0].message;
	}
}

export default openai;
