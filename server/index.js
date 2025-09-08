const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Mongoose URL schema and model
const UrlSchema = new mongoose.Schema({
	longUrl: { type: String, required: true },
	shortId: { type: String, required: true }
});

const Url = mongoose.model('Url', UrlSchema);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	});


const app = express();

// Enable CORS for all origins
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
	res.send('Express server is running!');
});

app.get('/:shortId', async (req, res) => {
	const { shortId } = req.params;
	try {
		const urlDoc = await Url.findOne({ shortId });
		if (urlDoc) {
			return res.redirect(301, urlDoc.longUrl);
		} else {
			return res.status(404).send('Not Found');
		}
	} catch (err) {
		console.error('Error finding URL:', err);
		res.status(500).send('Server Error');
	}
});
// Route to shorten a URL
app.post('/api/shorten', async (req, res) => {
	const { longUrl } = req.body;
	if (!longUrl) {
		return res.status(400).json({ error: 'longUrl is required' });
	}
	const shortId = nanoid(6);
	try {
		const newUrl = new Url({ longUrl, shortId });
		await newUrl.save();
		console.log('SERVER LOG: About to send back this ID:', { shortId });
		res.json({ shortId });
	} catch (err) {
		console.error('Error saving URL:', err);
		res.status(500).json({ error: 'Failed to save URL' });
	}
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
