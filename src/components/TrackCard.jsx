import { useState } from 'react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

export default function TrackCard({ track, onToggleFavorite, onDelete, onEdit }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(track.title);

    const handleSaveEdit = () => {
        if (editedTitle.trim()) {
            onEdit(track.id, { title: editedTitle });
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setEditedTitle(track.title);
        setIsEditing(false);
    };

    const plyrSource = {
        type: 'video',
        sources: [
            {
                src: track.videoId,
                provider: 'youtube',
            },
        ],
    };

    return (
        <div className="glass-card overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            {/* Thumbnail or Player */}
            <div className="relative aspect-video bg-black/50">
                {isPlaying ? (
                    <Plyr
                        source={plyrSource}
                        options={{
                            youtube: { noCookie: true },
                            controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                        }}
                    />
                ) : (
                    <>
                        <img
                            src={track.thumbnail}
                            alt={track.title}
                            className="w-full h-full object-cover"
                        />
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/50 transform hover:scale-110 transition-transform">
                                <svg
                                    className="w-8 h-8 text-white ml-1"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </button>
                    </>
                )}
            </div>

            {/* Track Info */}
            <div className="p-4">
                {isEditing ? (
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="glass-input w-full text-sm"
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleSaveEdit}
                                className="btn-primary flex-1 text-sm py-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="btn-secondary flex-1 text-sm py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {track.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">{track.author}</p>
                    </>
                )}

                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                    <span className="category-badge">{track.category}</span>

                    {/* Favorite Button */}
                    <button
                        onClick={() => onToggleFavorite(track.id)}
                        className="transition-transform hover:scale-110"
                    >
                        <svg
                            className={`w-6 h-6 ${track.favorite ? 'text-red-500 fill-current' : 'text-gray-400'
                                }`}
                            fill={track.favorite ? 'currentColor' : 'none'}
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
                    </button>
                </div>

                {/* Action Buttons */}
                {!isEditing && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn-secondary flex-1 text-sm py-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete this track?')) {
                                    onDelete(track.id);
                                }
                            }}
                            className="btn-secondary text-sm py-2 px-4 hover:bg-red-500/20 hover:border-red-500/50"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
