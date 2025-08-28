const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
	res.send('Express server is running!');
});

app.get('/:shortId', (req, res) => {
	const { shortId } = req.params;
	res.send(`This will redirect to... ${shortId}`);
});
// Route to shorten a URL
app.post('/api/shorten', (req, res) => {
	const { longUrl } = req.body;
	if (!longUrl) {
		return res.status(400).json({ error: 'longUrl is required' });
	}
	const shortId = nanoid(6);
	res.json({ shortId });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
