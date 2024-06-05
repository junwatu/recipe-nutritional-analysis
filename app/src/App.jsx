import { useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './App.css'

const App = () => {
	const [recipe, setRecipe] = useState('')
	const [markdown, setMarkdown] = useState('')
	const [loading, setLoading] = useState(false)

  // eslint-disable-next-line react/prop-types
  const MarkdownContent = ({ content }) => {
	return (
		<ReactMarkdown
			className="markdown-content"
			remarkPlugins={[remarkGfm]}
			components={{
				// eslint-disable-next-line no-unused-vars
				table: ({ node, ...props }) => (
					<table className="markdown-table" {...props} />
				),
			}}
		>
			{content}
		</ReactMarkdown>
	)
}

	const handleAnalyze = async () => {
		setLoading(true)
    setMarkdown('')
		try {
			const response = await axios.post('http://localhost:3000/analyze', { ingredients: recipe })
			setMarkdown(response.data.content)
		} catch (error) {
			console.error('Error analyzing recipe:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>Recipe Nutrition Analyzer</h1>
			<textarea
				value={recipe}
				onChange={e => setRecipe(e.target.value)}
				placeholder="Enter your recipe here"
				rows="10"
				cols="50"
			/>
			<br />
			<button onClick={handleAnalyze} disabled={loading}>
				{loading ? 'Analyzing...' : 'Analyze'}
			</button>
			{markdown && (
				<div>
					<h2>Nutrition Information</h2>
					<MarkdownContent content={markdown} />
				</div>
			)}
		</div>
	)
}

export default App