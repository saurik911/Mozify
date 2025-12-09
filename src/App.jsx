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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showFavorites={showFavorites}
        onToggleShowFavorites={() => setShowFavorites(!showFavorites)}
        trackCount={tracks.length}
        favoriteCount={favoriteCount}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 md:p-8">
          {/* Header */}
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              {showFavorites ? 'Favorite Tracks' : selectedCategory === 'ALL' ? 'All Tracks' : selectedCategory}
            </h2>
            <p className="text-gray-400">
              {filteredTracks.length} {filteredTracks.length === 1 ? 'track' : 'tracks'}
            </p>
          </header>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your tracks..."
                className="glass-input w-full pl-12"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
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
            <div className="glass-card p-12 text-center mt-8">
              <svg
                className="w-24 h-24 mx-auto mb-4 text-gray-600"
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
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                {tracks.length === 0 ? 'No tracks yet' : 'No tracks found'}
              </h3>
              <p className="text-gray-500">
                {tracks.length === 0
                  ? 'Add your first YouTube track to get started!'
                  : 'Try adjusting your filters or search query'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {filteredTracks.map((track) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteTrack}
                  onEdit={handleEditTrack}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
