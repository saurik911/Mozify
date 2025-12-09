import { CATEGORIES } from '../utils';

export default function FilterBar({ selectedCategory, onCategoryChange, searchQuery, onSearchChange, showFavorites, onToggleShowFavorites }) {
    return (
        <div className="glass-card p-6 mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search tracks..."
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

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedCategory === category
                                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50 scale-105'
                                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:scale-105'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Favorites Toggle */}
            <button
                onClick={onToggleShowFavorites}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${showFavorites
                        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/50'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
            >
                <svg
                    className={`w-5 h-5 ${showFavorites ? 'fill-current' : ''}`}
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
                {showFavorites ? 'Show All Tracks' : 'Show Favorites Only'}
            </button>
        </div>
    );
}
