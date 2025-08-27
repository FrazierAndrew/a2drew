#!/usr/bin/env node
/*
 Exchange an OAuth authorization code for Strava tokens.
 Usage:
   STRAVA_CLIENT_ID=xxxx STRAVA_CLIENT_SECRET=yyyy STRAVA_CODE=zzzz node -r dotenv/config scripts/strava_exchange_code.js dotenv_config_path=.env.local
 Optional:
   STRAVA_UPDATE_ENV=true  # append STRAVA_REFRESH_TOKEN=... to .env.local
*/
const fs = require('fs');
const path = require('path');

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const CODE = process.env.STRAVA_CODE;
const UPDATE_ENV = (process.env.STRAVA_UPDATE_ENV || '').toLowerCase() === 'true';

if (!CLIENT_ID || !CLIENT_SECRET || !CODE) {
  console.error('Missing STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, or STRAVA_CODE');
  process.exit(1);
}

(async () => {
  try {
    const res = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: CODE,
        grant_type: 'authorization_code',
      }),
    });
    if (!res.ok) throw new Error(`Exchange failed: ${res.status}`);
    const data = await res.json();

    console.log('\nTokens received:');
    console.log(JSON.stringify({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: data.expires_at,
      athlete: data.athlete && { id: data.athlete.id, firstname: data.athlete.firstname }
    }, null, 2));

    if (UPDATE_ENV) {
      const envPath = path.join(process.cwd(), '.env.local');
      const line = `\nSTRAVA_REFRESH_TOKEN=${data.refresh_token}\n`;
      fs.appendFileSync(envPath, line);
      console.log(`\nAppended STRAVA_REFRESH_TOKEN to ${envPath}`);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
