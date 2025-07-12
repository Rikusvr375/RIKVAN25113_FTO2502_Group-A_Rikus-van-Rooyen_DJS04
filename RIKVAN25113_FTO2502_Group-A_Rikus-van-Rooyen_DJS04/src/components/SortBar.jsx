/** @jsxImportSource react */
import React from 'react';

/**
 * A component for sorting podcasts by different criteria.
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.podcasts - The list of all podcasts.
 * @param {function} props.onPodcastSelect - Callback to select a podcast.
 * @param {Array<Object>} props.genres - The list of available genres.
 * @param {function} props.setCurrentPodcasts - Callback to update the current podcasts list.
 * @param {number} props.currentPage - The current page number.
 * @param {function} props.setCurrentPage - Callback to update the current page.
 * @param {number} props.itemsPerPage - The number of items per page.
 * @returns {JSX.Element} The rendered sort bar component.
 */
const SortBar = ({ podcasts, onPodcastSelect, genres, setCurrentPodcasts, currentPage, setCurrentPage, itemsPerPage }) => {
  const [sortBy, setSortBy] = React.useState('title');
  const [sortDirection, setSortDirection] = React.useState('asc');

  const handleSortChange = (criterion) => {
    setSortBy(criterion);
    setCurrentPage(1); // Reset to first page on sort change
    applySorting(criterion, sortDirection);
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    applySorting(sortBy, newDirection);
  };

  const applySorting = (criterion, direction) => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      let aValue = a[criterion] || '';
      let bValue = b[criterion] || '';
      if (criterion === 'title') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      } else if (criterion === 'date') {
        aValue = new Date(aValue) || new Date(0);
        bValue = new Date(bValue) || new Date(0);
      }
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPodcasts = sortedPodcasts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedPodcasts.length / itemsPerPage);
    setCurrentPodcasts({ currentPodcasts, totalPages });
  };

  return (
    <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <select
        onChange={(e) => handleSortChange(e.target.value)}
        value={sortBy}
        style={{ padding: '0.5rem', marginRight: '1rem' }}
      >
        <option value="title">Sort by Title</option>
        <option value="date">Sort by Date</option>
      </select>
      <button
        onClick={toggleSortDirection}
        style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
};

export default SortBar;