import type { Media } from '@/types/animeDetails';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

interface AnimeHeaderProps {
  anime: Media;
}

export default function AnimeHeader({ anime }: AnimeHeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: anime.bannerImage || anime.coverImage.large }}
        style={styles.bannerImage}
      />
      <LinearGradient
        colors={['transparent', 'rgba(15,15,35,0.9)', '#0F0F23']}
        style={styles.gradient}
      />
      <View style={styles.overlay}>
        <Image
          source={{ uri: anime.coverImage.large }}
          style={styles.coverImage}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{anime.title.romaji}</Text>
          {anime.title.english && (
            <Text style={styles.subtitle}>{anime.title.english}</Text>
          )}
          <View style={styles.badges}>
            <BlurView intensity={20} tint="dark" style={styles.badge}>
              <Text style={styles.badgeText}>{anime.format}</Text>
            </BlurView>
            {anime.status && (
              <BlurView intensity={20} tint="dark" style={styles.badge}>
                <Text style={styles.badgeText}>{anime.status}</Text>
              </BlurView>
            )}
            {anime.episodes && (
              <BlurView intensity={20} tint="dark" style={styles.badge}>
                <Text style={styles.badgeText}>{anime.episodes} Episodes</Text>
              </BlurView>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 400,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  coverImage: {
    width: 120,
    height: 180,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: '#A0A0B0',
    fontSize: 16,
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
}); 