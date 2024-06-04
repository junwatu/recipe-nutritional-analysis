import path from 'path'
import { URL } from 'url'
import express from 'express'
import { agent } from './libs/ai.js'

const app = express()
// eslint-disable-next-line no-undef
const apiURL = new URL(process.env.VITE_APP_URL)
const hostname = apiURL.hostname
const port = apiURL.port || 4000


app.use(express.json())
app.use(express.static(path.join(path.resolve(), 'public')))

app.get('/', (req, res) => {
	res.send('Welcome to the Recipe Analyzer!')
})

app.post('/analyze', async (req, res) => {
	const { ingredients } = req.body
	try {
		const data = await agent(ingredients)
		res.json(data)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

app.get('/nutritions', (req, res) => {
	res.send('This route will handle nutrition information.')
})

app.listen(port, hostname, () => {
	console.log(`Server is running at http://${hostname}:${port}`)
})