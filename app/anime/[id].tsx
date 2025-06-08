import AnimeCharacters from '@/components/anime-details/AnimeCharacters';
import AnimeDescription from '@/components/anime-details/AnimeDescription';
import AnimeHeader from '@/components/anime-details/AnimeHeader';
import AnimeInfo from '@/components/anime-details/AnimeInfo';
import AnimeStatics from '@/components/anime-details/AnimeStatics';
import AnimeStats from '@/components/anime-details/AnimeStats';
import ErrorMessage from '@/components/common/ErrorMessage';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useAnimeDetailsQuery } from '@/redux/api/detailsApi';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      <ScrollView style={styles.scrollView} bounces={false}>
        <AnimeHeader anime={anime} />
        <LinearGradient
          colors={['#0F0F23', '#1A1A2E']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <AnimeInfo anime={anime} />
            <AnimeDescription description={anime.description} />
            <AnimeStats anime={anime} />
            <AnimeCharacters characters={anime.characters.edges} />
            <AnimeStatics stats={anime.stats}/>
          </View>
        </LinearGradient>
      </ScrollView>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']}
          style={styles.backButtonGradient}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  scrollView: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  content: {
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    zIndex: 10,
  },
  backButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 