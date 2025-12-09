import { useState } from 'react';
import { fetchYouTubeMetadata, extractVideoId } from '../utils';

export default function AddTrack({ onAddTrack }) {
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('OTHER');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = ['RAP', 'JAZZ', 'CHAABI', 'POP', 'ROCK', 'ELECTRONIC', 'CLASSICAL', 'OTHER'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!url.trim()) {
            setError('Please enter a YouTube URL');
            return;
        }

        const videoId = extractVideoId(url);
        if (!videoId) {
            setError('Invalid YouTube URL');
            return;
        }

        setLoading(true);

        try {
            const metadata = await fetchYouTubeMetadata(url);

            const newTrack = {
                id: Date.now().toString(),
                videoId,
                url,
                title: metadata.title,
                thumbnail: metadata.thumbnail,
                author: metadata.author,
                category,
                favorite: false,
                createdAt: new Date().toISOString(),
            };

            onAddTrack(newTrack);
            setUrl('');
            setCategory('OTHER');
        } catch (err) {
            setError('Failed to fetch video metadata. Please check the URL.');
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedUrl = e.dataTransfer.getData('text');
        setUrl(droppedUrl);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div className="glass-card p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Add New Track
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="relative"
                >
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste YouTube URL or drag & drop here..."
                        className="glass-input w-full"
                        disabled={loading}
                    />
                    {loading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent"></div>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${category === cat
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/50'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Adding Track...' : 'Add Track'}
                </button>
            </form>
        </div>
    );
}
