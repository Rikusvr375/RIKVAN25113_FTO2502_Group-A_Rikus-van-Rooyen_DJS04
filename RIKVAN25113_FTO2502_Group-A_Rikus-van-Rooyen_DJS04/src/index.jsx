/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './views/header.jsx';
import CreateGrid from './views/createGrid.jsx';
import CreateModal from './components/createModal.jsx';
import SearchBar from './components/SearchBar.jsx';
import SortBar from './components/SortBar.jsx';
import { genres } from './views/data.js';

/**
 * The main application component that fetches and displays podcast data.
 * @returns {JSX.Element} The rendered application component.
 */
const App = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPodcastsData, setCurrentPodcastsData] = useState({ currentPodcasts: [], totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('API Response:', data); // Debug the root response
        const podcastsData = Array.isArray(data) ? data : data.shows || data.data || [];
        const podcastsWithSeasons = await Promise.all(podcastsData.map(async (podcast) => {
          let updatedPodcast = { ...podcast };
          try {
            const seasonsResponse = await fetch(`https://podcast-api.netlify.app/seasons/${podcast.id}`);
            if (seasonsResponse.ok) {
              const seasonsData = await seasonsResponse.json();
              updatedPodcast = { ...updatedPodcast, seasons: seasonsData };
            } else {
              const fallbackResponse = await fetch(`https://podcast-api.netlify.app/seasons/${podcast.id}/seasons`);
              if (fallbackResponse.ok) {
                updatedPodcast = { ...updatedPodcast, seasons: await fallbackResponse.json() };
              } else {
                updatedPodcast = { ...updatedPodcast, seasons: [] };
              }
            }
          } catch (seasonErr) {
            updatedPodcast = { ...updatedPodcast, seasons: [] };
          }
          return updatedPodcast;
        }));
        setPodcasts(podcastsWithSeasons);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePodcastSelect = (podcast) => {
    const podcastWithSeasons = podcasts.find(p => p.id === podcast.id) || podcast;
    setSelectedPodcast(podcastWithSeasons);
  };

  if (loading) return <div className='loading-msg'>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <SearchBar
        podcasts={podcasts}
        onPodcastSelect={handlePodcastSelect}
        genres={genres}
        setCurrentPodcasts={setCurrentPodcastsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      <SortBar
        podcasts={podcasts}
        onPodcastSelect={handlePodcastSelect}
        genres={genres}
        setCurrentPodcasts={setCurrentPodcastsData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      <CreateGrid podcasts={currentPodcastsData.currentPodcasts} onPodcastSelect={handlePodcastSelect} genres={genres} />
      <CreateModal podcast={selectedPodcast} onClose={() => setSelectedPodcast(null)} genres={genres} />
    </>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);