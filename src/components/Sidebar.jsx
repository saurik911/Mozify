import { CATEGORIES } from '../utils';

export default function Sidebar({
    selectedCategory,
    onCategoryChange,
    showFavorites,
    onToggleShowFavorites,
    trackCount,
    favoriteCount
}) {
    return (
        <aside className="w-64 bg-black border-r border-white/5 flex flex-col h-screen sticky top-0 lg:flex hidden">
            {/* Logo Section */}
            <div className="p-6 border-b border-white/5">
                <h1 className="text-2xl font-black tracking-tight text-white mb-1">
                    Mozify
                </h1>
                <p className="text-xs text-spotify-light-gray font-medium">Music Library</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-6">
                {/* Main Menu */}
                <div>
                    <h3 className="text-xs font-bold text-spotify-light-gray uppercase tracking-widest mb-3 px-3">
                        Menu
                    </h3>
                    <div className="space-y-1">
                        <button
                            onClick={() => onCategoryChange('ALL')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${
                                selectedCategory === 'ALL' && !showFavorites
                                    ? 'bg-spotify-gray text-white'
                                    : 'text-spotify-light-gray hover:text-white'
                            }`}
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                            <span className="font-bold text-sm">Home</span>
                            <span className="ml-auto text-xs font-bold bg-white/10 px-2.5 py-1 rounded-full">
                                {trackCount}
                            </span>
                        </button>

                        <button
                            onClick={onToggleShowFavorites}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${
                                showFavorites
                                    ? 'bg-gradient-to-r from-spotify-green/20 to-spotify-green/10 text-white'
                                    : 'text-spotify-light-gray hover:text-white'
                            }`}
                        >
                            <svg
                                className={`w-6 h-6 transition-all ${showFavorites ? 'fill-current text-spotify-green scale-110' : ''}`}
                                fill={showFavorites ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <span className="font-bold text-sm">Liked Songs</span>
                            <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full ${
                                showFavorites ? 'bg-spotify-green text-black' : 'bg-white/10'
                            }`}>
                                {favoriteCount}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-xs font-bold text-spotify-light-gray uppercase tracking-widest mb-3 px-3">
                        Genres
                    </h3>
                    <div className="space-y-1">
                        {CATEGORIES.filter(cat => cat !== 'ALL').map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    onCategoryChange(category);
                                    if (showFavorites) onToggleShowFavorites();
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group ${
                                    selectedCategory === category && !showFavorites
                                        ? 'bg-spotify-gray text-white'
                                        : 'text-spotify-light-gray hover:text-white'
                                }`}
                            >
                                <div className={`w-1 h-1 rounded-full transition-all ${
                                    selectedCategory === category && !showFavorites
                                        ? 'bg-spotify-green w-2 h-2'
                                        : 'bg-spotify-light-gray group-hover:bg-white'
                                }`} />
                                <span className="font-bold text-sm">{category}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Footer Stats */}
            <div className="p-4 border-t border-white/5 bg-black/40">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-spotify-light-gray font-medium">Total Tracks</span>
                        <span className="text-sm text-white font-bold">{trackCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-spotify-light-gray font-medium">Favorites</span>
                        <span className="text-sm font-bold" style={{ color: '#1DB954' }}>{favoriteCount}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
