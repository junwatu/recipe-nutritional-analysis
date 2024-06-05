import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './App.css'

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

const markdown = `
### Nutrition Per Food
| Input                    | Interpretation  | absolute calorie content | absolute fat content | absolute protein content | absolute carbohydrate content |
|--------------------------|-----------------|--------------------------|----------------------|--------------------------|-------------------------------|
| 600 g chicken drumsticks | 1100 Cal        | 60 g                     | 100 g                | 0 g                      | 0 g                           |
| 2 cloves garlic          | 9 Cal           | 0 g                      | 0.4 g                | 2 g                      | 0 g                           |
| 1 tsp ginger             | 2 Cal           | 0 g                      | 0 g                  | 0.2 g                    | 0.2 g                         |
| 1 shallot                | 7 Cal           | 0 g                      | 0.2 g                | 1.7 g                    | 0 g                           |
| 4 tbsp soy sauce         | 41 Cal          | 0 g                      | 8 g                  | 4 g                      | 0 g                           |
| 4 tbsp oyster sauce      | 90 Cal          | 0 g                      | 0 g                  | 20 g                     | 0 g                           |
| 2 tbsp black pepper      | 0 Cal           | 0 g                      | 0 g                  | 0 g                      | 0 g                           |
| 1 tbsp white pepper      | 21 Cal          | 0.2 g                    | 0.7 g                | 5 g                      | 0 g                           |

### Total Nutrition
| absolute calorie content | absolute fat content | absolute protein content | absolute carbohydrate content |
|--------------------------|----------------------|--------------------------|-------------------------------|
| 1270 Cal                 | 60.2 g               | 109.3 g                  | 32.9 g                        |
`

const App = () => {
	return (
		<div>
			<h1>Nutrition Information</h1>
			<MarkdownContent content={markdown} />
		</div>
	)
}

export default App