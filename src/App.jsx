import { useState } from 'react';
import { useLocalStorage } from './utils';
import Sidebar from './components/Sidebar';
import AddTrack from './components/AddTrack';
import TrackCard from './components/TrackCard';
import './App.css';

function App() {
  const [tracks, setTracks] = useLocalStorage('youcan-tracks', []);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleAddTrack = (newTrack) => {
    setTracks([newTrack, ...tracks]);
  };

  const handleToggleFavorite = (trackId) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, favorite: !track.favorite } : track
    ));
  };

  const handleDeleteTrack = (trackId) => {
    setTracks(tracks.filter(track => track.id !== trackId));
  };

  const handleEditTrack = (trackId, updates) => {
    setTracks(tracks.map(track =>
      track.id === trackId ? { ...track, ...updates } : track
    ));
  };

  // Filter tracks
  const filteredTracks = tracks.filter(track => {
    // Category filter
    if (selectedCategory !== 'ALL' && track.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (searchQuery && !track.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Favorites filter
    if (showFavorites && !track.favorite) {
      return false;
    }

    return true;
  });

  const favoriteCount = tracks.filter(t => t.favorite).length;

  return (
    <div className="flex h-screen overflow-hidden bg-spotify-black">
      {/* Sidebar - Desktop */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showFavorites={showFavorites}
        onToggleShowFavorites={() => setShowFavorites(!showFavorites)}
        trackCount={tracks.length}
        favoriteCount={favoriteCount}
      />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-black rounded-full flex items-center justify-center border border-white/10 hover:border-spotify-green transition-colors"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <header className="mb-6 sm:mb-8 mt-16 lg:mt-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2">
              {showFavorites ? 'Liked Songs' : selectedCategory === 'ALL' ? 'Your Library' : selectedCategory}
            </h2>
            <p className="text-sm sm:text-base text-spotify-light-gray font-medium">
              {filteredTracks.length} {filteredTracks.length === 1 ? 'track' : 'tracks'}
            </p>
          </header>

          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your tracks..."
                className="glass-input w-full pl-12"
              />
              <svg
                className="w-5 h-5 text-spotify-light-gray absolute left-4 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Add Track Form */}
          <AddTrack onAddTrack={handleAddTrack} />

          {/* Tracks Grid */}
          {filteredTracks.length === 0 ? (
            <div className="glass-card p-12 sm:p-16 text-center mt-8 animate-fade-in-up">
              <svg
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 text-spotify-light-gray opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {tracks.length === 0 ? 'No tracks yet' : 'No tracks found'}
              </h3>
              <p className="text-sm sm:text-base text-spotify-light-gray max-w-md mx-auto">
                {tracks.length === 0
                  ? 'Add your first YouTube track to get started!'
                  : 'Try adjusting your filters or search query'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 mt-8">
              {filteredTracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`animate-fade-in-up stagger-${Math.min(index + 1, 8)}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TrackCard
                    track={track}
                    onToggleFavorite={handleToggleFavorite}
                    onDelete={handleDeleteTrack}
                    onEdit={handleEditTrack}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
