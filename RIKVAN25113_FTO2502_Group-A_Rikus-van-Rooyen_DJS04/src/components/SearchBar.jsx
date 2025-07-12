/** @jsxImportSource react */
import React from 'react';

/**
 * A component for searching and filtering podcasts with pagination controls.
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.podcasts - The list of all podcasts.
 * @param {function} props.onPodcastSelect - Callback to select a podcast.
 * @param {Array<Object>} props.genres - The list of available genres.
 * @param {function} props.setCurrentPodcasts - Callback to update the current podcasts list.
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar = ({ podcasts, onPodcastSelect, genres, setCurrentPodcasts }) => {
  /**
   * State to store the current search term for filtering podcasts by title.
   * @type {string}
   */
  const [searchTerm, setSearchTerm] = React.useState('');

  /**
   * State to store the current page number for pagination.
   * @type {number}
   */
  const [currentPage, setCurrentPage] = React.useState(1);

  /**
   * Constant defining the number of items per page for pagination.
   * @type {number}
   */
  const [itemsPerPage] = React.useState(10);

  /**
   * State to store the selected genre ID for filtering podcasts.
   * @type {number|null}
   */
  const [selectedGenre, setSelectedGenre] = React.useState(null);

  /**
   * Handler for updating the search term and resetting the page.
   * @param {string} value - The current value of the search input.
   */
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  /**
   * Filters the podcasts based on the search term and selected genre.
   * @type {Array<Object>}
   */
  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (selectedGenre) {
    filteredPodcasts.filter(podcast =>
      podcast.genres && podcast.genres.includes(selectedGenre)
    );
  }

  /**
   * Calculates the slice of podcasts for the current page and updates the parent.
   */
  React.useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPodcasts = filteredPodcasts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPodcasts.length / itemsPerPage);
    setCurrentPodcasts({ currentPodcasts, totalPages });
  }, [searchTerm, selectedGenre, currentPage, itemsPerPage, podcasts, setCurrentPodcasts]);

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
          style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}
        >
          Previous
        </button>
        <span>Page {currentPage} of {Math.ceil(filteredPodcasts.length / itemsPerPage)}</span>
        <button
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={currentPage === Math.ceil(filteredPodcasts.length / itemsPerPage)}
          style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default SearchBar;