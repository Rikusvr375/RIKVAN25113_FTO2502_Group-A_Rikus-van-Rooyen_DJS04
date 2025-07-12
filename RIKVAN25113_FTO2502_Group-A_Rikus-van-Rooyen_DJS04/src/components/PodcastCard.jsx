import React from 'react';
import { GenreService } from '../utils/GenreService.js';
import { DateUtils } from '../utils/DateUtils.js';

const PodcastCard = ({ podcast, onSelect, genres }) => {
  const genreNames = GenreService.getNames(podcast.genres || [], genres || []); // Use genres prop
  const updatedDate = DateUtils.format(podcast.updated || new Date().toISOString());
  console.log('Podcast in Card:', podcast); // Debug the podcast object

  const seasonCount = Array.isArray(podcast.seasons) ? podcast.seasons.length : podcast.seasons || 0;

  return (
    <div className="card" onClick={() => onSelect(podcast)}>
      <img src={podcast.image || ''} alt={`${podcast.title || 'Podcast'} cover`} />
      <h3>{podcast.title || 'No Title'}</h3>
      <p className="seasons">{seasonCount} season{seasonCount > 1 ? 's' : ''}</p>
      <div className="tags">
        {genreNames.length > 0 ? (
          genreNames.map((genre) => (
            <span key={genre} className="tag">{genre}</span>
          ))
        ) : (
          <span className="tag">No genres available</span>
        )}
      </div>
      <p className="updated-text">{updatedDate}</p>
    </div>
  );
};

export default PodcastCard;