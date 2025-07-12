import React from 'react';
import PodcastCard from '../components/PodcastCard.jsx';

const CreateGrid = ({ podcasts, onPodcastSelect, genres }) => {
  return (
    <div className="grid">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} onSelect={onPodcastSelect} genres={genres} />
      ))}
    </div>
  );
};

export default CreateGrid;