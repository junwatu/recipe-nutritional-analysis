import path from 'path'
import axios from 'axios'
import { URL } from 'url'
import express from 'express'
import OpenAI from 'openai'

const app = express()
// eslint-disable-next-line no-undef
const apiURL = new URL(process.env.VITE_API_URL)
const hostname = apiURL.hostname
const port = apiURL.port || 4000

const openai = new OpenAI({
	// eslint-disable-next-line no-undef
	apiKey: process.env.OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

app.use(express.json())
app.use(express.static(path.join(path.resolve(), 'public')))

app.get('/', (req, res) => {
	res.send('Welcome to the Recipe Analyzer!')
})

app.post('/analyze', async (req, res) => {
	const { ingredients } = req.body

	// check with OpenAI here and use function calling to Wolfram Cloud

	if (!ingredients || !Array.isArray(ingredients)) {
		return res.status(400).json({ error: 'Invalid ingredients format' })
	}

	const params = new URLSearchParams({ ingredients: ingredients.join('\n') }).toString()
	// eslint-disable-next-line no-undef
	const url = `${process.env.WOLFRAM_CLOUD_API}?${params}`

	try {
		const response = await axios.get(url)
		res.json(response.data)
	} catch (error) {
		console.error('Error fetching recipe:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

app.get('/nutritions', (req, res) => {
	res.send('This route will handle nutrition information.')
})

app.listen(port, hostname, () => {
	console.log(`Server is running at http://${hostname}:${port}`)
})