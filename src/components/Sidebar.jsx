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
        <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col h-screen sticky top-0">
            {/* Logo Section */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    YOUCAN
                </h1>
                <p className="text-xs text-gray-500 mt-1">Music Library</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Main Menu */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
                        Menu
                    </h3>
                    <div className="space-y-1">
                        <button
                            onClick={() => onCategoryChange('ALL')}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${selectedCategory === 'ALL' && !showFavorites
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="font-medium">Home</span>
                            <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded-full">
                                {trackCount}
                            </span>
                        </button>

                        <button
                            onClick={onToggleShowFavorites}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${showFavorites
                                    ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-white border border-red-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <svg
                                className={`w-5 h-5 ${showFavorites ? 'fill-current text-red-500' : ''}`}
                                fill={showFavorites ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <span className="font-medium">Favorites</span>
                            <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded-full">
                                {favoriteCount}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
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
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${selectedCategory === category && !showFavorites
                                        ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className={`w-2 h-2 rounded-full ${selectedCategory === category && !showFavorites
                                        ? 'bg-gradient-to-r from-indigo-400 to-purple-400'
                                        : 'bg-gray-600 group-hover:bg-gray-400'
                                    }`} />
                                <span className="font-medium text-sm">{category}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Footer Stats */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex justify-between">
                        <span>Total Tracks</span>
                        <span className="text-white font-semibold">{trackCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Favorites</span>
                        <span className="text-red-400 font-semibold">{favoriteCount}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
