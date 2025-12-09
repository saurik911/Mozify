import { useState, useEffect } from 'react';

// Custom hook for localStorage
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};

// Fetch YouTube metadata using noembed API
export const fetchYouTubeMetadata = async (url) => {
    try {
        const response = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.error) {
            throw new Error('Invalid YouTube URL');
        }

        return {
            title: data.title,
            thumbnail: data.thumbnail_url,
            author: data.author_name,
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        throw error;
    }
};

// Extract YouTube video ID from URL
export const extractVideoId = (url) => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
};

// Categories for music
export const CATEGORIES = [
    'ALL',
    'RAP',
    'JAZZ',
    'CHAABI',
    'POP',
    'ROCK',
    'ELECTRONIC',
    'CLASSICAL',
    'OTHER'
];
