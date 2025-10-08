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
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerRightControls}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="share-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.darkOverlay} />
          
          <View style={styles.movieInfoOverlay}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieMeta}>
              {movie.duration} • {movie.rating} • {movie.year} • {movie.quality}
            </Text>
            
            <View style={styles.heroActionButtons}>
              <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
                <Ionicons name="play" size={20} color="#000000" />
                <Text style={styles.playButtonText}>Play</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPress}>
                <Ionicons name="download-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>{movie.description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Similar Content</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.similarContentScroll}
              contentContainerStyle={styles.similarContentContainer}
            >
              {[1, 2, 3, 4].map((index) => (
                <View key={index} style={styles.similarContentCard}>
                  <View style={styles.similarContentImage}>
                    <Ionicons name="film-outline" size={24} color="#666666" />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

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
    height: screenHeight * 0.5,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  headerRightControls: {
    position: 'absolute',
    top: 20,
    right: 16,
    flexDirection: 'row',
    gap: 12,
    zIndex: 10,
  },
  headerButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    padding: 8,
  },
  darkOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  movieInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieMeta: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 20,
  },
  heroActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
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
    marginLeft: 6,
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    padding: 12,
  },
  downloadButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    padding: 12,
  },
  content: {
    padding: 20,
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
    marginBottom: 12,
  },
  similarContentScroll: {
    marginBottom: 8,
  },
  similarContentContainer: {
    paddingRight: 20,
  },
  similarContentCard: {
    width: 120,
    height: 68,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  similarContentImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandableContent: {
    paddingBottom: 16,
  },
  castContainer: {
    paddingBottom: 16,
  },
  castMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  actorName: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  characterName: {
    color: '#CCCCCC',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
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