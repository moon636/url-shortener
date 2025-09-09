
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [wasExisting, setWasExisting] = useState(null); // null = not shown, true = existing, false = new
  const [isCopied, setIsCopied] = useState(false);
  const [customAlias, setCustomAlias] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/shorten`, { longUrl, customAlias });

  setShortUrl(response.data.shortId);
  setWasExisting(response.data.wasExisting);
    } catch (error) {
  setShortUrl('');
  setWasExisting(null);
      if (error.response && error.response.status === 409) {
        alert('That custom name is already taken. Please try another one.');
      } else {
        alert('Failed to shorten URL');
      }
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) return;
    try {
      await navigator.clipboard.writeText(`${process.env.REACT_APP_API_URL}/${shortUrl}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      // Optionally handle error
    }
  };

  return (
    <div className="App">
      <div className="shortener-card">
        <form onSubmit={handleSubmit}>
          <input
            className="url-input"
            type="text"
            placeholder="Enter a long URL"
            value={longUrl}
            onChange={e => setLongUrl(e.target.value)}
          />
          <input
            className="url-input"
            type="text"
            placeholder="Optional: your-custom-name"
            value={customAlias}
            onChange={e => setCustomAlias(e.target.value)}
            style={{ marginTop: '1rem' }}
          />
          <button className="shorten-button" type="submit">Shorten</button>
        </form>
        <div className="result-container">
          {shortUrl && (
            <div style={{ marginTop: '20px' }}>
              <p>Your short URL:</p>
              <a
                href={`${process.env.REACT_APP_API_URL}/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${process.env.REACT_APP_API_URL}/${shortUrl}`}
              </a>
              {shortUrl && (
                <button
                  type="button"
                  style={{ marginLeft: '1rem', padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#2196f3', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                  onClick={handleCopy}
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </button>
              )}
              {wasExisting === true && (
                <p style={{ color: '#ffd600', marginTop: '10px' }}>This link was already in the database.</p>
              )}
              {wasExisting === false && (
                <p style={{ color: '#69f0ae', marginTop: '10px' }}>A new short URL was just created for you!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
