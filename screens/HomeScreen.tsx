import { Ionicons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { HorizontalList } from '../components/HorizontalList';
import moviesData from '../data/movies.json';
import { Container, Movie, MoviesData } from '../types/movie.types';
import { getFallbackImage, getImageWithFallback } from '../utils/imageHelpers';

const { height: screenHeight } = Dimensions.get('window');

type RootStackParamList = {
  Main: undefined;
  MovieDetails: { movie: Movie };
};

type TabParamList = {
  Home: undefined;
  Explore: undefined;
};

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [data, setData] = useState<MoviesData | null>(null);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [heroImageError, setHeroImageError] = useState(false);

  useEffect(() => {
    const movieData = moviesData as MoviesData;
    setData(movieData);
    
    for (const container of movieData.containers) {
      const featured = container.items.find(movie => movie.isTopMovie);
      if (featured) {
        setFeaturedMovie(featured);
        break;
      }
    }
  }, []);

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  if (!data || !featuredMovie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredSection}>
          <Image
            source={{ 
              uri: heroImageError 
                ? getFallbackImage('landscape')
                : getImageWithFallback(featuredMovie, 'landscape')
            }}
            style={styles.featuredImage}
            contentFit="cover"
            onError={() => setHeroImageError(true)}
          />
          {heroImageError && (
            <View style={styles.heroFallbackOverlay}>
              <Text style={styles.heroFallbackText}>Featured Content</Text>
            </View>
          )}
          
          <View style={styles.gradientOverlay} />
          
          <View style={styles.featuredContent}>
            <Text style={styles.featuredTitle}>{featuredMovie.title}</Text>
    
            <Text style={styles.featuredMeta}>
              {featuredMovie.year} • {featuredMovie.duration} • {featuredMovie.rating}
            </Text>
            <View style={styles.topBadge}>
              <Ionicons name="trophy" size={16} color="#ffffff" />
              <Text style={styles.badgeText}>#1 in Movies Today</Text>
            </View>
          </View>
        </View>

        {data.containers
          .filter(container => container.id === 'you-might-like')
          .map((container: Container) => (
            <HorizontalList
              key={container.id}
              container={container}
              onMoviePress={handleMoviePress}
              overrideLayout="portrait-card"
            />
          ))}

        {data.containers
          .filter(container => container.id === 'my-list')
          .map((container: Container) => (
            <HorizontalList
              key={container.id}
              container={container}
              onMoviePress={handleMoviePress}
              overrideLayout="landscape-card"
            />
          ))}

        <HorizontalList
          container={{
            id: 'upcoming',
            title: 'Upcoming',
            layout: 'landscape-card',
            items: data.containers.find(container => container.id === 'trending')?.items.slice(0, 6) || []
          }}
          onMoviePress={handleMoviePress}
        />
        
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  scrollView: {
    flex: 1,
  },
  featuredSection: {
    height: screenHeight * 0.5,
    position: 'relative',
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  fallbackHeroContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  heroFallbackOverlay: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    transform: [{ translateY: -20 }],
    alignItems: 'center',
  },
  heroFallbackText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  topBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  featuredMeta: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  myListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    justifyContent: 'center',
  },
  myListButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});