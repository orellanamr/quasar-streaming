import { Movie } from '../types/movie.types';

const FALLBACK_IMAGES = {
  'oppenheimer_portrait': 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  'oppenheimer_landscape': 'https://image.tmdb.org/t/p/w1280/rCRgONKHdkzF4VortaNbsdN4jFU.jpg',
  
  'barbie_portrait': 'https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
  'barbie_landscape': 'https://image.tmdb.org/t/p/w1280/ctmEJUxzws6eSivLr6qJhqZX16d.jpg',
  
  'napoleon_portrait': 'https://image.tmdb.org/t/p/w500/vcZlWvpCqHABYnihqIN9XoIQO2B.jpg',
  'napoleon_landscape': 'https://image.tmdb.org/t/p/w1280/zw8FiKEZh3rIvIJXUhRFwP6zjmq.jpg',
  
  'generic_portrait': 'https://via.placeholder.com/400x600/333333/FFFFFF?text=Movie+Poster',
  'generic_landscape': 'https://via.placeholder.com/640x360/333333/FFFFFF?text=Movie+Banner',
  'generic_thumbnail': 'https://via.placeholder.com/400x300/333333/FFFFFF?text=Thumbnail'
};

export const getImageWithFallback = (movie: Movie, imageType: 'portrait' | 'landscape' | 'thumbnail'): string => {
  const originalUrl = movie.posters[imageType].url;
  
  // Use specific fallbacks for known problematic movies/URLs
  if (movie.id === 'movie1' && movie.title === 'Oppenheimer') {
    // Oppenheimer URLs are known to be problematic, use TMDb directly
    if (imageType === 'portrait') return FALLBACK_IMAGES.oppenheimer_portrait;
    if (imageType === 'landscape') return FALLBACK_IMAGES.oppenheimer_landscape;
  }
  
  if (movie.id === 'movie7' && movie.title === 'Napoleon') {
    // Napoleon landscape URL is broken, use TMDb
    if (imageType === 'landscape') return FALLBACK_IMAGES.napoleon_landscape;
    if (imageType === 'portrait') return FALLBACK_IMAGES.napoleon_portrait;
  }
  
  // For all other movies, try original URL first
  // The component will handle onError if it fails
  return originalUrl;
};

export const getFallbackImage = (imageType: 'portrait' | 'landscape' | 'thumbnail'): string => {
  switch (imageType) {
    case 'portrait':
      return FALLBACK_IMAGES.generic_portrait;
    case 'landscape':
      return FALLBACK_IMAGES.generic_landscape;
    case 'thumbnail':
      return FALLBACK_IMAGES.generic_thumbnail;
    default:
      return FALLBACK_IMAGES.generic_landscape;
  }
};