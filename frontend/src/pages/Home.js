import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import TrackCard from '../components/TrackCard';
import { useDeezer } from '../hooks/useDeezer';
import { usePlayer } from '../context/PlayerContext';

const Home = () => {
  const [chartTracks, setChartTracks] = useState([]);
  const { getChart, getGenres, loading, error } = useDeezer();
  const { playQueue } = usePlayer();

  useEffect(() => {
  const loadInitialData = async () => {
    try {
      const chartData = await getChart(20);
      if (chartData?.data) setChartTracks(chartData.data);
    } catch (err) {
      console.error('Failed to load initial data:', err);
    }
  };

  loadInitialData();
}, [getChart, getGenres]);

  const handlePlayAll = () => {
    if (chartTracks.length > 0) {
      playQueue(chartTracks, 0);
    }
  };

  if (loading && chartTracks.length === 0) {
    return (
      <div className="page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-title">
        Good {getGreeting()}! 🎵
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="section">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px' 
        }}>
          <h2 className="section-title">Trending Now</h2>
          {chartTracks.length > 0 && (
            <button className="btn" onClick={handlePlayAll}>
              ▶️ Play All
            </button>
          )}
        </div>

        {chartTracks.length > 0 ? (
          <div className="search-results">
            {chartTracks.map((track) => (
              <TrackCard 
                key={track.id} 
                track={track} 
              />
            ))}
          </div>
        ) : (
          <div style={{ 
            backgroundColor: '#181818', 
            padding: '40px', 
            borderRadius: '8px',
            textAlign: 'center',
            color: '#b3b3b3'
          }}>
            Unable to load trending tracks. Please try again later.
          </div>
        )}
      </div>

      <div className="section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid grid-2">
          <Link to='/search' className='link'>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔍</div>
              <h3 style={{ marginBottom: '10px' }}>Discover Music</h3>
              <p style={{ color: '#b3b3b3', fontSize: '14px' }}>
                Search for your favorite artists, albums, and tracks
              </p>
            </div>
          </Link>
          
          <Link to='player' className='link'>
            <div className="card" style={{ textAlign: 'center', padding: '30px' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎵</div>
              <h3 style={{ marginBottom: '10px' }}>Music Player</h3>
              <p style={{ color: '#b3b3b3', fontSize: '14px' }}>
                Control your music playback and manage your queue
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
};


export default Home;
