import OpenAI from 'openai'

const messages = [
	{
		role: "system",
		content: "You are a helpful assistant. Only use the functions you have been provided with.",
	},
];

// eslint-disable-next-line no-unused-vars
const cleanupDataPrompt = async (recipe) => {
	const prompt = ` Cleanup this recipe so the ingredients is arranged line by line. remove any how to. Shorten any long ingredient description separate by comma. Answer with recipe list only.
	
	Example:

    600 g chicken drumsticks
    2 cloves garlic, (minced)
    1 tsp ginger, (minced)
    1 shallot, finely chopped
    4 tbsp soy sauce
    4 tbsp oyster sauce
    2 tbsp black pepper
    1 tbsp white pepper

    Recipe>\n
	
	${recipe}
	
	
	\nAnd use the list of ingredients result for nutrition analyze.
	`

	return prompt
}

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