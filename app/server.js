import path from 'path'
import { URL } from 'url'
import express from 'express'
import { agent } from './libs/ai.js'
//import { saveData, getAllData } from './griddbservices.js'

const app = express()
// eslint-disable-next-line no-undef
const apiURL = new URL(process.env.VITE_APP_URL)
const hostname = apiURL.hostname
const port = apiURL.port || 4000


app.use(express.json())
app.use(express.static(path.join(path.resolve(), 'dist')))

app.get('/', (req, res) => {
	// Serve the index.html file from the 'dist' folder
	res.sendFile(path.join(path.resolve(), 'dist', 'index.html'))
})

app.post('/analyze', async (req, res) => {
	const { ingredients } = req.body
	try {
		const data = await agent(ingredients)

		/**
		 * Save data to database
		 */
		const nutritionData = {
			recipe: data.recipe,
			nutrition: data.nutrition,
			ascii: data.ascii
		}

		console.log(nutritionData)
		//await saveData(nutritionData)
		res.json(data)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
})

/**
app.get('/nutritions', async (req, res) => {
	const allNutritionsData = await getAllData()
	res.json(allNutritionsData)
})
*/

app.listen(port, hostname, () => {
	console.log(`Server is running at http://${hostname}:${port}`)
})