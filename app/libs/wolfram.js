import axios from 'axios'

export const analyzeIngredients = async (ingredients) => {
	if (!ingredients || !Array.isArray(ingredients)) {
		throw new Error('Invalid ingredients format')
	}

	const params = new URLSearchParams({ ingredients: ingredients.join('\n') }).toString()
	// eslint-disable-next-line no-undef
	const url = `${process.env.WOLFRAM_CLOUD_API}?${params}`

	try {
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		console.error('Error fetching recipe:', error)
		throw new Error('Internal Server Error')
	}
}