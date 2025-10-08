import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LayoutType, Movie } from '../types/movie.types';
import { getFallbackImage, getImageWithFallback } from '../utils/imageHelpers';

interface MovieCardProps {
  movie: Movie;
  layout: LayoutType;
  onPress: () => void;
  width?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export const MovieCard: React.FC<MovieCardProps> = ({ movie, layout, onPress, width }) => {
  const [imageError, setImageError] = useState(false);
  
  // Calculate dimensions based on actual aspect ratios from data
  const cardWidth = width || (layout === 'portrait-card' ? screenWidth * 0.32 : screenWidth * 0.45);
  const isPortrait = layout === 'portrait-card';
  
  // Use actual aspect ratios: 2:3 for portrait, 16:9 for landscape
  const cardHeight = isPortrait ? cardWidth * 1.5 : cardWidth * (9/16); // 2:3 vs 16:9
  
  const imageType = isPortrait ? 'portrait' : 'landscape';
  const imageUrl = !imageError 
    ? getImageWithFallback(movie, imageType)
    : getFallbackImage(imageType);

  return (
    <TouchableOpacity style={[styles.container, { width: cardWidth }]} onPress={onPress}>
      <View style={[styles.imageContainer, { height: cardHeight }]}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          contentFit="cover"
          transition={200}
          onError={() => setImageError(true)}
        />
        {imageError && (
          <View style={styles.fallbackOverlay}>
            <Ionicons name="film-outline" size={32} color="#666666" />
            <Text style={styles.fallbackText}>{movie.title}</Text>
          </View>
        )}
        {movie.isTopMovie && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.year}>{movie.year}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  fallbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E50914',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  year: {
    color: '#999999',
    fontSize: 12,
  },
});