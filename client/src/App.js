
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/shorten', { longUrl });
      setShortUrl(response.data.shortId);
    } catch (error) {
      setShortUrl('');
      alert('Failed to shorten URL');
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a long URL"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Your short URL:</p>
          <a
            href={`http://localhost:5000/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`http://localhost:5000/${shortUrl}`}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
