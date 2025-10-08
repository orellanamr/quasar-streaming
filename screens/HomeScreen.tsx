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
    TouchableOpacity,
    View
} from 'react-native';
import { HorizontalList } from '../components/HorizontalList';
import moviesData from '../data/movies.json';
import { Container, Movie, MoviesData } from '../types/movie.types';

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

  useEffect(() => {
    // Load data and find featured movie
    const movieData = moviesData as MoviesData;
    setData(movieData);
    
    // Find the featured movie (isTopMovie: true)
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

  const handlePlayPress = () => {
    if (featuredMovie) {
      // Handle play action
      console.log('Play movie:', featuredMovie.title);
    }
  };

  const handleMoreInfoPress = () => {
    if (featuredMovie) {
      handleMoviePress(featuredMovie);
    }
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
        {/* Featured Movie Section */}
        <View style={styles.featuredSection}>
          <Image
            source={{ uri: featuredMovie.posters.landscape.url }}
            style={styles.featuredImage}
            contentFit="cover"
          />
          
          <View style={styles.featuredOverlay}>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>{featuredMovie.title}</Text>
              <Text style={styles.featuredMeta}>
                {featuredMovie.year} • {featuredMovie.duration} • {featuredMovie.quality}
              </Text>
              <Text style={styles.featuredDescription} numberOfLines={3}>
                {featuredMovie.description}
              </Text>
              
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
                  <Ionicons name="play" size={24} color="#000000" />
                  <Text style={styles.playButtonText}>Play</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.infoButton} onPress={handleMoreInfoPress}>
                  <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.infoButtonText}>More Info</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Movie Lists */}
        {data.containers.map((container: Container) => (
          <HorizontalList
            key={container.id}
            container={container}
            onMoviePress={handleMoviePress}
          />
        ))}
        
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
    height: screenHeight * 0.6,
    position: 'relative',
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featuredMeta: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 12,
  },
  featuredDescription: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});