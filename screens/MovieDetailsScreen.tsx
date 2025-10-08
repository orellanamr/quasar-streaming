import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import React from 'react';
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
import { ExpandableSection } from '../components/ExpandableSection';
import { CastMember, Movie } from '../types/movie.types';

const { height: screenHeight } = Dimensions.get('window');

type RootStackParamList = {
  Main: undefined;
  MovieDetails: { movie: Movie };
};

type MovieDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'MovieDetails'>;

export const MovieDetailsScreen: React.FC<MovieDetailsScreenProps> = ({ route, navigation }) => {
  const { movie } = route.params;

  const handlePlayPress = () => {
    console.log('Play movie:', movie.title);
  };

  const handleAddPress = () => {
    console.log('Add to list:', movie.title);
  };

  const handleDownloadPress = () => {
    console.log('Download movie:', movie.title);
  };

  const renderCastMember = (member: CastMember, index: number) => (
    <View key={index} style={styles.castMember}>
      <Text style={styles.actorName}>{member.actorName}</Text>
      <Text style={styles.characterName}>{member.characterName}</Text>
    </View>
  );

  const renderCrewList = (title: string, members: string[]) => (
    <View style={styles.crewSection}>
      <Text style={styles.crewTitle}>{title}:</Text>
      <Text style={styles.crewMembers}>{members.join(', ')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerSection}>
          <Image
            source={{ uri: movie.posters.landscape.url }}
            style={styles.headerImage}
            contentFit="cover"
          />
          
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerOverlay}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieMeta}>
              {movie.year} • {movie.duration} • {movie.rating} • {movie.quality}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
              <Ionicons name="play" size={20} color="#000000" />
              <Text style={styles.playButtonText}>Play</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleAddPress}>
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Add</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton} onPress={handleDownloadPress}>
              <Ionicons name="download-outline" size={20} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Download</Text>
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.description}>{movie.description}</Text>

          {/* Similar Content */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Similar Content</Text>
            <Text style={styles.sectionContent}>
              Content IDs: {movie.similarContent.join(', ')}
            </Text>
          </View>

          {/* Expandable Sections */}
          <ExpandableSection title="Cast">
            <View style={styles.castContainer}>
              {movie.cast.map(renderCastMember)}
            </View>
          </ExpandableSection>

          <ExpandableSection title="Producers">
            <View style={styles.expandableContent}>
              {renderCrewList('Producers', movie.crew.producers)}
            </View>
          </ExpandableSection>

          <ExpandableSection title="Directors">
            <View style={styles.expandableContent}>
              {renderCrewList('Directors', movie.crew.directors)}
            </View>
          </ExpandableSection>

          <ExpandableSection title="Writers">
            <View style={styles.expandableContent}>
              {renderCrewList('Writers', movie.crew.writers)}
            </View>
          </ExpandableSection>

          <ExpandableSection title="Classification">
            <View style={styles.expandableContent}>
              <View style={styles.crewSection}>
                <Text style={styles.crewTitle}>Rating:</Text>
                <Text style={styles.crewMembers}>{movie.classification.rating}</Text>
              </View>
              <View style={styles.crewSection}>
                <Text style={styles.crewTitle}>Advisory Content:</Text>
                <Text style={styles.crewMembers}>
                  {movie.classification.advisoryContent.join(', ')}
                </Text>
              </View>
            </View>
          </ExpandableSection>
        </View>
        
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
  scrollView: {
    flex: 1,
  },
  headerSection: {
    height: screenHeight * 0.4,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  headerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  movieMeta: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
  },
  playButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  expandableContent: {
    paddingBottom: 16,
  },
  castContainer: {
    paddingBottom: 16,
  },
  castMember: {
    marginBottom: 12,
  },
  actorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  characterName: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 2,
  },
  crewSection: {
    marginBottom: 12,
  },
  crewTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  crewMembers: {
    color: '#CCCCCC',
    fontSize: 14,
    lineHeight: 18,
  },
  bottomSpacing: {
    height: 50,
  },
});