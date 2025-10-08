import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Container, LayoutType, Movie } from '../types/movie.types';
import { MovieCard } from './MovieCard';

interface HorizontalListProps {
  container: Container;
  onMoviePress: (movie: Movie) => void;
  overrideLayout?: LayoutType;
}

export const HorizontalList: React.FC<HorizontalListProps> = ({ 
  container, 
  onMoviePress, 
  overrideLayout 
}) => {
  const layoutToUse = overrideLayout || container.layout;
  
  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieCard
      movie={item}
      layout={layoutToUse}
      onPress={() => onMoviePress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{container.title}</Text>
      <FlatList
        data={container.items}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={160}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  listContent: {
    paddingHorizontal: 16,
  },
});