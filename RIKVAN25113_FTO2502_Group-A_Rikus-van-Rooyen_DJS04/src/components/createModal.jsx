import React from 'react';
import { GenreService } from '../utils/GenreService.js';
import { DateUtils } from '../utils/DateUtils.js';

const CreateModal = ({ podcast, onClose, genres }) => {
  if (!podcast) return null;

  console.log('Modal Podcast Data:', podcast); // Debug the podcast in the modal
  const genreNames = GenreService.getNames(podcast.genres || [], genres || []); // Ensure genres prop is used
  const updatedDate = DateUtils.format(podcast.updated || new Date().toISOString());

  // Handle different possible season structures
  let seasonData = [];
  if (podcast.seasons && Array.isArray(podcast.seasons)) {
    seasonData = podcast.seasons;
  } else if (podcast.season && Array.isArray(podcast.season)) {
    seasonData = podcast.season;
  } else if (podcast.episodes && Array.isArray(podcast.episodes)) {
    seasonData = podcast.episodes; // Fallback if seasons are under episodes
  }
  console.log('Modal Season Data:', seasonData); // Debug the seasons array

  return (
    <div className={`modal ${!podcast ? 'hidden' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="title-section">
          <h2>{podcast.title || 'No Title'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="banner">
          <img className="modal-img" src={podcast.image || ''} alt={`${podcast.title || 'Podcast'} cover`} />
          <div className="info-section">
            <h3>Description</h3>
            <p>{podcast.description || 'No description available'}</p>
            <h3>Genres</h3>
            <div className="tags">
              {genreNames.length > 0 ? (
                genreNames.map((genre) => (
                  <span key={genre} className="tag">{genre}</span>
                ))
              ) : (
                <span className="tag">No genres available</span>
              )}
            </div>
            <p className="modal-updated-text">{updatedDate}</p>
          </div>
        </div>
        <h3>Seasons</h3>
        <ul className="season-list">
          {seasonData.length > 0 ? (
            seasonData.map((season, index) => (
              <li key={index} className="season-item">
                <strong className="season-title">Season {season.seasonNumber || season.number || index + 1}: {season.title || season.name || 'Untitled Season'}</strong>
                <span className="episodes">{season.episodeCount || season.episodes?.length || season.episodeNumbers?.length || 0} episodes</span>
              </li>
            ))
          ) : (
            <li>No seasons available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CreateModal;