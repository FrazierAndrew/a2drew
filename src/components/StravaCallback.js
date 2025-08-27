import React, { useEffect, useState } from 'react';

function StravaCallback() {
  const [code, setCode] = useState('');
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    
    if (authCode) {
      setCode(authCode);
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'monospace' }}>
      <h2>Strava Authorization Code</h2>
      {code ? (
        <div>
          <p>Copy this code:</p>
          <div style={{ 
            background: '#f0f0f0', 
            padding: '20px', 
            margin: '20px', 
            borderRadius: '8px',
            wordBreak: 'break-all',
            fontSize: '14px'
          }}>
            {code}
          </div>
          <button 
            onClick={copyToClipboard}
            style={{
              padding: '10px 20px',
              background: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Copy Code
          </button>
        </div>
      ) : (
        <p>No authorization code found in URL</p>
      )}
    </div>
  );
}

export default StravaCallback;
