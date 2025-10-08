import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LayoutType, Movie } from '../types/movie.types';

interface MovieCardProps {
  movie: Movie;
  layout: LayoutType;
  onPress: () => void;
  width?: number;
}

const { width: screenWidth } = Dimensions.get('window');

export const MovieCard: React.FC<MovieCardProps> = ({ movie, layout, onPress, width }) => {
  const cardWidth = width || (layout === 'portrait-card' ? screenWidth * 0.32 : screenWidth * 0.45);
  const cardHeight = layout === 'portrait-card' ? cardWidth * 1.5 : cardWidth * 0.56; // 2:3 vs 16:9
  
  const imageSource = layout === 'portrait-card' ? movie.posters.portrait : movie.posters.landscape;

  return (
    <TouchableOpacity style={[styles.container, { width: cardWidth }]} onPress={onPress}>
      <View style={[styles.imageContainer, { height: cardHeight }]}>
        <Image
          source={{ uri: imageSource.url }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
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