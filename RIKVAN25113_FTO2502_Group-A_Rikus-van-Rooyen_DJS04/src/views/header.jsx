import React from 'react';

const Header = () => {
  return (
    <header className="app-header">
        <div className='app-header-first'>
            <img className='podcast-icon' src="/images/podcast-icon.png" alt="Podcast Icon" />
            <h1>PodcastApp</h1>
        </div>
        <div className='app-header-second'>
            <img className='speaking-icon' src="/images/speaking-person.png" alt="Speaking Person" />
        </div>
    </header>
  );
};

export default Header;