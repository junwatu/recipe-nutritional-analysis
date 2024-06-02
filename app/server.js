import path from 'path'
import axios from 'axios'
import express from 'express'

const app = express()
const port = 3000

const baseUrl = 'https://www.wolframcloud.com/obj/4a0af00b-e14e-4467-b292-6d0ca161ff65'

app.use(express.json())
app.use(express.static(path.join(path.resolve(), 'public')))

app.get('/', (req, res) => {
	res.send('Welcome to the Recipe Analyzer!')
})

app.post('/analyze', async (req, res) => {
	const { ingredients } = req.body
	if (!ingredients || !Array.isArray(ingredients)) {
		return res.status(400).json({ error: 'Invalid ingredients format' })
	}

	const params = new URLSearchParams({ ingredients: ingredients.join('\n') }).toString()
	const url = `${baseUrl}?${params}`

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

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})