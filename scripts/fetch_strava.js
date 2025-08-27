#!/usr/bin/env node
/* Fetch Strava activities to public/strava_activities.json */
const fs = require('fs');
const path = require('path');

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;
const PER_PAGE = parseInt(process.env.STRAVA_PER_PAGE || '30', 10);
const PAGES = parseInt(process.env.STRAVA_PAGES || '1', 10);

if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
  console.error('Missing env vars. Set STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN');
  process.exit(1);
}

async function exchangeToken() {
  const res = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  if (!res.ok) throw new Error(`Token exchange failed: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

async function fetchPage(token, page) {
  const url = `https://www.strava.com/api/v3/athlete/activities?per_page=${PER_PAGE}&page=${page}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Fetch activities failed: ${res.status}`);
  return res.json();
}

function pickFields(a) {
  return {
    id: a.id,
    name: a.name,
    distance: a.distance,
    moving_time: a.moving_time,
    start_date: a.start_date,
    map: a.map ? { summary_polyline: a.map.summary_polyline } : null,
  };
}

(async () => {
  try {
    const token = await exchangeToken();
    let all = [];
    for (let p = 1; p <= PAGES; p++) {
      const page = await fetchPage(token, p);
      if (!page || page.length === 0) break;
      all = all.concat(page);
      if (page.length < PER_PAGE) break;
    }
    const slim = all.map(pickFields);
    const outPath = path.join(__dirname, '..', 'public', 'strava_activities.json');
    fs.writeFileSync(outPath, JSON.stringify(slim, null, 2));
    console.log(`Wrote ${slim.length} activities to ${outPath}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
