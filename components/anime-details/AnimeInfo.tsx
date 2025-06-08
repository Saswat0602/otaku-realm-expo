import type { Media } from '@/types/animeDetails';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface AnimeInfoProps {
  anime: Media;
}

export default function AnimeInfo({ anime }: AnimeInfoProps) {
  const formatDate = (date: { year: number; month: number; day: number }) => {
    if (!date.year) return 'Unknown';
    return `${date.year}-${date.month || '?'}-${date.day || '?'}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        <View style={styles.grid}>
          <InfoItem label="Format" value={anime.format} />
          <InfoItem label="Status" value={anime.status} />
          <InfoItem label="Episodes" value={anime.episodes?.toString() || 'Unknown'} />
          <InfoItem label="Duration" value={`${anime.duration} min`} />
          <InfoItem label="Start Date" value={formatDate(anime.startDate)} />
          <InfoItem label="End Date" value={anime.endDate ? formatDate(anime.endDate) : 'Unknown'} />
          <InfoItem label="Season" value={`${anime.season} ${anime.seasonYear}`} />
          <InfoItem label="Source" value={anime.source} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Genres</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genresContainer}
        >
          {anime.genres.map((genre, index) => (
            <View key={genre} style={styles.genreWrapper}>
              <LinearGradient
                colors={['#6C5CE7', '#A29BFE']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.genreGradient}
              >
                <BlurView intensity={20} tint="dark" style={styles.genreContent}>
                  <Text style={styles.genreText}>{genre}</Text>
                </BlurView>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    width: '45%',
  },
  label: {
    fontSize: 14,
    color: '#A0A0B0',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  genresContainer: {
    paddingRight: 20,
  },
  genreWrapper: {
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  genreGradient: {
    padding: 1.5,
  },
  genreContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  genreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize',
  },
}); 