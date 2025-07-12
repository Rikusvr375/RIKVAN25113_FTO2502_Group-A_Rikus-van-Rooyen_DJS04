# Podcast App

Welcome to my **Podcast App**, a dynamic web application built with React and Vite. This app allows you to browse, search, sort, and explore detailed information about various podcasts fetched from the Podcast API. Whether you're looking for the latest tech talks or your favorite genre, this app provides an interactive and user-friendly experience.

## Features
- Search Functionality: Filter podcasts by title using the search bar, with an optional genre filter.
- Sorting Options: Sort podcasts by title or date (ascending or descending) using the sort bar.
- Pagination: Navigate through pages of podcast results with "Previous" and "Next" buttons.
- Detailed Modal View: Click a podcast to open a modal displaying title, image, description, genres, last updated date, number of seasons, and a list of seasons with episode counts.
- Responsive Design: Optimized for both desktop and mobile devices.

## Installation
To set up and run this app locally, follow these steps:

1. Clone the Repository
- git clone https://github.com/Rikusvr375/RIKVAN25113_FTO2502_Group-A_Rikus-van-Rooyen_DJS04.git
- cd podcast-explorer

2. Install Dependencies
Ensure you have Node.js installed, then run:
- npm install

3. Run the App
Start the development server with:
- npm run dev 

Open your browser and navigate to `http://localhost:5173` (or the port displayed in the terminal).

### API Endpoints

Data has been called via a `fetch` request to the following endpoint.

| URL                               |                             |
| --------------------------------- | --------------------------- |
| `https://podcast-api.netlify.app` | Returns an array of PREVIEW |

## Usage
### Main Interface
- Search Bar: Located at the top, enter a podcast title to filter the list. Use the genre dropdown to refine results. Pagination buttons ("Previous" and "Next") help navigate pages.
- Sort Bar: Below the search bar, choose "Sort by Title" or "Sort by Date" and toggle between "Ascending" and "Descending" to reorder the list.
- Podcast Grid: Displays a grid of podcast cards, each with a title, image, and genre tags. Click a card to view more details.

### Viewing Podcast Details
- Click any podcast card to open a modal window.
- The modal includes:
- Podcast title at the top.
- An image (if available, otherwise a default image).
- A description section.
- Genre tags below the description.
- Last updated date.
- "Number of Seasons" count.
- A list of seasons, each showing the season number and episode count.
- Close the modal by clicking the "×" button in the top-right corner.

### Example Workflow
1. Launch the app in your browser.
2. Type "Technology" in the search bar to find tech-related podcasts.
3. Select "Sort by Date" and switch to "Descending" to view the newest podcasts first.
4. Click a podcast (e.g., "Tech Insights") to open the modal, reviewing its seasons and episodes.
5. Close the modal, then use the genre filter to narrow to "Technology" for more specific results.
6. Navigate pages using the pagination controls to explore all matches.


