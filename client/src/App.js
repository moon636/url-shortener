
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  console.log('The API URL is:', process.env.REACT_APP_API_URL);


  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('${process.env.REACT_APP_API_URL}/api/shorten', { longUrl });

      console.log('Response from server:', response.data); 


      setShortUrl(response.data.shortId);
    } catch (error) {
      setShortUrl('');
      alert('Failed to shorten URL');
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
          <button className="shorten-button" type="submit">Shorten</button>
        </form>
        <div className="result-container">
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
      </div>
    </div>
  );
}

export default App;
