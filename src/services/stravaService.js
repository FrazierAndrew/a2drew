import axios from 'axios';

class StravaService {
  constructor() {
    this.accessToken = localStorage.getItem('strava_access_token');
    this.refreshToken = localStorage.getItem('strava_refresh_token');
  }

  async authenticate(code) {
    try {
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: '174379',
        client_secret: '4ee977d127977860a3c216bc7711c601cf5719e5',
        code,
        grant_type: 'authorization_code',
      });

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      
      localStorage.setItem('strava_access_token', this.accessToken);
      localStorage.setItem('strava_refresh_token', this.refreshToken);
      
      return response.data;
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  async refreshAccessToken() {
    try {
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: '174379',
        client_secret: '4ee977d127977860a3c216bc7711c601cf5719e5',
        refresh_token: this.refreshToken,
        grant_type: 'refresh_token',
      });

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;
      
      localStorage.setItem('strava_access_token', this.accessToken);
      localStorage.setItem('strava_refresh_token', this.refreshToken);
      
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }

  async getActivities(page = 1, perPage = 30) {
    try {
      const response = await axios.get(
        `https://www.strava.com/api/v3/athlete/activities?page=${page}&per_page=${perPage}&include_all_efforts=true`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        }
      );
      console.log('Raw Strava response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        await this.refreshAccessToken();
        return this.getActivities(page, perPage);
      }
      throw error;
    }
  }
}

export const stravaService = new StravaService();