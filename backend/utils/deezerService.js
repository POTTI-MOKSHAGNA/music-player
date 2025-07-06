const axios = require('axios');

const DEEZER_API_URL = process.env.DEEZER_API_URL || 'https://api.deezer.com';

const deezerService = {
  async search(query, type = 'track', limit = 25) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/search/${type}`, {
        params: {
          q: query,
          limit,
          output: 'json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Deezer search failed: ${error.message}`);
    }
  },

  async getTrack(id) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/track/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get track: ${error.message}`);
    }
  },

  async getAlbum(id) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/album/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get album: ${error.message}`);
    }
  },

  async getArtist(id) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/artist/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get artist: ${error.message}`);
    }
  },

  async getChart(limit = 50) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/chart/0/tracks`, {
        params: {
          limit,
          output: 'json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get chart: ${error.message}`);
    }
  },

  async getGenres() {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/genre`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get genres: ${error.message}`);
    }
  },

  async getTracksByGenre(genreId, limit = 25) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/genre/${genreId}/artists`, {
        params: {
          limit,
          output: 'json'
        }
      });
      
      if (response.data.data && response.data.data.length > 0) {
        const artistId = response.data.data[0].id;
        const tracksResponse = await axios.get(`${DEEZER_API_URL}/artist/${artistId}/top`, {
          params: {
            limit,
            output: 'json'
          }
        });
        return tracksResponse.data;
      }
      
      return { data: [] };
    } catch (error) {
      throw new Error(`Failed to get tracks by genre: ${error.message}`);
    }
  },

  async getArtistTopTracks(artistId, limit = 25) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/artist/${artistId}/top`, {
        params: {
          limit,
          output: 'json'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get artist top tracks: ${error.message}`);
    }
  },

  async getAlbumTracks(albumId) {
    try {
      const response = await axios.get(`${DEEZER_API_URL}/album/${albumId}/tracks`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get album tracks: ${error.message}`);
    }
  }
};

module.exports = deezerService;