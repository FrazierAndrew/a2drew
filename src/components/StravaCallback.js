import React, { useEffect } from 'react';
import { stravaService } from '../services/stravaService';

function StravaCallback() {
  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        try {
          await stravaService.authenticate(code);
          window.location.href = '/'; // Redirect back to main page
        } catch (error) {
          console.error('Authentication error:', error);
          // Handle error appropriately
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      Connecting to Strava...
    </div>
  );
}

export default StravaCallback;
