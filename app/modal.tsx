import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { MovieDetailsScreen } from '../screens/MovieDetailsScreen';
import { Movie } from '../types/movie.types';

export default function ModalScreen() {
  const router = useRouter();
  const { movie: movieParam } = useLocalSearchParams();
  
  let movie: Movie;
  try {
    movie = typeof movieParam === 'string' ? JSON.parse(movieParam) : movieParam;
  } catch (error) {
    console.error('Error parsing movie data:', error);
    router.back();
    return null;
  }

  const navigation = {
    goBack: () => router.back(),
  };

  return (
    <MovieDetailsScreen 
      route={{ params: { movie } }} 
      navigation={navigation} 
    />
  );
}
