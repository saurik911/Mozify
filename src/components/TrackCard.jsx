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
        <div className="glass-card overflow-hidden group transition-all duration-300 hover:scale-[1.02]">
            {/* Thumbnail or Player */}
            <div className="relative aspect-video bg-black overflow-hidden">
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
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                        >
                            <div className="play-button">
                                <svg
                                    className="w-6 h-6 text-black ml-0.5"
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
                    <div className="space-y-3">
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
                                className="btn-primary flex-1 text-xs py-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleCancelEdit}
                                className="btn-secondary flex-1 text-xs py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="font-bold text-base mb-1 line-clamp-2 text-white group-hover:text-spotify-green transition-colors">
                            {track.title}
                        </h3>
                        <p className="text-sm text-spotify-light-gray mb-4 line-clamp-1">{track.author}</p>
                    </>
                )}

                {/* Category Badge and Favorite */}
                <div className="flex items-center justify-between mb-4">
                    <span className="category-badge">{track.category}</span>

                    {/* Favorite Button */}
                    <button
                        onClick={() => onToggleFavorite(track.id)}
                        className="transition-all duration-200 hover:scale-110"
                    >
                        <svg
                            className={`w-5 h-5 transition-all ${track.favorite ? 'text-spotify-green fill-current scale-110' : 'text-spotify-light-gray'
                                }`}
                            fill={track.favorite ? 'currentColor' : 'none'}
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
                    </button>
                </div>

                {/* Action Buttons */}
                {!isEditing && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn-secondary flex-1 text-xs py-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => {
                                if (window.confirm('Are you sure you want to delete this track?')) {
                                    onDelete(track.id);
                                }
                            }}
                            className="btn-secondary text-xs py-2 px-4 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
