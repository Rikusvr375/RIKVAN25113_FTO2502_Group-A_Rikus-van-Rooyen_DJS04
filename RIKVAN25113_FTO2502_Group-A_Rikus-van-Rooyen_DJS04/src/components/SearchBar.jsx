/** @jsxImportSource react */
import React from 'react';

/**
 * A component for searching and filtering podcasts with pagination controls.
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.podcasts - The list of all podcasts.
 * @param {function} props.onPodcastSelect - Callback to select a podcast.
 * @param {Array<Object>} props.genres - The list of available genres.
 * @param {function} props.setCurrentPodcasts - Callback to update the current podcasts list.
 * @param {number} props.currentPage - The current page number.
 * @param {function} props.setCurrentPage - Callback to update the current page.
 * @param {number} props.itemsPerPage - The number of items per page.
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar = ({ podcasts, onPodcastSelect, genres, setCurrentPodcasts, currentPage, setCurrentPage, itemsPerPage }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
    console.log('Search Term:', value); // Debug
  };

  // Use useMemo for efficient filtering
  const filteredPodcasts = React.useMemo(() => {
    let result = podcasts.filter(podcast =>
      podcast.title?.toLowerCase().includes(searchTerm.toLowerCase()) || ''
    );
    if (selectedGenre) {
      result = result.filter(podcast =>
        podcast.genres?.includes(selectedGenre) || false
      );
    }
    console.log('Filtered Podcasts:', result); // Debug
    return result;
  }, [podcasts, searchTerm, selectedGenre]);

  // Update current podcasts and total pages
  React.useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPodcasts = filteredPodcasts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);
    setCurrentPodcasts({ currentPodcasts, totalPages });
    console.log('Current Podcasts:', currentPodcasts); // Debug
  }, [searchTerm, selectedGenre, currentPage, itemsPerPage, filteredPodcasts, setCurrentPodcasts]);

  return (
    <>
      <div style={{ padding: '1rem' }}>
        <input
          type="text"
          placeholder="Search podcasts..."
          onChange={(e) => handleSearch(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem', width: '200px' }}
        />
        <select
          onChange={(e) => {
            setSelectedGenre(e.target.value ? parseInt(e.target.value) : null);
            setCurrentPage(1); // Reset to first page on genre change
          }}
          style={{ padding: '0.5rem' }}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.title}</option>
          ))}
        </select>
      </div>
      <div style={{ padding: '1rem' }}>
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ padding: '0.5rem 1rem', marginRight: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Previous
        </button>
        <span>Page {currentPage} of {Math.ceil(filteredPodcasts.length / itemsPerPage)}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === Math.ceil(filteredPodcasts.length / itemsPerPage)}
          style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default SearchBar;