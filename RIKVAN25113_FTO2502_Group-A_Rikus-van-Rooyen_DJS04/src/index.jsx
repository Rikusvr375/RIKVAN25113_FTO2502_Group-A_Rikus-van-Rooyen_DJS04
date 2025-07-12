/** @jsxImportSource react */
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './views/header.jsx';
import CreateGrid from './views/createGrid.jsx';
import CreateModal from './components/createModal.jsx';
import SearchBar from './components/SearchBar.jsx';
import { genres } from './views/data.js';

/**
 * The main application component that fetches and displays podcast data.
 * @returns {JSX.Element} The rendered application component.
 */
const App = () => {
  /**
   * State to store the list of podcasts.
   * @type {Array<Object>}
   */
  const [podcasts, setPodcasts] = useState([]);

  /**
   * State to store the currently selected podcast.
   * @type {Object|null}
   */
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  /**
   * State to indicate whether data is being loaded.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(true);

  /**
   * State to store any error messages from API calls.
   * @type {string|null}
   */
  const [error, setError] = useState(null);

  /**
   * State to store the current podcasts list and total pages for pagination.
   * @type {{ currentPodcasts: Array<Object>, totalPages: number }}
   */
  const [currentPodcastsData, setCurrentPodcastsData] = useState({ currentPodcasts: [], totalPages: 1 });

  /**
   * Fetches podcast data and their seasons on component mount.
   */
  useEffect(() => {
    /**
     * Asynchronously fetches podcast data from the API and updates state.
     * @async
     */
    const fetchData = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log('API Response:', data); // Debug the root response

        /**
         * Ensures the data is an array, falling back to specific properties if needed.
         * @type {Array<Object>}
         */
        const podcastsData = Array.isArray(data) ? data : data.shows || data.data || [];

        /**
         * Maps over podcasts to fetch their seasons and combine data.
         * @type {Promise<Array<Object>>}
         */
        const podcastsWithSeasons = await Promise.all(podcastsData.map(async (podcast) => {
          let updatedPodcast = { ...podcast };
          try {
            const seasonsResponse = await fetch(`https://podcast-api.netlify.app/seasons/${podcast.id}`);
            if (seasonsResponse.ok) {
              const seasonsData = await seasonsResponse.json();
              console.log(`Seasons for ${podcast.id}:`, seasonsData);
              updatedPodcast = { ...updatedPodcast, seasons: seasonsData };
            } else {
              console.log(`Seasons fetch failed for ${podcast.id} (seasons):`, seasonsResponse.status);
              const fallbackResponse = await fetch(`https://podcast-api.netlify.app/shows/${podcast.id}/seasons`);
              if (fallbackResponse.ok) {
                const fallbackSeasons = await fallbackResponse.json();
                console.log(`Fallback Seasons for ${podcast.id}:`, fallbackSeasons);
                updatedPodcast = { ...updatedPodcast, seasons: fallbackSeasons };
              } else {
                console.log(`Fallback failed for ${podcast.id}:`, fallbackResponse.status);
                updatedPodcast = { ...updatedPodcast, seasons: podcast.seasons || [] };
              }
            }
          } catch (seasonErr) {
            console.log(`No seasons for ${podcast.id}:`, seasonErr.message);
            updatedPodcast = { ...updatedPodcast, seasons: podcast.seasons || [] };
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

  /**
   * Handles the selection of a podcast and updates the selected podcast state.
   * @param {Object} podcast - The podcast object to select.
   */
  const handlePodcastSelect = (podcast) => {
    console.log('Selected Podcast (initial):', podcast); // Debug initial podcast
    const podcastWithSeasons = podcasts.find(p => p.id === podcast.id) || podcast;
    if (!podcastWithSeasons.seasons || !Array.isArray(podcastWithSeasons.seasons)) {
      console.log('Warning: Seasons not found or invalid for podcast ID:', podcast.id);
    }
    console.log('Podcast with Seasons:', podcastWithSeasons);
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
      />
      <CreateGrid podcasts={currentPodcastsData.currentPodcasts} onPodcastSelect={handlePodcastSelect} genres={genres} />
      <CreateModal podcast={selectedPodcast} onClose={() => setSelectedPodcast(null)} genres={genres} />
    </>
  );
};

/**
 * Renders the App component into the DOM.
 */
const root = createRoot(document.getElementById('root'));
root.render(<App />);