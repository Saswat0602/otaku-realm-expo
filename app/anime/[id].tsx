import AnimeCharacters from '@/components/anime-details/AnimeCharacters';
import AnimeDescription from '@/components/anime-details/AnimeDescription';
import AnimeHeader from '@/components/anime-details/AnimeHeader';
import AnimeInfo from '@/components/anime-details/AnimeInfo';
import AnimeStats from '@/components/anime-details/AnimeStats';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAnimeDetailsQuery } from '@/redux/api/detailsApi';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function AnimeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: anime, isLoading, error } = useAnimeDetailsQuery(id as string);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !anime) {
    return <ErrorMessage message="Failed to load anime details" />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView}>
        <AnimeHeader anime={anime} />
        <View style={styles.content}>
          <AnimeInfo anime={anime} />
          <AnimeDescription description={anime.description} />
          <AnimeStats anime={anime} />
          <AnimeCharacters characters={anime.characters.edges} />
        </View>
      </ScrollView>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
}); 